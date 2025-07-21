// import { gql } from 'graphql-tag'

// export const typeDefs = gql`
//   #OBJECT TYPES
//   type Product {
//     id: ID!
//     name: String!
//     description: String
//     image_url: String
//     price: Float!
//   }

//   #ENTRY POINTS
//   type Query {
//     product(id: ID!): Product
//     allProducts: [Product!]
//   }
// `

import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type ProductVariant {
    id: ID!
    price: Float!
    stock_quantity: Int!
    image_url: String
    sku: String!
  }

  type Product {
    id: ID!
    name: String!
    description: String
    image_url: String
    price: Float!
    variants: [ProductVariant!]
  }

  type Query {
    product(id: ID!): Product
    allProducts: [Product!]
  }
`
