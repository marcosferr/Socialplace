const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // Import morgan for logging
const app = express();
require("dotenv").config({
  path: "./config/config.env",
});
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // or put this in a config or environment variable
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Import routes
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
//Import middlewares
const errorMiddleware = require("./middlewares/errors");
const ErrorHandler = require("./utils/errorHandler");

// Logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// set db
require("./config/mongoose.config");

//Use routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", postRoutes);
app.all("*", (req, res, next) => {
  next(new ErrorHandler(404, `${req.originalUrl} route not found`));
});
//use error handle
app.use(errorMiddleware);

app.listen(port, () => console.log(`Listening on port ${port}`));
