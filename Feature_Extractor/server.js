const express = require("express"); //在server.js文件内调用express包
const app = express();              //将其赋给变量
const server = app.listen(3000);    //
app.use(express.static("public"));  //加载静态文件，含有html、css、sketch文件的文件夹
console.log("It works");
console.log("listen to port 3000");