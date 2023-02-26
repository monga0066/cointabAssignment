const express = require("express");
const { connection } = require("./Config/db");
const cors = require("cors");
const { userRoute } = require("./Routes/user.routes");
require("dotenv").config();



const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send({ message: "welcome" });
});

app.use("/users",userRoute)





app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log("error connection db");
    console.log(err);
  }
  console.log("server running on "+8080);
});
