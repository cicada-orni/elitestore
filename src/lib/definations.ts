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
