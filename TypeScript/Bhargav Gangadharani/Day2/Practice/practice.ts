// Class
class Person {
    name: string;
    constructor(theName:string){
        this.name=theName;
    }
    message(){
        console.log(`Hello, I am ${this.name}`);
    }
}

let person1 = new Person("Joy");
person1.message();
let persons = [new Person("John"), new Person("Johnson")];
persons.push(person1);
for (var p of persons){
    p.message();
}

class Employee extends Person{
    Salary : Number;
    constructor(theName: string,salary:number){
        super(theName);
        this.Salary=salary;
    }

    display(){
        let PF = Number(this.Salary) * 0.12;
        console.log(`${this.name}'s Salary is ${this.Salary} and his contribution to the PF is ${PF}`);
    }
}

let employee1 = new Employee("Mike",2000);
employee1.message();
employee1.display();


// Enum
enum color{
    red,
    blue,
    green
}

class shape {
    type : string;
    constructor(theType:string){
        this.type=theType;
    }
    display(){
        console.log(`This shape is ${color.red} colored ${this.type}`);
    }
}

var shape1 = new shape("square");
shape1.display();



// tuples
var arr6: [string, Number, boolean];
arr6 = ["John", 12, true];
console.log(arr6);

// Union 
let code: (string | number);
code = 123;   // OK
code = "ABC"; // OK

function displayType(code: (string | number)): any {
    if (typeof (code) === "number")
        return ('Code is number.');
    else if (typeof (code) === "string")
        return ('Code is string.');
}

console.log(displayType("John"));//Output: is string.
console.log(displayType(23));//Output: is number.

// Interface
interface IEmployee {
    empCode: number;
    empName: string;
    getSalary: (number) => number | string;
}
class Employee1 implements IEmployee {
    empCode: number;
    empName: string;
    constructor(code: number, name: string) {
        this.empCode = code;
        this.empName = name;
    }
    getSalary(empCode: number) {
        if (this.empCode == empCode) {
            return 20000;
        }
        else {
            return "wrong EmpCode";
        }
    }
}
var emp1 = new Employee1(23, "John");
console.log(emp1);
console.log(emp1.getSalary(23));//return 20000
console.log(emp1.getSalary(24));//return "wrong EmpCode"

//  Interface as Type
interface KeyPair {
    key: number;
    value: string;
}

let kv1: KeyPair = { key: 1, value: "Steve" }; // OK
console.log(kv1);

// Interface as Function Type
interface KeyValueProcessor {
    (key: number, value: string): void;
};

function addKeyValue(key: number, value: string): void {
    console.log('addKeyValue: key = ' + key + ', value = ' + value)
}

function updateKeyValue(key1: number, value: string): void {
    console.log('updateKeyValue: key = ' + key1 + ', value = ' + value)
}

let kvp: KeyValueProcessor;
kvp = addKeyValue;
kvp(1, 'Pizza'); 

kvp = updateKeyValue;
kvp(2, 'burger');  

// Interface for Array Type
interface NumList {
    [index: number]: number
}
var numArr: NumList = [12, 32, 53];
console.log(numArr[0]);
console.log(numArr[1]);

// extending interfaces
interface IPerson {
    name: string;
    gender: string;
}

interface IEmployee1 extends IPerson {
    empCode: number;
}

var empObj: IEmployee1 = {
    empCode: 1,
    name: "Bill",
    gender: "Male"
}
console.log(empObj);

// Functions()

// Named Function
function display() {
    console.log("Hello, I am Bhargav");
}
display(); 

// Function with Parameter and Return Types
function Sum(x: number, y: number): number {
    return x + y;
}
console.log(Sum(2, 3)); 

// Anonymous  function
let greeting = function () {
    console.log("Good Morning!");
};
greeting();  

// Anonymous  Function with Paramter and Return Types
var Sum1 = function (x: number, y: number): number {
    return x + y;
}

console.log(Sum1(2, 3));