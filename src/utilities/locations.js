var stateJson = require('../models/states.json');
const routes = require('../api/routes');

function getStateId (state) {
  for(var counter = 0; counter < stateJson['states'].length; counter++) {
    if (stateJson['states'][counter]['state_name'].toLowerCase() == state.toLowerCase()) {
      return stateJson['states'][counter]['state_id'];
    }
  }
};

function getDistrictId (stateId, district) {
  return routes.getDistricts(stateId)
    .then(function (result) {
      for(var counter = 0; counter < result.data['districts'].length; counter++) {
        if (result.data['districts'][counter]['district_name'].toLowerCase() == district.toLowerCase()) {
          return result.data['districts'][counter]['district_id'];
        }
      }
    });
};

module.exports = { getStateId, getDistrictId };
