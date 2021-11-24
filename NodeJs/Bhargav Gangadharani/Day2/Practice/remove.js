// 6. Remove person.txt file.
var fs= require('fs')
  
 fs.unlink('./demo.txt',(err) => {
    if (err) throw err;
    console.log('successfully deleted demo.txt');
}); 