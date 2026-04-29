import { AbstractPaymentProvider } from "@medusajs/framework/utils"
import { 
  PaymentProviderError, 
  PaymentProviderSessionResponse,
  CreatePaymentProviderSession,
  UpdatePaymentProviderSession,
  PaymentProviderSessionResponseJSON
} from "@medusajs/framework/types"
import { Iyzico } from "iyzico-js"

class IyzicoPaymentProvider extends AbstractPaymentProvider {
  static identifier = "iyzico"
  protected iyzico: any

  constructor(container, options) {
    super(container, options)

    this.iyzico = new Iyzico({
      apiKey: process.env.IYZICO_API_KEY || options.apiKey,
      secretKey: process.env.IYZICO_SECRET_KEY || options.secretKey,
      baseUrl: process.env.IYZICO_BASE_URL || options.baseUrl || "https://sandbox-api.iyzipay.com",
    })
  }

  async initiatePayment(input: CreatePaymentProviderSession): Promise<PaymentProviderSessionResponse> {
    // iyzico ödeme başlatma (Threeds Initialize) mantığı burada olacak
    // Şimdilik oturum verilerini hazırlıyoruz
    return {
      data: {
        amount: input.amount,
        currency: input.currency_code,
      }
    }
  }

  async authorizePayment(
    paymentSessionData: Record<string, unknown>,
    context: Record<string, unknown>
  ): Promise<PaymentProviderSessionResponse | PaymentProviderError> {
    // 3D Secure sonrası onaylama işlemi
    return {
      data: paymentSessionData,
      status: "authorized"
    }
  }

  async capturePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProviderSessionResponse | PaymentProviderError> {
    // Parayı hesaba çekme (iyzico Capture)
    return {
      data: paymentSessionData,
      status: "captured"
    }
  }

  async refundPayment(paymentSessionData: Record<string, unknown>, refundAmount: number): Promise<PaymentProviderSessionResponse | PaymentProviderError> {
    // İade işlemi
    return {
      data: paymentSessionData,
    }
  }

  async cancelPayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProviderSessionResponse | PaymentProviderError> {
    // İptal işlemi
    return {
      data: paymentSessionData,
    }
  }

  async deletePayment(paymentSessionData: Record<string, unknown>): Promise<PaymentProviderSessionResponse | PaymentProviderError> {
    return {
      data: paymentSessionData,
    }
  }

  async getPaymentStatus(paymentSessionData: Record<string, unknown>): Promise<string> {
    return "authorized"
  }

  async retrievePayment(paymentSessionData: Record<string, unknown>): Promise<Record<string, unknown>> {
    return paymentSessionData
  }

  async updatePayment(input: UpdatePaymentProviderSession): Promise<PaymentProviderSessionResponse | PaymentProviderError> {
    return {
      data: input.data
    }
  }
}

export default IyzicoPaymentProvider
