const express = require("express");
const dotenv = require("dotenv");

const router = require("./routes/index");
const { sequelize } = require("./models");
const cors = require("cors");
dotenv.config();

const app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://silver-dango-9c6b90.netlify.app");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://silver-dango-9c6b90.netlify.app');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async function () {
  try {
    await sequelize.sync({ force: false });
    console.log("database Synced");
  } catch (error) {
    console.log(`got on error on sync db ${error}`);
  }
})();

app.use("/api", router);

app.get("/", (req, res, next) => {
  res.status(200).send("I am done");
});

module.exports = app;
