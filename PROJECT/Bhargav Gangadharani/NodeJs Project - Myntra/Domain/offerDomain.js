const OfferModel = require('../Model/offerModel');

class OfferDomain { 
    async getAllOffers(req, res){
        try {
            const offers = await OfferModel.find({activeStatus : true});
            res.send(offers);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getOfferById(req, res){
        try {
            const offer = await OfferModel.find({activeStatus: true, offerId: req.params.offerId});
            res.send(offer);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async addOffer(req, res){
        try {
            let offerdata = req.body;
            const offer = new OfferModel(offerdata);
      
            await offer.save();
          
            res.send('Offer Added');
      
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    async updateOffer(req, res){
        let offerId = req.params.offerId;
        try{
            const result = await OfferModel.updateOne(
                {offerId : offerId}, 
                {$set : {
                    offerName : req.body.offerName,
                    details : req.body.details
                    }
                });
                if(result.modifiedCount == 0){
                    res.send('Offer not found');
                  }
                  else{
                    res.send('Offer updated successfully');
                  }
            }
            catch (err) {
              res.status(500).send(err.message);
            }
    }

    async removeOffer(req, res){
        let offerId = req.params.offerId;

        try {
            const offer = await OfferModel.updateOne(
                {offerId: offerId},
                {$set: {activeStatus : false}} );
                res.send('Offer removed successfully')
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }

    async getDeletedOffers(req, res){
        try {
            const offers = await OfferModel.find({activeStatus : false});
            res.send(offers);
        }catch (err) {
            res.status(500).send(err.message);
        }
    }

    async restoreOffer(req, res){
        let offerId = req.params.offerId;

        try{
            const offer = await OfferModel.updateOne(
                {offerId: offerId, activeStatus:false}, 
                {$set: {activeStatus: true}});
                res.send('Offer restored successfully')
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports= OfferDomain;
