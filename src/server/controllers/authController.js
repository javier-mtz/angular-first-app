import { Router } from "express";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = Router();

import jwt from "jsonwebtoken";
import secret from "../Config.js";
import verifyToken from "./verifyToken.js";

router.post("/Signup", (req, res, next) => {
  const { username, email, password, status, role } = req.body;
  const user = new User({
    username,
    email,
    password,
    status,
    role,
  });

  new Promise((resolve, reject) => {
    user.encryptPassword(user.password).then((encryptedPassword) => {
        user.password = encryptedPassword;
        return user.save();
      })
      .then(resolve)
      .catch(reject);
  })
    .then((savedUser) => {
      const token = jwt.sign({ id: savedUser._id }, "MySecretDomentos", {
        expiresIn: 60 * 60 * 24,
      });
      res.json({ auth: true, token });
    })
    .catch((error) => {
      if (error.code === 11000) {
        res.status(400).send("El usuario ya existe");
      } else {
        res.status(400).send("Error al registrarse", error);
      }
    });
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(404).send("The username doesn't exists");
  }
  const ValidPassword = await user.validatePassword(password);
  if (!ValidPassword) {
    return res.status(401).json({ auth: false, token: null });
  }
  const token = jwt.sign({ id: user._id }, "MySecretDomentos", {
    expiresIn: 60 * 60 * 2,
  });
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
