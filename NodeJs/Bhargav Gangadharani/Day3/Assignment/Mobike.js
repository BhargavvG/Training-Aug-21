class Mobike{
    constructor(BikeName, Phonenumber, username, days){
        this.BikeName = BikeName;
        this.Phonenumber = Phonenumber;
        this.username = username;
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

// var user1 = new Mobike("Bike1", "9989898989","name1" , 6)
// console.log(user1.calCharge())

module.exports = Mobike
