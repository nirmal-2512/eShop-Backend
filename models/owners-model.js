//username, email, fullname, password, cart, isadmin, orders, contact, password, profilepic - db, 

const mongoose = require('mongoose');


const ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  products:{
    type : Array,
    default: [],
  },
  // contact: Number,
  picture: String,
  gstin: String,

});

module.exports = mongoose.model("owner", ownerSchema);

