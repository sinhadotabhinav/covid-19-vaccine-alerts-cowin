# COVID-19 Vaccine Alerts - COWIN

This repository is an alerting application that sends email notifications to beneficiaries in India using [COWIN platform](https://www.cowin.gov.in/home) for vaccine availability. The application interacts with the [COWIN API](https://apisetu.gov.in/public/marketplace/api/cowin) at regular intervals to find vaccination slots available at your pin code location(s) or entire district along with a minimum age limit. So, if you are currently waiting to find slots in your region and do not see any slots for your age range then, you can utilise this application to receive alerts on your email address when there are slots available for you. This way you will be able to book your appointments on time. Remember, vaccination is highly beneficial for you in this horrific time of crisis. Get your jab and protect yourself from serious illness.

Here is a sample email alert from this application containing all the required information regarding available slots:

![sample alert](https://github.com/sinhadotabhinav/covid-19-vaccine-alerts-cowin/blob/master/sample-alert.png?raw=true)

## Application overview and pre-requisites

Firstly, clone/ download this GitHub project on your system/ server. The application is built using Node.js so you would need to setup node and npm on your local machine/ server where you want to run this. Use the [Node.js](https://nodejs.org/en/download "Node.js Homepage") link to install Node.js on your respective platform (Windows/ macOS/ Linux). You can also use Homebrew or RPM libraries to set it up. In the former case, proceed with installation.

Open Terminal (macOS/ Linux) or GitBash (Windows) and Enter `node - v` to verify that Node.js is installed correctly and to see the version of Node.js that was installed. See below:

```
$ node -v
v16.0.0
```

If a version was output, then you're all set. The Node.js installer includes the NPM package manager as well so you can also run npm commands as below. Execute `npm -v` to verify as below:

```
$ npm -v
7.11.2
```
All good? Let's proceed to customise the application for your personal use.

## Customise the application for yourself

Setup your google account configurations to send email notifications. Visit the [Google Support](https://support.google.com/accounts/answer/185833?p=InvalidSecondFactor&visit_id=637554658548216477-2576856839&rd=1 "Google Account Support") link to enable application access on your Gmail account. Follow the **Create & use App Passwords** heading to generate a 16-character code. Copy the code and save it somewhere. Create a file called `.env` in the home path of the project and copy the below content into that file and save.

```
APPLICATION_PASSWORD=the-16-character-code-you-generated-in-the-previous-step
```

At this point, the project folder should look like this:
```
.env
.git
.gitignore
README.md
package.json
sample-alert.png
src
```

All config values of the project are present in [`src/configs/`](https://github.com/sinhadotabhinav/covid-19-vaccine-alerts-cowin/blob/master/src/configs) folder. Customise **PINCODE, STATE, DISTRICT, EMAIL, and AGE** values in [`src/configs/appConfig.js`](https://github.com/sinhadotabhinav/covid-19-vaccine-alerts-cowin/blob/master/src/configs/appConfig.js) file. Set **FINDBYPINCODE = true** if you want to fetch vaccination slots by area pincode(s). You can also set multiple pincodes separated by comma like below:
```
const FINDBYPINCODE = true;
// location configs
const PINCODE = '800001,800002,800003';
const STATE = 'BIHAR';
const DISTRICT = 'PATNA';
// beneficiary configs
const EMAIL = 'asinha093@gmail.com';
const AGE = 28;
```
When you set **FINDBYPINCODE = false**, the application will fetch vaccination slots by district value mentioned in this config file.

Customise **RECIPIENT** value in [`src/configs/mailConfig.js`](https://github.com/sinhadotabhinav/covid-19-vaccine-alerts-cowin/blob/master/src/configs/mailConfig.js) file. You can also set **RECIPIENT** value to multiple recipients separated by comma as seen below:
```
const SERVICE_PROVIDER = 'Gmail';
const RECIPIENT = 'mail1@gmail.com,mail2@gmail.com,mail3@gmail.com';
```

Finally, you can also alter the date range with which the application will fetch vaccination slots by customising **DATE_RANGE** value in [`src/configs/schedulerConfig.js`](https://github.com/sinhadotabhinav/covid-19-vaccine-alerts-cowin/blob/master/src/configs/schedulerConfig.js) file. By default it is set to **7** but, you can change it to 10 or 15 for example, based on your need. The config file also allows changes in the periodic schedule with which the application runs. By default, **SCHEDULE** value depicts a cron schedule **every hour at minute 15**. To alter this schedule, you need to be familiar with the [cron scheduler](https://linuxhint.com/cron_jobs_complete_beginners_tutorial/#:~:text=The%20scheduled%20commands%20and%20scripts,Task%20Scheduler%20in%20Windows%20OS). I use [Crontab Guru](https://crontab.guru) website to test my cron schedules.

```
const SCHEDULE = '15 * * * *';
const DATE_RANGE = 7;
```

## How to run this application?

If you want to test the application and run it in foreground run:

`$ npm install && node src/app.js`

`Ctrl^C` to exit the process.

If you want to keep running the application in the background, on your terminal run:

`$ npm install && pm2 start src/app.js`

To shutdown the application run:

`$ pm2 stop src/app.js && pm2 delete src/app.js`

## Development

This repository is open to contributions and discussion. For any other questions, you can reach out via email at `asinha093@gmail.com`.
