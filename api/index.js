require('dotenv').config({ path: '../.env' });

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI,{
      useNewUrlParser:true,
      useUnifiedTopology: true,
}).then(() => {
      console.log("Connected to MongoDB")
}).catch((err) => {
      console.log("Error connected to MongoDB", err)

})

app.listen(port, ()=> {
      console.log("Server is running on port 8000");
})