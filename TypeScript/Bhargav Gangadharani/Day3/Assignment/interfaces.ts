export interface IVacancy{
    VacancyID: number;
    DateOfInterview : Date;
    Post: string;
    Experience:number;
    TotalSeat:number;
    Salary:number;
    venue:string;
    status:boolean;
    Bond?:number;
}

export interface IApplicantData{
    ApplicantID: number;
    Name:string;
    Age:number;
    Experience:number;
    Address:string;
    VacancyID:number;
    Result?:number;
}


