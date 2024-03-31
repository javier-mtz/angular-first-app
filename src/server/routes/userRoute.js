import {Router} from "express";
import controllerHandler from "../middlewares/controllerHandler.js";
import UserController from "../controllers/userController.js";

const userRouter = Router();

userRouter.route('/all').get(controllerHandler(UserController.getAllUsers));

userRouter.route('/create').post(controllerHandler(UserController.createUser));

userRouter.route('/signup').post(controllerHandler(UserController.signup));

userRouter.route('/delete/:id').put(controllerHandler(UserController.deleteUser));

userRouter.route('/update/:id').put(controllerHandler(UserController.updateUser));

userRouter.route('/find/:id').get(controllerHandler(UserController.findUser));

userRouter.route('/resetPassword/:id').put(controllerHandler(UserController.resetPassword));

userRouter.route('/forgotPassword').post(controllerHandler(UserController.forgotPassword));


export default userRouter;