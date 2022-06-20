require("dotenv/config");
const sgMail = require('@sendgrid/mail');
const { config } = require('bluebird');
sgMail.setApiKey(process.env.SENDGRID_KEY);
function sendEmail(postInfo){
const msg = {
  to: "aditya2.mobcoder@gmail.com",
  from: 'aadi76548@gmail.com', // Use the email address or domain you verified above
  subject: 'This is a test email',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>This is an E-mail for testing purpose</strong> <br> Your post is successful',
};
//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
}

module.exports = sendEmail();