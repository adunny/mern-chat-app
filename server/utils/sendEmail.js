const nodemailer = require("nodemailer");

async function sendEmail(body) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "globalchatapp0@gmail.com",
      pass: process.env.EMAIL_PW,
    },
  });

  const mailOptions = {
    from: "GlobalChat <globalchatapp0@gmail.com>",
    to: body.email,
    subject: "Account Created",
    text: `
    Dear ${body.username},

    Thanks for trying out GlobalChat!

    Check out the source code here: https://github.com/adunny/mern-chat-app

    Sincerely,
    GlobalChat
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
