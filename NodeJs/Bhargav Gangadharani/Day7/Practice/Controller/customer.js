const express = require('express');
let app = express();
const Joi = require('Joi');
const fs = require('fs');
const router = express.Router();
router.use(express.json());

var customers = [
    {
        "id" : 1, 
        "name": "John"
    },
    {
        "id" : 2, 
        "name": "Jonny"
    },
    {
        "id" : 3, 
        "name": "Jim"
    },
    {
        "id" : 4, 
        "name": "Jordan"
    }
];




//  will return Customer list in JSON format.

router.get('/' ,(req , res , next)=>{
    res.send(customers)
    next();
})


//  will search a particular record from the customer list.

router.get('/:id', (req, res, next) => {
    let customer = customers.find(c => c.id === parseInt(req.params.id))
    if(!customer) {
        res.status(404).send('Id entered is not there in data');
        return;
    }
    res.status(200).send(customer);
    next();
});


// will insert a new customer object in the customer list.

router.post('/', (req, res, next) => {
    console.log("post executed")
    const schema =Joi.object({
        name: Joi.string().min(3).required()
    });
    const schemaResult = schema.validate(req.body);
    if(schemaResult.error){
        res.status(400).send(schemaResult.error.details[0].message)
        return;
    }
    console.log(req.body.name)

    let customer ={
        id: customers.length + 1,
        name: req.body.name
    };
    customers.push(customer);
    res.send(customer);
    next();
});

function validateCustomer(customer) {
    const schema =Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(customer);
}


// update a name of existing customer with customer id

router.put('/:id', (req, res, next) => {
    let customer = customers.find(c => c.id === parseInt(req.params.id))
    if(!customer) {
        res.status(404).send('Id entered is not there in data');
        return;
    }
    const { error } = validateCustomer(req.body);
    if(error){
        res.status(400).send(schemaResult.error.details[0].message)
        return;
    }

    customer.name = req.body.name;
    res.send(customer);
    next();
});


// will delete a record from the customer list.

router.delete('/:id', (req, res, next) => {
    let customer = customers.find(c => c.id === parseInt(req.params.id))
    if(!customer) {
        res.status(404).send('Id entered is not there in data');
        return;
    }

    const index = customers.indexOf(customer);
    customers.splice(index, 1);

    res.send(customer);
    next();
})

module.exports = router;

