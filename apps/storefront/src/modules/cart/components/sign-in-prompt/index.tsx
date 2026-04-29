import { Button, Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge text-sage-900">
          Zaten bir hesabınız var mı?
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          Daha iyi bir deneyim için giriş yapın.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-12 px-8 rounded-full border-sage-200 text-sage-800 hover:bg-sage-50 transition-all" data-testid="sign-in-button">
            Giriş Yap
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
