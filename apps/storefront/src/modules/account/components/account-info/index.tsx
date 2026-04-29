import { Disclosure } from "@headlessui/react"
import { clx } from "@modules/common/components/ui"
import { useEffect } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { useFormStatus } from "react-dom"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  'data-testid'?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "Bir hata oluştu, lütfen tekrar deneyin",
  children,
  'data-testid': dataTestid
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState()
  const { pending } = useFormStatus()

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  return (
    <div className="w-full" data-testid={dataTestid}>
      <div className="flex flex-col small:flex-row small:items-center justify-between gap-4 py-6">
        
        {/* Info Display */}
        <div className="flex flex-col gap-y-1">
          <span className="label-caps" style={{ color: "#1e2b20", fontSize: "10px" }}>{label}</span>
          <div className="mt-1">
            {typeof currentInfo === "string" ? (
              <span className="text-base font-medium" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }} data-testid="current-info">
                {currentInfo}
              </span>
            ) : (
              currentInfo
            )}
          </div>
        </div>

        {/* Edit Button */}
        <div>
          <button
            onClick={handleToggle}
            type={state ? "reset" : "button"}
            className="label-caps px-5 py-2 transition-colors border"
            style={{
              borderColor: state ? "rgba(30,43,32,0.15)" : "#c9a84c",
              color: state ? "#6b7b6c" : "#1e2b20",
              background: state ? "transparent" : "#c9a84c"
            }}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? "Vazgeç" : "Düzenle"}
          </button>
        </div>
      </div>

      {/* Success Alert */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[100px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
          data-testid="success-message"
        >
          <div className="p-4 mb-4 text-sm font-light flex items-center gap-2" style={{ background: "rgba(201,168,76,0.1)", color: "#1e2b20", border: "1px solid rgba(201,168,76,0.2)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            <span>{label} başarıyla güncellendi.</span>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error Alert */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
            {
              "max-h-[100px] opacity-100": isError,
              "max-h-0 opacity-0": !isError,
            }
          )}
          data-testid="error-message"
        >
          <div className="p-4 mb-4 text-sm font-light flex items-center gap-2" style={{ background: "rgba(220,38,38,0.05)", color: "rgb(185,28,28)", border: "1px solid rgba(220,38,38,0.2)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>{errorMessage}</span>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* Edit Form Content */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
            {
              "max-h-[1000px] opacity-100 pointer-events-auto": state,
              "max-h-0 opacity-0 pointer-events-none": !state,
            }
          )}
        >
          <div className="flex flex-col gap-y-6 pt-4 pb-8">
            <div>{children}</div>
            <div className="flex items-center justify-end">
              <button
                disabled={pending}
                className="label-caps px-8 py-3.5 transition-colors w-full small:w-auto flex items-center justify-center disabled:opacity-50"
                style={{ background: "#1e2b20", color: "#f5f0e8" }}
                type="submit"
                data-testid="save-button"
              >
                {pending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Kaydediliyor...
                  </span>
                ) : (
                  "Değişiklikleri Kaydet"
                )}
              </button>
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccountInfo
