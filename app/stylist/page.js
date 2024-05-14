'use client'
import * as tf from "@tensorflow/tfjs";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import classes from './page.module.css'
import { useRef, useEffect, useState } from 'react'
import { drawMesh } from '@/components/drawmesh'
import Feedbackstylist from "@/components/Feedbackstylist";


const Page = () => {

    const webcamRef = useRef()
    const canvasRef = useRef();

    const [capture, changeCapture] = useState(false);
    const [data, changeData] = useState(false);
    const [loading, changeLoading] = useState(false);

    const captureFace = () => {
        changeLoading(true)
        changeCapture(true);
        webcamRef.current.video.play()
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        runFacemesh().then((response)=>{
            changeLoading(false)
        });
        
    }   

    console.log(data);

    const runFacemesh = async () => {
        // OLD MODEL
        // const net = await facemesh.load({
        //   inputResolution: { width: 640, height: 480 },
        //   scale: 0.8,
        // });
        // NEW MODEL
        console.log("RAN FACE MESH")
        const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
        // setInterval(() => {
        detect(net);
        // console.log(canvasRef.current.toDataURL());
        // }, 100 );
    };

    const detect = async (net) => {
        setTimeout(async () => {
            console.log(webcamRef.current.video.readyState)
            webcamRef.current.video.pause();
            if (
                typeof webcamRef.current !== "undefined" &&
                webcamRef.current !== null &&
                webcamRef.current.video.readyState === 4
            ) {
                // Get Video Properties
                const video = webcamRef.current.video;
                const videoWidth = webcamRef.current.video.videoWidth;
                const videoHeight = webcamRef.current.video.videoHeight;

                // Set video width
                webcamRef.current.video.width = videoWidth;
                webcamRef.current.video.height = videoHeight;

                // Set canvas width
                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;



                const face = await net.estimateFaces({ input: video });
                if (face.length == 0) {
                    alert('Not face')
                } else {
                    console.log(face);
                    // console.log(face);

                    // Get canvas context
                    const ctx = canvasRef.current.getContext("2d");
                    console.log('asds')
                    let returnedDrawMesh = 'aa';
                    requestAnimationFrame(() => { console.log('JAIII'); changeData(drawMesh(face, ctx)) });

                    console.log(canvasRef.current.toDataURL())
                }

            } else {
                alert('Try Again')
            }
        }, 3000)
    };

    // useEffect(()=>{runFacemesh()}, []);



    return (
        <div className={classes.parentDiv}>

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
            />

            <canvas
                ref={canvasRef}
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
            />
            <button className={classes.captureBtn} onClick={captureFace}>Capture</button>
            {capture && <Feedbackstylist data={data} loading={loading} changeLoading={changeLoading} changeData={changeData} changeCapture={changeCapture} ></Feedbackstylist>}

        </div>
    )
}

export default Page