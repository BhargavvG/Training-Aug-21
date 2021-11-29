import {vacancyList as VL} from './vacancy'

export interface IApplicantData{
    ApplicantID: number;
    Name:string;
    Age:number;
    Experience:number;
    Address:string;
    VacancyID:number;
    Result?:number;
}


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

export class ApplicantData {
        
    setApplicantData(data:IApplicantData):void{
        for(var item of VL){
            if(data.VacancyID==item.VacancyID){
                if(item.status==true && data.Result!=null){
                    ApplicantList.push(data);
                }else {
                    console.log("This interview is completed please enter the result of applicant");
                }
                if(item.status==false && data.Result==null){
                    ApplicantList.push(data);
                }else{
                    console.log("This interview is not completed please do not enter the result of applicant");
                }
                
            }else{
                console.log(`No vacancy available for VacancyID ${data.VacancyID}`);
            }
        }   
    }

    ShowApplicants(){
        for(var item of ApplicantList){
            console.log(item);
        }
    }
    
}