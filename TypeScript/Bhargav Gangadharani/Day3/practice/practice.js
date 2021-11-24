"use strict";
// Generic
exports.__esModule = true;
exports.ZipCodeValidator = exports.numberRegexp = void 0;
function prints(value) {
    return value;
}
console.log(prints(1), prints("one"), prints({ one: 1 }));
// generic class
var KeyValuePair1 = /** @class */ (function () {
    function KeyValuePair1() {
    }
    KeyValuePair1.prototype.setKeyValue = function (key, val) {
        this.key = key;
        this.val = val;
    };
    KeyValuePair1.prototype.display = function () {
        console.log("Key = ".concat(this.key, ", val = ").concat(this.val));
    };
    return KeyValuePair1;
}());
var kvp1 = new KeyValuePair1();
kvp1.setKeyValue(111, "John");
kvp1.display();
;
function processKeyPairs(key, value) {
    console.log("processKeyPairs: key = ".concat(key, ", value = ").concat(value));
}
var numKVProcessor = processKeyPairs;
numKVProcessor(1, 1111);
exports.numberRegexp = /^[0-9]+$/;
var ZipCodeValidator = /** @class */ (function () {
    function ZipCodeValidator() {
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && exports.numberRegexp.test(s);
    };
    return ZipCodeValidator;
}());
exports.ZipCodeValidator = ZipCodeValidator;
// Namespace
var Numbers;
(function (Numbers) {
    function add(x, y) {
        return x + y;
    }
    Numbers.add = add;
})(Numbers || (Numbers = {}));
var Strings;
(function (Strings) {
    function add(x, y) {
        return x + y;
    }
    Strings.add = add;
})(Strings || (Strings = {}));
console.log(Numbers.add(1, 2), Strings.add("2", "3"));
