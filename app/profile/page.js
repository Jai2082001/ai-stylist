import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import styles from './page.module.css'
import SignOutBtn from '../../components/SignOut/SignOutBtn'
const Profile  = async () => {


    const session  = getServerSession();
    let response = await session;
    let user;
    if(response){
        user = response.user
    }
    if (!response){
        
        redirect('/api/auth/signin')  
    }

    return (
        <>
            <div className={styles.parentDiv}>
                <div className={styles.subParent}>
                    <h3>Hello {user.name}</h3>
                    <h2>The Linked Email to this Account is {user.email}</h2>
                    <SignOutBtn></SignOutBtn>
                </div>
            </div>  
        
        </>
    )
}

export default Profile;