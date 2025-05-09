const express = require("express");
const cors = require("cors");
const { router } = require("./routes/products_routes.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", () => {});

app.use("/api/products", router);

app.use((req, res) => {
  return res.status(500).json({
    msg: "invalid route",
  });
});

// app.listen(3000, () => {
//   console.log("run");
// });

module.exports = app;
