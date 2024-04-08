import { Router } from "express";

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
  
    if (err) throw err;

    return result;
  };

  currentUser = async (httpRequest) => {
    const { userId } = httpRequest;
    if(!userId){
      throw new CustomError("Someone is missing", 400);
    }

    const [err, result] = await to(this.authService.currentUser(userId));

    if (err) throw err;

    return result;
  };

  mailToken = async (httpRequest) => {
    const { userId } = httpRequest;
    if(!userId){
      throw new CustomError("Someone is missing", 400);
    }

    const [err, result] = await to(this.authService.mailToken(userId));

    if (err) throw err;

    return result;
  };
}

const authController = new AuthController();

export default authController;