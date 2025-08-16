const express  = require("express");
const isLoggedIn  = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

const router = express.Router();


router.get("/shop", isLoggedIn, async function(req, res){
    let products = await productModel.find();
    res.render("shop", {products})
});

router.get("/addtocart/:productid", isLoggedIn, async function(req, res ){
    let user = await userModel.findOne({email : req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    
})

router.get("/cart", isLoggedIn, async function(req, res ){
    let user = await userModel.findOne({email : req.user.email}).populate("cart");
        res.render("cart", {user})
    
})

module.exports = router;