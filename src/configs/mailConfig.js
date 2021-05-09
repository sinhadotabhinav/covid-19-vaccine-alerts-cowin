const SERVICE_PROVIDER = 'Gmail';
const RECIPIENT = 'asinha093@gmail.com';
const SENDER = 'covid-19-vaccine-alerts-cowin';
const SUBJECT = 'New vaccination slots are available on COWIN. Book appointment now';
const BODY = 'There are now new COVID-19 vaccination slots available in your requested location(s) in the next 10 days.';
const FIRST_EMAIL_SUBJECT = 'Welcome to covid-19-vaccine-alerts-cowin application';
const FIRST_EMAIL_BODY = 'There are no new COVID-19 vaccination slots available in your requested location(s) in the next 10 days.\n' +
  'The application will periodically fetch new slots if available and send email alerts.';

module.exports = { SERVICE_PROVIDER, RECIPIENT, SENDER, SUBJECT, BODY, FIRST_EMAIL_SUBJECT, FIRST_EMAIL_BODY };
