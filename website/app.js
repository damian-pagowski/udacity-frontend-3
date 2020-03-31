/* Global Variables */

const submitButton = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const buildContent = content =>
  `Name: ${content.name}</br>Description: ${content.description} `;
const setContent = (id, content) =>
  (document.getElementById(id).innerHTML = content);
submitButton.addEventListener("click", () => {
  const feelings = document.getElementById("feelings").value;
  const zip = document.getElementById("zip").value;
  const data = { feelings, zip };
  const config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  fetch("/", config)
    .then(response => response.json())
    .then(data => {
      setContent("date", "Date: " + newDate);
      setContent("temp", "Temperature: " + data.temp);
      setContent("content", buildContent(data.content));
    });
});
