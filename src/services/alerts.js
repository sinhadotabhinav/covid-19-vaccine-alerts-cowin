let mailer = require('nodemailer');
const appConfig = require('../config/appConfig');

let mailerTransport = mailer.createTransport({
  service: 'Gmail',
  auth: {
    user: String(appConfig.EMAIL),
    pass: String(process.env.APPLICATION_PASSWORD)
  }
});

function sendEmailAlert (subject, slotDetails, callback) {
  let options = {
    from: String('Vaccine Checker ' + appConfig.EMAIL),
    to: appConfig.EMAIL,
    subject: subject,
    text: 'Vaccine available. Find details below: \n\n' + slotDetails
  };
  mailerTransport.sendMail(options, (error, info) => {
    if (error) {
      return callback(error);
    }
    callback(error, info);
  });
};

module.exports = { sendEmailAlert };
