import { Metadata } from "next"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"
import AccountDeletion from "@modules/account/components/account-deletion"
import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Profilim | BioxLife",
  description: "Hesap ayarlarınız ve kişisel bilgileriniz.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-10 flex flex-col gap-y-3">
        <h1
          className="text-3xl font-medium"
          style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
        >
          Kişisel Bilgiler
        </h1>
        <p className="text-sm font-light" style={{ color: "#6b7b6c" }}>
          Profilinizi yönetin, iletişim bilgilerinizi güncelleyin ve hesap güvenliğinizi sağlayın.
        </p>
      </div>

      <div className="flex flex-col gap-y-8 w-full">
        <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        <ProfilePassword customer={customer} />
        <Divider />
        <ProfileBillingAddress customer={customer} regions={regions} />
        <Divider />
        
        <AccountDeletion email={customer.email} />

      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px" style={{ background: "rgba(30,43,32,0.1)" }} />
}
