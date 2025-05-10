const express = require("express");
const { deleteUser, editUser, getUsers, getSingleUser } = require("../controllers/users.js");

const router = express.Router();

router.put("/:id",editUser);

router.delete("/:id",deleteUser);

router.route("/").get(getUsers);

router.route("/:id").get(getSingleUser);

module.exports = {users_routes:router};