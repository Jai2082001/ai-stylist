const clm = require('./clmtracker');

export const filterFunction = (video,overlay) => {

    const overlayContext = overlay.getContext('2d')
    // Request access to the camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (err) {
            console.error("An error occurred: " + err);
        });

    // Initialize clmtrackr
    console.log(new clm.tracker())
    const tracker = new clm.tracker();
    tracker.init();
    tracker.start(video);

    // Draw filter
    function drawFilter(positions) {
        overlayContext.clearRect(0, 0, overlay.width, overlay.height);
        
        console.log(positions)

        // positions.map((points, idx) => {
        //     const x = points[0];
        //     const y = points[1]

        //     overlayContext.beginPath();
        //     overlayContext.font = "10px serif";

        //     overlayContext.strokeText = idx
        //     overlayContext.arc(x, y, 1 /* radius */, 0, 3 * Math.PI);
        //     overlayContext.fillStyle = "black";
        //     overlayContext.fillText(idx, x, y);

        // })


    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        const positions = tracker.getCurrentPosition();
        drawFilter(positions);
    }
    animate();
};

const drawPath = (overlayContext, data, closePath) => {
    const region = new Path2D();

    let points = [];

    data.map((item) => {
        points.push(item.coordinates);
    })

    region.moveTo(data[0].coordinates[0], data[0].coordinates[1]);


    for (let i = 0; i < data.length; i++) {

        const point = data[i]

        region.lineTo(point.coordinates[0], point.coordinates[1]);


    }

    if (closePath) {
        region.closePath();
    }
    overlayContext.strokeStyle = "grey";

    overlayContext.stroke(region);
}
