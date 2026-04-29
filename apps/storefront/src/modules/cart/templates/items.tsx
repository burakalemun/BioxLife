import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items

  return (
    <div>
      {/* Table header */}
      <div
        className="grid grid-cols-[1fr_100px_100px] gap-4 pb-4 mb-2"
        style={{ borderBottom: "1px solid rgba(30,43,32,0.1)" }}
      >
        <span className="label-caps" style={{ color: "#6b7b6c", fontSize: "10px" }}>Ürün</span>
        <span className="label-caps text-center" style={{ color: "#6b7b6c", fontSize: "10px" }}>Adet</span>
        <span className="label-caps text-right" style={{ color: "#6b7b6c", fontSize: "10px" }}>Toplam</span>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-y-6 mt-6">
        {items
          ? items
              .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))
              .map((item) => (
                <Item key={item.id} item={item} currencyCode={cart?.currency_code || "TRY"} />
              ))
          : repeat(5).map((i) => <SkeletonLineItem key={i} />)}
      </div>
    </div>
  )
}

export default ItemsTemplate
