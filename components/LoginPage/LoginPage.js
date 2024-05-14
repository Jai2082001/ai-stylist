'use client'

import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';





const Button = ({ clickHandler }) => {
    const app = initializeApp({
        apiKey: "AIzaSyBwN1cF1q5IlOt09dswDIOv56Lo68B3TLs",
        authDomain: "nodal-condition-420221.firebaseapp.com",
        projectId: "nodal-condition-420221",
        storageBucket: "nodal-condition-420221.appspot.com",
        messagingSenderId: "787244230132",
        appId: "1:787244230132:web:4db7b8c7d23b7d92ba05a1"
    });
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider
    let obj = {}
    // const GoogleAuthFunction = new Promise((resolve, reject) => {
    //     // ...

    //     }).catch((error) => {
    //         // Handle Errors here.
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // The email of the user's account used.
    //         const email = error.customData.email;
    //         // The AuthCredential type that was used.
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //     })

    // })

    return (
        <div>
            <GoogleLoginButton onClick={async () => {
                


                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // console.log(token)

                // // The signed-in user info.
                // const user = result.user;

                // console.log(user)

                // obj = { token: token, user: user };
                // const data = {
                //     name: 'Los Angeles',
                //     state: 'CA',
                //     country: 'USA'
                // };
                
                // // Add a new document in collection "cities" with ID 'LA'
                // const res = await db.collection('jaideep').doc('1A').set(data);
                // console.log(res)

                // IdP data available using getAdditionalUserInfo(result)


            }}></GoogleLoginButton>
            <FacebookLoginButton></FacebookLoginButton>
        </div>
    )


}

export default Button