import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function AccountPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Account Page</h1>
      <p className="mt-4">Hello, {data.user.email}</p>
      <p className="mt-2">
        This page is protected and can only be accessed by authenticated users.
      </p>
    </div>
  )
}
