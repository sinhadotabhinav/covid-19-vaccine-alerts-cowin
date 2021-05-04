let mailer = require('nodemailer');
const appConfig = require('../config/appConfig');
const mailConfig = require('../config/mailConfig');

let mailerTransport = mailer.createTransport({
  service: mailConfig.SERVICE_PROVIDER,
  auth: {
    user: String(appConfig.EMAIL),
    pass: String(process.env.APPLICATION_PASSWORD)
  }
});

function sendEmailAlert (slotDetails, callback) {
  let options = {
    from: String(mailConfig.SENDER + appConfig.EMAIL),
    to: appConfig.EMAIL,
    subject: mailConfig.SUBJECT,
    text: mailConfig.BODY + slotDetails
  };
  mailerTransport.sendMail(options, (error, info) => {
    if (error) {
      return callback(error);
    }
    callback(error, info);
  });
};

module.exports = { sendEmailAlert };
