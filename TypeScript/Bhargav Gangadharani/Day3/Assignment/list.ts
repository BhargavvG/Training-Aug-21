import {IApplicantData, IVacancy} from "./interfaces";


export var vacancyList:IVacancy[] = [
    {
        VacancyID:1,
        DateOfInterview:new Date(28-11-2021),
        Post:".Net Developer", 
        Experience:2, 
        venue:"Ahmedabad",
        TotalSeat:7,
        Salary:30000,
        Bond:2,
        status:true
    },
    {
        VacancyID:2,
        DateOfInterview:new Date(26-11-2021),
        Post:"React Developer",
        Experience:2,
        venue:"Ahmedabad",
        TotalSeat:7,
        Salary:30000,
        status:false
    }
]

export var ApplicantList:IApplicantData[] = [
    {
        ApplicantID:1,
        Name:"Varun",
        Age:22,
        Experience:2,
        Address:"Ahmedabad",
        VacancyID:2
    },
    {
        ApplicantID:2,
        Name:"Tarun",
        Age:23,
        Experience:2,
        Address:"Vadodara",
        VacancyID:1,
        Result:60
    },
    {
        ApplicantID:3,
        Name:"Aarun",
        Age:22,
        Experience:1,
        Address:"Ahmedabad",
        VacancyID:2
    },
    {
        ApplicantID:4,
        Name:"Kevin",
        Age:23,
        Experience:3,
        Address:"Rajkot",
        VacancyID:1,
        Result:50
    }
]
        



