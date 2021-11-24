const express = require('express');
const app = express();
const userRouter = require('./Controller/user')
const homeRouter= require('./Controller/homepage')
const adminRouter = require('./Controller/adminpanel')
const sellerRouter = require('./Controller/sellerpage')
const authlogin = require('./Authentication/loginVerification');
const authadmin = require('./Authentication/adminaccess');
const authseller = require('./Authentication/selleraccess')

app.get('/' , (req , res)=>{
    res.send('Server is live !');
});
app.use(express.json())
app.use('/myntra', homeRouter); // Home page for users.
app.use('/user', userRouter); // User login and profile page.
app.use(authlogin);
app.use('/admin', authadmin ,  adminRouter); // Admin Page.
app.use('/seller', authseller , sellerRouter); // Seller Page.


app.listen(3000 , ()=>{
    console.log('server is runing on port 3000 ...');
}) 