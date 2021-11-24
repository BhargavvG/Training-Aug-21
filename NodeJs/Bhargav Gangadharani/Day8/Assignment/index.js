const express = require('express');
const app = express();
const userRouter = require('./Controller/user');
const studentRouter = require('./Controller/student');


app.get('/' , (req , res)=>{
    res.send('Home Page');
});
app.use('/user' ,userRouter );
app.use('/student',studentRouter);


app.listen(3000 , ()=>{
    console.log('server is runing on port 3000 ...');
})