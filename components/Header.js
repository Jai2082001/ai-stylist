'use client'
import { signIn, signOut, useSession,  } from "next-auth/react"
import Navbar from "./Navbar";
const Header = () => {

    return (
        <div>

            {/* <button onClick={()=>{signIn()}}>Sign in</button>
            <button onClick={()=>{signOut()}}>Sign out</button> */}
            <Navbar></Navbar>
            {/* {JSON.stringify(session)} */}

        </div>
    )
}

export default Header