const API_KEY = "82bf96a3059dce94987fec7386902194";
const API_URL = "http://api.openweathermap.org/data/2.5/weather";
const submitButton = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// submit handler
submitButton.addEventListener("click", async () => {
  // get values from input
  const feelings = document.getElementById("feelings").value;
  const zip = document.getElementById("zip").value;
  // call weather api for temperature
  const weather = await getWeather(zip);
  const temp = weather.main.temp;
  //request body
  const data = { feelings, zip, temp, date: newDate };
  // calling backend to add new record
  await addRecord(data);
  console.log("DATA ADDED: " + JSON.stringify(data));
  // get app data from backend
  const appData = await getAppData();
  console.log("APP DATA: " + JSON.stringify(appData));
  //update UI
  updateUI(appData.data);
});

//  call backend to get app data
const getAppData = () => {
  return fetch("/all").then(rsp => rsp.json());
};

// add new record to app data (living on backend)
const addRecord = async requestBody => {
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };
  const data = await fetch("/add", config).then(response => response.json());
  return data;
};

// get weather by ZIP code
const getWeather = async zip => {
  const url = `${API_URL}?zip=${zip}&appid=${API_KEY}`;
  const data = await fetch(url).then(response => response.json());
  console.log("Weather data: " + JSON.stringify(data));
  return data;
};

/* update UI */

const setContent = (id, content) =>
  (document.getElementById(id).innerHTML = content);

const updateUI = data => {
  const latestData = data[data.length - 1];
  setContent("date", "Date: " + newDate);
  setContent("temp", "Temperature: " + latestData.temp);
  setContent("content", "Feelings: " + latestData.feelings);
};
