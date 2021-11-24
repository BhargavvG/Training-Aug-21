var express =require('express')
const mongoose = require("mongoose");
const doctors = require("./controllers/doctor.controller");
const patients = require("./controllers/patient.controller");
const medicines = require("./controllers/medicine.controller");
const departments = require("./controllers/department.controller");
const assistants = require("./controllers/assistant.controller");
const app = express();


app.use(express.json());

port =8000


var mongoDB = "mongodb://localhost/Hospital";
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected To MongoDB"));
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.use("/doctors", doctors);
app.use("/patients", patients);
app.use("/medicines", medicines);
app.use("/departments", departments);
app.use("/assistants", assistants);

app.get("/",(req,res)=>{
    res.send("hello")
});

app.listen(port,()=>{console.log(`app listening at http://localhost:${port}`)})



