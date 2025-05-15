const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");


// Validation rules
const validateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("age").optional().isInt({ min: 0 }).withMessage("Age must be a positive number"),
];

router.post("/", validateUser, userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", validateUser, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;


