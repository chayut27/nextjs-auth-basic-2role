import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: "admin-login",
            name: 'Credentials',
            credentials: {},
            authorize(credentials, req) {
                const { username, password } = credentials as {
                    username: string,
                    password: string,
                };
                // validate here your username and password
                if (username !== 'admin' && password !== "123456") {
                    throw new Error('invalid credentials');
                }

                const user = { id: "1", name: "John Doe", username: "admin", role: "admin" };

                // confirmed users
                return user

            }
        }),
        CredentialsProvider({
            id: "member-login",
            name: 'Credentials',
            credentials: {},
            authorize(credentials, req) {
                const { phone, password } = credentials as {
                    phone: string,
                    password: string,
                };
                // validate here your phone and password
                if (phone !== 'member' && password !== "123456") {
                    throw new Error('invalid credentials');
                }

                const user = { id: "1", name: "John Doe", phone: "0922380006", role: "member" }

                // confirmed users
                return user

            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt({ token, user }: any) {
            if (user) {
                token.user = user
            }

            return token
        },
        session({ session, token }: any) {
            session.user = token.user
            return session
        }
    },
    pages: {
        signIn: '/auth/[role]/signin',
    },
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "red", // Hex color code
        logo: "", // Absolute URL to image
        buttonText: "hello" // Hex color code
    },
    debug: process.env.NODE_ENV === "development",
})
