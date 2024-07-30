'use client'

import classes from './page.module.css'
import { useRef } from 'react'
import {addUser} from '../../lib/actions';

const app =  () => {

    const username = useRef();
    const name = useRef();
    const email = useRef();
    const password = useRef();


    const signup = ( ) => {
        const user = username.current.value;
        const name1 = name.current.value;
        const email1 = email.current.value;
        const password1 = password.current.value 

        let data = {username:user, name: name1, email: email1, password: password1};

        addUser(data)
    }

    return (
        <div>
            <div className={classes.parentDiv}>
                <div className={classes.subdiv}>
                    <label>Username</label>
                    <input ref={username} placeholder='Username'></input>
                </div>
                <div className={classes.subdiv}>
                    <label>Name</label>
                    <input ref={name} placeholder='Name'></input>
                </div>
                <div className={classes.subdiv}>
                    <label>Email</label>
                    <input ref={email} placeholder='Email'></input>
                </div>
                <div className={classes.subdiv}>
                    <label>Password</label>
                    <input ref={password} placeholder='Password'></input>
                </div>
                <div className={classes.subdiv}>
                    <button onClick={signup}>Sign up</button>
                </div>
            </div>
        </div>
    )
}
export default app;