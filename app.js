const express = require("express");
const path = require("path");
const http = require("http");
const dotenv = require("dotenv");
const colors  = require("colors");
const morgan = require("morgan");
const connectDB = require("./db/mongoConnect");
const {routerInit, originAllow} = require("./routes/config_routes");

dotenv.config({ path: './config/config.env' });
connectDB();
const app = express();
app.use(express.json());
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
originAllow(app);
routerInit(app);


const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);