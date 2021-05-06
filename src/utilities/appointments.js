const appConfig = require('../config/appConfig');

function getFilteredSlots (date, sessions) {
  let validSlots = sessions.filter(slot => slot.min_age_limit <= appConfig.AGE && slot.available_capacity > 0)
  if(validSlots.length > 0) {
    console.log('Vaccination slots returned:');
    console.log({date:date, validSlots: validSlots.length});
  }
  return validSlots;
};

async function prepareHtmlBody(outputArray) {
  let html = `<html>
  <head>
    <style>
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      tr:nth-child(even) {
        background-color: #dddddd;
      }
    </style>
  </head>
  <body>
    <h2>Vaccine Availability Table</h2>
    <table>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>District</th>
        <th>Center Name</th>
        <th>Center Address</th>
        <th>Pincode</th>
        <th>Vaccine Name</th>
        <th>Mininum Age Limit</th>
        <th>Availability Capacity</th>
        <th>Available Slots</th>
        <th>Fee Type</th>
      </tr>\n`;
  for (let counter = 0; counter < outputArray.length; counter++) {
    html = html +
    `      <tr>
        <td>${counter + 1}</td>
        <td>${outputArray[counter].date}</td>
        <td>${outputArray[counter].district_name}</td>
        <td>${outputArray[counter].name}</td>
        <td>${outputArray[counter].address}</td>
        <td>${outputArray[counter].pincode}</td>
        <td>${outputArray[counter].vaccine}</td>
        <td>${outputArray[counter].min_age_limit}</td>
        <td>${outputArray[counter].available_capacity}</td>
        <td>${outputArray[counter].slots}</td>
        <td>${outputArray[counter].fee_type}</td>
      </tr>\n`;
  }
  html = html + `  </table>\n </body>\n</html>`;
  return html;
}

module.exports = { getFilteredSlots, prepareHtmlBody };
