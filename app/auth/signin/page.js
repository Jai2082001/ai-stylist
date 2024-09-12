'use client'
// app/auth/signin/page.js
import { getCsrfToken, signIn } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const SignInPage = () => {

    const [csrfToken, changecsrfToken] = useState()
    const router = useRouter();
    
    useEffect(()=>{
        getCsrfToken().then((response)=>{
            console.log(response)
            changecsrfToken(response)
        })
    }, [])
    
    const [error, setError] = useState('');

    const emailRef = useRef()
    const passwordRef = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = signIn('credentials', {
            redirect: false,
            email: e.target.email.value,
            password: e.target.password.value,
        });

        console.log('Response',await res)

        if (res.error) {
            setError('Invalid email or password.');
        } else {
            // Redirect to home or a success page
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        
        {csrfToken && <input name="csrfToken" defaultValue={csrfToken} />}
            
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default SignInPage;
