const http = require('http');
const fs = require('fs');

http.createServer((req , res)=>{
    if(req.url == '/'){
        res.write('hello world');
        res.end();
    }

    if(req.url == '/file')
    {
        fs.readFile('./temp.txt' ,'utf8', (err , data)=>{
            if(err) throw err;
            console.log(data);

            fs.writeFile('./temp2.txt',data,(err)=>{
                if(err) throw err;
              });
              res.write(data);
              res.end();
        })
    }

}).listen(3001)
 