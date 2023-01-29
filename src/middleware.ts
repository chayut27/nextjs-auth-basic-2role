import withAuth from "next-auth/middleware"
// export { default } from "next-auth/middleware"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// export function middleware(req: NextRequest) {
//     if (req.nextUrl.pathname.startsWith("/admin")) {
//         return NextResponse.redirect(new URL('/auth/admin/signin', req.url))
//     }
// }

export default withAuth(
    function middleware(req: NextRequest) {

        if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.user.role !== "admin") {
            return NextResponse.rewrite(new URL('/member/dashboard', req.url))
        }

        if (req.nextUrl.pathname.startsWith("/member") && req.nextauth.token?.user.role !== "member") {
            return NextResponse.rewrite(new URL('/admin/dashboard', req.url))
        }

    },
    {
        callbacks: {
            authorized: ({ token }: any) => !!token
        },
    }
)


export const config = {
    matcher: [
        '/admin',
        '/admin/:path*',

        '/member',
        '/member/:path*'

    ],
}