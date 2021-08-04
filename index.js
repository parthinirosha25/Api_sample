// package import

const express = require("express");
const https = require("https");
const  bodyParser = require("body-parser");

// call the function
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// func 1 get
app.get('/',function(req,res){
  res.sendFile(__dirname+"/index.html")
});

//func 2 post 
app.post("/",function(req,res){
    
    console.log(req.body.city);
    console.log("post req is received ...");

    const query = req.body.city;  //input frm user
    const apikey = "766c3c313b49d7b065d0ef18903a1194#";
    const unit = "metric";
    const url =  "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey;

    //const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey;
  
  https.get(url, function(response)
  {
    console.log(response.statusCode);
    response.on("data",function(data)
    {
        const weatherData = JSON.parse(data);
        // for temperature
        const temp = weatherData.main.temp;
        //for weather description
        const weatherDescription = weatherData.weather[0].description
        // for icon
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

        //res.write("<br> <img src="+imageURL+">");

        res.send("<h1>temperature "+query+" is :"+temp+"<br>degree in celcius : "+weatherDescription+"</h1>"+"icon number: "+icon+"</h1>"+"<br> <img src="+imageURL+">");
                
    })
  })

});


/* 

     const url = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=766c3c313b49d7b065d0ef18903a1194#";
  
  https.get(url, function(response)
  {
    console.log(response.statusCode);
    response.on("data",function(data)
    {
        const weatherData = JSON.parse(data);
        // for temperature
        const temp = weatherData.main.temp;
        //for weather description
        const weatherDescription = weatherData.weather[0].description
        // for icon
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

        //res.write("<br> <img src="+imageURL+">");

        res.send("<h1>temperature : "+temp+"<br>degree in celcius : "+weatherDescription+"</h1>"+"icon number: "+icon+"</h1>"+"<br> <img src="+imageURL+">");
                
        

        /* sample code -start */
        //res.write("<p>hi kd</p><br>");
        //res.write("<h1>temperature is :</h1>"+temp+"degree : "+weatherDescription);

        /*
        res.write("<p>hi kd</p>");
        res.write("<h1>temperature is :</h1>"+temp+"degree : "+weatherDescription)
     
        const object = {
            name: "NIROSHA",
            myfavfood: "pizza",
        }
        console.log(JSON.stringify(object));

        */

        // console.log(data);

        /* 
        console.log(data);

        res.write("<p>hi kd</p>");
        res.send("hello kd");
        */
     
        // res.send();

         /* sample code end */


app.listen(3000,function()
{
    console.log("server is running on port 3000.")
});