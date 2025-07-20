import { gql } from 'graphql-tag'

export const typeDefs = gql`
  #OBJECT TYPES
  type Product {
    id: ID!
    name: String!
    description: String
    image_url: String
    price: Float!
  }

  #ENTRY POINTS
  type Query {
    product(id: ID!): Product
    allProducts: [Product!]
  }
`
