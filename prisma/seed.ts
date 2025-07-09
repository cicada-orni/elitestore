import { PrismaClient } from '../src/generated/prisma'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  await prisma.order_items.deleteMany()
  await prisma.orders.deleteMany()
  await prisma.user_roles.deleteMany()
  await prisma.profiles.deleteMany()
  await prisma.promotion_rules.deleteMany()
  await prisma.promotions.deleteMany()
  await prisma.product_variants.deleteMany()
  await prisma.products.deleteMany()
  await prisma.categories.deleteMany()

  const categories = await prisma.categories.createManyAndReturn({
    data: [
      { name: 'Apparel', description: 'Clothing and fashion items.' },
      { name: 'Electronics', description: 'Gadgets and electronic devices.' },
      { name: 'Home Goods', description: 'Items for your home and garden.' },
      { name: 'Books', description: 'Printed and digital books.' },
    ],
  })

  for (const category of categories) {
    for (let i = 0; i < 20; i++) {
      const product = await prisma.products.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          category_id: category.id,
        },
      })

      const numVariants = faker.number.int({ min: 1, max: 5 })
      for (let j = 0; j < numVariants; j++) {
        await prisma.product_variants.create({
          data: {
            product_id: product.id,
            sku: faker.string.alphanumeric(10).toUpperCase(),
            price: parseFloat(faker.commerce.price()),
            stock_quantity: faker.number.int({ min: 0, max: 100 }),
            attributes: {
              color: faker.color.human(),
              size: faker.helpers.arrayElement(['XS', 'S', 'M', 'L', 'XL']),
            },
          },
        })
      }
    }
  }
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
