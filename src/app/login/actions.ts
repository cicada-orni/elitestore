'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { LoginSchema } from '@/lib/schemas'
import { LoginState } from '@/lib/definations'

export async function login(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const supabase = await createClient()

  const rawData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const validation = LoginSchema.safeParse(rawData)
  if (!validation.success) {
    const fieldErrors = z.flattenError(validation.error).fieldErrors
    return {
      error: 'Invalid form data',
      errors: fieldErrors,
    }
  }

  const { email, password } = validation.data
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    return {
      error: 'Log in failed',
      errors: { _form: [error.message] },
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
