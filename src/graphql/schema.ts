import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String
  }

  type Review {
    id: ID!
    rating: Int!
    comment: String
    author: User
  }

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
    reviews: [Review!]
  }

  input ReviewInput {
    product_id: ID!
    rating: Int!
    comment: String
  }

  # -- ENTRY POINTS  --
  type Query {
    product(id: ID!): Product
    allProducts: [Product!]
  }

  type Mutation {
    submitReview(input: ReviewInput!): Review
  }
`
