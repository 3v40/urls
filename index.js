require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const urlRoutes = require("./src/routes/urlRoutes");
const errorHandler = require("./src/middlewares/errorHandler");

const app = express();

app.set("trust proxy", 1);
app.use(express.json());

connectDB(); // Connect to DB

app.use("/", urlRoutes); // routes

app.use(errorHandler);

const PORT =
  process.env.STATUS === "production"
    ? process.env.PROD_PORT
    : process.env.DEV_PORT;

app.listen(PORT, () =>
  console.log(`Server Started in ${process.env.STATUS} mode at PORT:${PORT}`)
);
