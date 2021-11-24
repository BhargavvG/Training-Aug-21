interface Inventory{
    ID: number;
    Name:string;
    Price:number;
    Quantity:number;
}

class Product implements Inventory{
    ID: number;
    Name:string;
    Price:number;
    Quantity:number;
    Expiry?:Date;
    private previousQuantity:number = 0

    constructor(id:number,name:string,price:number,quant:number,expiry?:Date){
        this.ID =  id;
        this.Name=name;
        this.Price=price;
        this.Quantity=quant;
        this.Expiry=expiry;
        this.previousQuantity=quant;
    }

    private reorderRequest(){
        this.Quantity=this.Quantity+this.previousQuantity;
        console.log(`${this.Name} has been ordered again. Current Quantity is ${this.Quantity}`);
    }

    order(q:number){
        if(q>this.Quantity){
            console.log(`You cannot place more than ${this.Quantity} items`);
        }else{
            this.Quantity=this.Quantity-q;
            console.log(`Order for ${this.Name} has placed successfully`);
            if(this.Quantity<5){
                this.reorderRequest();
            }
        }
    }        
}

var Product1 = new Product(1,"Pizza",199,10);
var Product2 = new Product(2,"Pasta",149,15);
var Product3 = new Product(3,"Burger",49,20);


Product1.order(2);
Product2.order(5);
Product3.order(10);
Product1.order(10);
Product1.order(4);

