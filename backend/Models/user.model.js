const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  gender: String,
  name: Object,
  location: Object,
  email: String,
  login: Object,
  dob: Object,
  registered: Object,
  phone: String,
  cell: String,
  id: Object,
  picture: Object,
  nat: String,
});


const UserModel=mongoose.model("user",userSchema)

module.exports={UserModel}