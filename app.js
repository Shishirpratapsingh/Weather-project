const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");


const app= express() ;

app.use(bodyparser.urlencoded({extended: true})); 

app.get("/", function(req,res){

    res.sendFile( __dirname + "/index.html");

    })
app.post("/", function(req,res){
  
    const querry = req.body.cityname;
    const apikey = "2a2d1d8a059cc1e9815a321883a1ec97";
    const unit = "metric";
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+ querry + "&appid="+apikey+"&units ="+ unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            
            const temp= weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            res.write("<p> <h3>the weather is currently "+ weatherDiscription+"</h3></p>")
            res.write(" <h1> the temp in "+ querry+" is "+ temp + " degree celcius </h1>");
            res.send();
        })
    });

});





app.listen(3000,function(){
    console.log("server is on");
});