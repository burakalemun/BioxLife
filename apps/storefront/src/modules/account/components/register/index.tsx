"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup as (state: string | null, formData: FormData) => Promise<string | null>, null as string | null)

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6 text-sage-900 text-center">
        BioxLife Dünyasına Katılın
      </h1>
      <p className="text-center text-base-regular text-sage-600 mb-4">
        BioxLife üyelik profilinizi oluşturun ve size özel ayrıcalıklı alışveriş 
        deneyiminin tadını çıkarın.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
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
          <Input
            label="E-posta Adresi"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Telefon"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Şifre"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-sage-600 text-small-regular mt-6">
          Hesap oluşturarak, BioxLife&apos;ın{" "}
          <LocalizedClientLink
            href="/privacy-policy"
            className="underline text-gold-600"
          >
            Gizlilik Politikası
          </LocalizedClientLink>{" "}
          ve{" "}
          <LocalizedClientLink
            href="/terms-of-use"
            className="underline text-gold-600"
          >
            Kullanım Koşullarını
          </LocalizedClientLink>{" "}
          kabul etmiş olursunuz.
        </span>
        <SubmitButton className="w-full mt-6 bg-gold-600 hover:bg-gold-700 text-white rounded-full h-12" data-testid="register-button">
          Kayıt Ol
        </SubmitButton>
      </form>
      <span className="text-center text-sage-600 text-small-regular mt-6">
        Zaten üye misiniz?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline text-gold-600 hover:text-gold-700"
        >
          Giriş Yap
        </button>
        .
      </span>
    </div>
  )
}

export default Register
