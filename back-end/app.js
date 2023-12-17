const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config({
  path: "./config/config.env",
});
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");

//Import routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
//Import middlewares
const errorMiddleware = require("./middlewares/errors");
const ErrorHandler = require("./utils/errorHandler");
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// set db
require("./config/mongoose.config");

//Use routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.all("*", (req, res, next) => {
  next(new ErrorHandler(404, `${req.originalUrl} route not found`));
});
//use error handle
app.use(errorMiddleware);

app.listen(port, () => console.log(`Listening on port ${port}`));
