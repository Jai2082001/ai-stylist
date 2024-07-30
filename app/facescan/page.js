'use client'
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { drawMesh, drawMeshFaceScan } from '../../components/drawmesh'
import * as facemesh from "@tensorflow-models/face-landmarks-detection";

export default function index() {
    const webcamRef = useRef();
    const canvasRef = useRef();

    const [tracker, changeClm] = useState(false)

    useEffect(() => {
        const filter = require('../../lib/filter').filterFunction;
        filter(webcamRef.current, canvasRef.current)
    }, [])
    if (tracker) {
        const video = webcamRef.current;
        const clm = new tracker.tracker();
        clm.init();
        clm.start(video);
        console.log(clm)
        console.log(clm.getCurrentPosition());

    }

    const captureFace = async (positions) => {
        webcamRef.current.video.play()
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

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

            console.log(positions)


            positions.map((points) => {
                const x = points[0];
                const y = points[1]

                ctx.beginPath();
                ctx.font = "10px serif";

                ctx.strokeText = idx
                ctx.arc(x, y, 1 /* radius */, 0, 3 * Math.PI);
                ctx.fillStyle = "black";
                ctx.fillText(idx, x, y);
            })


            runFacemesh()
        } else {
            alert('Try Again')
        }

    }

    const runFacemesh = async () => {
        requestAnimationFrame(runFacemesh);
        console.log(tracker)
        const positions = tracker.getCurrentPosition();
        captureFace(positions);
    };




    return (
        <div>
            <Webcam
                ref={webcamRef}
                style={{
                    position: 'absolute',
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zIndex: 9,
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
                    zIndex: 9,
                    width: 640,
                    height: 480,
                }}
            />
            {/*  */}
            {tracker && <button onClick={runFacemesh}>Capture</button>}
            {/* <button onClick={captureFace}> Capture Face</button> */}
        </div>
    )
}