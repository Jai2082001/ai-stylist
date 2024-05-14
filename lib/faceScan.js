function determineFaceType(data) {
    let measurements = data;

    measurements['Cheeks'] = 0.5 * (data['Right Cheek'] + data['Left Cheek']);
    measurements['Jawline'] = 0.5 * (data['Right Jaw'] + data['Left Jawline']);
    measurements['Eyes'] = 0.5 * (data['Right Eye'] + data['Left Eye'])

    const weights = {
        "Cheeks": 15,
        "Jaw": 15,
        "Forehead": 20,
        "Jawline": 15,
        "Nose": 20,
        "Eyes": 5,
        "Mouth": 10
    };
    
    const faceTypes = {
        "Round": {
            "Forehead": "Moderate",
            "Eyes": "Moderate",
            "Cheeks": "Moderate to Large",
            "Nose": "Moderate",
            "Mouth": "Moderate",
            "Jawline": "Moderate to Large"
        },
        "Square": {
            "Forehead": "Moderate",
            "Eyes": "Moderate",
            "Cheeks": "Moderate",
            "Nose": "Moderate",
            "Mouth": "Moderate",
            "Jawline": "Moderate to Large"
        },
        "Oval": {
            "Forehead": "Moderate",
            "Eyes": "Moderate",
            "Cheeks": "Moderate",
            "Nose": "Moderate",
            "Mouth": "Moderate",
            "Jawline": "Moderate"
        },
        "Heart-shaped": {
            "Forehead": "Small",
            "Eyes": "Moderate",
            "Cheeks": "Small",
            "Nose": "Moderate",
            "Mouth": "Small",
            "Jawline": "Small"
        },
        "Diamond-shaped": {
            "Forehead": "Moderate",
            "Eyes": "Moderate",
            "Cheeks": "Small to Moderate",
            "Nose": "Moderate",
            "Mouth": "Small to Moderate",
            "Jawline": "Small to Moderate"
        },
        "Rectangle/Oblong": {
            "Forehead": "Moderate to Large",
            "Eyes": "Moderate",
            "Cheeks": "Moderate",
            "Nose": "Moderate",
            "Mouth": "Moderate",
            "Jawline": "Large"
        },
        "Triangular": {
            "Forehead": "Small to Moderate",
            "Eyes": "Moderate",
            "Cheeks": "Moderate",
            "Nose": "Moderate",
            "Mouth": "Small",
            "Jawline": "Large"
        }
    };

    let minDistance = Infinity;
    let nearestFaceType = "";

    for (let faceType in faceTypes) {
        const ranges = faceTypes[faceType];
        const distance = calculateDistance(measurements, ranges, weights);
        if (distance < minDistance) {
            minDistance = distance;
            nearestFaceType = faceType;
        }
    }
    return nearestFaceType;
}

function calculateDistance(measurements, ranges, weights) {
    let distance = 0;
    for (let feature in ranges) {
        const featureType = ranges[feature];
        const weight = weights[feature];
        if (featureType === "Moderate") {
            const center = 0.5 * (4042.1612336684484 + 5400); // Taking average of moderate range for simplicity
            distance += weight * Math.pow(measurements[feature] - center, 2);
        } else if (featureType === "Moderate to Large") {
            const center = 0.5 * (4042.1612336684484 + 5400); // Taking average of moderate and large range for simplicity
            distance += weight * Math.pow(measurements[feature] - center, 2);
        } else if (featureType === "Small to Moderate") {
            const center = 0.5 * (2829.5128635679146 + 4042.1612336684484); // Taking average of small and moderate range for simplicity
            distance += weight * Math.pow(measurements[feature] - center, 2);
        } else if (featureType === "Small") {
            const center = 0.5 * (2829.5128635679146 + 3150); // Taking average of small range for simplicity
            distance += weight * Math.pow(measurements[feature] - center, 2);
        }
    }
    return Math.sqrt(distance);
}





// console.log(determineFaceType(measurements));

// Example usage:
// const measurements = {
//     "Cheeks": 2829.5128635679146,
//     "Jawline": 1186.3604669767665,
//     "Forehead": 4684.7806239806,
//     "Nose": 1624.8397706686057,
//     "Eyes": 455.46111715555876,
//     "Mouth": 1350.6660808890817
// };


// console.log(determineFaceType(measurements, weights));

export {determineFaceType as FaceAlgo}

// Upon reflection, the inclusion of the area between the eyes may not significantly contribute to differentiating face shapes, as it's a relatively small and uniform area. Therefore, I'll provide a revised list without the area between the eyes:

// 1. **Round Face:**
//    - Forehead: Moderate
//    - Eyes: Moderate
//    - Cheeks: Moderate to Large
//    - Nose: Moderate
//    - Mouth: Moderate
//    - Jawline: Moderate to Large

// 2. **Square Face:**
//    - Forehead: Moderate
//    - Eyes: Moderate
//    - Cheeks: Moderate to Large
//    - Nose: Moderate
//    - Mouth: Moderate
//    - Jawline: Moderate to Large

// 3. **Oval Face:**
//    - Forehead: Moderate
//    - Eyes: Moderate
//    - Cheeks: Moderate
//    - Nose: Moderate
//    - Mouth: Moderate
//    - Jawline: Moderate

// 4. **Heart-shaped Face:**
//    - Forehead: Moderate
//    - Eyes: Moderate
//    - Cheeks: Moderate to Small
//    - Nose: Moderate
//    - Mouth: Moderate to Small
//    - Jawline: Moderate to Small

// 5. **Diamond-shaped Face:**
//    - Forehead: Moderate
//    - Eyes: Moderate
//    - Cheeks: Moderate to Small
//    - Nose: Moderate
//    - Mouth: Moderate to Small
//    - Jawline: Moderate to Small

// 6. **Rectangle/Oblong Face:**
//    - Forehead: Moderate to Large
//    - Eyes: Moderate
//    - Cheeks: Moderate
//    - Nose: Moderate
//    - Mouth: Moderate
//    - Jawline: Large

// 7. **Triangular Face:**
//    - Forehead: Small to Moderate
//    - Eyes: Moderate
//    - Cheeks: Moderate
//    - Nose: Moderate
//    - Mouth: Moderate to Small
//    - Jawline: Moderate to Large

// This revised list provides a more accurate estimation of the expected area distribution for each facial region based on different face types.