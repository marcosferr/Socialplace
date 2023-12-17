const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config({
  path: "./config/config.env",
});
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");

app.listen(port, () => console.log(`Listening on port ${port}`));
