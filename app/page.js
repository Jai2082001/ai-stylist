'use client'
import Image from "next/image";
import styles from "./page.module.css";
import backgroundImage from '../public/background/background1 (1).jpg'
import Background from "../components/BackgroundImage";
import Background1 from '../public/background/background1.jpg';
import Background2 from "../public/background/Backgrounds.jpg";
import Background3 from "../public/background/background.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import Navbar from "../components/Navbar";
import Loading from "@/components/Loading";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogOverlay,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function Home() {

  const [loading, changeLoading] = useState(false);

  const router = useRouter();
  const buttonHandler = (e) => {
    console.log(e.target.id);
    if (e.target.id == 'wardrobe') {
      router.push('/ourservices/outfits');
    } else if (e.target.id == 'scan') {
      router.push('/ourservices/updatewardrobe');
    } else if (e.target.id == 'face') {
      router.push('/newstylist')
    }
  }
  return (
    <AlertDialog>
      <main className={styles.main}>
        <AlertDialogOverlay><Loading></Loading></AlertDialogOverlay>
        <Background>

        </Background>


        <div className="grid sm:grid-cols-2 sm:grid-rows-3 gap-4 mt-9" style={{ width: '100%' }} >


          <div className="border-solid border-2 border-black bg-grey cursor-pointer sm:row-span-2 sm:m-0 m-2 grid-cols rounded-lg sm:p-6 text-center" style={{ backgroundImage: `url("${Background3.src}")`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <h3 className="text-4xl text-white font-bold mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Check Your Saved wardrobe</h3>
            <AlertDialogTrigger asChild>
              <Button id="wardrobe" onClick={buttonHandler}>Check it out</Button>
            </AlertDialogTrigger>
          </div>

          <div onClick={buttonHandler} className="border-solid border-2 border-black bg-grey  cursor-pointer rounded-lg sm:p-6 sm:m-0 m-2 text-center" style={{ backgroundImage: `url("${Background2.src}")`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <h3 className="text-4xl text-white font-semibold mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" >Get Recommendations for Face and Hairstyles</h3>
            <AlertDialogTrigger asChild>
              <Button onClick={buttonHandler} id="face">Check it out</Button>
            </AlertDialogTrigger>
          </div>
          <div onClick={buttonHandler} className="border-solid border-2 border-black bg-grey cursor-pointer  sm:row-span-2 sm:m-0 m-2 rounded-lg sm:p-6 text-center" style={{ backgroundImage: `url("${Background1.src}")`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <h3 className="text-4xl text-white font-semibold mb-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Check the Outfits in your Wardrobe</h3>
            <AlertDialogTrigger asChild>
              <Button onClick={buttonHandler} id='wardrobe'>Check it out</Button>
            </AlertDialogTrigger>
          </div>
          <div onClick={buttonHandler} className="border-solid border-2 border-black bg-grey cursor-pointer  rounded-lg sm:p-6 m-2 sm:m-0 text-center" style={{ backgroundImage: `url("${backgroundImage.src}")`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <h3 className="text-4xl text-white font-semibold mb-9  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Scan a new item for your wardrobe</h3>

            <AlertDialogTrigger asChild>
              <Button onClick={buttonHandler} id='scan'>Check it out</Button>
            </AlertDialogTrigger>
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


      </main>

    </AlertDialog>
  );
}
