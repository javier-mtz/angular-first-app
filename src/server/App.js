import express, { json, urlencoded } from "express";
import cors from "cors";

import authRouter from "./controllers/authController.js";
import userRouter from "./controllers/userController.js";
import brandRouter from "./controllers/brandController.js";
import carRouter from "./controllers/carController.js";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended: false}));
//Es necesario que las rutas esten despues del todo
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/brand', brandRouter);
app.use('/car', carRouter);


export default app;
