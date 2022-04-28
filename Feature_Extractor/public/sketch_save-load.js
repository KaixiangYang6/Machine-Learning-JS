let mobilenet;
let predictor;
let video;
let value = 0;
let slider;
let addButton;
let trainButton;

function modelReady() {
    console.log('Model is ready!!!');
}

function videoReady() {
    console.log('Video is ready!!!');
}

//this function whileTraining is a function that's kind of run over and over during the training process, and it's going to report back to me information about the training process.
function whileTraining(lossValue) {
    if (lossValue == null) {
        console.log('Training Complete');
        predictor.predict(gotResults);//when the training is complete, the actual process of matching the features to the labels, we need to classify.
        // classify is geting a prediction for that image
    } else {
        console.log(lossValue);
    }
}

function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result); //check the log shown in the web,
        value = result.value; //use the property directly

        predictor.predict(gotResults); //predicting twice forms a loop.
    }
}


function setup() {
    createCanvas(640, 530);

    video = createCapture(VIDEO); //createImg(DOM) in html page. Inside it means if png does not load successfully, show the content of function imageReady.
    video.hide(); //hide the image
    background(0);

    mobilenet = ml5.featureExtractor('MobileNet', modelReady); //Extract the already learned features from MobileNet
    predictor = mobilenet.regression(video, videoReady)  //Create a new regression

    slider = createSlider(0, 1, 0.5, 0.01);
    // slider.input(function(){
    // console.log(slider.value());
    // })

    addButton = createButton('add example image');
    addButton.mousePressed(function () {
        //assign this image's feature to this number
        predictor.addImage(slider.value());// .addImage(): When using the classifier this can be strings or numbers. For a regressor, this needs to be a number.
    });

    trainButton = createButton('train');
    trainButton.mousePressed(function () {
        predictor.train(whileTraining);    //Retrain the network, which is map the labels to the features extracted from the video????
    });

}
//creating an image classifier with a MobileNet model. It is going to take some time for it to load that model. This is not a small thing.
//It is called MobileNet because it is actually a tiny model that can even run on mobile phones. This model in particular requires you to be online.
function draw() {
    background(0);
    image(video, 0, 0);//display the video on canvas

    noStroke();
    fill('#156156');
    rect(value * width, height - 60, 80, 10);


    fill(255);
    textSize(32);
    text(value, 10, height - 20);
}
