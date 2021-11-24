// Do mathematical operation like Addition, subtraction, multiplication, div. Use case statement.
// Accept two numbers from the user from the command line.
// Create Separate function for add, sub, multi and div And store the result in one txt file.
//  And display the result from file.

var fs = require("fs");
var temp = 0;
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});


function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
function multi(a, b) {
    return a * b;
}
function div(a, b) {
    return a / b;
}



readline.question(
    `please enter  add for 1, sub for 2, multi  for 3, div for 4`,
    (type) => {
        readline.question(`Please Enter no1?`, (no1) => {
            readline.question(`Please Enter no2?`, (no2) => {
                no1 = parseInt(no1);
                no2 = parseInt(no2);
                switch (parseInt(type)) {
                    case 1:
                        temp = add(no1, no2);
                        break;
                    case 2:
                        temp = sub(no1, no2);
                        break;
                    case 3:
                        temp = multi(no1, no2);
                        break;
                    case 4:
                        temp = div(no1, no2);
                        break;
                    default:
                        console.log("error");
                        readline.close();
                }
                fs.writeFile("./ans.txt", `your ans is ${temp}`, function (error) {
                    console.log(error);
                });
                fs.readFile("./ans.txt", function (error, data) {
                    console.log(error);
                    console.log(data.toString());
                });
                readline.close();
            });
        });
    }
);