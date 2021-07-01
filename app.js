const express = require("express");
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
const colors  = require("colors");
const morgan = require("morgan");
const connectDB = require("./db/mongoConnect");
const {routerInit, originAllow} = require("./routes/config_routes");

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
originAllow(app);
routerInit(app);
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);