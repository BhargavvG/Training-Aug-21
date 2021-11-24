const path = require('path');

var obj = path.parse(__filename);
console.log(obj); 

var basename = path.basename(__filename);
console.log(basename);

var dirname = path.dirname(__filename);
console.log(dirname);

var extname = path.extname(__filename);
console.log(extname);