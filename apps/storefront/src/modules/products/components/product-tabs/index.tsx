"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const metadata = (product.metadata || {}) as Record<string, string>
  
  const tabs = [
    {
      label: "Ürün Bilgileri",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Uygulama Yöntemi",
      component: <MetadataTab content={metadata.application || "Uygulama yöntemi belirtilmemiş."} />,
    },
    {
      label: "Sertifikalar",
      component: <MetadataTab content={metadata.certificate || "Sertifika bilgisi bulunmamaktadır."} />,
    },
    {
      label: "Teslimat ve İade",
      component: <ShippingInfoTab metadata={metadata} />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const MetadataTab = ({ content }: { content: string }) => (
  <div className="text-small-regular py-8 text-sage-600 leading-relaxed">
    {content}
  </div>
)

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-sage-900">Materyal</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-sage-900">Menşei</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-sage-900">Tür</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold text-sage-900">Ağırlık</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold text-sage-900">Boyutlar</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}U x ${product.width}G x ${product.height}Y`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = ({ metadata }: { metadata: Record<string, string> }) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery className="text-gold-600" />
          <div>
            <span className="font-semibold text-sage-900">Teslimat</span>
            <p className="max-w-sm text-sage-600">
              {metadata.delivery || "Paketiniz 3-5 iş günü içerisinde belirtilen adrese ulaştırılır."}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back className="text-gold-600" />
          <div>
            <span className="font-semibold text-sage-900">İade Koşulları</span>
            <p className="max-w-sm text-sage-600">
              {metadata.return_policy || "Ürününüzü iade edin, paranızı geri ödeyelim. Sorunsuz iade sürecimizle her zaman yanınızdayız."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs;
