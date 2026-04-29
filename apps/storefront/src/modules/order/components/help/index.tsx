import { Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-6 border-t pt-8">
      <Heading className="text-base-semi text-sage-900">Yardıma mı ihtiyacınız var?</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col text-sage-600">
          <li>
            <LocalizedClientLink href="/contact" className="hover:text-gold-600 transition-colors">İletişim</LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact" className="hover:text-gold-600 transition-colors">
              İade ve Değişim
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
