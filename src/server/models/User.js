const bcrypt = require("bcryptjs")
const {Schema, model} = require("mongoose")

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
});


userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}


module.exports = model("User", userSchema);