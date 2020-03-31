// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

require("dotenv").config();

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/website/index.html'));
});

app.post("/", async function(req, res) {
    const { zip, feelings } = req.body;
    const url = `${API_URL}?zip=${zip}&appid=${API_KEY}`;
    console.log(url)
    const response = {}
    const data = await fetch(url)
    .then(function(response) {
      return response.json()
    });

    response.feelings = feelings;
    response.date = data.dt;
    response.temp = data.main.temp;
    response.content = {
        main: data.weather[0].main,
        description: data.weather[0].description,
        name: data.name
    }
    res.json(response)
    
  });

const SERVER_PORT = process.env.PORT || process.env.SERVER_PORT || 3030;
app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
module.exports = app;
