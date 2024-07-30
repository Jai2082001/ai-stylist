import classes from './Navbar.module.css'
import Header from './Header'
import { SessionProvider } from 'next-auth/react'

const Navbar = () => {

    const changeContainer = (e) => {
        
        
    }

    return (
        <SessionProvider>
        <div className={classes.navbarContainer}>
            <button id='1' onMouseOver={changeContainer} className={classes.menuItem}>Who are we </button><span className={classes.span1}></span>
            <button id='2' onMouseOver={changeContainer} className={classes.menuItem}>How it works</button><span className={classes.span1}></span>
            <button id='3' onMouseOver={changeContainer} className={classes.menuItem}>Look at our clients</button>
        </div>
        </SessionProvider>
    )
}

export default Navbar;