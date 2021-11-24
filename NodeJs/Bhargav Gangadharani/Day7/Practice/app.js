var express = require('express');
var app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
const logger = require('./Middleware/logger');
const error = require('./Middleware/error');
const router = require('./Controller/customer');

// Built-in-Middleware
app.use(express.json());
app.use(express.urlencoded({ extended : true })); //parses incoming requests with URL-encoded payloads.
app.use(express.static('public')); //serves static assets such as HTML files, images, and so on.

// Error handling Middleware.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


if(app.get('env')=== 'development'){ // executing this middleware in only development environment.

    // Third party middleware.
    app.use(helmet()); // Helps secure your apps by setting various Headers.
    app.use(morgan('tiny')); // Http request  logger.

} // we can change environment by command => set NODE_ENV=production  or set NODE_ENV=development

// Configuration. 
console.log(`Application Name: ${config.get('name')} \n Mail Server: ${config.get('mail.host')}`);

// Debugging
debug('Debugging') // This function will work as console.log() & will get executed in app:startup
// To set env variable Debug : set DEBUG=app:startup

app.use(logger);
app.use(error);

app.get('/' , (req , res)=>{
    res.send('server is Live!')
})

app.use('/customer' , router);


app.listen(3000 ,()=>{
    console.log('Server is runing on port 3000....');
})
