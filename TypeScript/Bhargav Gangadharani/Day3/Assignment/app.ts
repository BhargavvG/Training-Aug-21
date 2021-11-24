import {Vacancies, ApplicantData, Hiring} from "./classes";

var hr = new Hiring();
var applicant = new ApplicantData();
var vacancy  = new Vacancies();


hr.GenerateReport();
hr.HiringApplicant();
hr.scheduleInterview();

var results = hr.storingResult();
for(var item of results){
    console.log(item);
}


applicant.setApplicantData({
    ApplicantID:5,
    Name:"Ashwin",
    Age:24,
    Experience:4,
    Address:"Ahmedabad",
    VacancyID:3
});
applicant.ShowApplicants();

vacancy.setVacancyData({
    VacancyID:3,
    DateOfInterview:new Date(24-11-2021),
    Post:"NodeJs/ReactJs", 
    Experience:0, 
    venue:"Ekyarth",
    TotalSeat:7,
    Salary:8000,
    status:false});
vacancy.removeVacancy(2);