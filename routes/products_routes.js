const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  addNewProduct,
} = require("../controllers/getAllProducts");
const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/:id").get(getSingleProduct);


router.route("/add").post(addNewProduct);

module.exports = {
  router,
};
