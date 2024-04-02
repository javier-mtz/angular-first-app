import User from "../models/User.js";
import jwt from "jsonwebtoken";

class AuthService {
  constructor() {}

  async login(username, password, ip) {
    try {
      let publicIp = {};

      const user = await User.findOne({
        username: { $regex: new RegExp(username, "i") },
        status: { $ne: 2 },
      });
      if (!user) {
        throw new Error("No user found");
      }
      const validPassword = await user.validatePassword(password);
      if (!validPassword) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign({ id: user._id }, "MySecretDomentos", {
        expiresIn: 60 * 60 * 2,
      });
      
      if (ip && ip.ip && ip.network) {
        const ipv6Pattern = /^([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}$/;
        if (ipv6Pattern.test(ip.ip)) {
          publicIp = {
            ip: ip.ip,
            network: ip.network,
          };
          if (
            !user.publicIp.some((existingIp) => existingIp.ip === publicIp.ip)
          ) {
            user.publicIp.push(publicIp);
            await user.save();
          }
        }
      }
      return { auth: true, token, username: user.username, role: user.role };
    } catch (error) {
      throw error;
    }
  }

  async currentUser(userId) {
    try {
      const user = await User.findById(userId, { password: false, __v: false });
      if (!user) {
        throw new Error("No user found");
      }
      return user;
    } catch (error) {
        return error;
    }
  }

  async mailToken(userId) {
    try {
    const user = await User.findById(userId, { __v: false });
    if (!user) {
        return new Error("No user found");
    }

    if (!user.oneTimePassword) {
      return new Error("No user found");
    }

    const token = jwt.sign({ id: user._id }, "MySecretDomentos", {
      expiresIn: 60 * 60 * 2,
    });

    const username = user.username;

    return { auth: true, token, username, role: user.role };
    } catch (error) {
        return error;
    }
  }
}

export default AuthService;
