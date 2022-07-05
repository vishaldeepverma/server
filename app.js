require("dotenv")();
const express = require("express");

const router = require("./routes/index");
const { sequelize } = require("./models");

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "https://silver-dango-9c6b90.netlify.app");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ); // If needed
  res.setHeader("Access-Control-Allow-Headers", "*"); // If needed
  res.setHeader("Access-Control-Allow-Credentials", true); // If needed
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
