'use client'
import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { ProductsData } from '@/lib/definations'
import { ProductCard } from '@/components/ui/molecules/ProductCard'

const GET_PRODUCTS = gql`
  query GetAllProducts {
    allProducts {
      id
      name
      price
      description
      image_url
    }
  }
`
export function ProductList() {
  const { data, isLoading, error } = useQuery<ProductsData>({
    queryKey: [GET_PRODUCTS],
  })

  if (isLoading) return <p className="text-center">Loading products...</p>
  if (error)
    return (
      <p className="text-destructive text-center">Error: {error.message}</p>
    )

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 xl:gap-x-10">
      {data?.allProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
