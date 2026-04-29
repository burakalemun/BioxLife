import { Label } from "@modules/common/components/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched: _touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2 text-xs uppercase tracking-widest font-semibold" style={{ color: "#1e2b20" }}>
            {topLabel}
          </Label>
        )}
        <div className="flex relative z-0 w-full">
          <input
            type={inputType}
            name={name}
            placeholder=" "
            required={required}
            className="pt-4 pb-1 block w-full h-12 px-4 mt-0 bg-transparent border focus:outline-none transition-colors text-sm"
            style={{ 
              borderColor: "rgba(30,43,32,0.2)", 
              color: "#1e2b20" 
            }}
            {...props}
            ref={inputRef}
            onFocus={(e) => {
              e.target.style.borderColor = "#c9a84c"
              e.target.style.background = "rgba(201,168,76,0.05)"
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(30,43,32,0.2)"
              e.target.style.background = "transparent"
            }}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className="flex items-center justify-center mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-sm"
            style={{ color: "#6b7b6c" }}
          >
            {label}
            {required && <span className="ml-1" style={{ color: "#c9a84c" }}>*</span>}
          </label>
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="px-4 focus:outline-none transition-all duration-150 outline-none absolute right-0 top-3"
              style={{ color: "#6b7b6c" }}
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
