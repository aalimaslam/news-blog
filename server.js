const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const axios = require("axios");
const moment = require("moment")
// axios.defaults.baseURL = `https://newsdata.io/api/1/news?apikey=${process.env.API_KEY}`;

const URL = `https://newsdata.io/api/1/news?apikey=${process.env.API_KEY}`


async function getData() {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}


app.set("view engine","ejs");
// app.use(path.join(__dirname, "public"))

app.get("/",(req,res)=>{
    let datas = []
    getData()
    .then((data)=>{
        let title,link,publishDate,imageUrl,country,publishTime,formatTime;
        for(let i=0; i<data.results.length;i++){
            title = data.results[i].title;
            link = data.results[i].link;
            publishDate =  data.results[i].pubDate.split(" ")[0];
            publishTime =  data.results[i].pubDate.split(" ")[1];
            imageUrl = data.results[i].image_url;
            country = data.results[i].country;
            formatTime = moment(`${publishDate} ${publishTime}`).format('MM/DD/YYYY h:mm a');
            formatTime = formatTime.split(" ").join(" , ")
            datas.push({title,link,imageUrl,country,formatTime}); 
        }
        res.render("index", {navTitle:" Home ", datas});
    });
})
// app.get("/",(req.res))

app.listen(process.env.PORT)