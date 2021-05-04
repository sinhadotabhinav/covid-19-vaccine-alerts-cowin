const axios = require('axios');
const apiConfig = require('../config/apiConfig');

async function getStates() {
  let config = {
    method: apiConfig.HTTP_GET,
    url: apiConfig.BASE_URL + apiConfig.STATES_URI,
    headers: {
      'Accept': apiConfig.ACCEPT_CHARSET,
      'Accept-Language': apiConfig.ACCEPT_LANGUAGE
    }
  };
  return axios(config)
    .then(function (result) {
      if (result.status == apiConfig.STATUS_OK) {
        return result;
      } else {
        throw 'Unable to get list of states, status code ' + result.status + ': ' + result.statusText;
      }
    })
}

async function getDistricts(districtId) {
  let config = {
    method: apiConfig.HTTP_GET,
    url: apiConfig.BASE_URL + apiConfig.DISTRICTS_URI + districtId,
    headers: {
      'Accept': apiConfig.ACCEPT_CHARSET,
      'Accept-Language': apiConfig.ACCEPT_LANGUAGE
    }
  };
  return axios(config)
    .then(function (result) {
      if (result.status == apiConfig.STATUS_OK) {
        return result;
      } else {
        throw 'Unable to get list of districts, status code ' + result.status + ': ' + result.statusText;
      }
    })
}

async function getVaccinationSlotsByPincode(pinCode, date) {
  let config = {
    method: apiConfig.HTTP_GET,
    url: apiConfig.BASE_URL + apiConfig.APPOINTMENTS_PINCODE_URI + '?pincode=' + pinCode + '&date=' + date,
    headers: {
      'Accept': apiConfig.ACCEPT_CHARSET,
      'Accept-Language': apiConfig.ACCEPT_LANGUAGE
    }
  };
  return axios(config)
    .then(function (result) {
      if (result.status == apiConfig.STATUS_OK) {
        return result;
      } else {
        throw 'Unable to get vaccine sessions by pincode, status code ' + result.status + ': ' + result.statusText;
      }
    })
}

async function getVaccinationSlotsByDistrict(districtId, date) {
  let config = {
    method: apiConfig.HTTP_GET,
    url: apiConfig.BASE_URL + apiConfig.APPOINTMENTS_DISTRICTS_URI + '?district_id=' + districtId + '&date=' + date,
    headers: {
      'Accept': apiConfig.ACCEPT_CHARSET,
      'Accept-Language': apiConfig.ACCEPT_LANGUAGE
    }
  };
  return axios(config)
    .then(function (result) {
      if (result.status == apiConfig.STATUS_OK) {
        return result;
      } else {
        throw 'Unable to get vaccine sessions by distict, status code ' + result.status + ': ' + result.statusText;
      }
    })
}

module.exports = { getStates, getDistricts, getVaccinationSlotsByPincode, getVaccinationSlotsByDistrict };
