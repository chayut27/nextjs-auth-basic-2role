import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            id: number
            role: string
            access_token: string
            accessToken: string
        } & DefaultSession["user"]
    }

    interface JWT {
        /** OpenID ID Token */
        idToken?: string
        user: {
            id: number
            role: string
            access_token: string
            accessToken: string
        }

    }
}