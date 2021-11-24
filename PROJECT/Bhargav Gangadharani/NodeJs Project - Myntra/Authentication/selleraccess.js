const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if(req.decoded.role === 'seller') {
        console.log(req.decoded)
        next();
    }
    else{
        res.status(401).json({
            Error: "Permission Denied",
            Error_Message: "You are not an Seller!",
        });
    }
})

module.exports = router;