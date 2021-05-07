const appConfig = require('../configs/appConfig');

function getFilteredSlots (date, sessions) {
  let validSlots = sessions.filter(slot => slot.min_age_limit <= appConfig.AGE && slot.available_capacity > 0)
  if(validSlots.length > 0) {
    console.log('Vaccination slots returned:');
    console.log({date:date, validSlots: validSlots.length});
  }
  return validSlots;
};

async function compareVaccinationSlots(outputArray, vaccinationSlots) {
  if (outputArray.length == vaccinationSlots.length) {
    let equalCount = 0;
    for(let counter = 0; counter < outputArray.length; counter++) {
      if (JSON.stringify(outputArray[counter]) == JSON.stringify(vaccinationSlots[counter])) {
        equalCount = equalCount + 1;
      }
    }
    if (equalCount == outputArray.length) {
      return true;
    }
  }
  return false;
}

module.exports = { getFilteredSlots, compareVaccinationSlots };
