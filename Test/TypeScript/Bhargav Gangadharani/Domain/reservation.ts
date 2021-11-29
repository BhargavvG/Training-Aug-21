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

        // Reservation should be done before 6 hours.
       var diff = (data.time.getTime()- new Date().getTime())/(1000 * 36000 * 12)
       console.log(diff)
       console.log(data.time.getTime())
       console.log(new Date().getTime())
        if (diff < 6){
            console.log(diff)
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
