import { Router } from "express";
import User from "../models/User.js";
import nodeMailer from "nodemailer";

import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.post("/oneTimePass", async (req, res) => {
    console.log(req.body);
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
    let configOptions = nodeMailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: "CarHistory",
        to: req.body.email,
        subject: "Contraseña de un solo uso",
        text: `Hola ${req.body.username} tu contraseña es: ${req.body.password}`
    }

    configOptions.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return res.status(500).
            json({message: "Error al enviar el correo"});
        }

        return res.json({message: "Correo enviado"});
    });


});

export default router;