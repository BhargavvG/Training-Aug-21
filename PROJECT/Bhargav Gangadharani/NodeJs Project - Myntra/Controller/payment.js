const express = require("express");
const app = express.Router();
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

app.post("/verification", (req, res) => {
  // do a validation
  const secret = global.config.secretKey;

  // console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    // console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
});

app.post("/order", async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.amount || 499;
  const currency = "INR";
  const orderId = 11;
  const options = {
    amount: amount * 100,
    currency,
    receipt: orderId,
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    // console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    res.status(500).send(error);
    // console.log(error);
  }
});
module.exports = app;
