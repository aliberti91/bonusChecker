const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const URL = 'https://www.bonusveicolielettrici.mase.gov.it/index.html';

  await page.goto(URL, { waitUntil: 'networkidle' });

  // Selettore da adattare all'HTML reale
  const button = page.getByRole('button', { name: /Accedi come Persona Fisica/i });
  await button.waitFor({ timeout: 20000 });
  await button.click();

  await page.waitForTimeout(5000);

  await browser.close();
})();
