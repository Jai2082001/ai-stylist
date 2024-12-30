'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import classes from './BackgroundImage.module.css'
import img1 from './images/img1.jpg'
import img2 from './images/img2.jpg'
import img3 from './images/img3.jpg'
import img4 from './images/img4.jpg'
import AnimatedText from './AnimatedText'
import Navbar from "./Navbar"



const Background = () => {
    const [path, setPath] = useState(0)

    const imgArray = [img1, img2, img3, img4];

    console.log(path)

    useEffect(() => {
        console.log('Back')
        console.log(path)

        let a = setInterval(() => {
            console.log('here', path)
            setPath((prev) => {
                console.log(prev)
                if (prev >= 3) {
                    return 0
                } else {
                    let newPrev = prev
                    return newPrev + 1;
                }
            })
        }, 3000)


        return () => {
            clearInterval(a);
        }
    }, [])

    return (

        <div className={classes.imgStyles} style={{ backgroundImage: `url(${imgArray[path].src})` }}>
            <div className={classes.overlay}></div>

            {/* <div className={classes.text2}>
                    <p className={classes.assitant}> Your assitant</p>
                    <p className={classes.stylist}>Your stylist</p>
                    <p className={classes.friend}>Your Fashion Friend</p>
                    <p className={classes.viri}>This is viri</p>
                    <p className={classes.before}>.</p>
                </div>
                {/* <div className={classes.imgBack} , width: '100%', height: '100%'}}> </div> */}
            <div className={classes.text2}>
                <AnimatedText>

                </AnimatedText>
                Scroll Down To Try out our Product
            </div>
        </div>
    )

}

export default Background