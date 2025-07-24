'use client'
import { useQuery } from '@tanstack/react-query'
import { ProductData, ProductVariant } from '@/lib/definations'
import { Heading } from '../atoms/Heading'
import Image from 'next/image'
import { ProductDetailsSkeleton } from './ProductDetailsSkeleton'
import { ReviewCard } from '../molecules/ReviewCard'
import { ReviewForm } from '../molecules/ReviewForm'
import { GET_PRODUCT_BY_ID } from '@/graphql/queries'
import { VariantSelector } from '../molecules/VariantSelector'
import { useState } from 'react'

export function ProductDetails({ id }: { id: string }) {
  const { data, isLoading, error } = useQuery<ProductData>({
    queryKey: [GET_PRODUCT_BY_ID, { id }],
  })
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(undefined)

  if (isLoading) return <ProductDetailsSkeleton />
  if (error) return <p>Error: {error.message}</p>
  if (!data?.product) return <p>Product not found.</p>

  const { product } = data

  const displayImage = selectedVariant?.image_url || product.image_url
  const displayPrice = selectedVariant?.price || product.price

  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
        {/* Image Column */}
        <div className="aspect-square overflow-hidden rounded-lg border">
          {displayImage && (
            <Image
              src={displayImage}
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
            <p className="text-foreground text-3xl">${displayPrice.toFixed(2)}</p>
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
          {product.variants && product.variants.length > 0 && (
            <div className="mt-6">
              <Heading as="h2" size="h3" className="text-xl">
                Available Variants
              </Heading>
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onVariantSelect={setSelectedVariant}
              />
            </div>
          )}
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
        <ReviewForm product_id={product.id} />
      </div>
    </>
  )
}

