const appConfig = require('../configs/appConfig');
const mailConfig = require('../configs/mailConfig');
const alerts = require('../utilities/alerts');
const htmlBuilder = require('../utilities/htmlBuilder');
const logger = require('../utilities/logger');

let runs = 0;
let slots = [];

async function prepareReport () {
  let regionType = Boolean(appConfig.FINDBYPINCODE) ? 'pincode' : 'district';
  let region = regionType == 'pincode' ? appConfig.PINCODE : appConfig.DISTRICT;
  alerts.sendEmailAlert(mailConfig.DAILY_DIGEST_SUBJECT,
     await htmlBuilder.prepareDailyDigestEmail(runs, slots.length, regionType, region), (error, result) => {
    if(error) {
      console.log(logger.getLog(error));
    } else {
      console.log(logger.getLog('Daily digest email alert has been sent to the recipient(s).'));
    }
  });
}

async function updateRunCounter (runCounter, vaccinationSlots) {
  runs = runCounter;
  slots = vaccinationSlots;
}

module.exports = { prepareReport, updateRunCounter };
