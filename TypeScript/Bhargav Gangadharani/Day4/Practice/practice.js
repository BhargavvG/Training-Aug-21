//Create Map
var person = new Map();
//Setting Map value
person.set(1, "John");
person.set(2, "Johny");
person.set(3, "Johnson");
//Key of map
for (var _i = 0, _a = person.keys(); _i < _a.length; _i++) {
    var key = _a[_i];
    console.log("Map Keys are:" + key);
}
//Values of map
for (var _b = 0, _c = person.values(); _b < _c.length; _b++) {
    var value = _c[_b];
    console.log("Map values are:" + value);
}
//Map entrie
for (var _d = 0, _e = person.entries(); _d < _e.length; _d++) {
    var entry = _e[_d];
    console.log(entry[0], entry[1]);
}
var map = new Map();
map.set('1', 'Setty');
map.set(1, 'Setter');
map.set(true, 'Rohit');
map.set('2', 'Sunil');
console.log("Value1= " + map.get(1));
console.log("Value2= " + map.get('1'));
console.log("Key is Present= " + map.has(3));
console.log("Size= " + map.size);
console.log("Delete value= " + map["delete"](1));
console.log("New Size= " + map.size);
var ageMapping = new Map();
ageMapping.set("Sunil", 40);
ageMapping.set("Rohit", 25);
ageMapping.set("Amit", 30);
//Iterate over map keys  
for (var _f = 0, _g = ageMapping.keys(); _f < _g.length; _f++) {
    var key = _g[_f];
    console.log("Map Keys= " + key);
}
//Iterate over map values  
for (var _h = 0, _j = ageMapping.values(); _h < _j.length; _h++) {
    var value = _j[_h];
    console.log("Map Values= " + value);
}
console.log("The Map Enteries are: ");
//Iterate over map entries  
for (var _k = 0, _l = ageMapping.entries(); _k < _l.length; _k++) {
    var entry = _l[_k];
    console.log(entry[0], entry[1]);
}
//Date
var date = new Date();
console.log(date);
var date1 = new Date(2999000);
console.log(date1);
var date2 = new Date("2020-10-10");
console.log(date2);
var date3 = new Date(2018, 5, 5, 17, 23, 42, 11);
console.log(date3);
var date4 = new Date(2016, 4, 4, 4, 5, 4, 15);
date4.setDate(10);
date4.setMonth(5);
date4.setFullYear(2021);
date4.setHours(1);
date4.setMinutes(15);
date4.setMilliseconds(50);
console.log(date4);
//Set
var studentInfo = new Set();
studentInfo.add("Subhash");
studentInfo.add("Shah");
studentInfo.add("Rushabh");
console.log(studentInfo);
console.log(studentInfo.has("Shah"));
console.log(studentInfo.has(2));
studentInfo.clear();
console.log(studentInfo);
