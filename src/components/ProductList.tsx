'use client'

import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { ProductsData } from '@/lib/definations'

const GET_PRODUCTS = gql`
  query GetAllProducts {
    allProducts {
      id
      name
      price
    }
  }
`

export function ProductList() {
  const { data, isLoading, error } = useQuery<ProductsData>({
    queryKey: [GET_PRODUCTS],
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data?.allProducts.map((product) => (
        <li key={product.id}>
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  )
}
