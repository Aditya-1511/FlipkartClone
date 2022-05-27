"use strict";
const nodemailer = require("nodemailer");

async function send_mail(email, product) {
  console.log(email, product);
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  let info = await transporter.sendMail({
    from: '"mobcoder" <aditya2.mobcoder@gmail.com>',
    to: email,
    subject: "Testing of email",
    text: "",
    html: `<b>Your Product has been booked successfully</b>`,
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
module.exports = {
  send_mail,
};
