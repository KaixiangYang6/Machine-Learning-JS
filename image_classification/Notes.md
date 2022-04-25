algorithms -> neural network
models -> pre-trained   Beginner should start from this place
data sets

quad tree [计] 象限四分树

![image](https://github.com/KaixiangYang6/Machine-Learning-JS/blob/master/IMG/Snipaste_2022-04-24_00-36-40.png)

training set is a database of images called ImageNet

## Image Classifier

reference: https://learn.ml5js.org/#/reference/image-classifier
           https://github.com/ml5js/ml5-library/tree/main/examples/p5js/ImageClassification/ImageClassification

在js中使用createImage, createP这些创建`<img>, <p></p>`这些DOM里的元素，将会显示在html内。相当于在js里编辑html的内容。

从setup()顺逻辑思路。

在调用predict()时，注意error first callback

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