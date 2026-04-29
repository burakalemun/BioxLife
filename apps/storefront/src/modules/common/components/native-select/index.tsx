import { ChevronUpDown } from "@medusajs/icons"
import { clx } from "@modules/common/components/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

export type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder = "Select...", defaultValue, className, children, ...props },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div className="flex flex-col w-full relative z-0 mt-6">
        {/* Fake label for visual alignment with inputs */}
        <span 
          className="absolute -top-6 left-1 text-xs uppercase tracking-widest font-semibold"
          style={{ color: "#1e2b20" }}
        >
          {placeholder}
        </span>
        <div
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clx(
            "relative flex items-center bg-transparent border transition-colors h-12 px-4",
            className
          )}
          style={{ 
            borderColor: "rgba(30,43,32,0.2)",
            color: isPlaceholder ? "#6b7b6c" : "#1e2b20" 
          }}
        >
          <select
            ref={innerRef}
            defaultValue={defaultValue}
            {...props}
            className="appearance-none flex-1 bg-transparent border-none text-sm outline-none w-full"
            onFocus={(e) => {
              const parent = e.target.parentElement
              if (parent) {
                parent.style.borderColor = "#c9a84c"
                parent.style.background = "rgba(201,168,76,0.05)"
              }
            }}
            onBlur={(e) => {
              const parent = e.target.parentElement
              if (parent) {
                parent.style.borderColor = "rgba(30,43,32,0.2)"
                parent.style.background = "transparent"
              }
            }}
          >
            <option disabled value="">
              Seçiniz
            </option>
            {children}
          </select>
          <span className="absolute right-4 inset-y-0 flex items-center pointer-events-none" style={{ color: "#c9a84c" }}>
            <ChevronUpDown />
          </span>
        </div>
      </div>
    )
  }
)

NativeSelect.displayName = "NativeSelect"

export default NativeSelect
