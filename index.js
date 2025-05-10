const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { products_router } = require("./routes/products_routes.js");
const { users_routes } = require("./routes/users_routes.js");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const DB = process.env.DB;
mongoose.connect(DB)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/users", users_routes);

app.use("/api/products", products_router);

app.use((req, res) => {
  return res.status(500).json({
    msg: "invalid route",
  });
});

app.listen(3000, () => {
  console.log("run");
});

module.exports = app;
