import { Product } from '@/lib/definations'
import { Heading } from '../atoms/Heading'
import Image from 'next/image'

type ProductCardProps = {
  product: Product
}
export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-card text-card-foreground relative flex flex-col overflow-hidden rounded-lg border shadow-sm transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md">
      <div className="bg-muted aspect-square overflow-hidden">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover object-center transition-opacity duration-300 group-hover:opacity-75"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <Heading as="h3" size="h3" className="truncate text-base font-semibold">
          {product.name}
        </Heading>
        <p className="text-muted-foreground mt-1 line-clamp-2 flex-grow text-xs">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-foreground text-base font-bold">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
