/**
 * @name Amazon product search
 * @desc Searches Amazon.com for a product and checks if the results show up
*/

const puppeteer = require('puppeteer');
const dotenv = require('dotenv').config();
const fs = require('fs');
// create a .env file and add a website username/password (ADMIN_USERNAME=...)
var username = process.env.ADMIN_USERNAME;
var password = process.env.ADMIN_PASSWORD;
// set a name for your test, makes it easier to create output
var testname = "01-name-for-your-test";
// js Date function counts months starting with 0, setting up for naming of directories/files
var now = new Date();
var month = now.getMonth() + 1;
var dir = `./test-results/${now.getFullYear()}-${month}-${now.getDate()}/${testname}`;
var logfile = `${dir}\test.log`;
// use following values to change behaviour of your tests as needed
var slowMoValue = 100;
var headless = false;
// setup a directory structure for test-results
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

//record time at start of test
const start = new Date();


 let browser
 let page
 (async () => {
    const browser = await puppeteer.launch({
      "headless": headless,
      "slowMo": slowMoValue,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disabled-dev-shm-usa"]
    });
    browser = await puppeteer.launch()
    page = await browser.newPage()
  
 describe('Amazon Homepage', async () => {
   test('has search input', async () => {
     await page.setViewport({ width: 1280, height: 800 })
     await page.goto('https://www.amazon.com', { waitUntil: 'networkidle0' })
     const searchInput = await page.$('#twotabsearchtextbox')
     expect(searchInput).toBeTruthy()
   })

   console.log(`\n\n Taking Screenshot of Amazon Homepage ' + ${testname}`);
   await page.screenshot({ path: `${dir}/${testname}-Amazon-homepage-image001.png`, type: 'png' });

 
   test('shows search results after search input', async () => {
     await page.type('#twotabsearchtextbox', 'nyan cat pullover')
     await page.click('input.nav-input')
     await page.waitForSelector('#resultsCol')
     const firstProduct = await page.$('a.a-link-normal.a-text-normal')
     expect(firstProduct).toBeTruthy()
   })
   console.log(`\n\n Taking Screenshot of Search Product Page ' + ${testname}`);
   await page.screenshot({ path: `${dir}/${testname}-search-product-image001.png`, type: 'png' });

  
  await browser.close()
  // record time at end of test
  const stop = new Date();
  console.log(`Time Taken to complete test: ${testname} = ${(stop - start)/1000} seconds`);
 })
})