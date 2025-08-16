const express  = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model")



if(process.env.NODE_ENV === "development"){
  // console.log(process.env.NODE_ENV);
  router.post("/create",  async function(req, res){

    let owners = await ownerModel.find();
    if(owners.length > 0) {
      return  res
        .status(503)
        .send("You don't have permission to create more then 1 owner")

    }

    let {fullname, email, password} = req.body;
    
    let createOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });

    res.status(201).send("You can create a owner")
    req.flash("error", "Owner Created")

  })

}

router.get("/create", function(req, res){
  res.render("createOwner");
});

router.get("/admin", function(req, res){
  
  res.render("createproducts");
});



module.exports = router;

