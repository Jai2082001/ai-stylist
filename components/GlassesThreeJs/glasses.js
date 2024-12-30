const createGlasses = (position) => {
    const glassesMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.7 });

    // Create the lens shapes
    const lensGeometry = new THREE.CircleGeometry(0.1, 32); // Circle for lens
    const leftLens = new THREE.Mesh(lensGeometry, glassesMaterial);
    const rightLens = new THREE.Mesh(lensGeometry, glassesMaterial);

    // Position the lenses
    leftLens.position.set(position.x - 0.1, position.y, position.z); // Move left lens to the left
    rightLens.position.set(position.x + 0.1, position.y, position.z); // Move right lens to the right

    // Create the frame
    const frameGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 32); // Thin cylinder for frame
    const leftFrame = new THREE.Mesh(frameGeometry, glassesMaterial);
    const rightFrame = new THREE.Mesh(frameGeometry, glassesMaterial);

    // Position the frames
    leftFrame.rotation.z = Math.PI / 2; // Rotate to align with the lenses
    rightFrame.rotation.z = Math.PI / 2; // Rotate to align with the lenses
    leftFrame.position.set(position.x - 0.1, position.y, position.z - 0.02); // Position left frame
    rightFrame.position.set(position.x + 0.1, position.y, position.z - 0.02); // Position right frame

    // Create a group for glasses
    const glassesGroup = new THREE.Group();
    glassesGroup.add(leftLens);
    glassesGroup.add(rightLens);
    glassesGroup.add(leftFrame);
    glassesGroup.add(rightFrame);

    return glassesGroup;
};

export default createGlasses