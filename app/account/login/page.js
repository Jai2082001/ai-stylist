// 'use client'
import styles from './login.module.css'
// import { addUsers } from '@/lib/actions';
import Button from '../../../components/LoginPage/LoginPage';




const Login = () => {
    async function clickHandler(user){
        'use server'
        console.log('UserSide', user)
    }


    return (
        <div className={styles.parentDiv}>
            <div className={styles.profileDiv}>
                <div className={styles.inputDiv}>
                    <div className={styles.profile}>
                        <label>Email/Username:</label><br></br>
                        <input />
                    </div>
                    <div className={styles.profile}>
                        <label>Password:</label><br></br>
                        <input />
                    </div>

                    <button>Submit</button>
                </div>
                {/* <form action={GoogleAuthFunction}> */}
                    <div className={styles.outsideParty}>
                        {/* <form action={addUsers}>
                        <button type='submit' >Sign in with google</button>
                        </form> */}

                        <Button clickHandler={clickHandler}></Button>
                        {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}></StyledFirebaseAuth> */}
                    </div>
                {/* </form> */}
            </div>
        </div>
    )
}

export default Login;