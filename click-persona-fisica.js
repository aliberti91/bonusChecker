const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true }); // metti false se vuoi vedere il browser
  const context = await browser.newContext();
  const page = await context.newPage();

  const URL = 'https://www.bonusveicolielettrici.mase.gov.it/index.html';

  // Vai alla pagina principale e attendi che la rete sia “ferma”
  await page.goto(URL, { waitUntil: 'networkidle' });

  // Aspetta che l'elemento con aria-label sia presente nel DOM
  await page.waitForSelector('[aria-label="Accedi come Persona fisica"]', {
    timeout: 30000
  });

  // Variante 1: per aria-label esatto
  await page.click('[aria-label="Accedi come Persona fisica"]');

  // Attendi qualche secondo per permettere il redirect / caricamento successivo
  await page.waitForTimeout(5000);

  await browser.close();
})();
