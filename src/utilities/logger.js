const moment = require('moment');
const schedulerConfig = require('../configs/schedulerConfig');

function getLog(event) {
  let timestamp = moment().format(schedulerConfig.DATE_FORMAT + ' HH:mm:ss').toString();
  return `${timestamp}, ${event}`;
};

module.exports = { getLog };
