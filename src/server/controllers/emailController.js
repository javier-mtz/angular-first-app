import Mailjet from "node-mailjet";
import dotenv from "dotenv";

dotenv.config();

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);


export async function sendEmailNewPassword(username, email) {
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
        TemplateID: 5794553,
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