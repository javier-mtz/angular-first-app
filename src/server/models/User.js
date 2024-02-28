import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    password : {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        require: false,
        default: true
    },
    role: {
        type: String,
        require: false,
        default: "USER"
    },
    created_at: {
        type: Date,
        require: false,
        default: Date.now
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