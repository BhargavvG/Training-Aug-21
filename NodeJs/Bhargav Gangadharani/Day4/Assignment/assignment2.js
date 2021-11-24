const http = require('http');

const url = require('url');


http.createServer((req , res)=>{
res.write('This method will fetch parameter from url and use them to perform operations. \n');
console.log(req.url);

const queryObject = url.parse(req.url , true).query;

let num1 = parseInt( queryObject.param1);
let num2 = parseInt(queryObject.param2);
let sum = num1 + num2;
res.write(`your sum is : ${sum.toString()}`);


res.end();

}).listen(3001)
   

