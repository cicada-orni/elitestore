'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { SignupSchema } from '@/lib/schemas'
import { SignupState } from '@/lib/definations'
import { z } from 'zod'

export async function signup(
  prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const supabase = await createClient()

  const rawData = {
    fullName: formData.get('full_name'),
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const validation = SignupSchema.safeParse(rawData)

  if (!validation.success) {
    const fieldErrors = z.flattenError(validation.error).fieldErrors
    return {
      error: 'Invalid form data. Please check the fields and try again',
      errors: fieldErrors,
    }
  }

  const { fullName, email, password } = validation.data

  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (signUpError) {
    return {
      error: 'Could not authenticate user.',
      errors: { _form: [signUpError.message] },
    }
  }
  revalidatePath('/', 'layout')
  redirect('/login?message=Check email to continue sign in process')
}
