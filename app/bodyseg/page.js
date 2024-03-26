// 1. Install dependencies
// 2. Import dependencies
// 3. Setup webcam and canvas
// 4. Define references to those
// 5. Load handpose
// 6. Detect function
// 7. Draw using drawMask
'use client'
import React, { useRef, useState } from "react";
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";
// import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [capture, changeCapture] = useState(false);

  const runBodysegment = async () => {
    const net = await bodyPix.load();
    console.log("BodyPix model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 8000);
  };

  const DrawDots = (ctx, data) => {
    console.log(data)
    const array = [];
    for (let i = 0; i < data.allPoses[0].keypoints.length; i++) {
      array.push(data.allPoses[0].keypoints[i])
    }
    ctx.font = '5px sans serif'
    console.log(array)
    for (let j = 0; j < array.length; j++) {
      let x = array[j].position.x
      let y = array[j].position.y
      // // ctx.arc(array[j].position.x, array[j].position.y, 1, 0, 3 * Math.PI);
      // console.log(array[j].part)
      // // ctx.fillStyle = "black";
      // ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 3 /* radius */, 0, 3 * Math.PI);
        ctx.font = '20px serif'
        ctx.fillText(j, x, y);
        ctx.fillStyle = "aqua";
        ctx.fill();
    }



  }

  const detect = async (net) => {
    // Check data is available
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

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      // * One of (see documentation below):
      // *   - net.segmentPerson
      // *   - net.segmentPersonParts
      // *   - net.segmentMultiPerson
      // *   - net.segmentMultiPersonParts
      // const person = await net.segmentPerson(video);
      const person = await net.segmentPersonParts(video);
      console.log(person);

      // const coloredPartImage = bodyPix.toMask(person);
      console.log(bodyPix.PART_CHANNELS)
      DrawDots(canvasRef.current.getContext('2d'), person)
      const coloredPartImage = bodyPix.toColoredPartMask(person);
      // const coloredPartImage = bodyPix.drawPixelatedMask(person)
      const opacity = 0.7;
      const flipHorizontal = false;
      const maskBlurAmount = 0;
      // const canvas = canvasRef.current;
      //       bodyPix.drawPixelatedMask(        
      //         canvas,
      //         video,
      //         coloredPartImage,
      //         opacity,
      //         maskBlurAmount,
      //         flipHorizontal
      // ) 

    
    }
  };

  const changeFunction = () => {
    console.log('change Function')
    changeCapture(true);
  }

  if (capture) {
    runBodysegment();
  }


  return (
    <div className="App">

      {capture &&
        <>

          <header className="App-header">
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
          </header>
        </>}
      <input type="text" placeholder="Enter height in centimeters"></input><br></br>
      <button onClick={() => { changeFunction() }}>Capture it !</button>
    </div>
  );
}

export default App;
