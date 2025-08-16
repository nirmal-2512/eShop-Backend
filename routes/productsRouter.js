const express  = require("express");
const {upload} = require("../config/multer-config")
const productModel = require("../models/product-model")

const router = express.Router();

router.post("/create", upload.single("image"), async function(req, res){
  // res.send(req.file);
      try{let {image, name, price, discount, bgcolor, panelcolor, textcolor} = req.body;
      
      let product = await productModel.create({
        image: req.file.buffer, 
        name, price, discount, bgcolor, panelcolor, textcolor,
      })
      
      res.send("You product is created");
    }catch(err){
      res.send(err.message);
    }
      // req.flash("error", "Owner Created")
});

module.exports = router;

