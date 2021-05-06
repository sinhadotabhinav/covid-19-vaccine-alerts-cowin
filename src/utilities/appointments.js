const appConfig = require('../config/appConfig');
const mailConfig = require('../config/mailConfig');

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
      th {
        background-color: #f1f1f1;
        font-size: 9pt;
        border: 1px solid #dddddd;
        text-align: center;
        padding: 8px;
      }
      td {
        border: 1px solid #dddddd;
        text-align: left;
        font-size: 8pt;
        padding: 8px;
      }
    </style>
  </head>
  <body>
    <p>${mailConfig.BODY}. Login to <a href="https://www.cowin.gov.in/home">COWIN portal</a> to book your appointment now, Find details below: \n</p>
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
        <th>Availability</th>
        <th>Available Slots</th>
        <th>Fee Type</th>
      </tr>\n`;
  for (let counter = 0; counter < outputArray.length; counter++) {
    let slots = outputArray[counter].slots.toString().replace(/,/g, '; ');
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
        <td>${slots}</td>
        <td>${outputArray[counter].fee_type}</td>
      </tr>\n`;
  }
  html = html + `   </table>\n </body>\n
  <img src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-the-online-exchange-of-xie-and-cooperation-platform-png-image_3737643.jpg" alt="COWIN platform">\n</html>`;
  return html;
}

module.exports = { getFilteredSlots, prepareHtmlBody };
