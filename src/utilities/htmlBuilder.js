const mailConfig = require('../configs/mailConfig');
const schedulerConfig = require('../configs/schedulerConfig');

async function prepareHtmlBody(outputArray) {
  let html = `<html>
    <head>
      <style>
        ${getTableStyles()}
        ${getImageStyles()}
      </style>
    </head>
    <body>
      <div style="display: block;">
        <p>There are now new COVID-19 vaccination slots available in your requested location(s) in the next ${schedulerConfig.DATE_RANGE} days.
         Login to <a href=${mailConfig.COWIN_URL}>COWIN portal</a> to book your appointment now</p>
        <p>Total number of centers with slots available are: ${outputArray.length}. Find details below: \n<\p>
        <table>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>District</th>
            <th>Center Name</th>
            <th>Center Address</th>
            <th>Pincode</th>
            <th>Vaccine Name</th>
            <th>Age Limit</th>
            <th>Availability</th>
            <th>Available Slots</th>
            <th>Fee Type</th>
          </tr>\n`;
  for (let counter = 0; counter < outputArray.length; counter++) {
    let slots = outputArray[counter].slots.toString().replace(/,/g, '; ');
    html = html +
    `        <tr>
        <td>${counter + 1}</td>
        <td width=55">${outputArray[counter].date}</td>
        <td>${outputArray[counter].district_name}</td>
        <td>${outputArray[counter].name}</td>
        <td>${outputArray[counter].address}</td>
        <td>${outputArray[counter].pincode}</td>
        <td>${outputArray[counter].vaccine}</td>
        <td>${outputArray[counter].min_age_limit}</td>
        <td>${outputArray[counter].available_capacity}</td>
        <td width="200">${slots}</td>
        <td>${outputArray[counter].fee_type}</td>
      </tr>\n`;
  }
  html = html + `
      </table>
    </div>
    </body>\n
    <br><br>
    ${getHtmlFooter()}\n
    </html>`;
  return html;
}

async function prepareFirstEmail() {
  return `<html>
    <head>
      <style>
        ${getImageStyles()}
      </style>
    </head>
    <body>
      <div style="display: block;">
        <p>There are no new COVID-19 vaccination slots available in your requested location(s) in the next ${schedulerConfig.DATE_RANGE} days.\n
        The application will periodically fetch new slots if available and send email alerts.<\p>
      </div>
    </body>\n
    <br><br>
    ${getHtmlFooter()}\n
    </html>`;
}

async function prepareDailyDigestEmail(runs, centers, regionType, region) {
  return `<html>
    <head>
      <style>
        ${getImageStyles()}
      </style>
    </head>
    <body>
      <div style="display: block;">
        <p>Welcome to the ${mailConfig.SENDER} daily digest. A summary of results obtained today are gathered and presented below:<\p>
        <p>The application periodically checked for new vaccination slots ${runs} times today.<\p>
        <p>Total number of vaccination centers with available slots found today for ${regionType} \(${region}\) were: ${centers}<\p>
        <p>The application will continue to look for new slots in your requested region and send alerts tomorrow.<\p>
      </div>
    </body>\n
    <br><br>
    ${getHtmlFooter()}\n
    </html>`;
}

function getHtmlFooter() {
  return `
    <div style="display: flex;">
      <div style="flex: 50%; padding: 5px;">
        <a href="${mailConfig.COWIN_URL}">
          <img
            src=${mailConfig.COWIN_LOGO_URL}
            alt="COWIN platform">
        </a>
      </div>
      <div style="flex: 50%; padding: 5px;">
        <a href="${mailConfig.MOFHW_URL}">
          <img
            src=${mailConfig.WHO_VACCINE_LOGO_URL}
            alt="MOHFW India">
        </a>
      </div>
    </div>`;
}

function getImageStyles() {
  return `
    img {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 5px;
      width: 150px;
    }`;
}

function getTableStyles() {
  return `
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    th {
      background-color: #f1f1f1;
      font-size: 9pt;
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }
    td {
      border: 1px solid #dddddd;
      text-align: left;
      font-size: 8pt;
      padding: 8px;
    }`;
}

module.exports = { prepareHtmlBody, prepareFirstEmail, prepareDailyDigestEmail };
