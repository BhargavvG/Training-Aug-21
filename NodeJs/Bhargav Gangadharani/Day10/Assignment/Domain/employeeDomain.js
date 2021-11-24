const EmployeeModel = require('../Model/employeeModel');

class EmployeeDomain {

    //GET ALL EMPLOYEE DATA
    async getAllEmployees(req, res) {
        const employees = await EmployeeModel.find();
        res.send(employees);
    }

    //GET SPECIFIC EMPLOYEE DATA USING ID
    async getEmployeeById(req, res) {
        const empId = req.params.id;

        const employee = await EmployeeModel.find({ EmpId: empId });

        if (employee.length == 0) {
            res.status(404).send("Employee Not Found");
        }
        else {
            res.send(employee);
        }
    }

    //ADD EMPLOYEE
    async addEmployee(req, res) {
        const employee = req.body;

        let newEmployee = new EmployeeModel(employee);

        try {
            let result = await newEmployee.save();
            //console.log(result);
            res.send("Employee Added Successfully");
        }
        catch (err) {
            res.status(404).send(err.message);
        }
    }

    //UPDATE EMPLOYEE
    async updateEmployee(req, res) {
        const employee = req.body;
        const empId = req.params.id;

        let result = await EmployeeModel.updateOne({ EmpId: empId}, 
            { $set: { 
                "EmpId" : req.body.EmpId,
                "Address" : req.body.Address,
                "CitizenshipId" : req.body.CitizenshipId,
                "CitizenshipLegislationCode" : req.body.CitizenshipLegislationCode,
                "CitizenshipStatus" : req.body.CitizenshipStatus,
                "CitizenshipToDate" : req.body.CitizenshipToDate,
                "City" : req.body.City,
                "CorrespondenceLanguage" : req.body.CorrespondenceLanguage,
                "Country" : req.body.Country,
                "CreationDate" : req.body.CreationDate,
                "DateOfBirth" : req.body.DateOfBirth,
                "directReports" : req.body.DirectReports,
                "DisplayName" : req.body.DisplayName,
                "DriversLicenseExpirationDate" : req.body.DriversLicenseExpirationDate,
                "DriversLicenseId" : req.body.DriversLicenseId,
                "DriversLicenseIssuingCountry" : req.body.DriversLicenseIssuingCountry,
                "EffectiveStartDate" : req.body.EffectiveStartDate,
                "Ethnicity" : req.body.Ethnicity,
                "FirstName" : req.body.FirstName,
                "Gender" : req.body.Gender,
                "HireDate" : req.body.HireDate,
                "HomeFaxAreaCode" : req.body.HomeFaxAreaCode,
                "HomeFaxCountryCode" : req.body.HomeFaxCountryCode,
                "HomeFaxExtension" : req.body.HomeFaxExtension,
                "HomeFaxLegislationCode" : req.body.HomeFaxLegislationCode,
                "HomeFaxNumber" : req.body.HomeFaxNumber,
                "HomePhoneAreaCode" : req.body.HomePhoneAreaCode,
                "HomePhoneCountryCode" : req.body.HomePhoneCountryCode,
                "HomePhoneExtension" : req.body.HomePhoneExtension,
                "HomePhoneLegislationCode" : req.body.HomePhoneLegislationCode,
                "HomePhoneNumber" : req.body.HomePhoneNumber,
                "Honors" : req.body.Honors,
                "LastName" : req.body.LastName,
                "LastUpdateDate" : req.body.LastUpdateDate,
                "LegalEntityId" : req.body.LegalEntityId,
                "LicenseNumber" : req.body.LicenseNumber,
                "links" : req.body.Links,
                "MaritalStatus": req.body.MaritalStatus,
                "MiddleName" : req.body.MiddleName,
                "MilitaryVetStatus" : req.body.MilitaryVetStatus,
                "NameSuffix" : req.body.NameSuffix,
                "NationalId" : req.body.NationalId,
                "NationalIdCountry" : req.body.NationalIdCountry
            }});

        //console.log(result);
        if(result.modifiedcount == 0){
            res.status(404).send("Employee not found");
        }
        else{
            res.send("Employee updated successfully");
        }
        
    }

    //DELETE EMPLOYEE
    async deleteEmployee(req, res) {
        const empId = req.params.id;

        let result = await EmployeeModel.deleteOne({ EmpId: empId});
        
        if(result.deletedCount == 0){
            res.status(404).send("Employee not found");
        }
        else{
            res.send("Employee deleted successfully");
        }
        
    }

    //GET ALL ASSIGNMENTS
    async getAllAssignments(req, res) {

        const empId = req.params.id;

        const assignment = await EmployeeModel.find({ EmpId: empId}).select({Assignments : 1});

        if(assignment.length == 0){
            res.status(404).send("Assignment not found");
        }
        else{
            res.send(assignment);
        }        
    }

    //GET ASSIGNMENT BY ID
    async getAssignmentById(req, res) {
        const empId = req.params.id;
        const asgId = req.params.aid;
        
        const assignment = await EmployeeModel.find({ EmpId: empId }, {Assignments : { $elemMatch :{ AssignmentId : asgId}}});

        if (assignment.length == 0) {
            res.status(404).send("Assignment Not Found");
            return;
        }
        else{
            res.send(assignment);
        }
    }

    //ADD ASSIGNMENTS
    async addAssignment(req, res) {
        const empId = req.params.id;

        const employee = await EmployeeModel.find({ EmpId: empId });
        //console.log(employee);

        if (employee.length == 0) {
          res.status(404).send("Employee Not Found");
          return;
        } 
        else {
          let assignment = req.body;
          let result = await EmployeeModel.updateOne({ EmpId: empId}, 
            {"$push" : {Assignments :{
                "AssignmentId" : req.body.AssignmentId,
                "AssignmentName" : req.body.AssignmentName,
                "ActionCode" : req.body.ActionCode,
                "ActionReasonCode" : req.body.ActionReasonCode,
                "ActualTerminationDate" : req.body.ActualTerminationDate,
                "AssignmentCategory" : req.body.AssignmentCategory,
                "assignmentDFF" : req.body.assignmentDFF,
                "assignmentExtraInformation" : req.body.assignmentExtraInformation,
                "AssignmentNumber" : req.body.AssignmentNumber,
                "AssignmentProjectedEndDate" : req.body.AssignmentProjectedEndDate,
                "AssignmentStatus" : req.body.AssignmentStatus,
                "AssignmentStatusTypeId" : req.body.AssignmentStatusTypeId,
                "BusinessUnitId" : req.body.BusinessUnitId,
                "CreationDate" : req.body.CreationDate,
                "DefaultExpenseAccount" : req.body.DefaultExpenseAccount,
                "DepartmentId" : req.body.DepartmentId,
                "EffectiveEndDate" : req.body.EffectiveEndDate,
                "EffectiveStartDate" : req.body.EffectiveStartDate,
                "empreps" : req.body.empreps,
                "EndTime" : req.body.EndTime,
                "Frequency" : req.body.Frequency,
                "FullPartTime" : req.body.FullPartTime,
                "GradeId" : req.body.GradeId,
                "GradeLadderId" : req.body.GradeLadderId,
                "JobId" : req.body.JobId,
                "LastUpdateDate" : req.body.LastUpdateDate,
                "LegalEntityId" : req.body.LegalEntityId,
                "links" : req.body.links,
                "LocationId" : req.body.LocationId,
                "ManagerAssignmentId" : req.body.ManagerAssignmentId,
                "ManagerId" : req.body.ManagerId
            } }});
            if(result.modifiedcount == 0){
                res.status(404).send("Assignment not updated");
            }
            else{
                res.send("Assignment added successfully");
            }
        }
        
        
    }

    // UPDATE ASSIGNMENT
    async updateAssignment(req, res) {
        const empId = req.params.id;
        const asgId = req.params.id;
        
        const employee = await EmployeeModel.find({ EmpId: empId });
        //console.log(employee);

        if (employee.length == 0) {
            res.status(404).send("Employee Not Found");
            return;
        }
        let result = await AssignmentModel.updateOne(
            { EmpId: empId}, 
            {Assignments : { $elemMatch :{ AssignmentId : asgId}}}, 
            {$set: {
                "AssignmentId" : req.body.AssignmentId,
                "AssignmentName" : req.body.AssignmentName,
                "ActionCode" : req.body.ActionCode,
                "ActionReasonCode" : req.body.ActionReasonCode,
                "ActualTerminationDate" : req.body.ActualTerminationDate,
                "AssignmentCategory" : req.body.AssignmentCategory,
                "assignmentDFF" : req.body.assignmentDFF,
                "assignmentExtraInformation" : req.body.assignmentExtraInformation,
                "AssignmentNumber" : req.body.AssignmentNumber,
                "AssignmentProjectedEndDate" : req.body.AssignmentProjectedEndDate,
                "AssignmentStatus" : req.body.AssignmentStatus,
                "AssignmentStatusTypeId" : req.body.AssignmentStatusTypeId,
                "BusinessUnitId" : req.body.BusinessUnitId,
                "CreationDate" : req.body.CreationDate,
                "DefaultExpenseAccount" : req.body.DefaultExpenseAccount,
                "DepartmentId" : req.body.DepartmentId,
                "EffectiveEndDate" : req.body.EffectiveEndDate,
                "EffectiveStartDate" : req.body.EffectiveStartDate,
                "empreps" : req.body.empreps,
                "EndTime" : req.body.EndTime,
                "Frequency" : req.body.Frequency,
                "FullPartTime" : req.body.FullPartTime,
                "GradeId" : req.body.GradeId,
                "GradeLadderId" : req.body.GradeLadderId,
                "JobId" : req.body.JobId,
                "LastUpdateDate" : req.body.LastUpdateDate,
                "LegalEntityId" : req.body.LegalEntityId,
                "links" : req.body.links,
                "LocationId" : req.body.LocationId,
                "ManagerAssignmentId" : req.body.ManagerAssignmentId,
                "ManagerId" : req.body.ManagerId
                    }});

        //console.log(result);

        if(result.nModified == 0){
            res.status(404).send("Assignment not updated");
        }
        else{
            res.send("Assignment updated successfully");
        }
    }

    // DELETE ASSIGNMENT
    async deleteAssignment(req, res){
        const empId = req.params.id;
        const asgId = req.params.aid;

        const employee = await EmployeeModel.find({ EmpId: empId });
        //console.log(employee);

        if (employee.length == 0) {
            res.status(404).send("Employee Not Found");
            return;
        }

        let result = await EmployeeModel.updateOne(
            { EmpId: empId }, 
            {$pull : {Assignments : {AssignmentId : asgId}}});

        if(result.modifiedCount == 0){
            res.status(404).send("Assignment not found");
        }
        else{
            res.send("Assignment deleted successfully")
        }
    }
}

module.exports = EmployeeDomain;