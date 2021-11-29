import {restaurants} from '../data/restaurants'
import {Restaurant as Irestaurant} from '../Interfaces/restaurant'

export class Restaurant{
    addRestaurant(data:Irestaurant):void { 
            restaurants.push(data);
            console.log('Restaurant Added')
    }

    viewRestaurants():void{
        for(const restaurant of restaurants){
            console.log(restaurant);
        }
    }
    
}