export interface Reservation{
    reservId: number,
    restaurantId: number,
    diningRoom : string,
    customerName : string,
    time: Date,
    tableOf: number,
    token: number
}