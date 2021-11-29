"use strict";
// Typescript Practical Test.
exports.__esModule = true;
// * Online table reservation in the restaurant for specific date and time. This will
// 1. Provide the list of restaurants in the country so that the user can choose accordingly.
// 2. Provide the list of tables available for online reservation at different dining rooms in the restaurant.
// 3. Mention the number of guests that can be accommodated on the particular table.
// 4. Accept the booking for tables.
// 5. Online table reservations are done 6hrs in advance for the current date.
// 6. Table reservation can be done up to one month in advance.
// 7. Give a token number to the customer as an acknowledgement of booking.
var customer_1 = require("./Domain/customer");
var Reservation_1 = require("./Domain/Reservation");
var Restaurant_1 = require("./Domain/Restaurant");
var customer = new customer_1.Customer();
var reservation = new Reservation_1.Reservation();
var restaurant = new Restaurant_1.Restaurant();
// View Restaurants.
restaurant.viewRestaurants();
// Add Restaurant.
restaurant.addRestaurant({ restaurantId: 5,
    name: 'Mcd',
    address: "University Road",
    city: "Rajkot",
    state: 'Gujrat',
    country: 'India' });
// View Customers.
customer.viewCustomers();
// Add Customer
customer.addCustomer({ userName: 15,
    name: 'Samir',
    address: "Rajkot",
    phoneNo: 8998889999 });
// View reservations
reservation.viewReservations();
// Reserve Table.
reservation.reserveTable({ reservId: 101,
    restaurantId: 1,
    customerName: 'Bhargav',
    diningRoom: 'Ac',
    time: new Date(2021, 11, 29, 23, 0, 0),
    tableOf: 4,
    token: 1024894 });
