var Employee = /** @class */ (function () {
    function Employee(ID, Name, City, DOJ) {
        this.ID = ID;
        this.Name = Name;
        this.City = City;
        this.DOJ = DOJ;
    }
    return Employee;
}());
var EmpData;
//Store 5 Employee Data(ID,Name,City,DOJ) in one Array.
EmpData = [
    new Employee(1, "Vishwash", "Ahmedabad", new Date(2020, 10, 10)),
    new Employee(2, "Amit", "Ahmedabad", new Date(2019, 5, 30)),
    new Employee(3, "Shubhash", "Rajkot", new Date(2018, 6, 10)),
    new Employee(4, "Kadam", "Vadodara", new Date(2017, 7, 10)),
    new Employee(5, "Ashish", "Mumbai", new Date(2021, 8, 10)),
];
// console.log(EmpData);
var id = 5;
console.log("employee having id 5:");
console.log(EmpData.filter(function (emp) { return emp.ID == id; }));
//Search the employees who has joined after year 2020
console.log("Employees who has joined after year 2020");
console.log(EmpData.filter(function (emp) { return emp.DOJ.getFullYear() > 2020; }));
//Search the employee who has joined after year 2020 and stays in Mumbai city
console.log("Employee who has joined after year 2020 and stays in Mumbai city");
console.log(EmpData.filter(function (emp) { return (emp.DOJ.getFullYear() > 2020, emp.City == 'Mumbai'); }));
