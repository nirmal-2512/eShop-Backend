//product, image, name, price, discount, bgcolour, panelcolour

const mogoose = require('mongoose');


const productSchema = mogoose.Schema({
  image: String,
  name: String,
  price: Number,
  dicount:{
    type : Number,
    default: 0,
  },
  isadmin: Boolean,
  bgcolor:{
    type : String,
    default: red,
  },
  panelcolor: String,
  textcolor: String,

});

module.exports = mongoose.model("product", userSchema);

