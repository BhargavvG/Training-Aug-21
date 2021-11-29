"use strict";
exports.__esModule = true;
var vacancy_1 = require("./vacancy");
var applicantData_1 = require("./applicantData");
var hiring_1 = require("./hiring");
var hr = new hiring_1.Hiring();
var applicant = new applicantData_1.ApplicantData();
var vacancy = new vacancy_1.Vacancies();
// hr.GenerateReport();
// hr.HiringApplicant();
// hr.scheduleInterview();
// var results = hr.storingResult();
// for(var item of results){
//     console.log(item);
// }
// applicant.setApplicantData({
//     ApplicantID:5,
//     Name:"Ashwin",
//     Age:24,
//     Experience:4,
//     Address:"Ahmedabad",
//     VacancyID:3
// });
// applicant.ShowApplicants();
// vacancy.removeVacancy(2);
var newvacData = {
    VacancyID: 3,
    DateOfInterview: new Date(24 - 11 - 2021),
    Post: "NodeJs/ReactJs",
    Experience: 0,
    venue: "Ekyarth",
    TotalSeat: 7,
    Salary: 8000,
    status: false
};
var newApplicantData = {
    ApplicantID: 5,
    Name: "Ashwin",
    Age: 24,
    Experience: 4,
    Address: "Ahmedabad",
    VacancyID: 3
};
console.log("1. Set Vacancy Data \n 2. Remove Vacancy \n \n3. Show Applicants \n 4. Set Applicants \n 5. Schedule Interview \n \n6. Hiring Applicant \n 7. Generate Report\n ");
var x = 1;
switch (x) {
    case 1: {
        // Set Vacancy Data
        vacancy.setVacancyData(newvacData);
        break;
    }
    case 2: {
        // Remove Vacancy id 2
        vacancy.removeVacancy(2);
        break;
    }
    case 3: {
        // Show Applicants
        applicant.ShowApplicants();
        break;
    }
    case 4: {
        // Set Applicants
        applicant.setApplicantData(newApplicantData);
        break;
    }
    case 5: {
        // Schedule Interview
        hr.scheduleInterview();
        break;
    }
    case 6: {
        // Hiring Applicant
        hr.HiringApplicant();
        break;
    }
    case 7: {
        // Generate Report
        hr.GenerateReport();
        break;
    }
}
