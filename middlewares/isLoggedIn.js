const express = require('express');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userModel = require("../models/user-model");

module.exports = async function(req, res, next){
  if(!req.cookies.token){
    req.flash("error", "Your Need to Login First");
    return res.redirect("/user/login");

  }

  try{
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({email: decoded.email})
      .select("-password");
    req.user = user;
    next();

  }catch(err){
    req.flash("error", "Something Went Wrong.");
    res.redirect("/user/login");
  }
};


