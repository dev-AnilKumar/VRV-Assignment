const express = require('express');
const { registerUser, loginUser, logout, getAllUsers } = require('../controllers/userCtrl');
const { authmiddleware, notUser, isSuperAdmin } = require('../utils/authMiddlewares');
const router = express.Router();


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/", authmiddleware, notUser, getAllUsers)
router.get("/:id",)
router.put("/:id",)
router.delete("/:id",)
router.get("/logout", logout);

module.exports = router