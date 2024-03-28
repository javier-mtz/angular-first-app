import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { sendEmailNewPassword } from "../../server/controllers/emailController.js";
import urid from 'urid';

const router = Router();


router.get("/all", (req, res) => {
    User.find({ status: 1 },{ password: false }).then((users) => {
      res.json(users);
    }).catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

router.post("/create", (req, res) => {
  const { username, email, role } = req.body;
  const user = new User({
    username,
    email,
    // password: urid(8, 'alpha'),
    password: '123', // borrar esta linea
    role,
    oneTimePassword: true,
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
      res.json(savedUser);
      sendEmailNewPassword(username, email);
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password,
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
        expiresIn: 60 * 60 * 2,
      });
      res.json({ auth: true, token, username, role: user.role});
    })
    .catch((error) => {
      res.status(500).send("Internal Server Error");
    });
});

//Delete user
router.put("/delete/:id", (req, res) => {
  const id = req.params.id;
  try {
  // Verifica que el ID es válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('No record with given id : ' + id);
  }
  User.findByIdAndUpdate(id, { status: 2 }, { new: true })
  .then(user => {
    if (!user) {
      res.status(404).send("No user found with id: " + id);
    } else {
      res.json(user);
    }
  })
  } catch (error) {
    console.log(error);
  }

});

router.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { username, email, role } = req.body;
  User.findByIdAndUpdate(id, { username, email, role }, { new: true }).then(
    (user) => {
      if (!user) {
        res.status(404).send("No user found with id: " + id);
      } else {
        res.json({ user, message: "User updated" });
      }
    }
  );
});

router.get("/find/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id).then(user => {
    if (!user) {
      res.status(404).send("No user found with id: " + id);
    } else {
      res.json(user);
    }
  });
});

router.put("/resetPassword/:id", (req, res) => {
  const { password } = req.body;
  const id = req.params.id;

  new Promise((resolve, reject) => {
    User.findById(id).then((user) => {
      user.encryptPassword(password).then((encryptedPassword) => {
        user.password = encryptedPassword;
        if (user.oneTimePassword) {
          user.set({ oneTimePassword: undefined });
        }
        return user.save();
      });
    }).then(resolve).catch(reject);
  }).then((savedUser) => {
    res.json(savedUser);
  }).catch((error) => {
    res.status(500).send("Internal Server Error");
  });

});



export default router;
