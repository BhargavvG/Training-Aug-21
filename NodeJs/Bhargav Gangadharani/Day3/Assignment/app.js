var Mobike = require('./Mobike')
var data = require('./data')


data.data.customers.forEach((i)=> {
    var username = i.username;
    var phonenumber = i.phonenumber;
    var bikename = i.bikename;
    var days = i.days;


    let rent = new Mobike(bikename, phonenumber, username, days)
    rent.calCharge();
    console.log(`User: ${i.username} Your Total charge for ${i.days} days will be ${rent.calCharge()}`)
})
// var obj = new Mobike("Bike1", "9989898989","name1" , 6)
// console.log(obj.calCharge())