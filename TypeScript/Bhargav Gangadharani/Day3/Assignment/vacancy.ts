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


export class Vacancies {

    setVacancyData(data:IVacancy):void {
        vacancyList.push(data);
    }


    removeVacancy(VacancyID:number){
        for (var item of vacancyList){
            if(VacancyID==item.VacancyID){
                var index=vacancyList.indexOf(item);
                vacancyList.splice(index,1);
            }
        }
    }
}