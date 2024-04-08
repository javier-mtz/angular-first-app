import Mailjet from "node-mailjet";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

dotenv.config();

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);


export async function sendEmailNewPassword(username, email) {
  try {
    const user = await User.findOne({ username });
      if (!user) {
        console.error('No user found');
        return;
      }
  
      const userId = user._id;
  
      const token = jwt.sign({ id: userId }, "MySecretDomentos", {
        expiresIn: 60 * 60 * 2,
      });
  
      const link = `http://localhost:4200/mailtoken/${token}`;
  
      console.log(link);

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "pablo72h@proton.me",
          Name: "CarHistory",
        },
        To: [
          {
            Email: email,
            Name: username,
          },
        ],
        Variables: {
          resetLink: link,
        },
        TemplateID: 5831458,
        TemplateLanguage: true,
        Subject: "Bienvenido a CarHistory",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.error(err.statusCode);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function sendForgotPasswordEmail(username, email) {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.error('No user found');
      return;
    }

    const userId = user._id;

    const token = jwt.sign({ id: userId }, "MySecretDomentos", {
      expiresIn: 60 * 60 * 2,
    });

    const link = `http://localhost:4200/mailtoken/${token}`;

    console.log(link);

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "pablo72h@proton.me",
          Name: "CarHistory",
        },
        To: [
          {
            Email: email,
            Name: username,
          },
        ],
        Variables: {
          resetLink: link,
        },
        TemplateID: 5831450,
        TemplateLanguage: true,
        Subject: "Bienvenido a CarHistory",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.error(err.statusCode);
    });
  } catch (error) {
    console.error(error);
  }
}