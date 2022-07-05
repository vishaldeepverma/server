const express = require("express");
const dotenv = require("dotenv");

const router = require("./routes/index");
const { sequelize } = require("./models");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
