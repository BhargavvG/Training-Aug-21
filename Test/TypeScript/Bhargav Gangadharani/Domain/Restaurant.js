"use strict";
exports.__esModule = true;
exports.Restaurant = void 0;
var restaurants_1 = require("../data/restaurants");
var Restaurant = /** @class */ (function () {
    function Restaurant() {
    }
    Restaurant.prototype.addRestaurant = function (data) {
        restaurants_1.restaurants.push(data);
        console.log('Restaurant Added');
    };
    Restaurant.prototype.viewRestaurants = function () {
        for (var _i = 0, restaurants_2 = restaurants_1.restaurants; _i < restaurants_2.length; _i++) {
            var restaurant = restaurants_2[_i];
            console.log(restaurant);
        }
    };
    return Restaurant;
}());
exports.Restaurant = Restaurant;
