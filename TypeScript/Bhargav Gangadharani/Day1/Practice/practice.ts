let message : string = 'Hello';
console.log(message.toUpperCase());

let fruits : string = "Apple,Banana,Orange,Grapes,Kiwi";
var fruitsArr = fruits.split(',');
for (var fruit of fruitsArr){
    console.log(fruit);
}

for (var i in fruitsArr){
    console.log(fruitsArr[i])
}

fruitsArr.splice(2,1,"Kiwi");
console.log(fruitsArr);

// filter 
function isBigEnough(element, index, array) { 
    return (element >= 10); 
 } 
           
 var passed = [12, 5, 8, 130, 44].filter(isBigEnough); 
 console.log("Test Value : " + passed );
