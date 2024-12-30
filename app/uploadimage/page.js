"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Glasses3D = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            640 / 480,
            0.1,
            1000
        );
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
        renderer.setSize(640, 480);
        // document.body.appendChild(renderer.domElement);

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        // Materials
        const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.1 });
        const lensMaterial = new THREE.MeshStandardMaterial({ color: 0x88ccee, transparent: true, opacity: 0.4 });

        // Lenses
        const lensGeometry = new THREE.BoxGeometry(0, 0, 0);
        const leftLens = new THREE.Mesh(lensGeometry, lensMaterial);
        const rightLens = new THREE.Mesh(lensGeometry, lensMaterial);

        leftLens.position.set(-1, 0, 0);
        rightLens.position.set(1, 0, 0);

        // Frame - Around Lenses
        const frameGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.1);
        const leftFrame = new THREE.Mesh(frameGeometry, frameMaterial);
        const rightFrame = new THREE.Mesh(frameGeometry, frameMaterial);

        leftFrame.position.set(-1, 0, 0);
        rightFrame.position.set(1, 0, 0);

        // Bridge
        const bridgeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
        const bridge = new THREE.Mesh(bridgeGeometry, frameMaterial);
        bridge.rotation.z = Math.PI / 2;
        bridge.position.set(0, 0, 0);

        // Temples (Arms)
        const templeGeometry = new THREE.BoxGeometry(0.1, 0.1, 3);
        const leftTemple = new THREE.Mesh(templeGeometry, frameMaterial);
        const rightTemple = new THREE.Mesh(templeGeometry, frameMaterial);

        leftTemple.position.set(-2.2, 0, 1.5);
        rightTemple.position.set(2.2, 0, 1.5);

        const leftConnectorGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 32);
        const leftConnectorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const leftConnector = new THREE.Mesh(leftConnectorGeometry, leftConnectorMaterial);
        leftConnector.position.set(-2, 0, 0); // Adjust position to connect left lens and temple
        leftConnector.rotation.z = Math.PI / 2; // Rotate the cylinder to align properly

        const rightConnectorGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 32);
        const rightConnectorMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const rightConnector = new THREE.Mesh(rightConnectorGeometry, rightConnectorMaterial);
        rightConnector.position.set(2, 0, 0); // Adjust position to connect right lens and temple
        rightConnector.rotation.z = Math.PI / 2

        // Add components to scene
        const glassesGroup = new THREE.Group();

        glassesGroup.add( leftFrame, rightFrame, bridge, leftTemple, rightTemple, rightConnector, leftConnector)
        scene.add(glassesGroup)
        // Camera position
        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            glassesGroup.rotation.y += 0.01; // Continuous rotation along Y-axis
            glassesGroup.rotation.x = 0.1;  // Slight tilt for better display

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            while (scene.children.length > 0) {
                scene.remove(scene.children[0]);
            }
        };
    }, []);

    return <canvas ref={canvasRef}
        style={{
            width: '640',
            height: '480'
        }}
    />;
};

export default Glasses3D;
