'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'

import {createClient} from '@/utils/supabase/server'

type Inputs = {
    email: string
    password: string
    confirm_password: string
}
type InputsLogin = {
    email: string
    password: string
}

export async function login(formData: InputsLogin) {
    const supabase = createClient()
    const data = {
        email: formData.email as string,
        password: formData.password as string,
    }

    const {error} = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/app')
}

export async function signup(formData: Inputs) {
    const supabase = createClient()
    const data = {
        email: formData.email as string,
        password: formData.password as string,
    }

    const {error} = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
