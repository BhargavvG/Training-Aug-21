"use strict";
exports.__esModule = true;
exports.Customer = void 0;
var customers_1 = require("../data/customers");
var Customer = /** @class */ (function () {
    function Customer() {
    }
    Customer.prototype.addCustomer = function (data) {
        var result = customers_1.customers.filter(function (cust) { return cust.userName = data.userName; });
        if (result.length == 0) {
            customers_1.customers.push(data);
            console.log('Customer Added');
        }
        else {
            console.log('User already available');
        }
    };
    Customer.prototype.viewCustomers = function () {
        for (var _i = 0, customers_2 = customers_1.customers; _i < customers_2.length; _i++) {
            var customer = customers_2[_i];
            console.log(customer);
        }
    };
    return Customer;
}());
exports.Customer = Customer;
