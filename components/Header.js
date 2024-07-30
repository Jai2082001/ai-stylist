'use client'
import { signIn, signOut, useSession,  } from "next-auth/react"
const Header = () => {
    const session = useSession();

    return (
        <div>

            <button onClick={()=>{signIn()}}>Sign in</button>
            <button onClick={()=>{signOut()}}>Sign out</button>
            {JSON.stringify(session)}

        </div>
    )
}

export default Header