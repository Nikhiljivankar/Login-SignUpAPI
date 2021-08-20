const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/config").get(process.env.NODE_ENV);
const User = require("./models/user");
const { auth } = require("./middlewares/auth");
const { collection } = require("./models/user");
const { response } = require("express");

const app = express();

//app use
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());

//Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(
  db.DATABASE,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) console.log(err);
    console.log("database is connected");
  }
);

//get all user
app.get("/user", (req,res)=>{
  collection.find({}).toArray((err,result)=>{
    if(err){return response.status(500).send(err);}
    res.send(result);
  });
});

app.get("/", function (req, res) {
  res.status(200).send("welcome to login, signup Api");
});

//listening port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is running on port: ${PORT}`);
});
