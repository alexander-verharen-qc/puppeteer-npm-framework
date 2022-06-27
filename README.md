# Puppeteer NPM Framework
A framework for automating replay of Chrome recorded tests

Installs puppeteer, dot-env, npm-run-all (devtools)

Provides a sample test in generic-tests folder

## Usage:
Install and verify by running the commands below and take note of console output and test-results folder (screenshot provided)

```bash
git clone https://github.com/alexander-verharen-qc/puppeteer-npm-framework
cd puppeteer-npm-framework
npm i
npm run test #runs a simple web page test
```

Update config/dev-env to setup your username/password for quotecenter applications

## To run your recorded and modified tests:

```bash
# cleanup previous results and logs
npm run clean
# Run tests concurrently and all output goes to the console
npm run smoke-test

```

Add/Remove tests in recorded-tests folder

Update ./smoke-tests.js to list all tests to be run with 'npm run smoke-test'


## To cleanup/reinstall:

```bash
npm run clean:complete
```

## Recording and preparing tests using Chrome Recorder

We're using Chrome recorder (part of Developer Tools[^devtools]) to record tests based on provided test scenarios


1. In Chrome Recorder, record a flow and save the test as a Puppeteer JS.
2. Update the JS file to add dotenv and specify variables for Username and Password, name of test and directory

toggle variable values as needed for this test
```javascript
const dotenv = require('dotenv').config();
const fs = require('fs');
var username = process.env.ADMIN_USERNAME;
var password = process.env.ADMIN_PASSWORD;
var testname = "00_The_HomeDepot_Homepage";
var now = new Date();
var month = now.getMonth() + 1;
var dir = `./test-results/${now.getFullYear()}-${month}-${now.getDate()}/${testname}`;
var logfile = `${dir}\test.log`;
var slowMoValue = 100;
var headless = true;

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}
const start = new Date();
```
3. Substitute values in the JS file where your username and password are found with variables username and password

Replace "YOURUSERNAME" with username
Replace "YOURPASSWORD" with password 

4. Update puppeteer.launch method & arguments (toggle values by updating variables defined in step 1)
```javascript
    const browser = await puppeteer.launch({
      "headless": headless,
      slowMo: slowMoValue,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disabled-dev-shm-usa"]
    });
```
5. Add test messages at beginning, screenshots at particular break points and end of test
After loading a major page, add a screenshot and a log messages (update example as needed)
```javascript
    console.log(`\n\n Taking Screenshot of Login Page ' + ${testname}`);
    await page.screenshot({ path: `${dir}/${testname}-login-image001.png`, type: 'png' });
```


Add after await browser.close (end of the file)
```javascript
    const stop = new Date();
    console.log(`Time Taken to complete test: ${testname} = ${(stop - start)/1000} seconds`);
```

[^devtools]: To open the developer console window on Chrome, use the keyboard shortcut Ctrl Shift J (on Windows) or Ctrl Option J (on Mac). Alternatively, you can use the Chrome menu in the browser window, select the option "More Tools," and then select "Developer Tools.". Inside the Developer Tools, you can find Recorder (Labs) by selecting it in the menu bar, or using the vertical dots-> More Tools->Recorder (Lab)