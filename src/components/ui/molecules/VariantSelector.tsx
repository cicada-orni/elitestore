// src/components/molecules/VariantSelector.tsx

'use client'

import { ProductVariant } from '@/lib/definations'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Define the props for our component
interface VariantSelectorProps {
  variants: ProductVariant[]
  selectedVariant?: ProductVariant
  onVariantSelect: (variant: ProductVariant) => void
}

export function VariantSelector({
  variants,
  selectedVariant,
  onVariantSelect,
}: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-x-3">
      {variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => onVariantSelect(variant)}
          className={cn(
            'overflow-hidden rounded-md border-2 transition-all duration-200',
            // Apply a primary colored ring if this variant is the selected one
            variant.id === selectedVariant?.id
              ? 'border-primary ring-primary ring-2 ring-offset-2'
              : 'border-transparent',
          )}
        >
          {variant.image_url && (
            <Image
              src={variant.image_url}
              alt={variant.sku || 'Product variant'}
              width={60}
              height={60}
              className="h-16 w-16 object-cover object-center"
            />
          )}
        </button>
      ))}
    </div>
  )
}
