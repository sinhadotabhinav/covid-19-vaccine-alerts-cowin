const appConfig = require('../config/appConfig');

function getFilteredSlots (date, sessions) {
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
};

module.exports = { getFilteredSlots };
