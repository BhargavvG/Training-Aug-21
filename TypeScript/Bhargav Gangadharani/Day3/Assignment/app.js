"use strict";
exports.__esModule = true;
var classes_1 = require("./classes");
var hr = new classes_1.Hiring();
var applicant = new classes_1.ApplicantData();
var vacancy = new classes_1.Vacancies();
hr.GenerateReport();
hr.HiringApplicant();
hr.scheduleInterview();
var results = hr.storingResult();
for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
    var item = results_1[_i];
    console.log(item);
}
applicant.setApplicantData({
    ApplicantID: 5,
    Name: "Ashwin",
    Age: 24,
    Experience: 4,
    Address: "Ahmedabad",
    VacancyID: 3
});
applicant.ShowApplicants();
vacancy.setVacancyData({
    VacancyID: 3,
    DateOfInterview: new Date(24 - 11 - 2021),
    Post: "NodeJs/ReactJs",
    Experience: 0,
    venue: "Ekyarth",
    TotalSeat: 7,
    Salary: 8000,
    status: false
});
vacancy.removeVacancy(2);
