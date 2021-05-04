const BASE_URL = 'https://cdn-api.co-vin.in/api/v2';
const ACCEPT_CHARSET = 'application/json';
const ACCEPT_LANGUAGE = 'hi_IN';
const HTTP_GET = 'GET';
const STATUS_OK= 200;
const STATES_URI = '/admin/location/states';
const DISTRICTS_URI = '/admin/location/districts/';
const APPOINTMENTS_PINCODE_URI = '/appointment/sessions/public/findByPin';
const APPOINTMENTS_DISTRICTS_URI = '/appointment/sessions/public/findByDistrict';

module.exports = { BASE_URL, ACCEPT_CHARSET, ACCEPT_LANGUAGE, HTTP_GET, STATUS_OK, STATES_URI,
   DISTRICTS_URI, APPOINTMENTS_PINCODE_URI, APPOINTMENTS_DISTRICTS_URI };
