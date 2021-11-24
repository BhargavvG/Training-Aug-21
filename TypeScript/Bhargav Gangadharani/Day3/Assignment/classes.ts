import {IVacancy, IApplicantData} from "./interfaces";
import {vacancyList as VL, ApplicantList as AL} from "./list";
    export class Vacancies {

        setVacancyData(data:IVacancy):void {
            VL.push(data);
        }


        removeVacancy(VacancyID:number){
            for (var item of VL){
                if(VacancyID==item.VacancyID){
                    var index=VL.indexOf(item);
                    VL.splice(index,1);
                }
            }
        }
    }

    export class ApplicantData {
        
        setApplicantData(data:IApplicantData):void{
            for(var item of VL){
                if(data.VacancyID==item.VacancyID){
                    if(item.status==true && data.Result!=null){
                        AL.push(data);
                    }else {
                        console.log("This interview is completed please enter the result of applicant");
                    }
                    if(item.status==false && data.Result==null){
                        AL.push(data);
                    }else{
                        console.log("This interview is not completed please do not enter the result of applicant");
                    }
                    
                }else{
                    console.log(`No vacancy available for VacancyID ${data.VacancyID}`);
                }
            }   
        }

        ShowApplicants(){
            for(var item of AL){
                console.log(item);
            }
        }
        
    }

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
