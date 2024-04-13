'use client'

import classes from './page.module.css'
import Webcam from 'react-webcam'
import { useCallback, useRef } from 'react'

import {classificationFunction} from '@/lib/using-dataset';

const Page = () => {

    const webcamRef = useRef();
    const capture = useCallback(
        ()=>{
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc)
            console.log(imageClassificationFunction(imageSrc))
        },
        [webcamRef]
    )
    
    const imageClassificationFunction = (imageSrc) => {
        console.log('Initated')
        console.log(classificationFunction(imageSrc))
    }

    return (
        <div className={classes.uploadCamera}>
            <p>Upload your wardroe and get the recommendations</p>
            <select>
                <option>Torso</option>
                <option>Shoes</option>
                <option>Trouser</option>
                <option>Bag</option>
            </select>
            
            <Webcam
            ref={webcamRef}
            style={{
                position: "absolute",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                textAlign: "center",
                zindex: 9,
                width: 640,
                height: 480,
            }}
            >
                <div className={classes.jeansFrame}>

                </div>
                <div className={classes.dressFrame}>

                </div>
                <div className={classes.coatFrame}>

                </div>
                <div className={classes.sandalFrame}>

                </div>
                <div className={classes.shirtFrame}>

                </div>
                <div className={classes.sneakerFrame}>

                </div>
                <div className={classes.bagFrame}>

                </div>
                
            </Webcam>

            <button onClick={capture}>Capture Photo</button>
           
        </div>
    )
}

export default Page