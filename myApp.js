var express = require("express");
var app = express();
var bodyParser = require('body-parser');

//console.log("Hello World");

//Challenge 11: Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }))

const myLogger = function (req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
};

app.use(myLogger);

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  //res.send('Test')
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time,
    });
  }
);

//Challenge 9: Get Route Parameter Input from the Client
app.get("/:word/echo", function (req, res) {
  res.send({ echo: req.params.word });
});

//Challenge 10: Get Query Parameter Input from the Client
app.get("/name", function (req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // Use template literals to form a formatted string
  res.send({
    name: `${firstName} ${lastName}`,
  });
});

//Challenge 12: Get Data from POST Requests

app.post("/name", function(req, res){
  var firstName = req.body.first;
  var lastName = req.body.last;
  
  res.send({
    name: `${firstName} ${lastName}`,
  });
});


module.exports = app;
