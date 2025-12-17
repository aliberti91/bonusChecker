const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const URL = 'https://www.bonusveicolielettrici.mase.gov.it/index.html';

  // 1) Vai alla home
  await page.goto(URL, { waitUntil: 'networkidle' });

  // 2) Clicca "Accedi come Persona fisica"
  await page.waitForSelector('[aria-label="Accedi come Persona fisica"]', {
    timeout: 30000
  });
  await page.click('[aria-label="Accedi come Persona fisica"]');

  // 3) Attendi caricamento area beneficiario
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  await page.waitForTimeout(3000);

  // 4) Clicca il tab/bottone che contiene l'icona pie_chart
  await page.waitForSelector('mat-icon.example-tab-icon.material-icons', {
    timeout: 30000
  });
  await page.click('mat-icon.example-tab-icon.material-icons:text("pie_chart")');

  // 5) Attendi caricamento sezione collegata
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  await page.waitForTimeout(3000);

  // 6) Stampa l'HTML risultante
  const html = await page.content();
  console.log(html);

  await browser.close();
})();
