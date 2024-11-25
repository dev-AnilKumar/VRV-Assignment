const userModel = require("../models/userModel");
const { generateToken } = require("../utils/authMiddlewares");


const registerUser = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) throw new Error("User Already Exists");
        const newuser = await userModel.create(req.body);
        res.json({ success: true });
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
        if (!user) throw new Error("Invalid Credentials");
        if (user && await user.isPasswordMatch(password)) {
            const refreshToken = await generateToken(user._id, "3d");
            const updatedUser = await userModel.findByIdAndUpdate(user._id, {
                refreshToken: refreshToken
            }, { new: true })
        }
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
            secure: true
        })
        res.json({
            _id: user?._id,
            name: user?.name,
            role: user?.role,
            token: generateToken(user._id, "15m")                                         //
        })

    } catch (error) {
        console.log("Login User Error");
        console.log(error)
        res.json({ err: error.message, success: false })
    }
}

module.exports = { registerUser, loginUser }