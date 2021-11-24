const express = require('express');
const app = express();
const loginRouter = require('./Routes/Login/login')
const empRouter = require('./Routes/Employees/employee');
const studentRouter = require('./Routes/Students/student');
const authlogin = require('./Authentication/loginVerification');


app.get('/' , (req , res)=>{
    res.send('Home Page');
});
app.use('/login', loginRouter);
app.use(authlogin);
app.use('/employee' ,empRouter );
app.use('/student',studentRouter);


app.listen(3000 , ()=>{
    console.log('server is runing on port 3000 ...');
})