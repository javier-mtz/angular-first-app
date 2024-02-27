const router = require("./controllers/authController");
const cors = require("cors")

const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Es necesario que las rutas esten despues del todo
app.use(router);


module.exports = app;
