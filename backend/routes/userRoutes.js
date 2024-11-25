const express = require('express');
const { registerUser, loginUser, logout } = require('../controllers/userCtrl');
const router = express.Router();


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/",)
router.get("/:id",)
router.put("/:id",)
router.delete("/:id",)
router.get("/logout", logout);

module.exports = router