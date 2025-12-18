const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const URL = 'https://www.bonusveicolielettrici.mase.gov.it/index.html';
  const TARGET = '(0,0%)';
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz1RDMJtRcAL3VgnB8qMdnmVPtG2ow5U-9bXmBbz3u6J11LG_9p4wYiE5n7kA33okYP/exec'; // <-- sostituisci

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
    const res = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Cambiato qualcosa in plafond',
        url: URL
      })
    });
    console.log('Chiamata POST a Apps Script, status:', res.status);
  } catch (err) {
    console.error('Errore chiamando Apps Script:', err.message);
  }
  }

  await browser.close();
})();
