const jwt = require('jsonwebtoken')

const generateRefreshToken = ({ id }) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" })
}


const generateToken = ({ id }) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" })
}

module.exports = { generateToken, generateRefreshToken }