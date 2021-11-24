var data ={
    "vacancies": [
        {
            "Job_Title":"Dot net Engineer",
            "No of vacancy": 5,
            "Experience_yrs": 2,
        },
        {
            "Job_Title":"NodeJs Engineer",
            "No of vacancy": 10,
            "Experience_yrs": 1,
        },
        {
            "Job_Title":"ReactJs Engineer",
            "No of vacancy": 3,
            "Experience_yrs": 3,
        }
    ],
    "Applicants":[
        {
            "Name" : "John",
            "Qualifications": "BE-Cse",
            "Experience_yrs": 2,
            "Job_Title" : "Dot net Engineer"
        },
        {
            "Name" : "Joel",
            "Qualifications": "BE-Cse",
            "Experience_yrs": 1,
            "Job_Title" : "Dot net Engineer"
        },
        {
            "Name" : "Jack",
            "Qualifications": "BE-Cse",
            "Experience_yrs": 2,
            "Job_Title" : "NodeJs Engineer"
        },
        {
            "Name" : "Jim",
            "Qualifications": "BE-Cse",
            "Experience_yrs": 3,
            "Job_Title" : "NodeJs Engineer"
        },
        {
            "Name" : "Tom",
            "Qualifications": "BE-Cse",
            "Experience_yrs": 1,
            "Job_Title" : "ReactJs Engineer"
        },
        {
            "Name" : "Tim",
            "Qualifications": "BE-Cse",
            "Experience_yrs": 4,
            "Job_Title" : "ReactJs Engineer"
        }
    ]
}

var Interview =[]


class vacancies {
    constructor(Job_Title, no_of_vacancy, exp){
        this.Job_Title = Job_Title;
        this.no_of_vacancy = no_of_vacancy;
        this.exp = exp;
    }
    add_vacancy(){
        data.vacancies.push({
            "Job_Title":this.Job_Title,
            "No of vacancy": this.no_of_vacancy,
            "Experience_yrs": this.exp,
        })
    }
    show_vacancy(){
        return (data.vacancies)
    }
}
console.log(data.vacancies)
var vac = new vacancies("PHP Engineer", 3 , 2)
vac.add_vacancy()
console.log(vac.show_vacancy())


class applicnts{
    constructor(name, qualifications, exp, Job_Title){
        this.name= name;
        this.qualifications = qualifications;
        this.Job_Title = Job_Title;
        this.exp = exp;
    }
    add_applicant(){
        data.Applicants.push({
            "Name" : this.name,
            "Qualifications": this.qualifications,
            "Experience_yrs": this.exp,
            "Job_Title" : this.Job_Title
        })
    }
    show_applicant(){
        return(data.Applicants)
    }
}

class Schedule_Interview {
    constructor(Job_Title){
        this.Job_Title = Job_Title;
    }
    Schedule(){
        
        for(var i=0; i<=data.vacancies.length - 1; i++){
            for(var j=0; j<=data.Applicants.length - 1; j++){
               if((data.vacancies[i].Job_Title  == this.Job_Title) && (data.Applicants[j].Job_Title == this.Job_Title) && data.vacancies[i].Experience_yrs <= data.Applicants[j].Experience_yrs){
                console.log(this.Job_Title)
                   Interview.push({
                       "Job_Title" : this.Job_Title,
                       "Name": data.Applicants[j].Name
                   })
                
               }
            }
        }
    }
    show_schedule(){
        console.log(Interview)
            return(Interview);
    }
}

var x = new Schedule_Interview("ReactJs Engineer")
x.Schedule()
console.log(x.show_schedule())


