import db from '@/lib/db'
import { Prisma } from '@/generated/prisma'

type ProductParent = Prisma.productsGetPayload<{
  select: { id: true; name: true; description: true; image_url: true }
}>

export const resolvers = {
  Query: {
    product: async (_parent: undefined, { id }: { id: string }) => {
      return db.products.findUnique({
        where: {
          id: BigInt(id),
        },
        select: { id: true, name: true, description: true, image_url: true },
      })
    },
    allProducts: async () => {
      return db.products.findMany({
        select: { id: true, name: true, description: true, image_url: true },
      })
    },
  },
  Product: {
    id: (parent: ProductParent) => {
      return parent.id.toString()
    },
    price: async (parent: ProductParent) => {
      const price = await db.product_variants.findFirst({
        where: {
          product_id: parent.id,
        },
        select: { price: true },
      })
      if (!price) {
        return 0.0
      }
      return price.price
    },
    variants: async (parent: ProductParent) => {
      return db.product_variants.findMany({
        where: {
          product_id: parent.id,
        },
      })
    },
    reviews: async (parent: ProductParent) => {
      return db.reviews.findMany({
        where: { product_id: parent.id },
      })
    },
  },

  ProductVariant: {
    id: (parent: { id: bigint }) => {
      return parent.id.toString()
    },
  },
  Review: {
    id: (parent: { id: bigint }) => parent.id.toString(),
    author: async (parent: { user_id: string | null }) => {
      if (!parent?.user_id) return null
      return db.users.findUnique({
        where: { id: parent.user_id },
      })
    },
  },

  // ---- Mutation Resolver ----
  Mutation: {
    submitReview: async (
      _parent: undefined,
      {
        input,
      }: { input: { product_id: string; rating: number; comment?: string } },
    ) => {
      const users = await db.users.findMany({
        select: { id: true },
      })
      const randomUser = users[Math.floor(Math.random() * users.length)]

      const newReview = await db.reviews.create({
        data: {
          product_id: BigInt(input.product_id),
          user_id: randomUser.id,
          rating: input.rating,
          comment: input.comment,
        },
      })
      return newReview
    },
  },
}
