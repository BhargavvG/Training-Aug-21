const mongoose = require('mongoose');
const database = 'mongodb://localhost/EmployeeDB';

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connected...");
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

const employeeSchema = new mongoose.Schema({
    ID: String,
    Name: String,
    Address: String,
    Skills: [String]
});

const EmployeeModel = mongoose.model("employeecollection", employeeSchema);

const addEmployee = async () => {
    const employee = new EmployeeModel({
        ID: 3,
        Name: "Empname",
        Address: "Ahmedabad",
        Skills: ["skill1", "skill2"],
    });
    const result = await employee.save();
    console.log(result);
};
//addEmployee();

async function getEmployee(){

    //---------- Comparison Operators ----------
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in 
    // nin (not in)

    let result;

    //result = await EmployeeModel.find({ ID: { $eq: 2}});
    //result = await EmployeeModel.find({ ID: { $ne: 2}});
    //result = await EmployeeModel.find({ ID: { $gt: 1}});
    //result = await EmployeeModel.find({ ID: { $gte: 1}});
    //result = await EmployeeModel.find({ ID: { $lt: 2}});
    //result = await EmployeeModel.find({ ID: { $lte: 2}});
    //result = await EmployeeModel.find({ ID: {$in: [1, 2, 3]}});
    //result = await EmployeeModel.find({ ID: { $nin: [1, 2]}});


    //---------- Logical Operators ----------
    // or
    // not

    //result = await EmployeeModel.find().or([ { Name: "Empname"}, {Address: "Ahmedabad"}]);
    //result = await EmployeeModel.find().and([ { Name: "Empname"}, {Address: "Ahmedabad"}]);


    //---------- Regular Expressions ----------

    //starts ith Emp
    //result = await EmployeeModel.find({ Name: /^Emp/});

    //ends with me
    //result = await EmployeeModel.find({ Name: /me$/i });

    //contains Emp
    //result = await EmployeeModel.find({ Name: /.*Emp.*/});


    //---------- Counting ----------

    //result = await EmployeeModel.find().countDocuments();


    //---------- Pagination ----------

    const pageNumber = 2;
    const pageSize = 10;

    result = await EmployeeModel
        .find()
        .skip(pageNumber-1)
        .limit(pageSize);

    console.log(result);

}

getEmployee();