import React from "react"
import { Check } from "@medusajs/icons"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
  name?: string
  'data-testid'?: string
}

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = true,
  onChange,
  label,
  name,
  'data-testid': dataTestId
}) => {
  return (
    <div 
      className="flex items-center space-x-3 cursor-pointer group"
      onClick={onChange}
    >
      <div 
        className={`w-5 h-5 flex items-center justify-center border transition-colors ${checked ? "border-[#c9a84c] bg-[#c9a84c]" : "border-[#6b7b6c] bg-transparent group-hover:border-[#c9a84c]"}`}
        role="checkbox"
        aria-checked={checked}
        data-testid={dataTestId}
      >
        {checked && <Check className="text-[#1e2b20]" width={16} height={16} />}
      </div>
      <input type="hidden" name={name} value={checked.toString()} />
      <span className="text-sm font-medium transition-colors" style={{ color: checked ? "#1e2b20" : "#6b7b6c" }}>
        {label}
      </span>
    </div>
  )
}

export default CheckboxWithLabel
