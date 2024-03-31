import {Router} from "express";
import authRoute from "./authRoute.js";
import userRoute from "./userRoute.js";
import brandRoute from "./brandRoute.js";
import carRoute from "./carRoute.js";

const router = Router();

router.use('/auth', authRoute);

router.use('/user', userRoute);

router.use('/brand', brandRoute);

router.use('/car', carRoute);

export default router;