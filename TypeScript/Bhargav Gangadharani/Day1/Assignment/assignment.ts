// 1.  Store 5 employees’ data in one array (ID,FirstName,LastName,Address,Salary). 
// Do the operation searching by indexnumber, EmployeeID, Insert the employee, delete the employee from the Array. 
// Create one more array emp and join the value with above array. When display list combine firstname and lastname as fullname, 
// From the address field flatnumber,city,state and should be splited.PF should be computed and total salary should be display.

var employeeData : any =[{ID:1,FirstName:"John",LastName:"Shaw",Address:" 401, Ahmedabad, Gujrat",Salary:40000},
                           {ID:2,FirstName:"Jackson",LastName:"Shah",Address:"402, Rajkot, Gujrat",Salary:45000},
                            {ID:3,FirstName:"Jonny",LastName:"Sharma",Address:"501, Surat, Gujrat",Salary:50000},
                            {ID:4,FirstName:"Jackie",LastName:"Verma",Address:"601, Vadodara, Gujrat",Salary:60000},
                            {ID:5,FirstName:"Jade",LastName:"Mheta",Address:"401, Gandhinagar, Gujrat",Salary:50000}]


//Searching an employee
console.log("Search employee by Employee ID : 1");
var employee = employeeData.filter(e=>e.ID==1);
console.log(employee);


//Inserting new employee
console.log("Inserting new employee");
employeeData.push({ID:6,FirstName:"Janie",LastName:"Gupta",Address:"601, Mumbai, Maharashtra",Salary:40000});
//  console output
for (var item of employeeData){
    console.log(item);
}

//Deleting an Employee
console.log("Deleting the employee of index number 3");
var removed = employeeData.splice(3,1);
console.log(removed);
for (var i in  employeeData){
      console.log(employeeData[i]);
}


// Concate another array of employee
let emp : any=[{ID:7,FirstName:"Janice",LastName:"Singh",Address:"701, Pune, Maharashtra",Salary:50000},
            {ID:8,FirstName:"Jaqueline",LastName:"Chopra",Address:"1101, Thane, Maharashtra",Salary:80000}];
console.log("Inserting new employees")
employeeData = employeeData.concat(emp);
for (var item of employeeData){
    console.log(item);
}
console.log("Employee Record");


// When display list combine firstname and lastname as fullname, 
// From the address field flatnumber,city,state and should be splited.
// PF should be computed and total salary should be display.

for (var item of employeeData){
    let add=item.Address;
    //console.log(add);
    var address = add.split(',');
    var PF = Number(item.Salary) * 0.12;
    
    console.log(`* ID: ${item.ID} -- EmployeeName: ${item.FirstName} ${item.LastName}`);
    console.log(`--> Address: FlatNumber: ${address[0]} City:${address[1]} State:${address[2]}`);
    console.log(`--> Salary: Basic Salary ${item.Salary} PF:${PF}`);
    console.log("-----------------------------------------------------");
}



