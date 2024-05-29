import {type NextRequest, NextResponse} from 'next/server'
import {updateSession} from '@/utils/supabase/middleware'
import {createClient} from "@/utils/supabase/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = await createClient()
    const {
        data: {session},
    } = await supabase.auth.getSession()
    if (!session && req.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    } else if (session && req.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/app', req.nextUrl))
    } else if (session && req.nextUrl.pathname.includes('/app')) {
        const profile = await supabase.from('profiles').select().maybeSingle()

        if (!profile?.data?.company_id) {
            if (req.nextUrl.pathname !== '/app/onboarding')
                return NextResponse.redirect(new URL('/app/onboarding', req.nextUrl))
        } else {
            if (req.nextUrl.pathname === '/app/onboarding')
                return NextResponse.redirect(new URL('/app', req.nextUrl))
        }
    }

    await updateSession(req)
    return res
}

export const config = {
    matcher: [

        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
        '/login',
        '/app',
    ],
}
// import type {NextRequest} from "next/server";
// import  {NextResponse} from "next/server";
// import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";
// import {cookies} from "next/headers";
// export async function middleware(req: NextRequest){
//
//     // const res = NextResponse.next()
//     // try {
//     //     const supabase = createMiddlewareClient({req,res})
//     //     await supabase.auth.getSession()
//     // } catch (err) {
//     //     console.error("Middleware", err)
//     // }
//     // return res
// }
