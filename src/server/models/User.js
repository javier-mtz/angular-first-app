import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true,
    },
    status: {
        type: Number,
        require: true,
        default: 1
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    created_at: {
        type: Date,
        require: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
        require: false,
        default: Date.now
    },
    publicIp: {
        type: Array,
        require: true
    }
});


userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}


export default model("User", userSchema);