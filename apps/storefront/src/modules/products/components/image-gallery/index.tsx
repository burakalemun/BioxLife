import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (!images || images.length === 0) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: "#2e3d30", minHeight: "500px" }}
      >
        <span className="label-caps" style={{ color: "rgba(245,240,232,0.3)" }}>
          Görsel Yok
        </span>
      </div>
    )
  }

  // Single image: full bleed
  if (images.length === 1) {
    return (
      <div className="w-full h-full relative" style={{ minHeight: "100vh" }}>
        {images[0].url && (
          <Image
            src={images[0].url}
            alt="Ürün görseli"
            fill
            priority
            className="object-cover"
            sizes="60vw"
          />
        )}
      </div>
    )
  }

  // Multiple images: vertical scroll stack
  return (
    <div className="flex flex-col w-full">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="relative w-full"
          style={{ aspectRatio: "4/5" }}
        >
          {image.url && (
            <Image
              src={image.url}
              priority={index <= 1}
              alt={`Ürün görseli ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ImageGallery
