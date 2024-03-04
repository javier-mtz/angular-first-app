import router from "./controllers/authController.js";
import cors from "cors";

import express, { json, urlencoded } from "express";

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({extended: false}));
//Es necesario que las rutas esten despues del todo
app.use(router);


export default app;
