let mobilenet;
let tower;

function modelReady() {
  console.log('Model is ready!!!');
  mobilenet.predict(tower, gotResults); //Make a prediction with the selected image and pass a callback function with gotResults
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    let labels = results[0].label; //according to the actural name of results shown in the web console
    let confi = results[0].confidence;  ////according to the actural name of results shown in the web console
    fill(0);
    textSize(40);
    text(labels, 10, height - 100);
    createP(labels);  //Creates a <p></p> element in the DOM with given inner HTML. Used for paragraph length text.
    createP(confi);
  }
}

function imageReady() {
  image(tower, 0, 0, width, height);
}

function setup() {
  createCanvas(640, 480);

  tower = createImg('IMG/Crystal Towers.png', imageReady); //createImg(DOM) in html page. Inside it means if png does not load successfully, show the content of function imageReady.
  tower.hide(); //hide the image
  background(0);

  mobilenet = ml5.imageClassifier('MobileNet', modelReady); //generate a imageClassifier object. put an anonymous function called modelReady.
  //telling the ML5 that I want to make an image classifier, and the first argument I am giving it as a string with the name of the model.
  //promise is a way of handling asynchronous events that's slightly different but similar to callbacks. modelReady here is a callback methodology.
  //callback is a function to run once the model has been loaded.
}
//creating an image classifier with a MobileNet model. It is going to take some time for it to load that model. This is not a small thing.
//It is called MobileNet because it is actually a tiny model that can even run on mobile phones. This model in particular requires you to be online.
function draw() {
  //background(0);
}
