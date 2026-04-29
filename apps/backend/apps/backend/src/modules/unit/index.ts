import { Module } from "@medusajs/framework/utils"
import UnitModuleService from "./service"

export const UNIT_MODULE = "unitModule"

export default Module(UNIT_MODULE, {
  service: UnitModuleService,
})
