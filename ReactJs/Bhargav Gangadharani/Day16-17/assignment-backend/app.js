const express = require("express");
const app = express();
const dotenv = require("dotenv");
const studentRouter = require("./Controller/student");
const cors = require("cors");

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is live !");
});

app.use(express.json());
app.use("/student", studentRouter);

dotenv.config();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is runing on port ${port} ...`);
});
