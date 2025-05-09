const express = require("express");
const { deleteUser, editUser } = require("../controllers/users.js");

const router = express.Router();

router.put("/:id",editUser);

router.delete("/:id",deleteUser);

module.exports = {users_routes:router};