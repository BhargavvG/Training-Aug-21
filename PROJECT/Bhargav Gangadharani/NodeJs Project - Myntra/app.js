const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./Controller/user");
const paymentRouter = require("./Controller/payment");
const brandRouter = require("./Controller/brand");
const categoryRouter = require("./Controller/category");
const subCategoryRouter = require("./Controller/subCategory");
const elementRouter = require("./Controller/element");
const imageRouter = require("./Controller/image");
const offerRouter = require("./Controller/offer");
const productRouter = require("./Controller/product");
const cartRouter = require("./Controller/cart");
const orderRouter = require("./Controller/order");
const authlogin = require("./Authentication/loginVerification");

dotenv.config();
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(err.message);
    console.log("Connection to DB faced some Error, Please Restart Server");
  });

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is live !");
});
app.use(express.json());
app.use("/user", userRouter);
app.use("/brand", brandRouter);
app.use("/category", categoryRouter);
app.use("/subCategory", subCategoryRouter);
app.use("/element", elementRouter);
app.use("/offer", offerRouter);
app.use("/product", productRouter);
app.use("/payment", paymentRouter);
app.use("/image", imageRouter);
app.use(authlogin);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is runing on port ${port} ...`);
});
