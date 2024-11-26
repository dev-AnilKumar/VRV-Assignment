const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["User", "Admin", "Super Admin"],
        default: "User"
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);