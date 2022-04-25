let mobilenet;
let video;
let labels = '';

function modelReady(){
  console.log('Model is ready!!!');
  mobilenet.predict(gotResults); //Make a prediction with the selected image and pass a callback function with gotResults
}

function gotResults(error, results){
  if (error){
    console.error(error);
  } else {
    // console.log(results);
    labels = results[0].label; //according to the actural name of results shown in the web console
    //Because of the order of the first object of results shown in the web page is 0, and the name belongs to 'label' class.
    //So results[0].label means the name of the first label object, and give the name to the global variable.
    mobilenet.predict(gotResults); //predicting twice forms a loop.
  }
}


function setup() {
  createCanvas(640, 530);

  video = createCapture(VIDEO); //createImg(DOM) in html page. Inside it means if png does not load successfully, show the content of function imageReady.
  video.hide(); //hide the image
  background(0); 

  mobilenet = ml5.imageClassifier('MobileNet', video, modelReady); //want the mobileNet model to act continuously on the video
  //insert the P5 video element right there into the image classifier function
}
//creating an image classifier with a MobileNet model. It is going to take some time for it to load that model. This is not a small thing.
//It is called MobileNet because it is actually a tiny model that can even run on mobile phones. This model in particular requires you to be online.
function draw() {
    background(0);
    image(video, 0, 0);//display the video on canvas
    fill(255);
    textSize(32);
    text(labels, 10, height - 20);
}
