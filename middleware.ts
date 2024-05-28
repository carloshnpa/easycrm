import {type NextRequest} from 'next/server'
import {updateSession} from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    // update user's auth session
    return await updateSession(request)
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
