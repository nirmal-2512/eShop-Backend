const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser')

const userModel = require("../models/user-model");
const {generateToken} = require("../utils/generateToken");


module.exports.registerUser = async function(req, res){
  try{
    let {fullname, email, password, contact} = req.body;

    let user = await userModel.findOne({email:email} ) ;

    if(!user){

      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function (err, hash){
          if(err)   return res.send(err.message);
          else{
            let user = await userModel.create({
              fullname,
              email,
              password: hash,
              contact,
            });

            let token = generateToken(user);

            res.cookie("token", token);
            res.redirect("/shop")
          }
        });
      });

    }
    else{
      req.flash("error" ,  "User Already Exist, Please Login")
      res.redirect("/users/register")
    }
  }catch(err){
    console.log(err.message);
  }
}


module.exports.loginUser = async function(req, res){
  try{
    let {email, password} = req.body;

    let user = await userModel.findOne({email:email} ) ;

    if(!user){
      req.flash("error","Email OR Password incorrect");
      res.redirect("/users/login");
    }   
    
    if(user){
        bcrypt.compare(password, user.password, async function (err, result){
          if(result){
            let token = generateToken(user);

            res.cookie("token", token);
            res.redirect("/shop");
          }else{
            req.flash("error","Email OR Password incorrect")
            res.redirect("/users/login");     
          }

        });

    }
    else{
      req.flash("error", "User Already exist");
      res.redirect("/users/login");
    }
  }catch(err){
    console.log(err.message);
  }
}


module.exports.logoutUser = async function(req, res){
    res.cookie("token", "");
    res.redirect("/users/login");
}