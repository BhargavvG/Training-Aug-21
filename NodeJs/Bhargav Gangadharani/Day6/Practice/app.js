const express = require('express');
const app = express();
const Joi = require('Joi');
app.use(express.json());

var  customers = [
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

// 1.Create a Restful API, which will return Customer list in JSON format.
// http://localhost:3000/customers

app.get('/customers', (req, res) => {
    res.send(customers);
});


// 2. Create a Restful API which will search a particular record from the customer list.
// http://localhost:3000/customers/1

app.get('/customers/:id', (req, res) => {
    let customer = customers.find(c => c.id === parseInt(req.params.id))
    if(!customer) {
        res.status(404).send('Id entered is not there in data');
        return;
    }
    res.status(200).send(customer);
});


// 3. Create a Restful API which will insert a new customer object in the customer list.
// http://localhost:3000/customer

app.post('/customers', (req, res) => {
    const schema =Joi.object({
        name: Joi.string().min(3).required()
    });
    const schemaResult = schema.validate(req.body);
    if(schemaResult.error){
        res.status(400).send(schemaResult.error.details[0].message)
        return;
    }

    let customer ={
        id: customers.length + 1,
        name: req.body.name
    };
    customers.push(customer);
    res.send(customer);
});

function validateCustomer(customer) {
    const schema =Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(customer);
}


// 4. Create a Restful API which update a name of existing customer whose customer ID is 1
// http://locahost:3000/customer

app.put('/customers/:id', (req, res) => {
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
    res.send(customer)
});


// 5. Create a Restful API which will delete a record from the customer list.
// http://localhost:3000/customer

app.delete('/customers/:id', (req, res) => {
    let customer = customers.find(c => c.id === parseInt(req.params.id))
    if(!customer) {
        res.status(404).send('Id entered is not there in data');
        return;
    }

    const index = customers.indexOf(customer);
    customers.splice(index, 1);

    res.send(customer);
})



app.listen(3000);