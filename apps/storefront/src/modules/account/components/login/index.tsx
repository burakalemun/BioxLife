import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div data-testid="login-page">
      <h1
        className="text-3xl font-medium mb-3"
        style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
      >
        Tekrar Hoş Geldiniz
      </h1>
      <p className="text-sm font-light mb-10" style={{ color: "#6b7b6c" }}>
        Size özel deneyim için giriş yapın.
      </p>

      <form className="space-y-8" action={formAction}>
        <div>
          <label className="label-caps block mb-3" style={{ color: "#6b7b6c", fontSize: "9px" }}>
            E-posta
          </label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="adiniz@eposta.com"
            className="input-luxury"
            data-testid="email-input"
          />
        </div>
        <div>
          <label className="label-caps block mb-3" style={{ color: "#6b7b6c", fontSize: "9px" }}>
            Şifre
          </label>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="input-luxury"
            data-testid="password-input"
          />
        </div>

        <ErrorMessage error={message} data-testid="login-error-message" />

        <SubmitButton
          data-testid="sign-in-button"
          className="btn-primary w-full"
          style={{ background: "#1e2b20", color: "#f5f0e8" }}
        >
          Giriş Yap
        </SubmitButton>
      </form>

      <p className="text-sm font-light mt-8 text-center" style={{ color: "#6b7b6c" }}>
        Üye değil misiniz?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline transition-opacity hover:opacity-60"
          style={{ color: "#1e2b20" }}
          data-testid="register-button"
        >
          Hesap Oluşturun
        </button>
      </p>
    </div>
  )
}

export default Login
