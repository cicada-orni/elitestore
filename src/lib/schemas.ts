import { z } from 'zod'

// ----------------------- Create Account Form ---------------------------

// Signup Schema
export const SignupSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters' }),
  email: z.email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

// Login Schema
export const LoginSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password field cannot be empty' }),
})

// ----------------------- Checkout Form ---------------------------

// Shipping Address Schema
export const ShippingAddressSchema = z.object({
  street: z.string().min(1, { message: 'Street Address is required' }),
  city: z.string().min(1, { message: 'City is required.' }),
  postalCode: z.string().min(1, { message: 'Postal code is required.' }),
  country: z.string().min(1, { message: 'Country is required' }),
})

// Billing Address Schema
export const BillingAddressSchema = ShippingAddressSchema

// Payment Method Schema
export const PaymentMethodSchema = z.object({
  cardholderName: z.string().min(1, { message: 'Cardholder name is required' }),
  paymentMethod: z.string().min(1, { message: 'Payment details are required' }),
})
