"use client"

import { Plus } from "@medusajs/icons"
import { Button, Heading } from "@modules/common/components/ui"
import { useActionState, useEffect, useState } from "react"

import { addCustomerAddress } from "@lib/data/customer"
import useToggleState from "@lib/hooks/use-toggle-state"
import { HttpTypes } from "@medusajs/types"
import CountrySelect from "@modules/checkout/components/country-select"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import Modal from "@modules/common/components/modal"

const AddAddress = ({
  region,
  addresses,
}: {
  region: HttpTypes.StoreRegion
  addresses: HttpTypes.StoreCustomerAddress[]
}) => {
  const [successState, setSuccessState] = useState(false)
  const { state, open, close: closeModal } = useToggleState(false)

  const [formState, formAction] = useActionState(addCustomerAddress, {
    success: false,
    error: null,
  } as { success: boolean; error: string | null })

  const close = () => {
    setSuccessState(false)
    closeModal()
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successState])

  useEffect(() => {
    if (formState.success) {
      setSuccessState(true)
    }
  }, [formState])

  return (
    <>
      <button
        className="border p-6 min-h-[220px] h-full w-full flex flex-col items-center justify-center gap-4 transition-all"
        style={{ borderColor: "rgba(30,43,32,0.1)", background: "rgba(30,43,32,0.02)" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.05)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.3)" }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(30,43,32,0.02)"; e.currentTarget.style.borderColor = "rgba(30,43,32,0.1)" }}
        onClick={open}
        data-testid="add-address-button"
      >
        <div className="w-12 h-12 flex items-center justify-center border transition-colors" style={{ borderColor: "#c9a84c", color: "#c9a84c", borderRadius: "50%" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </div>
        <span className="text-lg font-medium mt-2" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>Yeni Adres Ekle</span>
      </button>

      <Modal isOpen={state} close={close} data-testid="add-address-modal">
        <Modal.Title>
          <h2 className="text-2xl font-medium mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}>Yeni Adres Ekle</h2>
        </Modal.Title>
        <form action={formAction}>
          <Modal.Body>
            <div className="flex flex-col gap-y-2">
              <div className="grid grid-cols-2 gap-x-2">
                <Input
                  label="Ad"
                  name="first_name"
                  required
                  autoComplete="given-name"
                  data-testid="first-name-input"
                />
                <Input
                  label="Soyad"
                  name="last_name"
                  required
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </div>
              <Input
                label="Şirket (İsteğe bağlı)"
                name="company"
                autoComplete="organization"
                data-testid="company-input"
              />
              <Input
                label="Adres"
                name="address_1"
                required
                autoComplete="address-line1"
                data-testid="address-1-input"
              />
              <Input
                label="Daire, Kat vb."
                name="address_2"
                autoComplete="address-line2"
                data-testid="address-2-input"
              />
              <div className="grid grid-cols-[144px_1fr] gap-x-2">
                <Input
                  label="Posta Kodu"
                  name="postal_code"
                  required
                  autoComplete="postal-code"
                  data-testid="postal-code-input"
                />
                <Input
                  label="Şehir"
                  name="city"
                  required
                  autoComplete="locality"
                  data-testid="city-input"
                />
              </div>
              <Input
                label="İlçe / Eyalet"
                name="province"
                autoComplete="address-level1"
                data-testid="state-input"
              />
              <CountrySelect
                region={region}
                name="country_code"
                required
                autoComplete="country"
                data-testid="country-select"
              />
              <Input
                label="Telefon"
                name="phone"
                autoComplete="tel"
                data-testid="phone-input"
              />
            </div>
            {formState.error && (
              <div
                className="p-3 mt-4 text-sm font-light flex items-center gap-2"
                style={{ background: "rgba(220,38,38,0.05)", color: "rgb(185,28,28)", border: "1px solid rgba(220,38,38,0.2)" }}
                data-testid="address-error"
              >
                {formState.error}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3 mt-8 items-center justify-end">
              <button
                type="reset"
                onClick={close}
                className="label-caps px-6 py-3 transition-colors"
                style={{ background: "transparent", color: "#1e2b20", border: "1px solid rgba(30,43,32,0.2)" }}
                data-testid="cancel-button"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="label-caps px-8 py-3 transition-opacity hover:opacity-80"
                style={{ background: "#1e2b20", color: "#f5f0e8" }}
                data-testid="save-button"
              >
                Kaydet
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default AddAddress
