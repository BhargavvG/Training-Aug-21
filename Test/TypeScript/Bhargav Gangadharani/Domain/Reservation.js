"use strict";
exports.__esModule = true;
exports.Reservation = void 0;
var reservation_1 = require("../data/reservation");
var restaurants_1 = require("../data/restaurants");
var Reservation = /** @class */ (function () {
    function Reservation() {
    }
    Reservation.prototype.reserveTable = function (data) {
        var restaurant = restaurants_1.restaurants.filter(function (rest) { return rest.restaurantId = data.restaurantId; });
        if (restaurant.length == 0) {
            console.log('No Restaurant Found');
            return;
        }
        // Reservation should be done before 6 hours.
        var diffOfHours = (data.time.getTime() - new Date().getTime()) / (1000 * 36000 * 12);
        if (diffOfHours > 6) {
            reservation_1.reservations.push(data);
            console.log('Tables Booked Successfully');
        }
    };
    Reservation.prototype.viewReservations = function () {
        for (var _i = 0, reservations_1 = reservation_1.reservations; _i < reservations_1.length; _i++) {
            var reserv = reservations_1[_i];
            console.log(reserv);
        }
    };
    return Reservation;
}());
exports.Reservation = Reservation;
