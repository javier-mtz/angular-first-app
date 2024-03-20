import { Router } from "express";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = Router();

import jwt from "jsonwebtoken";
import verifyToken from "./verifyToken.js";

router.post("/login", async (req, res, next) => {
  const { username, password, ip } = req.body;
  let publicIp = {};
  console.log(ip);
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



export default router;
