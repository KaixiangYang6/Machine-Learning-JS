## Transfer learning
It is the process by which we take that pre-trained MobileNet model, and basically disconnect it from all those labels, and reconnect it to our labels.


## Classification

MobileNet is a pre-trained model that was trained on a database of like 15 million images called ImageNet

When we use it, we send our images into the MobileNet. The MobileNet gives us back a label and a probability.

图片进入模型后将会被卷积层convolutional layers一层一层处理（减少像素），最后eventually得到特征feature

Instead of making an image classifier with mobile net, we are going to make a feature extractor with MobileNet, and then turn that feature extractor into a classifier, and train it with our own images.

Feature Extractor reference: <https://learn.ml5js.org/#/reference/feature-extractor?id=quickstart>


`createButton()` reference: <https://p5js.org/reference/#/p5/createButton>
```js
let button;
function setup() {
  createCanvas(100, 100);
  background(0);
  button = createButton('click me');
  button.position(0, 0);
  button.mousePressed(changeBG);
}

function changeBG() {
  let val = random(255);
  background(val);
}
```
Creates a <button></button> element in the DOM. Use .size() to set the display size of the button. Use .mousePressed() to specify behavior on press.

>Q: what is the meaning of classifier in the sentence `classifier = mobilenet.classification(video, videoReady)`? The variable classifier means the classification results of features extracted by the extractor or something else? The combination of labels?

`classifier.addImage('airpods')` means add a new image with a label. This is because when you keep pressing the button, you are holding the item belong to the label. So, this is a step that you give the label to the item.


whileTraining is a function that is running over and over again during the training process. It is going to report back to me information about the training process. The information is something called `lossValue`/`cost`. The loss function is calculating the error误差. If the result of comparision is consistant, then the lossValue will be 0.

>Q: `classifier.classify(gotResults)`括号里应该是`error, result`，这两个是结果变量还是开始参与的变量，为什么gotResults的自定义变量放到括号里就可以直接充当原始的`error, result`
```js
function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        labels = result; //

        classifier.classify(gotResults); //predicting twice forms a loop.
    }
}
```

The two button can be fill with `smile`, `sad` that any kind of labels as long as the labels matching the images.


>Q: Occasionally, after pressing train button, there will be a warning saying `Uncaught (in promise) Error: Batch size is 0 or NaN. Please choose a non-zero fraction.`

What differs from Daniel's toturial is that when the function `gotResults` give the callback result, the global variable `labels` ought equal `result[0].label` according to the content of `console.log`, rather than `label = result` as same as the tutorial.

If I want to save the model that I have trained, and reload that in the future, there is not a way to do that easily with the ml5 library.

## Regression

where is the information about predict?
I no longer classify and get a label. I am predicting and getting a nnumber.

当`console.log`给的结果没有序号时，这就不是数组。直接使用它的属性property就可以，例如regression中

```js
function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result); //check the log shown in the web,
        value = result.value; //use the property directly

        predictor.predict(gotResults); //predicting twice forms a loop.
    }
}
```

如果有顺序，这就是数组。需要使用数组元素的格式来使用属性，例如classification中的

```js
function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result); //check the log shown in the web,
        labels = result[0].label; //following the name of the log

        classifier.classify(gotResults); //predicting twice forms a loop.
    }
}
```