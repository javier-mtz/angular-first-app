const { Router } = require("express");
const User = require("../models/User");
const mongoose = require("mongoose");

const router = Router();
const jwt = require("jsonwebtoken");
const config = require("../Config")
const verifyToken = require("./verifyToken")

router.post("/Signup", async (req,res, next) =>{
    const { username, email, password } = req.body;
    const user = new User({
        username,
        email,
        password
    })
    user.password = await user.encryptPassword(user.password);
    await user.save();
    const token = jwt.sign({id : user._id}, config.secret,{
        expiresIn: 60 * 60 * 24
    });
    res.json({auth: true, token});
});

router.post("/Singin", async (req,res,next) =>{
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        res.status(404).send("The email doesn't exists");
    }
    const ValidPassword = await user.validatePassword(password); 
    if(!ValidPassword){
        return res.status(401).json({auth: false, token: null});
    }
    const token = jwt.sign({id: user._id}, config.secret,{
        expiresIn: 60 * 60 * 24
    });
    res.json({auth: true, token, user});
});

router.get("/Inicio", verifyToken, async (req,res,next) =>{
    const user = await User.findById(req.userId, {password: false, __v: false});
    if(!user) {
        return res.status(404).send("No user found");
    }
    res.json(user);
});

module.exports = router;