import { MedusaService } from "@medusajs/framework/utils"
import { VariantUnit } from "./models/variant-unit"

class UnitModuleService extends MedusaService({
  VariantUnit,
}) {}

export default UnitModuleService
