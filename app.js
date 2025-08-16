const express  = require("express");
const app = express();

const userModel = require("./models/user-model");
const productModel = require("./models/product-model");

const cookieParser = require("cookie-parser");
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const flash = require("connect-flash");
const expressSession = require("express-session");

require('dotenv').config();

const db = require("./config/mongoose-connection")

const indexRouter = require('./routes/index')
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.EXPRESS_SESSION_SECRET,
}));
app.use(flash());

app.use((req, res, next) =>{
  res.locals.success = req.flash("success_msg");
  res.locals.error = req.flash("error");
  next();
})

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", indexRouter);




app.get('/', (req, res) => {
  res.render("login");
});

app.listen(3000);