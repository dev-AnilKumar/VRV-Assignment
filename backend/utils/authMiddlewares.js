const jwt = require('jsonwebtoken')

export const generateToken = async (id, time) => {
    return await jwt.sign(id, process.env.JWT_SECRET, { expiresIn: time })
}