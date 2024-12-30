// import { RNN } from '@tensorflow/tfjs';
import * as tf from "@tensorflow/tfjs";
import {FMnistData} from './training-dataset.js';
var saveButton, clearButton;
var pos = {x:0, y:0};
// var rawImage;
var model;

function getModel() {
    
    // In the space below create a convolutional neural network that can classify the 
    // images of articles of clothing in the Fashion MNIST dataset. Your convolutional
    // neural network should only use the following layers: conv2d, maxPooling2d,
    // flatten, and dense. Since the Fashion MNIST has 10 classes, your output layer
    // should have 10 units and a softmax activation function. You are free to use as
    // many layers, filters, and neurons as you like.  
    // HINT: Take a look at the MNIST example.
    model = tf.sequential();
    model.add(tf.layers.conv2d({inputShape: [28, 28, 1], kernelSize: 3, filters: 8, activation: 'relu'}));
	model.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
	model.add(tf.layers.conv2d({filters: 16, kernelSize: 3, activation: 'relu'}));
	model.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
	model.add(tf.layers.flatten());
	model.add(tf.layers.dense({units: 128, activation: 'relu'}));
	model.add(tf.layers.dense({units: 10, activation: 'softmax'}));
    
    // Compile the model using the categoricalCrossentropy loss,
    // the tf.train.adam() optimizer, and accuracy for your metrics.
    model.compile({optimizer: tf.train.adam(), loss: 'categoricalCrossentropy', metrics: ['accuracy']});
    
    return model;
}

async function train(model, data) {
        
    // Set the following metrics for the callback: 'loss', 'val_loss', 'accuracy', 'val_accuracy'.
    const metrics = ['loss', 'val_loss', 'accuracy', 'val_accuracy'];  

        
    // Create the container for the callback. Set the name to 'Model Training' and 
    // use a height of 1000px for the styles. 
    const container = { name: 'Model Training', styles: { height: '640px' } }; 
    
    
    // Use tfvis.show.fitCallbacks() to setup the callbacks. 
    // Use the container and metrics defined above as the parameters.
    // const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
    
    const BATCH_SIZE = 512;
    const TRAIN_DATA_SIZE = 6000;
    const TEST_DATA_SIZE = 1000;
    
    // Get the training batches and resize them. Remember to put your code
    // inside a tf.tidy() clause to clean up all the intermediate tensors.
    // HINT: Take a look at the MNIST example.
    const [trainXs, trainYs] =  tf.tidy(() => {
		const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
		return [
			d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
			d.labels
		];
	});

    
    // Get the testing batches and resize them. Remember to put your code
    // inside a tf.tidy() clause to clean up all the intermediate tensors.
    // HINT: Take a look at the MNIST example.
    const [testXs, testYs] = tf.tidy(() => {
		const d = data.nextTestBatch(TEST_DATA_SIZE);
		return [
			d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
			d.labels
		];
	});

    
    return model.fit(trainXs, trainYs, {
        batchSize: BATCH_SIZE,
        validationData: [testXs, testYs],
        epochs: 10,
        shuffle: true,
    });
}

function setPosition(e){
    pos.x = e.clientX-100;
    pos.y = e.clientY-100;
}
    
// function draw(e) {
//     if(e.buttons!=1) return;
//     ctx.beginPath();
//     ctx.lineWidth = 15;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = 'white';
//     ctx.moveTo(pos.x, pos.y);
//     setPosition(e);
//     ctx.lineTo(pos.x, pos.y);
//     ctx.stroke();
// }
    
// function erase() {
//     ctx.fillStyle = "black";
//     ctx.fillRect(0,0,300,480);
// }
    
function convertURIToImageData(URI) {
    return new Promise(function(resolve, reject) {
      if (URI == null) return reject();
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          image = new Image();
      image.addEventListener('load', function() {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(context.getImageData(0, 0, canvas.width, canvas.height));
      }, false);
      image.src = URI;
    });
  }


async function  save(imageSrc) {
    var imageData = await convertURIToImageData(imageSrc);
    var raw = tf.browser.fromPixels(imageData,1);
    var resized = tf.image.resizeBilinear(raw, [28,28]);
    var tensor = resized.expandDims(0);
    console.log(tensor)
    var prediction = model.predict(tensor);
    var pIndex = tf.argMax(prediction, 1).dataSync();
    console.log(prediction)
    var classNames = ["T-shirt/top", "Trouser", "Pullover", 
                      "Dress", "Coat", "Sandal", "Shirt",
                      "Sneaker",  "Bag", "Ankle boot"];
            
    console.log(classNames[pIndex])
    return classNames[pIndex]
}
    
export function init(imageSrc) {
    return save(imageSrc)
}


export async function run(data) {
    // const data = new FMnistData();
    // await data.load();
    const model = getModel();
    // tfvis.show.modelSummary({name: 'Model Architecture'}, model);
    const response = await train(model, data);

    console.log(response)
    // await model.save('downloads://my_model');
   
}








