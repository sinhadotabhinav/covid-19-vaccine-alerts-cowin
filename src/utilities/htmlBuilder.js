const mailConfig = require('../configs/mailConfig');

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
        text-align: left;
        padding: 8px;
      }
      td {
        border: 1px solid #dddddd;
        text-align: left;
        font-size: 8pt;
        padding: 8px;
      }
      img {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px;
        width: 150px;
      }
    </style>
  </head>
  <body>
    <div style="display: block;">
      <p>${mailConfig.BODY} Login to <a href="https://www.cowin.gov.in/home">COWIN portal</a> to book your appointment now</p>
      <p>Total number of slots: ${outputArray.length}. Find details below: \n<\p>
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
    html = html +
    `    </table>
  </div>
  </body>\n
  <br><br><br>
  <div style="display: flex;">
    <div style="flex: 50%; padding: 5px;">
      <a href="https://www.cowin.gov.in/home">
        <img
          src="https://github.com/sinhadotabhinav/covid-19-vaccine-alerts-cowin/blob/master/src/assets/cowin-logo.png?raw=true"
          alt="COWIN platform">
      </a>
    </div>
    <div style="flex: 50%; padding: 5px;">
      <a href="https://www.mohfw.gov.in/covid_vaccination/vaccination/faqs.html">
        <img
          src="https://github.com/sinhadotabhinav/covid-19-vaccine-alerts-cowin/blob/master/src/assets/vaccine.png?raw=true"
          alt="MOHFW India">
      </a>
    </div>
  </div>\n</html>`;
  return html;
}

async function prepareFirstEmail() {
  return `<html>
  <head>
    <style>
      img {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px;
        width: 150px;
      }
    </style>
  </head>
  <body>
    <div style="display: block;">
      <p>${mailConfig.FIRST_EMAIL_BODY}<\p>
    </div>
  </body>\n
  <br><br><br>
  <div style="display: flex;">
    <div style="flex: 50%; padding: 5px;">
      <a href="https://www.cowin.gov.in/home">
        <img
          src="https://github.com/sinhadotabhinav/covid-19-vaccine-alerts-cowin/blob/master/src/assets/cowin-logo.png?raw=true"
          alt="COWIN platform">
      </a>
    </div>
    <div style="flex: 50%; padding: 5px;">
      <a href="https://www.mohfw.gov.in/covid_vaccination/vaccination/faqs.html">
        <img
          src="https://github.com/sinhadotabhinav/covid-19-vaccine-alerts-cowin/blob/master/src/assets/vaccine.png?raw=true"
          alt="MOHFW India">
      </a>
    </div>
  </div>\n</html>`;
}

module.exports = { prepareHtmlBody, prepareFirstEmail };
