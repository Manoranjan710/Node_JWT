const express = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

const validateAuth = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Min 6 char password"),
];

router.post("/signup", [
  body("name").notEmpty(),
  body("age").optional().isInt(),
  ...validateAuth
], signup);

router.post("/login", validateAuth, login);

module.exports = router;

