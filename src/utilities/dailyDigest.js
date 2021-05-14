const appConfig = require('../configs/appConfig');
const mailConfig = require('../configs/mailConfig');
const alerts = require('../utilities/alerts');
const htmlBuilder = require('../utilities/htmlBuilder');
const logger = require('../utilities/logger');

let runs = 0;
let uniqueSlots = [];

async function prepareReport () {
  let regionType = Boolean(appConfig.FINDBYPINCODE) ? 'pincode' : 'district';
  let region = regionType == 'pincode' ? appConfig.PINCODE : appConfig.DISTRICT;
  alerts.sendEmailAlert(mailConfig.DAILY_DIGEST_SUBJECT,
     await htmlBuilder.prepareDailyDigestEmail(runs, uniqueSlots.length, regionType, region), (error, result) => {
    if(error) {
      console.log(logger.getLog(error));
    } else {
      console.log(logger.getLog('Daily digest email alert has been sent to the recipient(s).'));
    }
  });
}

async function updateRunStatistics (runCounter, outputArray) {
  let slots = uniqueSlots;
  let centersArray = await getCenters(outputArray);
  uniqueSlots = [...new Set([...slots,...centersArray])];
  runs = runCounter;
}

async function getCenters (outputArray) {
  let centersArray = [];
  for(let counter = 0; counter < outputArray.length; counter++) {
    centersArray.push(outputArray[counter].center_id.toString());
  }
  return centersArray;
}

module.exports = { prepareReport, updateRunStatistics };
