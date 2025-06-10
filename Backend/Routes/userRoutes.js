const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateUserRole, getAllUsers } = require("../controllers/userController");

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:userId/role", updateUserRole);
router.get("/", getAllUsers);

module.exports = router;