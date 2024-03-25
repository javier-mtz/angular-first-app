import Mailjet from "node-mailjet";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);


export async function sendEmailNewPassword(username, email) {
  const token = jwt.sign({ id: username }, "MySecretDomentos", {
    expiresIn: 60 * 60 * 2,
  });
  const link = `http://localhost:4200/login/${token}`;
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
        TemplateID: 5814713,
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
      console.log(err.statusCode);
    });
}