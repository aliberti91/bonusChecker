const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const URL = 'https://www.bonusveicolielettrici.mase.gov.it/index.html';
  const EXPECTED = '6.291 €';

  // 1) Vai alla home
  await page.goto(URL, { waitUntil: 'networkidle' });

  // 2) Clicca "Accedi come Persona fisica"
  await page.waitForSelector('[aria-label="Accedi come Persona fisica"]', {
    timeout: 30000
  });
  await page.click('[aria-label="Accedi come Persona fisica"]');

  // 3) Attendi area beneficiario
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  await page.waitForTimeout(3000);

  // 4) Clicca il tab/bottone con l'icona pie_chart
  await page.waitForSelector('mat-icon.example-tab-icon.material-icons', {
    timeout: 30000
  });
  await page.click('mat-icon.example-tab-icon.material-icons:text("pie_chart")');

  // 5) Attendi la sezione relativa caricata
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  await page.waitForTimeout(3000);

  // 6) Leggi il valore dallo <strong>
  // --- ADATTA QUESTO SELETTORE AL TUO DOM REALE ---
  const strongSelector = 'strong[_ngcontent-ndl-c139]';

  await page.waitForSelector(strongSelector, { timeout: 30000 });
  const value = (await page.textContent(strongSelector)).trim();

  console.log('Valore letto in <strong>:', value);

  if (value === EXPECTED) {
    console.log('OK: il valore è esattamente "' + EXPECTED + '".');
  } else {
    console.log('ATTENZIONE: il valore è diverso da "' + EXPECTED + '"!');
    // Qui puoi agganciare una notifica (webhook, mail via API, ecc.)
  }

  await browser.close();
})();
