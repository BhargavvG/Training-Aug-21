const http = require('http');
const fs = require('fs');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter{};
const myEmitter = new MyEmitter();


http.createServer((req , res)=>{

    if(req.url == '/')
    {
        fs.readFile('./files/index.html' ,'utf8', (err , data)=>{
            if(err) throw err;
            console.log(data)
              res.setHeader('Content-Type','text/html');
              res.write(data);
              res.end();
        })
    }
    if(req.url == '/exam')
    {
        fs.readFile('./files/exam.html' ,'utf8', (err , data)=>{
            if(err) throw err;
            res.setHeader('Content-Type','text/html');
            res.write(data);
            exam();
            res.end();
        })
    }
    if(req.url == '/submit')
    {
        fs.readFile('./files/submit.html' ,'utf8', (err , data)=>{
            if(err) throw err;
            res.setHeader('Content-Type','text/html');
            res.write(data);
            res.end();
        })
    }
}).listen(3001)


async function exam(){

    myEmitter.on('start' ,()=>{
            return new Promise((res , rej) =>{
                setTimeout(()=>{
                    console.log(' exam start');
                    res('exam start');
                },100); 
            })   
        })

    myEmitter.emit('start');


    
myEmitter.on('submit' , ()=>{
    return new Promise((res , rej)=>{
        setTimeout(()=>{
            console.log('your time is over');
        } , 3*60*60*1000);
        res('submit');
    }) 
})

myEmitter.emit('submit')
}





 