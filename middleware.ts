import {type NextRequest} from 'next/server'
import {updateSession} from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    // update user's auth session
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
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
