const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");


const dotenv = require("dotenv");
// const { Console } = require('console');
dotenv.config();

app.use(cors());
app.use(express.static("dist"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

console.log(__dirname);

app.get("/", function (req, res) {
  res.status(200).json({ answer: "Hello World!" });
});

app.post("/historicweather", async (request, response) => {
  const dataString = request.body;
  const requestString = `${process.env.WEATHERBIT_HISTORIC_URL}?city=${dataString.city}&start_date=${dataString.start}&end_date=${dataString.end}&key=${process.env.WEATHERBIT_KEY}`;
  fetch(requestString)
    .then((res) => res.json())
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});

app.post("/weatherforecast", async (request, response) => {
  const dataString = request.body;
  const requestString = `${process.env.WEATHERBIT_URL}&days=13&lat=${dataString.lat}&lon=${dataString.lng}&key=${process.env.WEATHERBIT_KEY}`;
  fetch(requestString)
    .then((res) => res.json())
    .then((res) => {
      res.countryName = dataString.countryName;
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});

app.post("/backgroundurl", async (request, response) => {
  const dataString = request.body;
  const requestString = `${process.env.PIXABAY_URL}?key=${
    process.env.PIXABAY_KEY
  }&q=${dataString.name.split(",")[0].replace(/\s/g, "%20")}${
    process.env.PIXABAY_SPECS
  }`;
  fetch(requestString)
    .then((res) => res.json())
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});

app.post("/geolocation", async (request, response) => {
  const dataString = request.body;
  const requestString = `${process.env.GEONAMES_URL}=${dataString.name.replace(
    /\s/g,
    "%20"
  )}&username=${process.env.GEONAMES_KEY}`;
  fetch(requestString)
    .then((res) => res.json())
    .then((data) => response.send(data))
    .catch((err) => res.send(err));
});

module.exports = app;
