'use client'

import { signOut } from "next-auth/react"
import styles from './SignOut.module.css'
const SignOutBtn = () => {
    return (
        <h3 className={styles.deleteAccount} onClick={()=>{signOut()}}>Delete this Account</h3>
    )
}

export default SignOutBtn