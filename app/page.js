import Image from "next/image";
import styles from "./page.module.css";
import Background from "@/components/BackgroundImage";
import Navbar from "@/components/Navbar";

export default function Home() {
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

    </main>
  );
}
