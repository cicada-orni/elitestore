import { Button } from '@/components/ui/atoms/button'
import { Input } from '@/components/ui/atoms/input'
import { login } from './actions'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-950">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-50">
            Sign in
          </h2>
        </div>
        <form className="mt-8 space-y-6" action={login}>
          <div className="space-y-4 rounded-md">
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
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>

        {/* --- ADD THIS SECTION --- */}
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
