algorithms -> neural network
models -> pre-trained   Beginner should start from this place
data sets

quad tree [计] 象限四分树

training set is a database of images called ImageNet

## Image Classifier

reference: https://learn.ml5js.org/#/reference/image-classifier
           https://github.com/ml5js/ml5-library/tree/main/examples/p5js/ImageClassification/ImageClassification

在js中使用createImage, createP这些创建`<img>, <p></p>`这些DOM里的元素，将会显示在html内。相当于在js里编辑添加html的内容。

从setup()顺逻辑思路。

**在调用predict()时，注意error first callback**

```js
// Pass a callback function to constructor
const classifier = ml5.imageClassifier('MobileNet', (err, model) => {
  console.log('Model Loaded!');
});

// Make a prediction with the selected image and pass a callback function with two arguments
classifier.predict(image, (err, results) => {
  // Check for errors. If no errors, then do something with the results
});
```

Error first callbacks is a convention common to many JavaScript libraries that we have chosen to adopt. The language JavaScript itself does not enforce this pattern. **Keep in mind that most ml5.js methods and functions are asynchronous (machine learning models can take significant amounts of time to process inputs and generate outputs!). You will need to use the error-first callback pattern if you want to use callbacks.**


对单张图片进行识别分类的语句 `createImg()`

```js
tower = createImg('IMG/Crystal Towers.png', imageReady); //createImg(DOM) in html page. Inside it means if png does not load successfully, show the content of function imageReady.
```

  
  
>Q: 为什么tower = createImg('IMG/Crystal Towers.png', imageReady); 里的imageReady执行完它自己的image()后，hide()，不会将image()隐藏起来？tower.hide()是只对tower进行隐藏，tower里面的image()不受影响？

```js
function imageReady(){
  image(tower, 0, 0, width, height);
}

function setup() {
  createCanvas(640, 480);

  tower = createImg('IMG/Crystal Towers.png', imageReady);
  tower.hide();
  background(0); 

  mobilenet = ml5.imageClassifier('MobileNet', modelReady); 
}
function draw() {
  //background(0);
}
```
>A: imageReady()里的image()是P5.js库的语句，用于显示图片到canvas上，tower.hide()是将createImg创建的`<img>`DOM标签在setup阶段隐藏起来


对视频/摄像头进行识别分类的语句 `createCapture(VIDEO)`

>Q: .classif和.predict的区别是什么？去哪里找reference？

>A: https://github.com/ml5js/ml5-library/issues/192 
>The predict() method in imageClassifier('MobileNet') was inherit from tf.js `Model.predict`. For featureExtractor('MobileNet') I think the choice was to make the method call explicit to what the extractor was set to do. As a classifier, it should classify() and as a regressor it should predict(). It might be confusing to have different use cases for predict(). I think we should we use classify() everywhere it's specifically "classification" and predict() for regressions.


>Q: global variable labels = ''的作用？

>A: according to the actural name of results shown in the web console, we can know in advance that this variable will be used as a character. 