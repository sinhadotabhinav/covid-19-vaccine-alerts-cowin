let mailer = require('nodemailer');
const appConfig = require('../configs/appConfig');
const mailConfig = require('../configs/mailConfig');

let mailerTransport = mailer.createTransport({
  service: mailConfig.SERVICE_PROVIDER,
  auth: {
    user: String(appConfig.EMAIL),
    pass: String(process.env.APPLICATION_PASSWORD)
  }
});

function sendEmailAlert (htmlBody, callback) {
  let options = {
    from: String(mailConfig.SENDER + `<${appConfig.EMAIL}>`),
    to: mailConfig.RECIPIENT,
    subject: mailConfig.SUBJECT,
    text: mailConfig.BODY,
    html: htmlBody
  };
  mailerTransport.sendMail(options, (error, info) => {
    if (error) {
      return callback(error);
    }
    callback(error, info);
  });
};

module.exports = { sendEmailAlert };
