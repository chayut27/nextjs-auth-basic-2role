import { useSession, signOut } from "next-auth/react"

export default function Admin() {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
        },
    })

    if (status === "loading") {
        return "Loading or not authenticated..."
    }

    return (
        <>
            <h2>"Admin is logged in"</h2>
            <button className="btn btn-primary" onClick={() => signOut({redirect: true, callbackUrl: "/auth/admin/signin"})}>SignOut</button>
        </>
    )
}