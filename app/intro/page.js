'use client'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
const Intro = () => {

    const router = useRouter();

    const buttonHandler = () => {
        router.push('/')
    }

    return (
        <div className={styles.pageDiv}>
            <div className={styles.parentDiv}>
                <div className={styles.intro}>
                    Welcome to Vir Styling Assistant!
                    <p>Discover a world where fashion meets innovation! Vir Styling Assistant brings cutting-edge AI technology to your fingertips, helping you make smarter, more stylish wardrobe decisions effortlessly.</p>
                </div>
                <p>
                    What Makes Us Different?
                </p>
                <div className={styles.features}>

                    <p>
                        💡 AI-Powered Insights<br></br>
                        We use advanced machine learning models trained on the Fashion MNIST dataset to accurately classify .
                    </p>
                    <p>
                        🌟 Personalized Recommendations<br></br>
                        Your style is unique, and so are our suggestions.
                    </p>
                    <p>
                        📸 Interactive User Experience<br></br>
                        Snap photos of your clothes, and let Vir Styling Assistant do the rest.
                    </p>
                </div>
               <button onClick={buttonHandler}>Try it out!</button>
            </div>
        </div>
    )
}

export default Intro