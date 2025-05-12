const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  addNewProduct,
} = require("../controllers/getAllProducts");
const { deleteProduct, updateProduct } = require("../controllers/products_crud");
const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/:id").get(getSingleProduct);

router.route("/:id").put(updateProduct);

router.route("/:id").delete(deleteProduct);

router.route("/add").post(addNewProduct);

module.exports = {
  products_router: router,
};

