const express=require("express");
const https= require("https");
const bodyParser=require("body-parser");
require('dotenv').config();
const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));







app.get("/",function (req,res) {
    res.render("input");      
});


app.post("/",function (req,res) {
    
    const query=req.body.city;
    const apikey=process.env.API_KEY;
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + units + "";
    https.get(url,function (response) {
        // console.log(response.statusCode);
        response.on("data",function (data) {
            const weatherData=JSON.parse(data)
            if (weatherData.main.temp == null) return res.sendStatus(404);
            const temp=weatherData.main.temp;
            const weatherDescription=weatherData.weather[0].description
            const windspeed=weatherData.wind.speed;
            const icon=weatherData.weather[0].icon;
            const humidity=weatherData.main.humidity;
            const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            // res.write("<h1>Temp in "+ query+" is :" +temp +"</h1>");
            // res.write("<img src="+imageurl+"></img>");
            // res.write("<h2>The Weather is currenlty: "+weatherDescription +" </h2>");
            // res.send();

            res.render("result",{temperature :temp,description:weatherDescription,rain:imageurl,humidity:humidity,wind:windspeed})

            


        })
})
})





app.set('port',(process.env.PORT || 3000));

app.listen(app.get('port'),()=>{
    console.log("Server started on Port "+app.get("port"));
});



// app.listen(3000,function () {
//     console.log("Sever is running at port 3000");
// })