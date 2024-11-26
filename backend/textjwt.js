const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
// Secret key for JWT signing and verification (ensure it's a string)
const secret = process.env.JWT_SECRET; // You can replace this with process.env.JWT_SECRET for your environment
// Payload to encode
const payload = { _id: "ObjectId('67448e0622ce3e94a8b119fb')" };

const generateRefreshToken = (payload) => {
    console.log(payload)
    return jwt.sign(payload, secret, { expiresIn: "3d" })
}

// console.log(generateRefreshToken())
// Generate a token
const user = {
    _id: ObjectId('67448e0622ce3e94a8b119fb')
}
// const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Token will expire in 1 hour
const token = generateRefreshToken({ id: user._id })
console.log('Generated Token:', token);

// Verify the token
try {
    const decoded = jwt.verify(token, secret); // The secret must match the one used in signing
    console.log('Decoded Payload:', decoded); // Output decoded data (e.g., user ID)
} catch (error) {
    console.error('Error verifying token:', error);
}
