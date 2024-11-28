const express = require('express');
const { registerUser, loginUser, logout, getAllUsers, updateUser, deleteUser } = require('../controllers/userCtrl');
const { authmiddleware, notUser, isSuperAdmin } = require('../utils/authMiddlewares');
const router = express.Router();


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/allusers", authmiddleware, getAllUsers)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
router.get("/logout", logout);

module.exports = router