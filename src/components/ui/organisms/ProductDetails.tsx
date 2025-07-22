'use client'
import { useQuery } from '@tanstack/react-query'
import { gql } from 'graphql-request'
import { ProductData } from '@/lib/definations'
import { Heading } from '../atoms/Heading'
import Image from 'next/image'
import { ProductDetailsSkeleton } from './ProductDetailsSkeleton'
import { ReviewCard } from '../molecules/ReviewCard'

const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      description
      image_url
      price
      variants {
        id
        price
        stock_quantity
        image_url
        sku
      }
      reviews {
        id
        rating
        comment
        author {
          id
          email
        }
      }
    }
  }
`

export function ProductDetails({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery<ProductData>({
    queryKey: [GET_PRODUCT_BY_ID, { id }],
  })

  if (isLoading) return <ProductDetailsSkeleton />
  if (error) return <p>Error: {error.message}</p>
  if (!data?.product) return <p>Product not found.</p>

  const { product } = data
  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
        {/* Image Column */}
        <div className="aspect-square overflow-hidden rounded-lg border">
          {product.image_url && (
            <Image
              src={product.image_url}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>

        {/* Details Column */}
        <div className="mt-8 md:mt-0">
          <Heading as="h1" size="h1" className="text-3xl lg:text-4xl">
            {product.name}
          </Heading>
          {/* Price Section */}
          <div className="mt-4">
            <p className="text-foreground text-3xl">
              ${product.price.toFixed(2)}
            </p>
          </div>
          {/* Description Section */}
          <div className="mt-6">
            <Heading as="h2" size="h3" className="text-xl">
              Description
            </Heading>
            <p className="text-muted-foreground mt-2 text-base">
              {product.description}
            </p>
          </div>
          {/* Variants Section */}
          <div className="mt-6">
            <Heading as="h2" size="h3" className="text-xl">
              Available Variants
            </Heading>
            <ul className="text-muted-foreground mt-2 list-disc space-y-2 pl-4">
              {product.variants?.map((variant) => (
                <li key={variant.id}>
                  SKU: {variant.sku} - Stock: {variant.stock_quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* --- BOTTOM SECTION: CUSTOMER REVIEWS --- */}
      <div className="mt-16 border-t pt-10">
        <Heading as="h2" size="h2" className="text-2xl">
          Customer Reviews
        </Heading>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {product.reviews.map((review) => (
              // 2. USE THE REVIEWCARD component
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground mt-4">No reviews yet.</p>
        )}
      </div>
    </>
  )
}
