import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import IyzicoPaymentProvider from "./service"

export default ModuleProvider(Modules.PAYMENT, {
  services: [IyzicoPaymentProvider],
})
