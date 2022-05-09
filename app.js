require("dotenv").config(); // Hide your Mongo connection variables
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const hbs = require("hbs");
const session = require("express-session");
const bcrypt = require("bcrypt");
const saltRounds = +process.env.SALT; //10
const jwt = require("jsonwebtoken");
const expressValidator = require("express-validator");
const flash = require("connect-flash");

const app = express();
app.use(expressValidator());
app.use(flash());

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const createRouter = require("./routes/adminCreate");
const authRouter = require("./routes/auth");

mongoose
  .connect(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("db connected"))
  .catch((err) => console.log(err));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("toFixed", function (number, digits) {
  return Number(number).toFixed(digits);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "my secret",
    httpOnly: true,
    secure: true,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/adminCreate", createRouter);
app.use("/auth", authRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
