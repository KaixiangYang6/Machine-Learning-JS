let mobilenet;
let classifier;
let video;
let labels = 'test';    //it can be empty, or words in it.
let airpodsButton;
let woodblockButton;
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
        classifier.classify(gotResults);//when the training is complete, the actual process of matching the features to the labels, we need to classify.
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
        labels = result[0].label; //following the name of the log

        classifier.classify(gotResults); //predicting twice forms a loop.
    }
}


function setup() {
    createCanvas(640, 530);

    video = createCapture(VIDEO); //createImg(DOM) in html page. Inside it means if png does not load successfully, show the content of function imageReady.
    video.hide(); //hide the image
    background(0);

    mobilenet = ml5.featureExtractor('MobileNet', modelReady); //Extract the already learned features from MobileNet
    classifier = mobilenet.classification(video, videoReady)  //Create a new classifier using those features and with a video element. Give labels.

    airpodsButton = createButton('airpods');
    airpodsButton.mousePressed(function () {//when I press the button the functin will be executed
        classifier.addImage('airpods')  //Add a new image with a label to the classifier which is ???????
    })

    woodblockButton = createButton('woodblock');
    woodblockButton.mousePressed(function () {//when I press the button the functin will be executed
        classifier.addImage('woodblock')
    })

    trainButton = createButton('train');
    trainButton.mousePressed(function () {
        classifier.train(whileTraining);    //Retrain the network, which is map the labels to the features extracted from the video????
    })

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
