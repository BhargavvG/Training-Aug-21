// 7. Create one folder files and move person.txt in that file.
var fs=  require('fs')

fs.mkdir('./demo',function(error){
    console.log(error)
})

fs.rename('./person.txt', './demo/person.txt', () => {
    console.log("\nFile Renamed!\n");
  });