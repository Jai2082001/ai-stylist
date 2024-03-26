'use client'
import * as tf from "@tensorflow/tfjs";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import classes from './page.module.css'
import { useRef, useEffect} from 'react'
import {drawMesh} from '@/components/drawmesh'

const Page = () => {

    const webcamRef = useRef()
    const canvasRef = useRef();


    const runFacemesh = async () => {
        // OLD MODEL
        // const net = await facemesh.load({
        //   inputResolution: { width: 640, height: 480 },
        //   scale: 0.8,
        // });
        // NEW MODEL
        console.log("RAN FACE MESH")
        const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
        setInterval(() => {
            detect(net);
            // console.log(canvasRef.current.toDataURL());
        }, 50000 );
    };

    const detect = async (net) => {
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

            // Make Detections
            // OLD MODEL
            //       const face = await net.estimateFaces(video);
            // NEW MODEL

            console.log('asds')
            const face = await net.estimateFaces({ input: video });
            // console.log(face);

            // Get canvas context
            const ctx = canvasRef.current.getContext("2d");
            console.log('asds')
            console.log(canvasRef.current.toDataURL())
            requestAnimationFrame(() => { drawMesh(face, ctx) });
        }
    };

    useEffect(()=>{runFacemesh()}, []);



    return (
        <div className={classes.parentDiv}>
            <div className="App">
                <header className="App-header">
                </header>


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
            </div>
        </div>
    )
}

export default Page