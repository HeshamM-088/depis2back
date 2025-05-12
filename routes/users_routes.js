const express = require("express");
const { deleteUser, editUser, getUsers, getSingleUser, login, signup } = require("../controllers/users.js");

const router = express.Router();

router.put("/:id",editUser);

router.delete("/:id",deleteUser);

router.route("/").get(getUsers);

router.route("/:id").get(getSingleUser);

router.post('/signup', signup); 
 
router.post('/login', login);

module.exports = {users_routes:router};