import { AbstractPaymentProvider } from "@medusajs/framework/utils"

class IyzicoPaymentProvider extends AbstractPaymentProvider {
  static identifier = "iyzico"
  protected iyzico: any

  constructor(container, options) {
    super(container, options)

    try {
      const Iyzipay = require("iyzipay")
      this.iyzico = new Iyzipay({
        apiKey: process.env.IYZICO_API_KEY || options.apiKey,
        secretKey: process.env.IYZICO_SECRET_KEY || options.secretKey,
        uri: process.env.IYZICO_BASE_URL || options.baseUrl || "https://sandbox-api.iyzipay.com",
      })
    } catch (e) {
      console.warn("Iyzico client could not be initialized.")
    }
  }

  async initiatePayment(input: any): Promise<any> {
    return {
      data: {
        amount: input.amount,
        currency: input.currency_code,
      }
    }
  }

  async authorizePayment(input: any): Promise<any> {
    return {
      data: input.data,
      status: "authorized"
    }
  }

  async capturePayment(input: any): Promise<any> {
    return {
      data: input.data
    }
  }

  async refundPayment(input: any): Promise<any> {
    return {
      data: input.data,
    }
  }

  async cancelPayment(input: any): Promise<any> {
    return {
      data: input.data,
    }
  }

  async deletePayment(input: any): Promise<any> {
    return {
      data: input.data,
    }
  }

  async getPaymentStatus(input: any): Promise<any> {
    return "authorized" as any
  }

  async retrievePayment(input: any): Promise<any> {
    return input.data
  }

  async updatePayment(input: any): Promise<any> {
    return {
      data: input.data
    }
  }

  async getWebhookActionAndData(payload: any): Promise<any> {
    return {
      action: "not_supported",
      data: payload.data || {}
    }
  }
}

export default IyzicoPaymentProvider
