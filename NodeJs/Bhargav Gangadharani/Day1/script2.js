let data ={
    "customers": [
        {
            "username":"Bhargav",
            "phonenumber": 8799585477,
            "bikename":"bike1",
            "days": 2
        },
        {
            "username":"Aakash",
            "phonenumber": 8799585477,
            "bikename":"bike1",
            "days": 6
        },
        {
            "username":"Joel",
            "phonenumber": 8799585477,
            "bikename":"bike1",
            "days": 8
        },
        {
            "username":"Samay",
            "phonenumber": 8799585477,
            "bikename":"bike1",
            "days": 12
        }
    ]
}




class Mobike {
    constructor(Bikenumber, Phonenumber, name, days){
        this.Bikenumber = Bikenumber;
        this.Phonenumber = Phonenumber;
        this.name = name;
        this.days = days;
    }
    calCharge(){
        
        if(this.days<=5){
            var charge  = this.days*500;
        }
        else if(this.days<=10 && this.days>5){
            charge = (this.days - 5)*400 + 2500
        }
        else{
            charge = (this.days - 10)*200 + 4500
        }
        return charge;
    }
}



for (var i in data.customers) {
    var username = data.customers[i].username;
    var phonenumber = data.customers[i].phonenumber;
    var bikename = data.customers[i].bikename;
    var days = data.customers[i].days;


    let rent = new Mobike(bikename, phonenumber, username, days)

    msg = username + " needs " + bikename + " on rent for " + days + " days. So amount to be paid will be :" + rent.calCharge();
    console.log(msg)
    console.log(rent.calCharge())

}