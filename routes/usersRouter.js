const express  = require("express");
const cookie = require('cookie-parser')

const router = express.Router();
const userModel = require("../models/user-model");
const {generateToken} = require("../utils/generateToken");

const {registerUser} = require("../controllers/authController");
const {loginUser} = require("../controllers/authController");
const {logoutUser} = require("../controllers/authController");


router.get("/register", function(req, res){
  res.render("register");
});


router.get("/login", function(req, res){
  res.render("login");
});

router.get("/logout", logoutUser);

router.post("/login", loginUser);

router.post("/register", registerUser);
 
module.exports = router;

