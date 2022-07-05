require("dotenv")();
const express = require("express");

const router = require("./routes/index");
const { sequelize } = require("./models");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: 'https://silver-dango-9c6b90.netlify.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

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
