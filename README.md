# COVID-19 Vaccine Alerts - COWIN

This repository is an alerting application that sends email notifications to beneficiaries in India using COWIN platform for vaccine availability. The application interacts with the COWIN API at regular intervals to find vaccination slots available at your pincode location(s) or entire district along with a minimum age limit. SO if you are currently waiting to find slots in your region and do not see any slots for your age range then, you can utilise this application to receive alerts on your email address when there are slots available for you. This way you will be able to book your appointments on time. Remember, vaccination is highly beneficial for you in this horrific time of crisis. Get your jab and protect yourself from serious illness.

Here is a sample email alert from this application containing all the required information regarding available slots:

![sample alert](https://github.com/sinhadotabhinav/covid-19-vaccine-alerts-cowin/blob/master/sample-alert.png?raw=true)

## How to run this application?

Firslt, clone/ download this GitHub project on your system/ server. The application is built using Node.js so you would need to setup node and npm on your local machine/ server where you want to run this. Use the [Node.js](https://nodejs.org/en/download "Node.js Homepage") link to install Node.js on your respective platform (Windows/ macOS/ Linux). You can also use Homebrew or RPM libraries to set it up. In the former case, proceed with installation.

Open Terminal (macOS/ Linux) or GitBash (Windows) and Enter `node - v` to verify that Node.js is installed correctly and to see the version of Node.js that was installed.

```
$ node -v
v16.0.0
```

If a version was output, then you're all set. The Node.js installer includes the NPM package manager as well so you can also run npm commands as below. Execute `npm -v` to verify.

```
$ npm -v
7.11.2
```
All good? Let's proceed to setup your google account configurations to send email notifications. Visit the [Google Support](https://support.google.com/accounts/answer/185833?p=InvalidSecondFactor&visit_id=637554658548216477-2576856839&rd=1 "Google Account Support") link to enable application access on your Gmail account. Follow the **Create & use App Passwords** heading to generate a 16-character code. Copy the code and save it somewhere. Create a file called `.env` in the home path of the project and copy the below content into that file and save.

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
Let's proceed to run this application. If you want to keep running the application in the background, on your terminal run:

`$ npm install && pm2 start src/app.js`

To shutdown the application run:

`$ pm2 stop src/app.js && pm2 delete src/app.js`

If you want to run test the application and run it in foreground run:

`$ npm install && node src/app.js`
