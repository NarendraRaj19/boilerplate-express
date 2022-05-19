var express = require('express');
var app = express();

//console.log("Hello World");

const myLogger = function (req, res, next) {
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string)
  next()
}

app.use(myLogger)

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res){  
  //res.send('Test')
  res.sendFile(__dirname + '/views/index.html');
})

app.get("/json", function(req, res){  
  
  if(process.env.MESSAGE_STYLE === "uppercase"){
    res.json({"message": "HELLO JSON"});  
  }else {
    res.json({"message": "Hello json"});  
  }
  
})