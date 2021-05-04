require('dotenv').config()
const moment = require('moment');
const cron = require('node-cron');
const axios = require('axios');
const alerts = require('./services/alerts');
const routes = require('./api/routes');
const locations = require('./utilities/locations');
const appConfig = require('./config/appConfig');

async function main() {
  try {
    await fetchVaccineSlots();
    // cron.schedule('* * * * *', async () => {
      // await fetchVaccineSlots();
    // });
  } catch (e) {
    console.log('There was an error fetching vaccine slots: ' + JSON.stringify(e, null, 2));
    throw e;
  }
}

async function fetchVaccineSlots() {
  let dates = await getTwoWeekDateArray();
  console.log(dates);
  try {
    if (Boolean(appConfig.FINDBYPINCODE)) {
      if (appConfig.PINCODE.toString().length < 6) {
        throw 'Application is set to fetch vaccine slots by pincode but no pincode/ invalid pincode provided in config file: (src/config/appConfig.js)';
      }
      getAppointmentsByPincode(dates);
    } else {
      if (appConfig.DISTRICT.length == 0) {
        throw 'Application is set to fetch vaccine slots by district but no district name provided in config file: (src/config/appConfig.js)';
      }
      getAppointmentsByDistrict(dates);
    }
  } catch (e) {
    console.log(e);
  }
}

async function getAppointmentsByPincode(dates) {
  let slotsArray = [];
  for await (const date of dates) {
    let slots = await routes.getVaccineSessionsByPincode(appConfig.PINCODE, date)
      .then(function (result) {
        let sessions = result.data.sessions;
        let validSlots = sessions.filter(slot => slot.min_age_limit <= appConfig.AGE && slot.available_capacity > 0)
        if(validSlots.length > 0) {
          console.log({date:date, validSlots: validSlots.length})
        }
        for(var counter = 0; counter < validSlots.length; counter++) {
          delete validSlots[counter]['center_id'];
          delete validSlots[counter]['lat'];
          delete validSlots[counter]['long'];
          delete validSlots[counter]['fee'];
          // delete validSlots[counter]['date'];
          delete validSlots[counter]['session_id'];
          delete validSlots[counter]['from'];
          delete validSlots[counter]['to'];
          // delete validSlots[counter]['pincode'];
          delete validSlots[counter]['block_name'];
        }
        console.log('slots returned for date: ' + date);
        return validSlots;
      })
      .catch(function (error) {
        console.log('Unable to get appointment slots at pincode: ' + appConfig.PINCODE + ' for the date: ' + date + ', ' + error.response.statusText);
      });
    slotsArray.push(slots);
  };
  notifyMe(slotsArray);
}

async function getAppointmentsByDistrict(dates) {
  let slotsArray = [];
  try {
    let stateId = await locations.getStateId(appConfig.STATE);
    let districtID = await locations.getDistrictId(stateId, appConfig.DISTRICT);
    if (stateId == undefined) {
      throw 'Unable to find state id. Please verify state name in config file: src/config/appConfig.js';
    } else if (districtID == undefined) {
      throw 'Unable to find district id. Please verify district name in config file: src/config/appConfig.js';
    }
    for await (const date of dates) {
      let slots = await routes.getVaccineSessionsByDistrict(districtID, date)
        .then(function (result) {
          let sessions = result.data.sessions;
          let validSlots = sessions.filter(slot => slot.min_age_limit <= appConfig.AGE && slot.available_capacity > 0)
          if(validSlots.length > 0) {
            console.log({date:date, validSlots: validSlots.length})
          }
          for(var counter = 0; counter < validSlots.length; counter++) {
            delete validSlots[counter]['center_id'];
            delete validSlots[counter]['lat'];
            delete validSlots[counter]['long'];
            delete validSlots[counter]['fee'];
            // delete validSlots[counter]['date'];
            delete validSlots[counter]['session_id'];
            delete validSlots[counter]['from'];
            delete validSlots[counter]['to'];
            // delete validSlots[counter]['pincode'];
            delete validSlots[counter]['block_name'];
          }
          console.log('slots returned for date: ' + date);
          return validSlots;
        })
        .catch(function (error) {
          console.log('Unable to get appointment slots at district: ' + districtID + ' for the date: ' + date + ', ' + error.response.statusText);
        });
      slotsArray.push(slots);
    };
    sendEmailAlert(slotsArray);
  } catch (e) {
    console.log(e);
  }
}

async function getTwoWeekDateArray() {
  let dateArray = [];
  let today = moment();
  for(let counter = 0; counter < 3; counter ++) {
    let date = today.format('DD-MM-YYYY')
    dateArray.push(date);
    today.add(1, 'day');
  }
  return dateArray;
}

async function sendEmailAlert(array) {
  let slotDetails = JSON.stringify(array, null, '\t');
  console.log(slotDetails);
  // alerts.sendEmailAlert(appConfig.EMAIL, 'VACCINE AVAILABLE', slotDetails, (err, result) => {
  //   if(err) {
  //     console.error({err});
  //   }
  // })
};

main().then(() => {
  console.log('Vaccine availability checker started.');
});
