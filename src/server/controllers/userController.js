import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { sendEmailNewPassword, sendForgotPasswordEmail } from "../../server/controllers/emailController.js";
import { to } from "await-to-js";
import CustomError from "../utils/customError.js";
import urid from 'urid';
import UserService from "../services/userService.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async () => {
    const [err, result] = await to(this.userService.getAllUsers());

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  };

  createUser = async (httpRequest) => {
    const { username, email, role } = httpRequest.body;

    if (!username || !email || !role) {
      throw new CustomError("Someone is missing", 400);
    }
    const [err, result] = await to(this.userService.createUser(username, email, role));


    if (err) throw err;

    return result;
  };

  signup = async (httpRequest) => {
    const { username, email, password } = httpRequest.body;
    if (!username || !email || !password) {
      throw new CustomError("Someone is missing", 400);
    }
    const [err, result] = await to(this.userService.signup(username, email, password));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  };

  deleteUser = async (httpRequest) => {
    const { id } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.userService.deleteUser(id));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  };

  updateUser = async (httpRequest) => {
    const { id } = httpRequest.params;
    const { username, email, role } = httpRequest.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.userService.updateUser(id, username, email, role));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  };

  findUser = async (httpRequest) => {
    const { id } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    
    const [err, result] = await to(this.userService.findUser(id));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  };

  resetPassword = async (httpRequest) => {
    const { id } = httpRequest.params;
    const { password } = httpRequest.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    
    const [err, result] = await to(this.userService.resetPassword(id, password));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  };

  forgotPassword = async (httpRequest) => {
    const { email } = httpRequest.body;
    const [err, result] = await to(this.userService.forgotPassword(email));

    if(!result){
      throw new CustomError("Internal Server Error", 500);
    }

    if (err) throw err;

    return result;
  };

}

const userController = new UserController();

export default userController;

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
    password: urid(8, 'alpha'),
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

router.post("/forgotPassword", (req, res) => {
  const { email } = req.body;
  // bsucar usuario por email sin importar mayúsculas o minúsculas
  User.findOne({ email: { $regex: new RegExp(email, "i") } }).then((user) => {
    if (!user) {
      res.status(404).send("Intenta de nuevo con otro email");
    } else {
      // agregarle al usuario una contraseña temporal
      user.set({ password: urid(8, 'alpha') });
      user.set({ oneTimePassword: true });
      user.save().then((savedUser) => {
        sendForgotPasswordEmail(savedUser.username, email).then(() => {
          res.json({ message: "Email sent" });
        }).catch((error) => {
          res.status(500).send("Internal Server Error");
        });
      });
    }
  });

});

