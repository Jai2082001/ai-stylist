'use client'

import classes from './page.module.css'
import Webcam from 'react-webcam'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FMnistData, combinedFunction } from '@/lib/training-dataset'
import { run, init } from '@/lib/using-dataset';
import Loading from '@/components/Loading'
import Feedback from '@/components/FeedbackItem'
import { Toaster } from 'react-hot-toast'

const Page = () => {

    const [dataModel, changeDataModel] = useState(false)
    const [loading, changeLoading] = useState(false);
    const [option, changeOption] = useState('Trouser');
    const [webcamLoading, changewebcamLoading] = useState(false);
    const [feedback, changeFeedback] = useState(false)
    const [data, changeData] = useState(false);



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

    // const selectRef = useRef();
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


            // // console.log(imageClassificationFunction(imageSrc, dataModel))
            // // console.log(classificationFunction(imageSrc, dataModel));


            fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBwN1cF1q5IlOt09dswDIOv56Lo68B3TLs', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        "requests": [
                            {
                                "image": {
                                    "content": base64
                                },
                                "features": [
                                    {
                                        "type": "IMAGE_PROPERTIES"
                                    }
                                ]
                            }
                        ]
                    }

                ),
                headers: {
                    'Content-Type': 'application/json'
                }


            }).then((response) => {
                return response.json();
            }).then((response) => {
                console.log(response)
                const googleResponse = response.responses[0].imagePropertiesAnnotation.dominantColors.colors
                changeData({ profileId: '001', type: returnedSource, image: imageSrc, dominantColors: googleResponse[0].color })
            })



            // }


        },
        [webcamRef]
    )
    console.log(option.localeCompare('Shirt') == 0)
    // console.log(option)

    // const videoConstraints = {
    //     width: { min: 480 },
    //     height: { min: 720 },
    //     aspectRatio: 0.66666667
    // }

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
                        {/* <div className={classes.option}
                        style={(option.localeCompare('Trouser') == 0) ? { backgroundColor: "#3f3f3f" } : { backgroundColor: 'black' }}
                        onClick={() => {
                            changeOption((prev) => {
                                return 'Trouser'
                            })
                        }}
                    >
                        Trouser
                    </div>
                    <div className={classes.option}
                        style={(option.localeCompare('Shirt') == 0)  ? { backgroundColor:"#3f3f3f" } : { backgroundColor: 'black' }}
                        onClick={() => {
                            changeOption((prev) => {
                                return 'Shirt'
                            })
                        }}
                    >
                        Shirt
                    </div>
                    <div className={classes.option}
                        style={(option.localeCompare('Coat') == 0) ? { backgroundColor: "#3f3f3f"} : { backgroundColor: 'black' }}
                        onClick={() => {
                            changeOption(() => {
                                return 'Coat'
                            })
                        }}
                    >
                       Coat
                    </div>
                    <div className={classes.option}
                        style={(option.localeCompare('T-shirt/top') == 0) ? { backgroundColor: "#3f3f3f" } : { backgroundColor: 'black' }}
                        onClick={() => {
                            changeOption(() => {
                                return 'T-shirt/top'
                            })
                        }}
                    >
                        TShirt
                    </div>
                    <div className={classes.option}
                        style={(option.localeCompare('Pullover') == 0)  ? { backgroundColor: "#3f3f3f" } : { backgroundColor: 'black' }}
                        onClick={() => {
                            changeOption(() => {
                                return 'Pullover'
                            })
                        }}
                    >
                        Pullover
                    </div> */}
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
                    {/* {option == 'Trouser' &&
                
                        <Image alt="jeans" src={jeans_outline}></Image>
                    </div>
                }
                {option == 'Shirt' &&
                    <div className={classes.dressFrame}>
                        <div className={classes.coverDivDress1}></div>
                        <Webcam
                            ref={webcamRef}
                            style={{
                                position: 'absolute',
                                zindex: 0,
                                background: 'none'
                            }}
                        >
                        </Webcam>
                        <Image alt="Shirt" src={tshirt_use}></Image>
                        <div className={classes.coverDivDress2}></div>

                    </div>
                }
                {option == 'Coat' &&
                    <div className={classes.coatFrame}>
                        <Webcam
                            ref={webcamRef}
                            style={{
                                position: 'absolute',
                                zindex: 0,
                                background: 'none'
                            }}
                        >
                        </Webcam>
                        <Image alt="Coat" src={jacket}></Image>
                    </div>
                }

                {
                    option == 'T-shirt/top' &&
                    <div className={classes.shirtFrame}>
                        <Webcam
                            ref={webcamRef}
                            style={{
                                position: 'absolute',
                                zindex: 0,
                                background: 'none'
                            }}
                        >

                        </Webcam>
                        <Image alt="Tshirt" src={tshirt_use}></Image>
                    </div>
                }
                {
                    option == 'Pullover' &&
                    <div className={classes.shirtFrame}>
                        <Webcam
                            ref={webcamRef}
                            style={{
                                position: 'absolute',
                                zindex: 0,
                                background: 'none'
                            }}
                        >

                        </Webcam>
                        <Image alt="Pullover" src={tshirt_use}></Image>
                    </div>
                } */}

                    {/* <div className={classes.sneakerFrame}>

                </div>
                <div className={classes.bagFrame}>

                </div> */}

                </div>
            </div>}
    </>

    )
}

export default Page