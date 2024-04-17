import User from "../models/User.js";
import jwt from "jsonwebtoken";
import urid from 'urid';
import { sendEmailNewPassword, sendForgotPasswordEmail } from "../controllers/emailController.js";

class UserService {
  constructor() {}

  getAllUsers = async () => {
    try {
      const users = await User.find({ 
        status: 1, 
        $or: [
          { deleted_at: { $exists: false } },
          { deleted_at: null }
        ] 
      }, { password: false });
      return users;
    } catch (error) {
      throw error;
    }
  };

  createUser = async (username, email, role) => {

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }
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
            user.save();
            return { message: "User created" };
          })
          .then(resolve)
          .catch(reject);
      })
        .then((savedUser) => {
          sendEmailNewPassword(username, email);
          return savedUser;
        })
        .catch((error) => {
          throw error;
        });
  };

  signup = async (username, email, password) => {
    try {
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        const user = new User({
          username,
          email,
          password,
        });
        const encryptedPassword = await user.encryptPassword(user.password);
        user.password = encryptedPassword;
        const savedUser = await user.save();
      
        const token = jwt.sign({ id: user._id }, "MySecretDomentos", {
          expiresIn: 60 * 60 * 2,
        });
      
        return { auth: true, token, username, role: user.role };
      } else if (existingUser.deleted_at instanceof Date) {
        const encryptedPassword = await existingUser.encryptPassword(password);
        const updatedUser = await User.findOneAndUpdate(
          { username },
          { email, password: encryptedPassword, deleted_at: null },
          { new: true }
        );
      
        const token = jwt.sign({ id: updatedUser._id }, "MySecretDomentos", {
          expiresIn: 60 * 60 * 2,
        });
      
        return { auth: true, token, username, role: updatedUser.role };
      } else {
        throw new Error('Username already exists');
      }
    } catch (error) {
      throw error;
    }
  };

  deleteUser = async (id) => {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { status: 2 },
        { deleted_at: Date.now()}, 
        { new: true }
      );
      if (!user) {
        return { message: "User not found" };
      } else {
        return user;
      }
    } catch (error) {
      return error;
    }
  };

  deleteUserbySelf = async (id) => {
    try {
      const user = await User.findByIdAndUpdate(
        { _id: id, status: 1 },
        { deleted_at: Date.now() },
        { new: true }
      );
      if (!user) {
        return new Error("No user found");
      }
      return { message: "User deleted" };
    } catch (error) {
      throw error;
    }
  }

  updateUser = async (id, username, email, role) => {
    try {
      const existingUser = await User.findOne({
        $or: [
          { username },
          { email }
        ],
        _id: { $ne: id }
      });
      if (existingUser) {
        throw new Error('Username or email already exists');
      }
      const user = await User.findByIdAndUpdate(
        id,
        { username, email, role, updated_at: Date.now()},
        { new: true }
      );
      if (!user) {
        return { message: "User not found" };
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  };

  findUser = async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        return { message: "User not found" };
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  };

  resetPassword = async (id, password) => {
    new Promise((resolve, reject) => {
      User.findById(id)
        .then((user) => {
          user.encryptPassword(password).then((encryptedPassword) => {
            user.password = encryptedPassword;
            if (user.oneTimePassword) {
              user.set({ oneTimePassword: undefined });
            }
            user.save();
            return { message: "Password updated" };
          });
        })
        .then(resolve)
        .catch(reject);
    })
      .then((savedUser) => {
        return savedUser;
      })
      .catch((error) => {
        throw error;
      });
  };

  forgotPassword = async (email) => {
    try {
      const user = await User.findOne({ email: { $regex: new RegExp(email, "i") } });
      if (!user) {
        return { message: "Intenta de nuevo con otro email" };
      } else {
        user.set({ password: urid(8, "alpha") });
        user.set({ oneTimePassword: true });
        user.save();
        sendForgotPasswordEmail(user.username, email);
        return { message: "Email sent" };
      }
    } catch (error) {
      throw error;
    }
  };
}

export default UserService;
