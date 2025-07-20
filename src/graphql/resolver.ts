import db from '@/lib/db'
import { Prisma } from '@/generated/prisma'

type ProductParent = Prisma.productsGetPayload<{
  select: { id: true; name: true; description: true; image_url: true }
}>
export const resolvers = {
  Query: {
    allProducts: async () => {
      return db.products.findMany({
        select: { id: true, name: true, description: true, image_url: true },
      })
    },
    product: async (_parent: undefined, { id }: { id: string }) => {
      return db.products.findUnique({
        where: {
          id: BigInt(id),
        },
        select: { id: true, name: true, description: true, image_url: true },
      })
    },
  },

  Product: {
    id: (parent: ProductParent) => {
      return parent.id.toString()
    },
    price: async (parent: ProductParent) => {
      const variant = await db.product_variants.findFirst({
        where: {
          product_id: parent.id,
        },
      })
      if (!variant) {
        return 0.0
      }
      return variant.price
    },
  },
}
