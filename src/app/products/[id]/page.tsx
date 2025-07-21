import { use } from 'react'
import { ProductDetails } from '@/components/ui/organisms/ProductDetails'

type ProductPageProps = {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <ProductDetails id={id} />
    </div>
  )
}
