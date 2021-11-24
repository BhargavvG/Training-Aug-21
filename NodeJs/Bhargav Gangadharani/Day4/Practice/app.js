const http = require('http');
const server = http.createServer( (req,res)=>{
    if(req.url ==='/'){
        res.write('Hello World');
        res.end();
    }
});

server.on('connection', (socket)=>{
    console.log('New connection established on port 3000')
})
server.listen(3000);

console.log('listening to server on port 3000');



