var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Class
var Person = /** @class */ (function () {
    function Person(theName) {
        this.name = theName;
    }
    Person.prototype.message = function () {
        console.log("Hello, I am ".concat(this.name));
    };
    return Person;
}());
var person1 = new Person("Joy");
person1.message();
var persons = [new Person("John"), new Person("Johnson")];
persons.push(person1);
for (var _i = 0, persons_1 = persons; _i < persons_1.length; _i++) {
    var p = persons_1[_i];
    p.message();
}
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(theName, salary) {
        var _this = _super.call(this, theName) || this;
        _this.Salary = salary;
        return _this;
    }
    Employee.prototype.display = function () {
        var PF = Number(this.Salary) * 0.12;
        console.log("".concat(this.name, "'s Salary is ").concat(this.Salary, " and his contribution to the PF is ").concat(PF));
    };
    return Employee;
}(Person));
var employee1 = new Employee("Mike", 2000);
employee1.message();
employee1.display();
// Enum
var color;
(function (color) {
    color[color["red"] = 0] = "red";
    color[color["blue"] = 1] = "blue";
    color[color["green"] = 2] = "green";
})(color || (color = {}));
var shape = /** @class */ (function () {
    function shape(theType) {
        this.type = theType;
    }
    shape.prototype.display = function () {
        console.log("This shape is ".concat(color.red, " colored ").concat(this.type));
    };
    return shape;
}());
var shape1 = new shape("square");
shape1.display();
// tuples
var arr6;
arr6 = ["John", 12, true];
console.log(arr6);
// Union 
var code;
code = 123; // OK
code = "ABC"; // OK
function displayType(code) {
    if (typeof (code) === "number")
        return ('Code is number.');
    else if (typeof (code) === "string")
        return ('Code is string.');
}
console.log(displayType("John")); //Output: is string.
console.log(displayType(23)); //Output: is number.
var Employee1 = /** @class */ (function () {
    function Employee1(code, name) {
        this.empCode = code;
        this.empName = name;
    }
    Employee1.prototype.getSalary = function (empCode) {
        if (this.empCode == empCode) {
            return 20000;
        }
        else {
            return "wrong EmpCode";
        }
    };
    return Employee1;
}());
var emp1 = new Employee1(23, "John");
console.log(emp1);
console.log(emp1.getSalary(23)); //return 20000
console.log(emp1.getSalary(24)); //return "wrong EmpCode"
var kv1 = { key: 1, value: "Steve" }; // OK
console.log(kv1);
;
function addKeyValue(key, value) {
    console.log('addKeyValue: key = ' + key + ', value = ' + value);
}
function updateKeyValue(key1, value) {
    console.log('updateKeyValue: key = ' + key1 + ', value = ' + value);
}
var kvp;
kvp = addKeyValue;
kvp(1, 'Pizza');
kvp = updateKeyValue;
kvp(2, 'burger');
var numArr = [12, 32, 53];
console.log(numArr[0]);
console.log(numArr[1]);
var empObj = {
    empCode: 1,
    name: "Bill",
    gender: "Male"
};
console.log(empObj);
// Functions()
// Named Function
function display() {
    console.log("Hello, I am Bhargav");
}
display();
// Function with Parameter and Return Types
function Sum(x, y) {
    return x + y;
}
console.log(Sum(2, 3));
// Anonymous  function
var greeting = function () {
    console.log("Good Morning!");
};
greeting();
// Anonymous  Function with Paramter and Return Types
var Sum1 = function (x, y) {
    return x + y;
};
console.log(Sum1(2, 3));
