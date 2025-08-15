//username, email, fullname, password, cart, isadmin, orders, contact, password, profilepic - db, 

const mogoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/eShop_Backend");


const userSchema = mogoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart:{
    type : Array,
    default: [],
  },
  isadmin: Boolean,
  orders:{
    type : Array,
    default: [],
  },
  contact: Number,
  picture: String,

});

module.exports = mongoose.model("user", userSchema);

