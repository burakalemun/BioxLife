import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-32 px-6 flex flex-col justify-center items-center text-center"
      data-testid="empty-cart-message"
    >
      <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center rounded-full" style={{ background: "#ede8de" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7b6c" strokeWidth="1.2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      </div>

      <h1
        className="text-4xl font-medium mb-4"
        style={{ fontFamily: "'Playfair Display', serif", color: "#1e2b20" }}
      >
        Sepetiniz Boş
      </h1>

      <p className="text-base font-light mb-10 max-w-md mx-auto" style={{ color: "#6b7b6c" }}>
        Sepetinizde şu an herhangi bir ürün bulunmuyor. Doğanın saf özlerini keşfetmeye başlayın ve kendinize bir iyilik yapın.
      </p>

      <LocalizedClientLink href="/store">
        <button className="btn-primary" style={{ background: "#1e2b20", color: "#f5f0e8", maxWidth: "240px" }}>
          Koleksiyonu Keşfet
        </button>
      </LocalizedClientLink>
    </div>
  )
}

export default EmptyCartMessage
