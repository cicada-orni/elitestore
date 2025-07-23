import { gql } from 'graphql-request'
// Query for getting single product by id
export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      description
      image_url
      price
      variants {
        id
        price
        stock_quantity
        image_url
        sku
      }
      reviews {
        id
        rating
        comment
        author {
          id
          email
        }
      }
    }
  }
`
