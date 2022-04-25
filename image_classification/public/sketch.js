let mobilenet;
let tower;

function modelReady(){
  console.log('Model is ready!!!');
  mobilenet.predict(tower, gotResults);
}

function gotResults(error, results){
  if (error){
    console.error(error);
  } else {
    console.log(results);
    let label = results[0].className;
    fill(0);
    textSize(64)；
    Text(label, 10, height - 100);
  }
}

function imageReady(){
  image(tower, 0, 0, width, height);
}

function setup() {
  createCanvas(640, 480);

  tower = createImg('IMG/Crystal Towers.png', imageReady); //if png does not load successfully, show imageReady.
  tower.hide(); //调用后隐藏图片，显示下面的这行背景
  background(0);

  mobilenet = ml5.imageClassifier('MobileNet', modelReady); //generate a imageClassifier object. put an anonymous function called modelready.
  //telling the ML5 that I want to make an image classifier, and the first argument I am giving it as a string with the name of the model.
  //promise is a way of handling asynchronous events that's slightly different but similar to callbacks.
}
//creating an image classifier with a MobileNet model. It is going to take some time for it to load that model. This is not a small thing.
//It is called MobileNet because it is actually a tiny model that can even run on mobile phones. This model in particular requires you to be online.
function draw() {
  //background(0);
}
