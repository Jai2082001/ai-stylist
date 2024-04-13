import classes from './page.module.css'
import Link from 'next/link'


const Ourservices = () => {
    return (
        <div className={classes.parentDiv}>
            <div className={classes.subParent}>
                <Link href='/ourservices/updatewardrobe'>
                    <div className={classes.serviceDiv1}>
                        <p>Update your wardrobe.</p>
                    </div>
                </Link>
                <Link href='/ourservices/updatewardrobe'>
                    <div className={classes.serviceDiv1}>
                        <p>Scan yourself and get something new</p>
                    </div>
                </Link>
            </div>
            <div className={classes.subParent}>
                <Link href='/ourservices/updatewardrobe'>
                    <div className={classes.serviceDiv1}>
                        <p>Your todays wardrobe can be !!</p>
                    </div>
                </Link>
                <Link href='/ourservices/updatewardrobe'>
                    <div className={classes.serviceDiv1}>
                        <p>New Stuff for you !!</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Ourservices