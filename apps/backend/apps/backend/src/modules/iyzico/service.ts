import { AbstractPaymentProvider } from "@medusajs/framework/utils"
import { 
  PaymentProviderError, 
  PaymentProviderSessionResponse,
  CreatePaymentProviderSession,
  UpdatePaymentProviderSession,
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionAndData,
  ProviderWebhookPayload
} from "@medusajs/framework/types"

class IyzicoPaymentProvider extends AbstractPaymentProvider {
  static identifier = "iyzico"
  protected iyzico: any

  constructor(container, options) {
    super(container, options)

    // Dynamic import or require to avoid build-time errors with specific package exports
    try {
      const Iyzipay = require("iyzipay")
      this.iyzico = new Iyzipay({
        apiKey: process.env.IYZICO_API_KEY || options.apiKey,
        secretKey: process.env.IYZICO_SECRET_KEY || options.secretKey,
        uri: process.env.IYZICO_BASE_URL || options.baseUrl || "https://sandbox-api.iyzipay.com",
      })
    } catch (e) {
      console.warn("Iyzico client could not be initialized. Check iyzico-js or iyzipay package.")
    }
  }

  async initiatePayment(input: CreatePaymentProviderSession): Promise<PaymentProviderSessionResponse> {
    return {
      data: {
        amount: input.amount,
        currency: input.currency_code,
      }
    }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    return {
      data: input.data,
      status: "authorized"
    }
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    return {
      data: input.data,
      status: "captured"
    }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    return {
      data: input.data,
    }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return {
      data: input.data,
    }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return {
      data: input.data,
    }
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    return "authorized"
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    return input.data
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return {
      data: input.data
    }
  }

  async getWebhookActionAndData(payload: ProviderWebhookPayload): Promise<WebhookActionAndData> {
    return {
      action: "not_supported",
      data: payload.data
    }
  }
}

export default IyzicoPaymentProvider
