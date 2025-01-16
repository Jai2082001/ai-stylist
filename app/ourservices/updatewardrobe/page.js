'use client'

import classes from './page.module.css'
import Webcam from 'react-webcam'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FMnistData, combinedFunction } from '../../../lib/training-dataset'
import { run, init } from '../../../lib/using-dataset';
import Loading from '../../../components/Loading'
import Feedback from '../../../components/FeedbackItem'
import { useSession } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
const Page = () => {

    const [dataModel, changeDataModel] = useState(false)
    const [loading, changeLoading] = useState(false);
    const [option, changeOption] = useState('Trouser');
    const [webcamLoading, changewebcamLoading] = useState(false);
    const [feedback, changeFeedback] = useState(false);
    const userData = useSession()
    const [data, changeData] = useState(false);

    console.log(data)
    const asyncUseEffectFunc = async () => {
        changeLoading(true)

        const data = new FMnistData();
        await data.load();
        run(data);
        changeLoading(false)

    }
    const webcamRef = useRef();

    useEffect(() => {

        asyncUseEffectFunc();

    }, [])

    const capture = useCallback(

        async () => {
            changeFeedback(true);
            function dataURLToBase64(dataURL) {
                // Extract base64 part of the data URL
                var base64String = dataURL.split(',')[1];
                return base64String;
            }

            const imageSrc = webcamRef.current.getScreenshot();

            const returnedSource = await init(imageSrc);

            console.log(returnedSource)
            // if (returnedSource == option) {
            console.log('Sending')

            let base64 = dataURLToBase64(imageSrc)
            function rgbToHex(r, g, b) {
                return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
            }

            function hexToRgb(hex) {
                hex = hex.slice(1)
                
                if (hex.length !== 3 && hex.length !== 6) {
                  throw new Error('Invalid HEX color code length.');
                }
              
                const red = parseInt(hex.slice(0, 2), 16);
                const green = parseInt(hex.slice(2, 4), 16);
                const blue = parseInt(hex.slice(4, 6), 16);
              
                return { red, green, blue };
              }

            const image = new Image();
            image.src = imageSrc;
            image.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
    
                canvas.width = image.width;
                canvas.height = image.height;
    
                ctx.drawImage(image, 0, 0)
    
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
    
                const colorMap = {};
                for (let i = 0; i < pixels.length; i += 4) {
                    const color = rgbToHex(pixels[i], pixels[i + 1], pixels[i + 2]);
                    if (!colorMap[color]) {
                        colorMap[color] = 0;
                    }
                    colorMap[color]++;
                }
    
                let dominantColor = null;
                let maxCount = 0;
                for (const color in colorMap) {
                    if (colorMap[color] > maxCount) {
                        maxCount = colorMap[color];
                        dominantColor = color;
                    }
                }
    
                changeData({type: returnedSource, image: imageSrc, dominantColors: hexToRgb(dominantColor), userdata: data.user})
            }    

    
        },
        [webcamRef]
    )
    
 

    return (<>
        {loading && <Loading></Loading>}
        {!loading &&

            <div className={feedback && classes.positionBackground}>
                <Toaster></Toaster>
                {feedback && <div className={classes.outlay}></div>}
                {feedback && <Feedback changeFeedback={changeFeedback} data={data}></Feedback>}
                <div className={classes.uploadCamera}>
                    <p>Upload your wardrobe and get the recommendations</p>
                    <button className={classes.captureBtn} onClick={capture}>Capture Photo</button>

                    <div className={classes.optionsDiv}>
                        
                    </div>

                    <div className={classes.jeansFrame}>

                        <Webcam
                            ref={webcamRef}
                            style={{
                                position: 'absolute',
                                zindex: 0,
                                background: 'none'
                            }}
                        >
                        </Webcam>
                    </div>
                   

                </div>
            </div>}
    </>

    )
}

export default Page