import puppeteer from 'puppeteer';
describe('Show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const extra = await page.$('.Event .extra');
    expect(extra).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.Event .Event__details-button');

    const extra = await page.$('.Event .extra');
    expect(extra).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.Event .Event__details-button');

    const extra = await page.$('.Event .extra');
    expect(extra).toBeNull();
  });
});

describe('Filter events by city', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({headless: false, slowMo: 250});
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
  });

  afterAll(() => {
    browser.close();
  });

  test('By default, when user hasn’t searched for a city, show upcoming events based on the user’s location' , async() => {
    const events = await page.$$('.Event');
    expect(events).toHaveLength(32);
  })

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.CitySearch__city', 'Munich')
    const suggestions = await page.$$('.CitySearch__suggestions li');
    expect(suggestions).toHaveLength(2);
  })

  test('User can select a city from the suggested list', async () => {
    // Select the second suggestion (nth-child(2) below)
    await page.click('.CitySearch__suggestions li:nth-child(2)', {delay:10});
    const suggestions = await page.$$('.CitySearch__suggestions li');
    expect(suggestions).toHaveLength(0);
  })
})