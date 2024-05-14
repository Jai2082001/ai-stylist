import classes from './profile.module.css'

const Profile = () => {

    return (
        <header className={classes.header}>
            <div className={classes.subHeader}>
                <div className={classes.name}>Hello Jaideep</div>
                <div className={classes.functions}>
                    <div>
                        Your Wardrobe
                    </div>
                    <div>
                        Your Facescans
                    </div>
                    <div>
                        Suggested Products
                    </div>
                    <div>
                        Your OOTD
                    </div>
                </div>
            </div>
        </header>
    )

}

export default Profile;