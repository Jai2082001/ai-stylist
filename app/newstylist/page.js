'use client'; // If you are using Next.js 13 with app directory

import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as THREE from 'three';
import Webcam from "react-webcam";
import { useSession,signIn } from 'next-auth/react';
import createGlasses from '../../components/GlassesThreeJs/glasses';
import classes from './page.module.css'
import Image from 'next/image';
import Outline from '../../components/images/outline (1).png';
const FaceModel = () => {
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const {data: session, status} = useSession();
    // const [model, setModel] = useState([]);
    const [fileUpload, handleFileUpload] = useState(null);
    const [lensimg, setLensImage] = useState(false)
    const [reload, setReload] = useState(false);



    const fileUploadFunc = (ev) => {
        const file = ev.target.files[0];
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                setLensImage(img);
                console.log(img)

                handleFileUpload(true);
            };
        }
    }

    useEffect(()=>{
        if(status == 'unauthenticated'){
            signIn()
        }
    }, [status])

    useEffect(() => {


        let model;
        let animationFrameId
        const func = () => {
            const canvas = canvasRef.current;
            // canvas.style.backgroundColor = 'black'
            const renderer = new THREE.WebGLRenderer({ canvas: canvas, context: canvas.getContext('webgl2') });
            renderer.setSize(640, 480);


            const camera = new THREE.PerspectiveCamera(75, 640 / 480, 0.1, 1000);
            camera.position.z = 1;
            camera.lookAt(0,0,0)



            // camera.position.y = -1

            //EYE COORDINATES

            let leftEye = [189, 221, 222, 223, 224, 225, 113, 130, 25, 110, 24, 23, 22, 26, 112, 243];

            let rightEye = [413, 441, 442, 443, 444, 445, 342, 359, 255, 339, 254, 253, 252, 256, 341, 463];


            setTimeout(async () => {

                let leftshape = new THREE.Shape();


                const detectFace = async () => {
                    if (model.length > 0 || model.length == undefined) {

                        const scene = new THREE.Scene();

                        const video = videoRef.current.video;


                        const frameMaterial = new THREE.MeshStandardMaterial({ color: 'white', metalness: 0.5, roughness: 0.1 });

                        const frameGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.1);
                        const leftFrame = new THREE.Mesh(frameGeometry, frameMaterial);
                        const rightFrame = new THREE.Mesh(frameGeometry, frameMaterial);
                        const templeGeometry = new THREE.BoxGeometry(0.01, 0.01, 0.5);
                        const leftTemple = new THREE.Mesh(templeGeometry, frameMaterial);
                        const rightTemple = new THREE.Mesh(templeGeometry, frameMaterial);
                        // leftFrame.position.set(-1, 0, 0);
                        // rightFrame.position.set(1, 0, 0);



                        const glassesgroup = new THREE.Group();
                        const predictions = await model.estimateFaces({ input: video });
                        let mesh;
                        if (predictions.length > 0) {
                            const landmarks = predictions[0].scaledMesh;
                            // let mesh = new THREE.Mesh();
                            if (lensimg) {
                                const texture = new THREE.Texture(lensimg);
                                texture.needsUpdate = true;

                                const geometry = new THREE.PlaneGeometry(1, 1);
                                const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
                                const axesHelper = new THREE.AxesHelper(5);
                                // scene.add(axesHelper);
                                mesh = new THREE.Mesh(geometry, material);
                                // scene.add(mesh);
                            }
                            landmarks.forEach((landmark, index) => {
                                const [x, y] = landmark;
                                // Map landmarks to 3D space (simple example)
                                const point = new THREE.Vector3((x / 640) * 2 - 1,
                                    -(y / 480) * 2 + 0.97,
                                    0);

                                if (index == 145) {
                                    let LX = (x / 640) * 2 - 1;
                                    let LY = -(y / 480) * 2 + 1;
                                    let LZ = 0;
                                    leftFrame.position.set(LX, LY, LZ)
                                } else if (index == 374) {
                                    let RX = (x / 640) * 2 - 1;
                                    let RY = -(y / 480) * 2 + 1;
                                    let RZ = 0;
                                    rightFrame.position.set(RX, RY, RZ)
                                } else if (index == 234) {
                                    leftTemple.position.set((x / 640) * 2 - 1, -(y / 480) * 2 + 1, 0)
                                    // leftTemple.rotation.x = THREE.MathUtils.degToRad(7);
                                    // leftTemple.rotation.y = THREE.MathUtils.degToRad(-5);
                                    // leftTemple.rotation.z -= 0.3;
                                } else if (index == 454) {
                                    rightTemple.position.set((x / 640) * 2 - 1, -(y / 480) * 2 + 1, 0)
                                    rightTemple.rotation.x = 0.3
                                    rightTemple.rotation.y = 0.3;
                                    rightTemple.rotation.z = 2;
                                }
                                const landmarkGeometry = new THREE.SphereGeometry(0.005, 8, 8);

                                let skinMaterial;


                                // const materialFrame = new THREE.MeshBasicMaterial({ color: 0xffff00 });
                                // mesh = new THREE.Mesh(leftgeo, materialFrame)

                                const landmarkMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                                const landmarkMesh = new THREE.Mesh(landmarkGeometry, landmarkMaterial);

                                const axesHelper = new THREE.AxesHelper(3);
                                scene.add(axesHelper);


                                const newMesh = new THREE.Mesh(landmarkGeometry, skinMaterial)
                                landmarkMesh.position.copy(point);
                                newMesh.position.copy(point);
                                glassesgroup.add(leftFrame, rightFrame, leftTemple, rightTemple);
                                scene.add(glassesgroup)
                                scene.add(landmarkMesh);
                                if (mesh) {
                                    // setReload(prev => !prev);
                                    scene.add(mesh)
                                }
                            });



                            if (renderer) {
                                renderer.render(scene, camera)
                            }
                        }
                    }
                }
                const animate = () => {
                    animationFrameId = requestAnimationFrame(animate); // Request the next frame
                    detectFace(); // Detect faces and update the scene
                }
                animate()
                // animate();
                // setInterval(() => {
                //     detectFace()
                // // }, 100)
                // detectFace();
                // requestAnimationFrame(detectFace);
            }, 3000)
        }
        const loadModel = async () => {
            // Load the Face Landmarks Detection model
            const loadedModel = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
            // setModel(loadedModel);
            model = loadedModel;
        };
        setTimeout(() => {
            loadModel().then(() => {
                console.log(model);
                console.log('func running')
                func();
            })
        }, 2000)



        return () => {
            cancelAnimationFrame(animationFrameId)
        }


    }, [lensimg]);

    return (
        <>

            <div className={classes.displayDiv}>
                <Webcam
                    ref={videoRef}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zIndex: 0,
                        width: 640,
                        height: 480,
                    }}
                />
                <canvas ref={canvasRef}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zIndex: 100,
                        width: 640,
                        height: 480
                    }}
                />
                <Image src={Outline} style={{
                    position: 'absolute',
                    left: 25,
                    top: 50,
                    zIndex: 101
                }}></Image>
            </div>
            <div>
                <input type='file' onChange={fileUploadFunc}></input>
            </div>
        </>

    );
};

export default FaceModel;