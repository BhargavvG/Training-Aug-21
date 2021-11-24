
var fs = require('fs');

// 1. Write hello world into txt file.
var data = 'hello world !'
fs.writeFile('./person.txt', data, function (error) {
    console.log(error)
    console.log(data)
})


// 2. Append hello India in person.txt.

var data = ' hello India ! '
fs.appendFile('./person.txt', data, function (error) {
    console.log(error)
})
