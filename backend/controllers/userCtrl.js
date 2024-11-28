const userModel = require("../models/userModel");
const { generateToken, generateRefreshToken } = require('../utils/authMiddlewares')

const registerUser = async (req, res) => {
    const { email } = req.body;
    try {
        req.body.email = email.toLowerCase();
        const user = await userModel.findOne({ email: req.body.email });

        if (user) throw new Error("User Already Exists");
        await userModel.create(req.body);
        res.json({ msg: "User Registered Successfully", success: true });
    } catch (error) {
        console.log("Register User Error");
        console.log(error)
        res.json({ err: error.message, success: false })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        req.body.email = email.toLowerCase();
        const user = await userModel.findOne({ email: req.body.email });
        if (user && await user.isPasswordMatch(password)) {
            const refreshToken = generateRefreshToken(user._id, "3d");
            await userModel.findByIdAndUpdate(user._id, {
                refreshToken: refreshToken
            }, { new: true })

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000,
                secure: true
            })
            res.json({
                user: {
                    name: user?.name,
                    role: user?.role,
                    token: generateToken(user._id, "15m")
                },
                success: true
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
        const users = await userModel.find().select("name").select("role").select("_id");
        res.json({ users, success: true })
    } catch (error) {
        console.log(error);
        res.send({ msg: error.message, success: false })
    }
}

const updateUser = async (req, res) => {
    const id = req.params;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, {
            name: req.body.name,
            role: req.body.role
        }, { new: true })
        res.josn({ updatedUser, success: true })
    } catch (error) {
        console.log("Update User Error");
        console.log(error);
        res.send({ msg: error.message, success: false })
    }
}

const deleteUser = async (req, res) => {
    const id = req.params;
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);
        res.josn({ deletedUser, success: true })
    } catch (error) {
        console.log("Delete User Error");
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
            return res.sendStatus(204);
        }
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            maxAge: 0
        });
        await userModel.findByIdAndUpdate(user._id, {
            refreshToken: "",
        });
        res.json({ msg: "Logged Out Successfully", success: true })

    } catch (error) {
        console.log("Logout Error");
        console.log(error)
        res.json({ msg: error.message, success: false })
    }
}
module.exports = { registerUser, loginUser, logout, getAllUsers, updateUser, deleteUser }