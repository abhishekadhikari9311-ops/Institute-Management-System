import nodemailer from "nodemailer";
import { mailConfig } from "../config/config";

interface IEmailSent {
  from: string;
  to: string;
  subject: string;
  htmltext: string;
}

const sendMail = async (mailFormatObject: IEmailSent) => {
  console.log("AUTH_USER:", mailConfig.authUser);
  console.log(
    "AUTH_PASSWORD exists:",
    !!mailConfig.authPass,
    "length:",
    mailConfig.authPass?.length,
  );

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: mailConfig.authUser,
      pass: mailConfig.authPass,
    },
  });

  try {
    await transporter.verify();
    console.log("SMTP server is ready");

    const info = await transporter.sendMail({
      from: mailFormatObject.from,
      to: mailFormatObject.to,
      subject: mailFormatObject.subject,
      html: mailFormatObject.htmltext,
    });
    return info;
  } catch (err) {
    console.error("Mail error:", err);
    throw err;
  }
};

export default sendMail;
