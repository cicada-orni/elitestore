export type SignupState = {
  error?: string
  errors?: {
    fullName?: string[]
    email?: string[]
    password?: string[]
    _form?: string[]
  }
  message?: string
}

export type LoginState = {
  error?: string
  errors?: {
    email?: string[]
    password?: string[]
    _form?: string[]
  }
  message?: string
}

// defination for a signle user
export type User = {
  id: string
  email?: string | null
}

// defination for a signle review
export type Review = {
  id: string
  rating: number
  comment?: string | null
  author?: User | null
}

// defination for a signle product variant
export type ProductVariant = {
  id: string
  price: number
  stock_quantity: number
  image_url?: string | null
  sku?: string | null
}

// defination for a single product
export type Product = {
  id: string
  name: string
  price: number
  description?: string | null
  image_url?: string | null
  variants?: ProductVariant[] | null
  reviews?: Review[] | null
}

// defination for all products which return a list of all products
export type ProductsData = {
  allProducts: Product[]
}

// defination for a signle product query
export type ProductData = {
  product: Product
}
