const appConfig = require('../configs/appConfig');
const logger = require('../utilities/logger');

function getFilteredSlots (date, sessions) {
  let validSlots = sessions.filter(slot => slot.min_age_limit <= appConfig.AGE && slot.available_capacity > 0)
  if(validSlots.length > 0) {
    console.log(logger.getLog(`Vaccination slots returned for ${date}: ${validSlots.length}`));
  }
  return validSlots;
};

async function compareVaccinationSlots(outputArray, vaccinationSlots) {
  if (outputArray.length == vaccinationSlots.length) {
    let equalCount = 0;
    for(let counter = 0; counter < outputArray.length; counter++) {
      if (outputArray[counter].name == vaccinationSlots[counter].name) {
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
