const express = require("express");
const app = express();
const cors = require('cors')
const dotenv = require("dotenv");
const userRouter = require("./Controller/user");
const brandRouter = require("./Controller/brand");
const categoryRouter = require("./Controller/category");
const subCategoryRouter = require("./Controller/subCategory");
const elementRouter = require("./Controller/element");
const offerRouter = require("./Controller/offer");
const productRouter = require("./Controller/product");
const cartRouter = require("./Controller/cart");
const orderRouter = require("./Controller/order");
const authlogin = require("./Authentication/loginVerification");

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
app.use(authlogin);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is runing on port ${port} ...`);
});
