const express = require("express");
const { getUser } = require("../controller/userController");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.route("/getUser").get(isAuthenticated, getUser);

module.exports = router;
