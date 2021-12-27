const OrderModel = require('../Model/orderModel');
const ReceiveOrderModel = require('../Model/receiveOrderModel');

class OrderDomain {
    async viewAllOrder(req, res){
        try {
            const orders = await OrderModel.aggregate([
                {$match : {userName: req.decoded.userName}},
                {$lookup: {from : 'products', localField : 'items.productId', foreignField : 'productId', as: 'productDetails'}},
                {$project: {'productDetails._id': false,'productDetails.category': false , 'productDetails.activeStatus': false ,
                'productDetails.brand': false , 'productDetails.subCategory': false ,
                'productDetails.__v' : false, 'productDetails.offer': false, 
                'productDetails.actualPrice': false, 'productDetails.offeredPrice': false,
                'productDetails.seller': false, 'productDetails.stock': false}}
            ]);
            // .find({userName: req.decoded.userName});
            res.send(orders);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async viewOrderById(req, res){
        try {
            const order = await OrderModel.aggregate([
                {$match : {userName: req.decoded.userName, orderId: req.params.orderId}},
                {$lookup: {from : 'products', localField : 'items.productId', foreignField : 'productId', as: 'productDetails'}},
                {$project: {'productDetails._id': false,'productDetails.category': false , 'productDetails.activeStatus': false ,
                'productDetails.brand': false , 'productDetails.subCategory': false ,
                'productDetails.__v' : false, 'productDetails.offer': false, 
                'productDetails.actualPrice': false, 'productDetails.offeredPrice': false,
                'productDetails.seller': false, 'productDetails.stock': false}}
            ]);
            // .find({orderId: req.params.orderId});
            res.send(order);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async cancelOrder(req, res){
        let orderId = req.params.orderId;
        try {
            const order = await OrderModel.updateOne(
                {orderId: orderId},
                {$set: {activeStatus : false}} );
            const receiveOrder = await ReceiveOrderModel.updateMany(
                {refOrderId: orderId},
                {$set : {activeStatus : false}});
            res.send('Order Canceled successfully')
                }
        catch (err) {
            res.status(500).send(err.message);
        }
    }

    async updateOrder(req,res){
        try{
            const result = await OrderModel.updateOne(
                {orderId: orderId}, 
                {$set : {
                    items : req.body.items,
                    totalPrice : req.body.totalPrice
                    }
                });
            const result2 = await ReceiveOrderModel.updateOne(
                {refOrderId: orderId},
                {$set : {
                    items : req.body.items,
                    totalPrice : req.body.totalPrice
                    }
                });
                if(result.modifiedCount == 0){
                    res.send('Order not found');
                  }
                  else{
                    res.send('Order updated successfully');
                  }
            }
            catch (err) {
              res.status(500).send(err.message);
            }
    }
};

class ReceiveOrder{
    async getOrders(req,res){

        try {
            const orders = await ReceiveOrderModel.aggregate([
                {$match : {seller : req.decoded.userName}},
                {$lookup: {from : 'products', localField : 'productId', foreignField : 'productId', as: 'productDetails'}},
                {$project: {'productDetails._id': false,'productDetails.category': false , 'productDetails.brand': false , 'productDetails.subCategory': false , 
                'productDetails.__v' : false, 'productDetails.offer': false, 'productDetails.activeStatus': false , 'productDetails.productId': false , 
                'productDetails.actualPrice': false, 'productDetails.offeredPrice': false,
                'productDetails.seller': false, 'productDetails.stock': false}},
                {$unwind: '$productDetails'}
            ])
            // .find({seller : req.decoded.userName});
            res.send(orders);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }
}


module.exports.OrderDomain = OrderDomain;
module.exports.ReceiveOrder = ReceiveOrder;