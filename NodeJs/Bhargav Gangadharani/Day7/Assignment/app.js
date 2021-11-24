const express = require('express');
const app = express();
const router = require('./Controller/employee');
app.use(express.urlencoded({ extended: true }));


app.get('/' , (req , res)=>{
    res.send('server is live!');
});

app.use('/emps' , router);

app.listen(5000 , ()=>{
    console.log('server is runing on port 5000.....');
})