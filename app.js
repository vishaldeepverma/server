require("dotenv")();
const express = require("express");
const cors = require("cors");


const router = require("./routes/index");
const { sequelize } = require("./models");

const app = express();

app.use(cors({origin:true,credentials: true}));

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
