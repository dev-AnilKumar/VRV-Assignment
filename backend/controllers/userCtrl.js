const userModel = require("../models/userModel");
const { generateToken, generateRefreshToken } = require('../utils/authMiddlewares')

const registerUser = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) throw new Error("User Already Exists");
        const newuser = await userModel.create(req.body);
        res.json({ newuser, success: true });
    } catch (error) {
        console.log("Register User Error");
        console.log(error)
        res.json({ err: error.message, success: false })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user && await user.isPasswordMatch(password)) {
            const refreshToken = generateRefreshToken(user._id, "3d");
            const updatedUser = await userModel.findByIdAndUpdate(user._id, {
                refreshToken: refreshToken
            }, { new: true })
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000,
                secure: true
            })
            res.json({
                _id: user?._id,
                name: user?.name,
                role: user?.role,
                token: generateToken(user._id, "15m")
            })
        } else {
            throw new Error("Invalid Credentials");
        }

    } catch (error) {
        console.log("Login User Error");
        console.log(error)
        res.json({ err: error.message, success: false })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.json({ users, success: true })
    } catch (error) {
        console.log(error);
        res.send({ msg: error.message, success: false })
    }
}

const logout = async (req, res) => {
    const cookie = req.cookies;
    try {
        if (!cookie?.refreshToken) throw new Error("No refresh Token in cookies");
        const user = await userModel.findOne({ refreshToken: cookie?.refreshToken });
        if (!user) {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
                maxAge: 0
            });
            return res.sendStatus(204);     //forbidden
        }
        await userModel.findByIdAndUpdate(user._id, {
            refreshToken: "",
        });
        res.json({ msg: "Logged Out Successfully", success: true })

    } catch (error) {
        console.log("Logout Error");
        console.log(error)
        res.json({ msg: error.message, success: true })
    }
}
module.exports = { registerUser, loginUser, logout, getAllUsers }