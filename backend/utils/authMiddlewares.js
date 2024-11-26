const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const generateRefreshToken = (id, time) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: time })
}


const generateToken = (id, time) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: time })
}


const authmiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token
    try {
        // if (req.headers?.authorization?.startsWith("Bearer")) {
        // console.log("first")
        if (!token) {
            return res.status(401).json({ error: 'Authorization token missing' });
        }
        // const token = req.headers.authorization?.split(' ')[1].trim();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            const user = await userModel.findById(decoded.id);
            req.user = user;
            next();
        } else {
            throw new Error("Not Logged In. Please login again");
        }

        // } else {
        //     throw new Error("There is no token attached to the header");
        // }
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message, success: false })
    }
}


const notUser = async (req, res, next) => {
    const user = req.user;
    try {
        if (user?.role != "Admin" && user?.role != "Super Admin") {
            throw new Error("You are not Authorized");
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message, success: false })
    }
}

const isSuperAdmin = async (req, res, next) => {
    const user = req.user;
    try {
        if (user?.role != "Super Admin") {
            throw new Error("You are not Authorized");
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message, success: false })
    }
}

module.exports = { generateToken, generateRefreshToken, authmiddleware, notUser, isSuperAdmin }