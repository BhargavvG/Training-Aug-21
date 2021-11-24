const {BrandModel} = require('../Model/otherModel');

class BrandDomain { 
    async getAllBrands(req, res){
        try {
            const brands = await BrandModel.find({activeStatus : true});
            res.send(brands);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getBrandById(req, res){
        try {
            const brand = await BrandModel.find({activeStatus: true, brandId: req.params.brandId});
            res.send(brand);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async addBrand(req, res){
        try {
            let branddata = req.body;

            const brand = new BrandModel(branddata);
      
            await brand.save();
          
            res.send('Brand Added');
      
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async updateBrand(req, res){
        let brandId = req.params.brandId;
        try{
            const result = await BrandModel.updateOne(
                {brandId : brandId}, 
                {$set : {
                    brandName : req.body.brandName,
                    details : req.body.details
                    }
                });
                if(result.modifiedCount == 0){
                    res.send('brand not found');
                  }
                  else{
                    res.send('brand updated successfully');
                  }
            }
            catch (err) {
              res.status(500).send(err.message);
            }
    }

    async removeBrand(req, res){
        let brandId = req.params.brandId;

        try {
            const brand = await BrandModel.updateOne(
                {brandId: brandId},
                {$set: {activeStatus : false}} );
                res.send('Brand removed successfully')
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getDeletedBrands(req, res){
        try {
            const brands = await BrandModel.find({activeStatus : false});
            res.send(brands);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async restoreBrand(req, res){
        let brandId = req.params.brandId;

        try{
            const brand = await BrandModel.updateOne(
                {brandId: brandId, activeStatus:false}, 
                {$set: {activeStatus: true}});
                res.send('Brand restored successfully')
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports= BrandDomain;
