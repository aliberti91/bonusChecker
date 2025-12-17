const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true }); // false se vuoi vedere il browser
  const context = await browser.newContext();
  const page = await context.newPage();

  const URL = 'https://www.bonusveicolielettrici.mase.gov.it/index.html';

  // Vai alla pagina principale
  await page.goto(URL, { waitUntil: 'networkidle' });

  // Aspetta il bottone con aria-label esatto
  await page.waitForSelector('[aria-label="Accedi come Persona fisica"]', {
    timeout: 30000
  });

  // Clicca il bottone
  await page.click('[aria-label="Accedi come Persona fisica"]');

  // Aspetta che la nuova pagina/stato sia caricata
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  await page.waitForTimeout(3000); // piccolo extra per sicurezza

  // Prendi l'HTML risultante e stampalo nei log
  const html = await page.content();
  console.log(html);

  await browser.close();
})();
