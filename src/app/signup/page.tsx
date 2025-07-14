'use client'
import { useActionState } from 'react'
import { Button } from '@/components/ui/atoms/button'
import { Input } from '@/components/ui/atoms/input'
import { signup } from './actions'
import { SignupState } from '@/lib/definations'
import Link from 'next/link'

const initialState: SignupState = {
  message: '',
}

export default function SignupPage() {
  const [state, formAction] = useActionState(signup, initialState)
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-950">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50">
            Create a new account
          </h2>
        </div>
        {/* The form now points to the signup action file we will create next */}
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="full_name" className="sr-only">
                Full Name
              </label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                autoComplete="name"
                required
                placeholder="Full Name"
                aria-invalid={!!state.errors?.fullName}
              />
              {state.errors?.fullName && (
                <p className="mt-1 text-xs text-red-500">
                  {state.errors.fullName.join(', ')}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                aria-invalid={!!state.errors?.email}
              />
              {state.errors?.email && (
                <p className="mt-1 text-xs text-red-500">
                  {state.errors.email.join(', ')}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Password"
                aria-invalid={!!state.errors?.password}
              />
              {state.errors?.password && (
                <p className="mt-1 text-xs text-red-500">
                  {state.errors.password.join(', ')}
                </p>
              )}
            </div>
            {state.errors?._form && (
              <div
                className="rounded-md border border-red-400 bg-red-50 p-4"
                aria-live="polite"
              >
                <p className="text-sm text-red-600">
                  {state.errors._form.join(', ')}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
