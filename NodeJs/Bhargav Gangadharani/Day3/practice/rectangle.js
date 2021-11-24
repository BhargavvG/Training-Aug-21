class Rectangle{
    area =(l,b)=>{
        return l * b;
    }
    perimeter = (l,b)=>{
        return 2*(l+b);
    }
}

module.exports = Rectangle

// var rec = new Rectangle()
// console.log(rec.area(5,10))
// console.log(rec.perimeter(5,10))