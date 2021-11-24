var Product = /** @class */ (function () {
    function Product(id, name, price, quant, expiry) {
        this.previousQuantity = 0;
        this.ID = id;
        this.Name = name;
        this.Price = price;
        this.Quantity = quant;
        this.Expiry = expiry;
        this.previousQuantity = quant;
    }
    Product.prototype.reorderRequest = function () {
        this.Quantity = this.Quantity + this.previousQuantity;
        console.log("".concat(this.Name, " has been ordered again. Current Quantity is ").concat(this.Quantity));
    };
    Product.prototype.order = function (q) {
        if (q > this.Quantity) {
            console.log("You cannot place more than ".concat(this.Quantity, " items"));
        }
        else {
            this.Quantity = this.Quantity - q;
            console.log("Order for ".concat(this.Name, " has placed successfully"));
            if (this.Quantity < 5) {
                this.reorderRequest();
            }
        }
    };
    return Product;
}());
var Product1 = new Product(1, "Pizza", 199, 10);
var Product2 = new Product(2, "Pasta", 149, 15);
var Product3 = new Product(3, "Burger", 49, 20);
Product1.order(2);
Product2.order(5);
Product3.order(10);
Product1.order(10);
Product1.order(4);
