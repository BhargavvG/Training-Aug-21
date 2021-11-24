var message = 'Hello';
console.log(message.toUpperCase());
var fruits = "Apple,Banana,Orange,Grapes,Kiwi";
var fruitsArr = fruits.split(',');
for (var _i = 0, fruitsArr_1 = fruitsArr; _i < fruitsArr_1.length; _i++) {
    var fruit = fruitsArr_1[_i];
    console.log(fruit);
}
for (var i in fruitsArr) {
    console.log(fruitsArr[i]);
}
fruitsArr.splice(2, 1, "Kiwi");
console.log(fruitsArr);
// filter 
function isBigEnough(element, index, array) {
    return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].filter(isBigEnough);
console.log("Test Value : " + passed);
