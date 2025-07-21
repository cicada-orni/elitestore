// import db from '@/lib/db'
// import { Prisma } from '@/generated/prisma'

// type ProductParent = Prisma.productsGetPayload<{
//   select: { id: true; name: true; description: true; image_url: true }
// }>
// export const resolvers = {
//   Query: {
//     allProducts: async () => {
//       return db.products.findMany({
//         select: { id: true, name: true, description: true, image_url: true },
//       })
//     },
//     product: async (_parent: undefined, { id }: { id: string }) => {
//       return db.products.findUnique({
//         where: {
//           id: BigInt(id),
//         },
//         select: { id: true, name: true, description: true, image_url: true },
//       })
//     },
//   },

//   Product: {
//     id: (parent: ProductParent) => {
//       return parent.id.toString()
//     },
//     price: async (parent: ProductParent) => {
//       const variant = await db.product_variants.findFirst({
//         where: {
//           product_id: parent.id,
//         },
//       })
//       if (!variant) {
//         return 0.0
//       }
//       return variant.price
//     },
//   },
// }

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
  },

  ProductVariant: {
    id: (parent: { id: string }) => {
      return parent.id.toString()
    },
  },
}
