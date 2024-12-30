'use client'
import classes from './Navbar.module.css'
import Header from './Header'
import { signIn, useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const Navbar = () => {
    const { data: session } = useSession();

    const router = useRouter();

    const buttonHandler = (e) => {
        if (e.target.id == '5') {
            router.push('/')
        } else if (e.target.id == '1') {
            router.push('/intro')
        } else if (e.target.id == '3') {
            router.push('/')
        } else {
            router.push('/profile')
        }
    }

    return (
        <div className={classes.navbarContainer}>
            <button id='5' onClick={buttonHandler} className={classes.menuItem}>Home</button>
            <button id='1' onClick={buttonHandler} className={classes.menuItem}>What is this ? </button>
            <button id='3' onClick={buttonHandler} className={classes.menuItem}>Who made this ?</button>
            {session && <button id='4' onClick={buttonHandler} className={classes.menuItem}>Check your profile</button>}
            {session && <button id='2' className={classes.menuItem} onClick={() => { signOut() }}>Logout</button>}
            {!session && <button id='2' className={classes.menuItem} onClick={() => { signIn() }}>Login</button>}
        </div>
    )
}

export default Navbar;