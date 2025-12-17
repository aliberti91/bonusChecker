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

  // 4) Clicca sulla voce "Plafond"
  await page.getByText('Plafond', { exact: false }).click();

  // 5) Attendi che la sezione Plafond si carichi
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  await page.waitForTimeout(3000);

  // 6) Stampa l'HTML della pagina nello stato "Plafond"
  const html = await page.content();
  console.log(html);

  await browser.close();
})();
