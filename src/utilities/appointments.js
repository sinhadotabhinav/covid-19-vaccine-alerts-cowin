const appConfig = require('../config/appConfig');

function getFilteredSlots (date, sessions) {
  let validSlots = sessions.filter(slot => slot.min_age_limit <= appConfig.AGE && slot.available_capacity > 0)
  if(validSlots.length > 0) {
    console.log('Vaccination slots returned:');
    console.log({date:date, validSlots: validSlots.length});
  }
  return validSlots;
};

module.exports = { getFilteredSlots };
