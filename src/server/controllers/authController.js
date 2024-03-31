import { Router } from "express";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = Router();

import jwt from "jsonwebtoken";
import verifyToken from "./verifyToken.js";
import { to } from 'await-to-js';
import CustomError from "../utils/customError.js";
import AuthService from "../services/authService.js";



class AuthController {

  constructor() {
    this.authService = new AuthService();
  }

  login = async (httpRequest) => {
    const { username, password, ip } = httpRequest.body;

    if(!username || !password){
      throw new CustomError("Someone is missing", 400);
    }
    
    const [err, result] = await to(this.authService.login(username, password, ip));
  
    if(!result){
      throw new CustomError("Unauthorized", 401);
    }

    if (err) throw err;

    return result;
  };

  currentUser = async (httpRequest) => {
    const { userId } = httpRequest;
    if(!userId){
      throw new CustomError("Someone is missing", 400);
    }

    const [err, result] = await to(this.authService.currentUser(userId));

    if(!result){
      throw new CustomError("Unauthorized", 401);
    }

    if (err) throw err;

    return result;
  };

  mailToken = async (httpRequest) => {
    const { userId } = httpRequest;
    if(!userId){
      throw new CustomError("Someone is missing", 400);
    }

    const [err, result] = await to(this.authService.mailToken(userId));

    if(!result){
      throw new CustomError("Unauthorized", 401);
    }

    if (err) throw err;

    return result;
  };
}

const authController = new AuthController();

export default authController;

router.post("/login", async (req, res, next) => {
  const { username, password, ip } = req.body;
  let publicIp = {};

  const user = await User.findOne({ username: { $regex: new RegExp(username, "i") }, status: { $ne: 2 } });
  if (!user) {
    return res.status(401).json({ auth: false, token: null });
  }
  const ValidPassword = await user.validatePassword(password);
  if (!ValidPassword) {
    return res.status(401).json({ auth: false, token: null });
  }
  const token = jwt.sign({ id: user._id }, "MySecretDomentos", {
    expiresIn: 60 * 60 * 2,
  });
  if(ip){ 
    publicIp = {
      ip: ip.ip,
      network : ip.network,   
    }
    if (!user.publicIp.some(existingIp => existingIp.ip === publicIp.ip)) {
      user.publicIp.push(publicIp);
      await user.save();
    }
  }

  res.json({ auth: true, token, username, role: user.role});
});

router.get("/currentUser", verifyToken, async (req, res, next) => {
  const user = await User.findById(req.userId, { password: false, __v: false });
  if (!user) {
    return res.status(404).send("No user found");
  }
  res.json(user);
});

router.get("/mailToken", verifyToken, async (req, res, next) => {
  const user = await User.findById(req.userId, { __v: false });
  if (!user) {
    return res.status(404).send("No user found");
  }

  if (!user.oneTimePassword) {
    return res.status(404).send("No user found");
  }

  const token = jwt.sign({ id: user._id }, "MySecretDomentos", {
    expiresIn: 60 * 60 * 2,
  });

  const username = user.username;

  res.json({ auth: true, token, username, role: user.role});
});



//export default router;
