//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;


const data = {
  members:[
    {
      email_address: email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);
const url = 'https://us1.api.mailchimp.com/3.0/lists/43f086d206';
  const options={
    method:"POST",
    auth:"onionie:a62f0f62944d05469f126d53396d7d5d-us1"
};

const request = https.request(url,options,function(response){
  response.on("data", function(data){
  if(response.statusCode !== 200){
    res.sendFile(__dirname+"/failure.html");
  }else{
    res.sendFile(__dirname+"/success.html");
}
  });
});
//request.write(jsonData);
request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(req, res){
  console.log("Server is running on port 3000");
});

//a62f0f62944d05469f126d53396d7d5d-us1

//uid 43f086d206
