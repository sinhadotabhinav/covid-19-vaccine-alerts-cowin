'use strict';
const BASE_URL = 'https://cdn-api.co-vin.in/api/v2';
const ACCEPT_HEADER = 'application/json';
const ACCEPT_LANGUAGE = 'hi_IN';
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15';
const X_API_KEY = 'M3NqT3Iycm1NNTJHemhwTUhqREVFMWtwUWVSeHdGRHI0WWNCRWltaQo=';
const HTTP_GET = 'GET';
const STATUS_OK= 200;
const STATES_URI = '/admin/location/states';
const DISTRICTS_URI = '/admin/location/districts/';
const APPOINTMENTS_PINCODE_URI = '/appointment/sessions/public/findByPin';
const APPOINTMENTS_DISTRICTS_URI = '/appointment/sessions/public/findByDistrict';
let xApiKey = '';
if (typeof Buffer.from === "function") {
    xApiKey = Buffer.from(X_API_KEY, 'base64');
} else {
    xApiKey = new Buffer(X_API_KEY, 'base64');
}
const HEADERS = {
  'Accept': ACCEPT_HEADER,
  'Accept-Language': ACCEPT_LANGUAGE,
  'User-Agent': USER_AGENT,
  'x-api-key': xApiKey.toString('ascii').trim()
};

module.exports = { BASE_URL, HTTP_GET, STATUS_OK, STATES_URI, DISTRICTS_URI, APPOINTMENTS_PINCODE_URI, APPOINTMENTS_DISTRICTS_URI, HEADERS };
