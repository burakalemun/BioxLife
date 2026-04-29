"use client"

import React, { useState } from "react"
import { useFormStatus } from "react-dom"

const SubmitButton = ({ isConfirming }: { isConfirming: boolean }) => {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="label-caps px-6 py-2.5 transition-colors disabled:opacity-50"
      style={
        isConfirming
          ? { background: "rgb(220, 38, 38)", color: "#fff", border: "1px solid rgb(220, 38, 38)" }
          : { background: "transparent", color: "rgb(220, 38, 38)", border: "1px solid rgb(220, 38, 38)" }
      }
    >
      {pending ? "İşleniyor..." : "Evet, Hesabımı Sil"}
    </button>
  )
}

const AccountDeletion = ({ email }: { email: string }) => {
  const [isConfirming, setIsConfirming] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleAction = async () => {
    // In a real app, this would call a server action to delete the account
    console.log(`KVKK Deletion Request for ${email}`)
    // Mocking an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSuccess(true)
    setIsConfirming(false)
  }

  if (success) {
    return (
      <div className="w-full mt-4">
        <div className="p-5 border" style={{ borderColor: "rgba(30, 43, 32, 0.2)", background: "rgba(30, 43, 32, 0.03)" }}>
          <p className="text-sm font-medium" style={{ color: "#1e2b20" }}>Talebiniz Alındı</p>
          <p className="text-xs mt-2 font-light" style={{ color: "#6b7b6c" }}>
            Hesabınızın silinmesi ve verilerinizin anonimleştirilmesi süreci başlatılmıştır. İşlem tamamlandığında e-posta ile bilgilendirileceksiniz.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-2 mb-4">
        <h3 className="text-base font-medium" style={{ color: "#1e2b20" }}>Veri Silme Talebi (KVKK)</h3>
        <p className="text-sm font-light" style={{ color: "#6b7b6c" }}>
          KVKK kapsamında hesabınızın ve tüm kişisel verilerinizin sistemlerimizden kalıcı olarak silinmesini talep edebilirsiniz.
        </p>
      </div>
      <div className="p-5 border transition-all" style={{ borderColor: isConfirming ? "rgb(220, 38, 38)" : "rgba(220, 38, 38, 0.2)", background: isConfirming ? "rgba(220, 38, 38, 0.05)" : "rgba(220, 38, 38, 0.02)" }}>
        <p className="text-xs mb-4" style={{ color: "rgb(185, 28, 28)" }}>
          <strong className="font-medium">Uyarı:</strong> Bu işlem geri alınamaz. Sipariş geçmişiniz ve adres bilgileriniz kalıcı olarak silinecektir.
        </p>

        {!isConfirming ? (
          <button
            type="button"
            onClick={() => setIsConfirming(true)}
            className="label-caps px-6 py-2.5 transition-colors hover:bg-red-600 hover:text-white"
            style={{ background: "transparent", color: "rgb(220, 38, 38)", border: "1px solid rgb(220, 38, 38)" }}
          >
            Hesabımı Sil
          </button>
        ) : (
          <div className="flex flex-col gap-3 mt-6 pt-4" style={{ borderTop: "1px solid rgba(220,38,38,0.2)" }}>
            <p className="text-sm font-medium" style={{ color: "rgb(185, 28, 28)" }}>Tüm verileriniz silinecektir. Emin misiniz?</p>
            <div className="flex items-center gap-3">
              <form action={handleAction}>
                <SubmitButton isConfirming={isConfirming} />
              </form>
              <button
                type="button"
                onClick={() => setIsConfirming(false)}
                className="label-caps px-6 py-2.5 transition-colors"
                style={{ background: "#f5f0e8", color: "#1e2b20", border: "1px solid rgba(30,43,32,0.2)" }}
              >
                İptal Et
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountDeletion
