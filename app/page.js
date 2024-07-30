import Image from "next/image";
import styles from "./page.module.css";
import backgroundImage from '../public/background/background1 (1).jpg'
import Background from "../components/BackgroundImage";
import Background1 from '../public/background/background1.jpg';
import Background2 from "../public/background/Backgrounds.jpg";
import Background3 from "../public/background/background.jpg";
import Link from "next/link";
import { getServerSession } from "next-auth";


export default async function Home() {

  const session = await getServerSession();


  return (
    <main className={styles.main}>

      <Background>

      </Background>
      <div className={styles.divi}>
        <div className={styles.videoDiv}>
          <video autoPlay muted loop>
            <source
              src="\video.mp4"
              type="video/mp4"
            />
          </video>
          <h2>MEET VIRI<br></br>YOUR VIRTUAL ASSITANT</h2>
          <div className={styles.servicesDiv}>
      
          </div>
        </div>
      </div>
      <div className={styles.parentDiv}>
            <div  className={styles.subParent}>
                <Link href='/ourservices/updatewardrobe' >
                    <div  className={styles.serviceDiv1} style={{backgroundImage: `url("${Background3.src}")`}}>
                        <p>Update your wardrobe.</p>
                    </div>
                </Link>
                <Link href='/ourservices/updatewardrobe'>
                    <div className={styles.serviceDiv1} style={{backgroundImage: `url("${Background2.src}")`}}>
                        <p>Scan yourself and get something new</p>
                    </div>
                </Link>
            </div>
            <div className={styles.subParent} >
                <Link href='/ourservices/updatewardrobe'>
                    <div className={styles.serviceDiv1} style={{backgroundImage: `url("${Background1.src}")`}}>
                        <p>Your todays wardrobe can be !!</p>
                    </div>
                </Link>
                <Link href='/ourservices/updatewardrobe'>
                    <div className={styles.serviceDiv1} style={{backgroundImage: `url("${backgroundImage.src}")`}}>
                        <p>New Additions !!</p>
                    </div>
                </Link>
            </div>
        </div>
    </main>
  );
}
