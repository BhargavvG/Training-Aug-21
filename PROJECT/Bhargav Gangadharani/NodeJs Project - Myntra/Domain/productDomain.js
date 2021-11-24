const ProductModel = require('../Model/ProductModel');

class ProductDomain { 
    async getAllProducts(req, res){
        try {
            // const products = await ProductModel.find({activeStatus: true});
            const products = await ProductModel.aggregate([
                {$match : {activeStatus: true}},
                {$lookup: {from : 'categories', localField : 'category', foreignField : 'categoryId', as: 'category'}},
                {$unwind: "$category"},
                {$lookup: {from : 'offers', localField : 'offer', foreignField : 'offerId', as: 'offer'}},
                {$unwind: "$offer"},
                {$lookup: {from : 'brands', localField : 'brand', foreignField : 'brandId', as: 'brand'}},
                {$unwind: "$brand"},
                {$project: {
                    'category._id': false,'category.details': false , 'category.__v' : false, 'category.activeStatus': false,
                    'offer._id': false,'offer.details': false , 'offer.__v' : false, 'offer.activeStatus': false,
                    'brand._id': false,'brand.details': false , 'brand.__v' : false, 'brand.activeStatus': false
                }}
            ]);
            res.send(products);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async searchBy(req, res){
        let data= {activeStatus:true};
        if(req.query.category)  data.category = parseInt(req.query.category);
        if(req.query.brand)  data.brand = parseInt(req.query.brand);
        if(req.query.offer)  data.offer = parseInt(req.query.offer);
        try {
            const products = await ProductModel.aggregate([
                {$match : data},
                {$lookup: {from : 'categories', localField : 'category', foreignField : 'categoryId', as: 'category'}},
                {$unwind: "$category"},
                {$lookup: {from : 'offers', localField : 'offer', foreignField : 'offerId', as: 'offer'}},
                {$unwind: "$offer"},
                {$lookup: {from : 'brands', localField : 'brand', foreignField : 'brandId', as: 'brand'}},
                {$unwind: "$brand"},
                {$project: {
                    'category._id': false,'category.details': false , 'category.__v' : false, 'category.activeStatus': false,
                    'offer._id': false,'offer.details': false , 'offer.__v' : false, 'offer.activeStatus': false,
                    'brand._id': false,'brand.details': false , 'brand.__v' : false, 'brand.activeStatus': false
                }}
            ]);
            res.send(products);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getProductById(req, res){
        try {
            const product = await ProductModel.aggregate([
                {$match : {activeStatus: true, productId: req.params.productId}},
                {$lookup: {from : 'categories', localField : 'category', foreignField : 'categoryId', as: 'category'}},
                {$unwind: "$category"},
                {$lookup: {from : 'offers', localField : 'offer', foreignField : 'offerId', as: 'offer'}},
                {$unwind: "$offer"},
                {$lookup: {from : 'brands', localField : 'brand', foreignField : 'brandId', as: 'brand'}},
                {$unwind: "$brand"},
                {$project: {
                    'category._id': false,'category.details': false , 'category.__v' : false, 'category.activeStatus': false,
                    'offer._id': false,'offer.details': false , 'offer.__v' : false, 'offer.activeStatus': false,
                    'brand._id': false,'brand.details': false , 'brand.__v' : false, 'brand.activeStatus': false
                }}
            ]);
            res.send(product);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }


    async getmyProducts(req, res){
        try {
            const products = await ProductModel.aggregate([
                {$match : {activeStatus: true, seller : req.decoded.userName}},
                {$lookup: {from : 'categories', localField : 'category', foreignField : 'categoryId', as: 'category'}},
                {$unwind: "$category"},
                {$lookup: {from : 'offers', localField : 'offer', foreignField : 'offerId', as: 'offer'}},
                {$unwind: "$offer"},
                {$lookup: {from : 'brands', localField : 'brand', foreignField : 'brandId', as: 'brand'}},
                {$unwind: "$brand"},
                {$project: {
                    'category._id': false,'category.details': false , 'category.__v' : false, 'category.activeStatus': false,
                    'offer._id': false,'offer.details': false , 'offer.__v' : false, 'offer.activeStatus': false,
                    'brand._id': false,'brand.details': false , 'brand.__v' : false, 'brand.activeStatus': false
                }}
            ]);
            res.send(products);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getmyProductById(req, res){
        try {
            const product = await ProductModel.aggregate([
                {$match : {activeStatus: true, productId: req.params.productId, seller: req.decoded.userName}},
                {$lookup: {from : 'categories', localField : 'category', foreignField : 'categoryId', as: 'category'}},
                {$unwind: "$category"},
                {$lookup: {from : 'offers', localField : 'offer', foreignField : 'offerId', as: 'offer'}},
                {$unwind: "$offer"},
                {$lookup: {from : 'brands', localField : 'brand', foreignField : 'brandId', as: 'brand'}},
                {$unwind: "$brand"},
                {$project: {
                    'category._id': false,'category.details': false , 'category.__v' : false, 'category.activeStatus': false,
                    'offer._id': false,'offer.details': false , 'offer.__v' : false, 'offer.activeStatus': false,
                    'brand._id': false,'brand.details': false , 'brand.__v' : false, 'brand.activeStatus': false
                }}
            ]);
            res.send(product);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async addProduct(req, res){
        try {
            let productdata = req.body;
            const product = new ProductModel(productdata);
      
            await product.save();
          
            res.send('Product Added');
      
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async updateProduct(req, res){
        let productId = req.params.productId;
        try{
            const result = await ProductModel.updateOne(
                {productId : productId, seller: req.decoded.userName}, 
                {$set : {
                   category : req.body.category,
                   details : req.body.details,
                   offer : req.body.offer,
                   brand : req.body.brand,
                   actualPrice : req.body.actualPrice,
                   offeredPrice : req.body.offeredPrice,
                   seller : req.body.seller,
                   stock : req.body.stock
                    }
                });
                if(result.modifiedCount == 0){
                    res.send('Product not found');
                  }
                  else{
                    res.send('Product updated successfully');
                  }
            }
            catch (err) {
              res.status(500).send(err.message);
            }
    }

    async removeProduct(req, res){
        let productId = req.params.productId;

        try {
            const product = await ProductModel.updateOne(
                {productId: productId, seller: req.decoded.userName},
                {$set: {activeStatus : false}} );
                res.send('Product removed successfully')
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getDeletedProducts(req, res){
        try {
            const products = await ProductModel.find({activeStatus: false, seller: req.decoded.userName});
            res.send(products);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async restoreProduct(req, res){
        let productId = req.params.productId;

        try{
            const product = await ProductModel.updateOne(
                {productId: productId, activeStatus:false, seller: req.decoded.userName}, 
                {$set: {activeStatus: true}});
                res.send('Product restored successfully')
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }

   

}

module.exports = ProductDomain;