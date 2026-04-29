"use client"

import { useState } from "react"
import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState(LOGIN_VIEW.SIGN_IN)

  return (
    <div
      className="min-h-screen pt-16 flex items-center justify-center"
      style={{ background: "#f5f0e8" }}
    >
      <div className="w-full max-w-md px-6 py-16">
        {/* Logo */}
        <div className="text-center mb-12">
          <p
            className="text-2xl font-medium tracking-[0.25em] uppercase mb-2"
            style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
          >
            BioxLife
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
            <span className="label-caps" style={{ color: "#c9a84c", fontSize: "9px" }}>
              {currentView === LOGIN_VIEW.SIGN_IN ? "Üye Girişi" : "Yeni Hesap"}
            </span>
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
          </div>
        </div>

        {/* Form area */}
        {currentView === LOGIN_VIEW.SIGN_IN ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate
