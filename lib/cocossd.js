require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');

(async () => {

    async function getImage() {
        var pic0 = new Image();
        pic0.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/330px-Image_created_with_a_mobile_phone.png';

        pic0.onload = () => {
            var img0 = tf.browser.fromPixels(pic0);
            return img0;
        }
    }

        const img = getImage();

        // Load the model.
        const model = await cocoSsd.load();

        // Classify the image.
        const predictions = await model.detect(img);

        console.log('Predictions: ');
        console.log(predictions);
    }) ();