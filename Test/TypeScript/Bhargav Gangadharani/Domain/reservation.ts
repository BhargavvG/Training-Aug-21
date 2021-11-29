import {reservations} from '../data/reservation'
import {restaurants} from '../data/restaurants'
import {tables} from '../data/table'
import {Reservation as Ireservation} from '../Interfaces/reservation'

export class Reservation{
    reserveTable(data:Ireservation):void{
        const restaurant = restaurants.filter( rest => rest.restaurantId = data.restaurantId)
        if(restaurant.length == 0){
            console.log('No Restaurant Found');
            return;
        }

        reservations.push(data);
        console.log('Tables Booked Successfully')
    }

    viewReservations(){
        for (const reserv of reservations){
            console.log(reserv);
        }
    }
}
