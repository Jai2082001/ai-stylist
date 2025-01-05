'use client'
import Image from "next/image";
import styles from "./page.module.css";
import backgroundImage from '../public/background/background1 (1).jpg'
import Background from "../components/BackgroundImage";
import Background1 from '../public/background/background1.jpg';
import Background2 from "../public/background/Backgrounds.jpg";
import Background3 from "../public/background/background.jpg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import Navbar from "../components/Navbar";


export default function Home() {

  const router = useRouter();
  const buttonHandler=(e)=>{
    console.log(e.target.id);

    if(e.target.id == 'wardrobe'){
      router.push('/ourservices/outfits');
    }else if(e.target.id == 'scan'){
      router.push('/ourservices/updatewardrobe');
    }else if(e.target.id == 'face'){
      router.push('/newstylist')
    }
  }
  return (
    <main className={styles.main}>


      <Background>

      </Background>
      

      <div className="grid grid-cols-2 grid-rows-3 gap-4 mt-9" style={{width: '100%'}} >
    
    
        <div onClick={buttonHandler} id="wardrobe" className="border-solid border-2 border-black bg-grey cursor-pointer  row-span-2 grid-cols rounded-lg p-6 text-center" style={{backgroundImage: `url("${Background3.src}")`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
          <h3 className="text-4xl text-white font-bold mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Check Your Saved wardrobe</h3>
        </div>
    
        <div onClick={buttonHandler} id="face" className="border-solid border-2 border-black bg-grey  cursor-pointer rounded-lg p-6 text-center" style={{backgroundImage: `url("${Background2.src}")`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
          <h3 className="text-4xl text-white font-semibold mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" >Get Recommendations for Face and Hairstyles</h3>
        </div>
        <div onClick={buttonHandler} id='wardrobe' className="border-solid border-2 border-black bg-grey cursor-pointer  row-span-2 rounded-lg p-6 text-center" style={{backgroundImage: `url("${Background1.src}")`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
          <h3 className="text-4xl text-white font-semibold mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Check the Outfits in your Wardrobe</h3>
        </div>
        <div onClick={buttonHandler} id='scan' className="border-solid border-2 border-black bg-grey cursor-pointer  rounded-lg p-6 text-center" style={{backgroundImage: `url("${backgroundImage.src}")`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
          <h3 className="text-4xl text-white font-semibold mb-9  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Scan a new item for your wardrobe</h3>
        </div>
      </div>

      <div className={styles.divi}>
        <div className={styles.videoDiv}>
          <video autoPlay muted loop>
            <source
              src="/video.mp4"
              type="video/mp4"
            />
          </video>
          <h2>More To<br></br>Come</h2>
          <div className={styles.servicesDiv}>

          </div>
        </div>
      </div>

      {/* <div className={styles.parentDiv}>
        <div className={styles.subParent}>
          <Link href='/ourservices/updatewardrobe'>
            <div className={styles.serviceDiv1} style={minWidth}>
              <p className={styles.serviceText}>Update your wardrobe.</p>
            </div>
          </Link>
          <Link href='/ourservices/updatewardrobe'>
            <div className={styles.serviceDiv1} style={{ backgroundImage: `url("${Background2.src}")` }}>
              <p className={styles.serviceText}>Scan yourself and get something new</p>
            </div>
          </Link>
        </div>
        <div className={styles.subParent}>
          <Link href='/ourservices/updatewardrobe'>
            <div className={styles.serviceDiv1} style={{ backgroundImage: `url("${Background1.src}")` }}>
              <p className={styles.serviceText}>Your todays wardrobe can be !!</p>
            </div>
          </Link>
          <Link href='/ourservices/updatewardrobe'>
            <div className={styles.serviceDiv1} style={{ backgroundImage: `url("${backgroundImage.src}")` }}>
              <p className={styles.serviceText}>New Additions !!</p>
            </div>
          </Link>
        </div>
      </div> */}
    </main>
  );
}
