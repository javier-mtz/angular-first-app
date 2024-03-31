import AuthController from '../controllers/authController.js';
import express from 'express';
import controllerHandler from "../middlewares/controllerHandler.js";
import verifyToken from '../controllers/verifyToken.js';

const authRouter = express.Router();

authRouter.route('/login').post(controllerHandler(AuthController.login));

authRouter.route('/currentUser').get(verifyToken, controllerHandler(AuthController.currentUser));

authRouter.route('/mailToken').get(verifyToken, controllerHandler(AuthController.mailToken));

export default authRouter;