// Setup empty JS object to act as endpoint for all routes
projectData = { data: [] };

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

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

/* ROUTES */
//  get main page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/website/index.html"));
});

// add data
app.post("/add", (req, res) => {
  projectData.data.push({ ...req.body });
  res.send(projectData);
});

//  get all data
app.get("/all", (req, res) => {
  res.send(projectData);
});

// set up and start server
const SERVER_PORT = process.env.PORT || process.env.SERVER_PORT || 3030;
app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
