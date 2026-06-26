import nodemailer from "nodemailer";

interface ITeacherEmailSent {
  to: string;
  subject: string;
  html: string;
}

const sendMail = async (MailFormatObject: ITeacherEmailSent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", //yahoo  ,,,,   hotmail
    auth: {
      user: "rahulsharmax9q7v2l8@gmail.com ",
      pass: "bvlcyntjfugkgqal", //  just a app password not a real gmail password.......
    },
  });

  try {
    const sentEmail = await transporter.sendMail(MailFormatObject);
    console.log("sent email:---", sentEmail);
    return sentEmail;
  } catch (err) {
    console.error("err:--in sending email..........--", err);
    return;
  }
};

export default sendMail;
