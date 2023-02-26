const express = require("express");
const { default: axios } = require("axios");
const { UserModel } = require("../Models/user.model");

const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
  const page = +req.query.page || 1;
  const gender = req.query.filter;
  let query;
  if (!gender || gender == "") {
    query = {};
  } else {
    query = { gender: gender };
  }
 
  const results = await UserModel.find(query)
    .skip((page - 1) * 10)
    .limit(10);
  const totalPage=await UserModel.find(query);
  const totalPages=Math.ceil(totalPage.length/10)


  res.send({results,totalPages});
});

userRoute.get("/add", async (req, res) => {
  const result = await axios.get("https://randomuser.me/api?results=55");

  const data = result.data.results;

  const results = await UserModel.insertMany(data);

  if (results) {
    res.send({ message: "data added to db successfully" });
  } else {
    res.status(404).send({ message: "Something went wrong please try later" });
  }
});

userRoute.delete("/delete", async (req, res) => {
  const result = await UserModel.deleteMany();
  if (result) {
    res.send({ message: "Data deleted from the db" });
  } else {
    res.status(404).send({ message: "Something went wrong please try later" });
  }
});

module.exports = { userRoute };
