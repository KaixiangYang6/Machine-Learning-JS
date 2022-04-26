Anytime using a machine learning model, you want to ask yourself the question what data was used to train this model, who trained this model, in what context and for what reasons?

Anytime you are going to use a pre-trained model in a project, you want to think about the ethical implications of where that model came from and how you are using it and researching into the biography. The data behind the model and the model itself is incredibly important when considering those kinds of questions.

In this case, the data set behind the object detection model that I am going to use is a data set called Coco. <https://cocodataset.org/#home> It is a large scale object detection segmentation and captioning data set.

在返回的结果中，`results`是一个数组，所以可以使用数组的指令`results.length`

>Q:why the frame does not match the size of the image?