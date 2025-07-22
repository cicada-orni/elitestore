// prisma/seed.ts

import { PrismaClient } from '../src/generated/prisma'
import { faker } from '@faker-js/faker'
import axios from 'axios'

const prisma = new PrismaClient()

async function getImages(query: string, count: number): Promise<string[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) {
    console.error('UNSPLASH_ACCESS_KEY is not set in your .env file.')
    throw new Error('Unsplash Access Key is missing.')
  }

  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: query,
        per_page: count,
        orientation: 'squarish',
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    })
    interface UnsplashPhoto {
      urls: {
        regular: string
      }
    }

    return response.data.results.map(
      (photo: UnsplashPhoto) => photo.urls.regular,
    )
  } catch (error: unknown) {
    let errorMessage = `Failed to fetch images for query "${query}": `
    if (axios.isAxiosError(error)) {
      errorMessage += error.response?.data || error.message
    } else if (error instanceof Error) {
      errorMessage += error.message
    } else {
      errorMessage += String(error)
    }
    console.error(errorMessage)
    return Array(count).fill('https://via.placeholder.com/400')
  }
}

async function main() {
  console.log('Seeding database...')
  await prisma.reviews.deleteMany()
  await prisma.order_items.deleteMany()
  await prisma.orders.deleteMany()
  await prisma.user_roles.deleteMany()
  await prisma.profiles.deleteMany()
  await prisma.promotion_rules.deleteMany()
  await prisma.promotions.deleteMany()
  await prisma.product_variants.deleteMany()
  await prisma.products.deleteMany()
  await prisma.categories.deleteMany()

  const existingUsers = await prisma.users.findMany({
    select: { id: true },
  })

  if (existingUsers.length === 0) {
    console.error(
      'No users found in auth.users table. Please sign up at least one test user in your application before seeding.',
    )
    process.exit(1)
  }
  console.log(
    `Found ${existingUsers.length} existing users to assign reviews to.`,
  )

  const categoriesData = [
    { name: 'Apparel', query: 'fashion clothing' },
    { name: 'Electronics', query: 'modern gadgets' },
    { name: 'Home Goods', query: 'minimalist home decor' },
    { name: 'Books', query: 'books aesthetic' },
    { name: 'Grocery', query: 'Food and Beverages' },
  ]

  for (const cat of categoriesData) {
    console.log(`Fetching images for ${cat.name}...`)
    // Fetch 20 unique, high-quality images for this category
    const imageUrls = await getImages(cat.query, 20)

    const category = await prisma.categories.create({
      data: { name: cat.name },
    })

    console.log(`Creating 20 products for ${cat.name}...`)
    for (let i = 0; i < 20; i++) {
      const product = await prisma.products.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          // Use a different real image for each product
          image_url: imageUrls[i],
          category_id: category.id,
        },
      })
      const numVariants = faker.number.int({ min: 1, max: 5 })
      for (let j = 0; j < numVariants; j++) {
        await prisma.product_variants.create({
          data: {
            product_id: product.id,
            sku: faker.string.alphanumeric(10).toUpperCase(),
            price: parseFloat(faker.commerce.price({ min: 10, max: 200 })),
            image_url: imageUrls[j],
            stock_quantity: faker.number.int({ min: 0, max: 100 }),
          },
        })
      }

      const numReviews = faker.number.int({ min: 0, max: 5 })
      for (let k = 0; k < numReviews; k++) {
        await prisma.reviews.create({
          data: {
            product_id: product.id,
            user_id: faker.helpers.arrayElement(existingUsers).id,
            rating: faker.number.int({ min: 1, max: 5 }),
            comment: faker.lorem.paragraph(),
          },
        })
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
