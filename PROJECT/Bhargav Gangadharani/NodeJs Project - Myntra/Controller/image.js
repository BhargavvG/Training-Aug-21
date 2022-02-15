const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

var ImageKit = require("imagekit");
var fs = require("fs");

var imagekit = new ImageKit({
  publicKey: process.env.Imagekit_key,
  privateKey: process.env.Imagekit_secret,
  urlEndpoint: "https://ik.imagekit.io/2e5xfxvehcg/",
});

router
  .get("/auth", (req, res) => {
    try {
      var authenticationParameters = imagekit.getAuthenticationParameters();
      res.send(authenticationParameters);
    } catch (err) {
      res.status(500).send(err);
    }
  })
  .get("/get/:offerId");

module.exports = router;
