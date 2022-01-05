const ProductModel = require('../Model/ProductModel');

class ProductDomain { 
    async getAllProducts(req, res){
        let pageNo = parseInt(req.query.pageNo) || 1;
        let limit = parseInt(req.query.quantity) || 10;
        try {
            // const products = await ProductModel.find({activeStatus: true});
            const products = await ProductModel.aggregate([
              { $match: { activeStatus: true } },
              {
                $lookup: {
                  from: "categories",
                  localField: "category",
                  foreignField: "categoryId",
                  as: "category",
                },
              },
              { $unwind: "$category" },
              {
                $lookup: {
                  from: "subcategories",
                  localField: "subCategory",
                  foreignField: "subCategoryId",
                  as: "subCategory",
                },
              },
              { $unwind: "$subCategory" },
              {
                $lookup: {
                  from: "offers",
                  localField: "offer",
                  foreignField: "offerId",
                  as: "offer",
                },
              },
              { $unwind: "$offer" },
              {
                $lookup: {
                  from: "brands",
                  localField: "brand",
                  foreignField: "brandId",
                  as: "brand",
                },
              },
              { $unwind: "$brand" },
              {
                $project: {
                  "category._id": false,
                  "category.details": false,
                  "category.__v": false,
                  "category.activeStatus": false,
                  "subCategory._id": false,
                  "subCategory.__v": false,
                  "subCategory.activeStatus": false,
                  "offer._id": false,
                  "offer.details": false,
                  "offer.__v": false,
                  "offer.activeStatus": false,
                  "brand._id": false,
                  "brand.details": false,
                  "brand.__v": false,
                  "brand.activeStatus": false,
                },
              },
            ]).skip((pageNo-1)*limit).limit(limit);
            res.send(products);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }
    
    async  search(req, res) {
        try{
            let expr = req.params.data.replace(/ /g, '.*|.*')
            expr = `.*${expr}.*`
            const products = await ProductModel.aggregate([
                {$match : {productName : {$regex : expr, $options:'i'},activeStatus: true }},
                {$lookup: {from : 'categories', localField : 'category', foreignField : 'categoryId', as: 'category'}},
                {$unwind: "$category"},
                {$lookup: {from : 'subcategories', localField : 'subCategory', foreignField : 'subCategoryId', as: 'subCategory'}},
                {$unwind: "$subCategory"},
                {$lookup: {from : 'offers', localField : 'offer', foreignField : 'offerId', as: 'offer'}},
                {$unwind: "$offer"},
                {$lookup: {from : 'brands', localField : 'brand', foreignField : 'brandId', as: 'brand'}},
                {$unwind: "$brand"},
                {$project: {
                    'category._id': false,'category.details': false , 'category.__v' : false, 'category.activeStatus': false,
                    "subCategory._id": false, "subCategory.__v": false, "subCategory.activeStatus": false,
                    'offer._id': false,'offer.details': false , 'offer.__v' : false, 'offer.activeStatus': false,
                    'brand._id': false,'brand.details': false , 'brand.__v' : false, 'brand.activeStatus': false
                }}
            ]);
            // .find({productName : {$regex : expr, $options:'i'}})
            res.send(products)
            
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async searchBy(req, res){
        let pageNo = parseInt(req.query.pageNo) || 1;
        let limit = parseInt(req.query.quantity) || 10;
        let data= {activeStatus:true};
        let sort = {activeStatus: 1}
        if(req.query.category)  data.category = parseInt(req.query.category);
        if(req.query.subCategory)  data.subCategory = parseInt(req.query.subCategory);
        if(req.query.brand)  data.brand = parseInt(req.query.brand);
        if(req.query.offer)  data.offer = parseInt(req.query.offer);
        if(req.query.price) {
            let price = req.query.price.split("-");
            data.offeredPrice = {$gt: parseInt(price[0]), $lt: parseInt(price[1])}
        }
        if(req.query.sort){
            if(req.query.sort == 1) sort.offeredPrice = 1; // Sort - Price low to high
            if(req.query.sort == 2) sort.offeredPrice = -1; // Sort - Price high to low
        }
        try {
            const products = await ProductModel.aggregate([
                {$match : data},
                {$sort: sort},
                {$lookup: {from : 'categories', localField : 'category', foreignField : 'categoryId', as: 'category'}},
                {$unwind: "$category"},
                {$lookup: {from : 'subcategories', localField : 'subCategory', foreignField : 'subCategoryId', as: 'subCategory'}},
                {$unwind: "$subCategory"},
                {$lookup: {from : 'offers', localField : 'offer', foreignField : 'offerId', as: 'offer'}},
                {$unwind: "$offer"},
                {$lookup: {from : 'brands', localField : 'brand', foreignField : 'brandId', as: 'brand'}},
                {$unwind: "$brand"},
                {$project: {
                    'category._id': false,'category.details': false , 'category.__v' : false, 'category.activeStatus': false,
                    "subCategory._id": false, "subCategory.__v": false, "subCategory.activeStatus": false,
                    'offer._id': false,'offer.details': false , 'offer.__v' : false, 'offer.activeStatus': false,
                    'brand._id': false,'brand.details': false , 'brand.__v' : false, 'brand.activeStatus': false
                }}
            ]).skip((pageNo-1)*limit).limit(limit);
            res.send(products);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getProductById(req, res){
        try {
            const product = await ProductModel.aggregate([
                {$match : {activeStatus: true, productId: parseInt(req.params.productId)}},
                {$lookup: {from : 'categories', localField : 'category', foreignField : 'categoryId', as: 'category'}},
                {$unwind: "$category"},
                {$lookup: {from : 'subcategories', localField : 'subCategory', foreignField : 'subCategoryId', as: 'subCategory'}},
                {$unwind: "$subCategory"},
                {$lookup: {from : 'offers', localField : 'offer', foreignField : 'offerId', as: 'offer'}},
                {$unwind: "$offer"},
                {$lookup: {from : 'brands', localField : 'brand', foreignField : 'brandId', as: 'brand'}},
                {$unwind: "$brand"},
                {$project: {
                    'category._id': false,'category.details': false , 'category.__v' : false, 'category.activeStatus': false,
                    "subCategory._id": false, "subCategory.__v": false, "subCategory.activeStatus": false,
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
                {$lookup: {from : 'subcategories', localField : 'subCategory', foreignField : 'subCategoryId', as: 'subCategory'}},
                {$unwind: "$subCategory"},
                {$lookup: {from : 'offers', localField : 'offer', foreignField : 'offerId', as: 'offer'}},
                {$unwind: "$offer"},
                {$lookup: {from : 'brands', localField : 'brand', foreignField : 'brandId', as: 'brand'}},
                {$unwind: "$brand"},
                {$project: {
                    'category._id': false,'category.details': false , 'category.__v' : false, 'category.activeStatus': false,
                    "subCategory._id": false, "subCategory.__v": false, "subCategory.activeStatus": false,
                    'offer._id': false,'offer.details': false , 'offer.__v' : false, 'offer.activeStatus': false,
                    'brand._id': false,'brand.details': false , 'brand.__v' : false, 'brand.activeStatus': false
                }}
            ]);
            res.send(products);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }



    async addProduct(req, res){
        try {
            let productdata = req.body;
            productdata.seller = req.decoded.userName;
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
                   subCategory: req.body.subCategory,
                   details : req.body.details,
                   offer : req.body.offer,
                   brand : req.body.brand,
                   actualPrice : req.body.actualPrice,
                   offeredPrice : req.body.offeredPrice,
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