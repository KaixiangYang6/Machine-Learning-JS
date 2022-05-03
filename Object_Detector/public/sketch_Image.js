// ml5.js: Object Detection with COCO-SSD (Image)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/learning/ml5/1.3-object-detection.html
// https://youtu.be/QEzRxnuaZCk

// p5.js Web Editor - Image: https://editor.p5js.org/codingtrain/sketches/ZNQQx2n5o
// p5.js Web Editor - Webcam: https://editor.p5js.org/codingtrain/sketches/VIYRpcME3
// p5.js Web Editor - Webcam Persistence: https://editor.p5js.org/codingtrain/sketches/Vt9xeTxWJ

let img;
let detector;
let imgScale;

//preload function allows me to load images and pro-trained models without any callbacks,
//and everything is ready to go once I get to the setup function
function preload() {
  img = loadImage('IMG/cat-dog3.jpeg');

  // imgScale = image(img, 0, 0, 640, 480);
  detector = ml5.objectDetector('cocossd');//Create a ObjectDetector method. Models available are 'cocossd', 'yolo'
}

function setup() {
  createCanvas(img.width, img.height);
  // console.log(detector);
  //the image is not the object detected

  //this function is a copy of the original data 
  image(img, 0, 0, width, height);
  img.resize(width, height);
  // imgScale = image(img, 0, 0, width, height);
  detector.detect(img, gotDetections);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  //unfold the results array
  for (let i = 0; i < results.length; i++) {
    let object = results[i];

    stroke(0, 255, 0);
    strokeWeight(4);
    noFill();
    rect(object.x, object.y, object.width, object.height);  //give every object of the array a frame

    //每个图形之前设置描边填色等等
    noStroke();
    fill(255);
    textSize(24);
    text(object.label, object.x + 10, object.y + 24);
  }
}