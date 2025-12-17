const { chromium } = require('@playwright/test');
const axios = require('axios');  // assicurati di avere axios: npm install axios

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const URL = 'https://www.bonusveicolielettrici.mase.gov.it/index.html';
  const TARGET = '(0,0%)';
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb_TUA_WEBAPP_ID/exec'; // <-- sostituisci

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

  // 5) Attendi la sezione Plafond
  await page.waitForLoadState('networkidle', { timeout: 30000 });
  await page.waitForTimeout(3000);

  // 6) Prendi HTML e controlla la stringa
  const html = await page.content();

  if (!html.includes(TARGET)) {
    console.log('PRESENTE: trovato "' + TARGET + '"');
  } else {
    console.log('ASSENTE: "' + TARGET + '" non trovato! INOLTRO NOTIFICA...');

    try {
      await axios.post(APPS_SCRIPT_URL, {
        target: TARGET,
        htmlSnippet: html.slice(0, 1000) // opzionale: primi 1000 caratteri per debug
      });
      console.log('Chiamata POST a Apps Script inviata con successo.');
    } catch (err) {
      console.error('Errore chiamando Apps Script:', err.message);
    }
  }

  await browser.close();
})();
