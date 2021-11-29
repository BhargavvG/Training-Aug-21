import {vacancyList as VL} from './vacancy'
import {ApplicantList as AL} from './applicantData'

export class Hiring{

    //constructor() { }

   
    scheduleInterview():void{
        for(var item of VL){
            if(item.status==false){
                console.log(`Interview for ${item.Post} On ${item.DateOfInterview}`);
            }
        }
    }

    storingResult():({ID:number,Name:string,Result:number})[]{
        var ApplicantResult:({ID:number,Name:string,Result:number})[]=[];

        for(var item of AL){
            if(item.Result!=null){
                ApplicantResult.push({ID:item.VacancyID,Name:item.Name,Result:item.Result});
            }
        }
        
        return ApplicantResult;
    }

    HiringApplicant():void{
        console.log("List of Hired Applicant")
        for(var item of AL){
            if(item.Result!=null && item.Result>60){
                console.log(`${item.Name}\t${item.Result}`);
            }
        }
    }

    GenerateReport():void{
        for(var item of VL){
            if(item.status==true){
                console.log(`For Post of ${item.Post}`)
                for(var a of AL){
                    if(a.VacancyID==item.VacancyID){
                         if(a.Result>60){
                            console.log(`${a.ApplicantID}  ${a.Name}  ${a.Result}  Selected`);
                         }else{
                            console.log(`${a.ApplicantID}  ${a.Name}  ${a.Result}  Not Selected`);
                         }
                    }
                }
            }else{
                console.log(`Interview for the Post of ${item.Post} to be held on ${item.DateOfInterview}`);
            }
        }
    }
}
