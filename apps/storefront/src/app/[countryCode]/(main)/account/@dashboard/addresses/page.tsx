import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Addresses",
  description: "View your addresses",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-10 flex flex-col gap-y-3">
        <h1
          className="text-3xl font-medium"
          style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
        >
          Kayıtlı Adresler
        </h1>
        <p className="text-sm font-light" style={{ color: "#6b7b6c" }}>
          Kayıtlı teslimat ve fatura adreslerinizi görüntüleyin, güncelleyin veya yeni bir adres ekleyin. Siparişlerinizin daha hızlı tamamlanmasını sağlar.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
