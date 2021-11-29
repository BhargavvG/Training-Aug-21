import {customers} from '../data/customers'
import {Customer as Icustomer} from '../Interfaces/customer'

export class Customer{
    addCustomer(data:Icustomer):void { 
        var result = customers.filter( cust => cust.userName = data.userName)
        if(result.length == 0){
            customers.push(data);
            console.log('Customer Added')
        }
        else{
            console.log('User already available')
        }
    }

    viewCustomers():void{
        for(const customer of customers){
            console.log(customer);
        }
    }
    
}