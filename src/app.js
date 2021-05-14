require('dotenv').config()
const cron = require('node-cron');
const moment = require('moment');
const parser = require('cron-parser');
const routes = require('./api/routes')
const appConfig = require('./configs/appConfig');
const mailConfig = require('./configs/mailConfig');
const schedulerConfig = require('./configs/schedulerConfig');;
const alerts = require('./utilities/alerts');
const appointments = require('./utilities/appointments');
const dailyDigest = require('./utilities/dailyDigest');
const htmlBuilder = require('./utilities/htmlBuilder');
const locations = require('./utilities/locations');
const logger = require('./utilities/logger');

let runCounter = 0;
let firstRun = true;
let vaccinationSlots = [];

async function main() {
  try {
    cron.schedule(schedulerConfig.SCHEDULE, async function() {
      await fetchVaccinationSlots();
    });
  } catch (error) {
    console.log(logger.getLog(`There was an error fetching vaccine slots: ${JSON.stringify(error, null, 2)}.`));
  }
}

async function fetchVaccinationSlots() {
  let dates = await getTwoWeekDateArray();
  let pincodeArray = [];
  try {
    if (Boolean(appConfig.FINDBYPINCODE)) {
      if (appConfig.PINCODE.includes(',')) {
        let pincodeArray = appConfig.PINCODE.split(',');
        for( counter = 0; counter < pincodeArray.length; counter++) {
          if (pincodeArray[counter].toString().length < 6) {
            console.log(logger.getLog(`Invalid pincode ${pincodeArray[counter]} provided in config file: (src/config/appConfig.js).`));
            pincodeArray.splice(counter, 1);
          }
        }
        getAppointmentsByPincode(pincodeArray, dates);
      } else if (appConfig.PINCODE.toString().length < 6) {
        throw 'Application is set to fetch vaccine slots by pincode but no pincode/ invalid pincode provided in config file: (src/config/appConfig.js).';
      } else {
        pincodeArray.push(appConfig.PINCODE);
        getAppointmentsByPincode(pincodeArray, dates);
      }
    } else {
      if (appConfig.DISTRICT.length == 0) {
        throw 'Application is set to fetch vaccine slots by district but no district name provided in config file: (src/config/appConfig.js).';
      }
      getAppointmentsByDistrict(dates);
    }
  } catch (error) {
    console.log(logger.getLog(error));
  }
}

async function getTwoWeekDateArray() {
  let dateArray = [];
  let currentDate = moment();
  for(let counter = 1; counter <= schedulerConfig.DATE_RANGE; counter++) {
    let date = currentDate.format(schedulerConfig.DATE_FORMAT);
    dateArray.push(date);
    currentDate.add(1, 'day');
  }
  return dateArray;
}

async function getAppointmentsByPincode(pincodeArray, dates) {
  let slotsArray = [];
  for await (const date of dates) {
    for await (const pin of pincodeArray) {
      let slots = await routes.getVaccinationSlotsByPincode(pin, date)
        .then(function (result) {
          return appointments.getFilteredSlots(date, result.data.sessions);
        })
        .catch(function (error) {
          if (error.response.statusText) {
            console.log(logger.getLog(`Unable to get appointment slots at pincode: ${pin} for the date: ${date}, ${error.response.statusText}.`));
          } else {
            console.log(logger.getLog(`Unable to get appointment slots at pincode: ${pin} for the date: ${date}, ${error}.`));
          }
        });
      slotsArray.push(slots);
    };
  };
  sendEmailAlert(slotsArray);
}

async function getAppointmentsByDistrict(dates) {
  let slotsArray = [];
  try {
    let stateId = await locations.getStateId(appConfig.STATE);
    let districtId = await locations.getDistrictId(stateId, appConfig.DISTRICT);
    if (stateId == undefined) {
      throw 'Unable to find state id. Please verify state name in config file: src/config/appConfig.js.';
    } else if (districtId == undefined) {
      throw 'Unable to find district id. Please verify district name in config file: src/config/appConfig.js.';
    }
    for await (const date of dates) {
      let slots = await routes.getVaccinationSlotsByDistrict(districtId, date)
        .then(function (result) {
          return appointments.getFilteredSlots(date, result.data.sessions);
        })
        .catch(function (error) {
          if (error.response.statusText) {
            console.log(logger.getLog(`Unable to get appointment slots at district: ${districtId} for the date: ${date}, ${error.response.statusText}.`));
          } else {
            console.log(logger.getLog(`Unable to get appointment slots at district: ${districtId} for the date: ${date}, ${error}.`));
          }
        });
      slotsArray.push(slots);
    };
    sendEmailAlert(slotsArray);
  } catch (error) {
    console.log(logger.getLog(error));
  }
}

async function sendEmailAlert(slotsArray) {
  let outputArray = [];
  for(let counter1 = 0; counter1 < slotsArray.length; counter1++) {
    if (slotsArray[counter1] != undefined || slotsArray[counter1] != undefined && slotsArray[counter1].length > 0) {
      for(let counter2 = 0; counter2 < slotsArray[counter1].length; counter2++) {
        outputArray.push(slotsArray[counter1][counter2]);
      }
    }
  }
  if (outputArray.length > 0 && !Boolean(await appointments.compareVaccinationSlots(outputArray, vaccinationSlots))) {
    vaccinationSlots = outputArray;
    alerts.sendEmailAlert(mailConfig.SUBJECT, await htmlBuilder.prepareHtmlBody(outputArray), (error, result) => {
      if(error) {
        console.log(logger.getLog(error));
      } else {
        console.log(logger.getLog('New sessions have been processed and sent as an email alert to the recipient(s).'));
      }
    });
  } else {
    console.log(logger.getLog('No new sessions to process at this time.'));
    if (Boolean(firstRun)) {
      alerts.sendEmailAlert(mailConfig.FIRST_EMAIL_SUBJECT, await htmlBuilder.prepareFirstEmail(), (error, result) => {
        if(error) {
          console.log(logger.getLog(error));
        } else {
          console.log(logger.getLog('Welcome email alert has been sent to the recipient(s).'));
        }
      });
    }
  }
  firstRun = false;
  runCounter = runCounter + 1;
  await dailyDigest.updateRunStatistics(runCounter, outputArray);
  await resetDailyCounter();
};

async function resetDailyCounter() {
  const interval = parser.parseExpression(schedulerConfig.SCHEDULE);
  let nextRun = interval.next().toString();
  let lastRun = moment().date() == moment(new Date(nextRun)).date() &&
    moment().month() == moment(new Date(nextRun)).month() ? false : true;
  if (Boolean(lastRun)) {
    await setTimeout(() => { dailyDigest.prepareReport(); }, schedulerConfig.DELAY);
    runCounter = 0;
  }
};

main().then(() => {
  console.log(logger.getLog('The covid-19 vaccination alerting application has started!'));
});
