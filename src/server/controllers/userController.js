import mongoose from "mongoose";
import { to } from "await-to-js";
import CustomError from "../utils/customError.js";
import UserService from "../services/userService.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async () => {
    const [err, result] = await to(this.userService.getAllUsers());

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

    if (err) throw err;

    return result;
  };

  deleteUser = async (httpRequest) => {
    const { id } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    const [err, result] = await to(this.userService.deleteUser(id));

    if (err) throw err;

    return result;
  };

  deleteUserbySelf = async (httpRequest) => {
    const { id } = httpRequest.params;
    if(!id){
      throw new CustomError("Someone is missing", 400);
    }

    const [err, result] = await to(this.userService.deleteUserbySelf(id));

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
    
    if (err) throw err;

    return result;
  };

  findUser = async (httpRequest) => {
    const { id } = httpRequest.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new CustomError("No record with given id : " + id, 400);
    }
    
    const [err, result] = await to(this.userService.findUser(id));

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

    if (err) throw err;

    return result;
  };

  forgotPassword = async (httpRequest) => {
    const { email } = httpRequest.body;
    const [err, result] = await to(this.userService.forgotPassword(email));

    if (err) throw err;

    return result;
  };

}

const userController = new UserController();

export default userController;
