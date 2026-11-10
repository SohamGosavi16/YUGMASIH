const fs = require('fs');
const assert = require('assert');

console.log('─── RUNNING YUGMA EXPENSE CALCULATOR & PRINT TEST SUITE ───\n');

// 1. Read files
const html = fs.readFileSync('journey-planner.html', 'utf8');
const js = fs.readFileSync('js/journeyPlanner.js', 'utf8');
const css = fs.readFileSync('css/journeyPlanner.css', 'utf8');

let passedTests = 0;
let totalTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ [PASS] ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${description}`);
    console.error('    Error:', err.message);
  }
}

// ── TEST GROUP 1: HTML STRUCTURE & ELEMENTS ─────────────────────────────────
test('journey-planner.html contains #journey-budget-card section', () => {
  assert(html.includes('id="journey-budget-card"'), 'Missing #journey-budget-card');
  assert(html.includes('JOURNEY BUDGET &amp; EXPENSES') || html.includes('JOURNEY BUDGET & EXPENSES'), 'Missing heading');
});

test('journey-planner.html contains 5 Category blocks (Transportation, Accommodation, Food, Tickets, Misc)', () => {
  assert(html.includes('id="cat-transportation"'), 'Missing #cat-transportation');
  assert(html.includes('id="cat-accommodation"'), 'Missing #cat-accommodation');
  assert(html.includes('id="cat-food"'), 'Missing #cat-food');
  assert(html.includes('id="cat-tickets"'), 'Missing #cat-tickets');
  assert(html.includes('id="cat-misc"'), 'Missing #cat-misc');
});

test('journey-planner.html contains global parameter inputs (travellers, days, hotel nights, visitor tier)', () => {
  assert(html.includes('id="budget-travellers"'), 'Missing #budget-travellers');
  assert(html.includes('id="budget-trip-days"'), 'Missing #budget-trip-days');
  assert(html.includes('id="budget-hotel-nights"'), 'Missing #budget-hotel-nights');
  assert(html.includes('id="budget-visitor-tier"'), 'Missing #budget-visitor-tier');
});

test('journey-planner.html contains vehicle specifications & fuel formula inputs', () => {
  assert(html.includes('id="budget-vehicle-type"'), 'Missing #budget-vehicle-type');
  assert(html.includes('id="budget-dist-km"'), 'Missing #budget-dist-km');
  assert(html.includes('id="budget-num-vehicles"'), 'Missing #budget-num-vehicles');
  assert(html.includes('id="budget-mileage"'), 'Missing #budget-mileage');
  assert(html.includes('id="budget-fuel-price"'), 'Missing #budget-fuel-price');
  assert(html.includes('id="budget-tolls"'), 'Missing #budget-tolls');
  assert(html.includes('id="budget-parking"'), 'Missing #budget-parking');
  assert(html.includes('id="budget-local-transit"'), 'Missing #budget-local-transit');
});

test('journey-planner.html contains tickets table & dynamic custom expenses list', () => {
  assert(html.includes('id="budget-monuments-ticket-list"'), 'Missing #budget-monuments-ticket-list');
  assert(html.includes('id="budget-custom-expenses-list"'), 'Missing #budget-custom-expenses-list');
  assert(html.includes('id="btn-add-custom-expense"'), 'Missing #btn-add-custom-expense');
});

test('journey-planner.html contains visual progress meter & summary metric cards', () => {
  assert(html.includes('id="budget-display-grand-total"'), 'Missing #budget-display-grand-total');
  assert(html.includes('id="budget-display-per-person"'), 'Missing #budget-display-per-person');
  assert(html.includes('id="budget-progress-bar"'), 'Missing #budget-progress-bar');
  assert(html.includes('id="bar-transport"'), 'Missing #bar-transport');
  assert(html.includes('id="bar-stay"'), 'Missing #bar-stay');
  assert(html.includes('id="bar-food"'), 'Missing #bar-food');
  assert(html.includes('id="bar-tickets"'), 'Missing #bar-tickets');
  assert(html.includes('id="bar-misc"'), 'Missing #bar-misc');
});

test('journey-planner.html contains print dossier container and action buttons', () => {
  assert(html.includes('id="yugma-print-dossier"'), 'Missing #yugma-print-dossier');
  assert(html.includes('id="btn-jump-budget"'), 'Missing #btn-jump-budget');
  assert(html.includes('id="btn-sync-budget-route"'), 'Missing #btn-sync-budget-route');
});

// ── TEST GROUP 2: CSS & PRINT STYLES ────────────────────────────────────────
test('css/journeyPlanner.css defines responsive budget styles', () => {
  assert(css.includes('.journey-budget-card'), 'Missing .journey-budget-card');
  assert(css.includes('.budget-overview-dashboard'), 'Missing .budget-overview-dashboard');
  assert(css.includes('.budget-progress-bar'), 'Missing .budget-progress-bar');
  assert(css.includes('.tickets-budget-table'), 'Missing .tickets-budget-table');
});

test('css/journeyPlanner.css defines comprehensive @media print styles', () => {
  assert(css.includes('@media print'), 'Missing @media print');
  assert(css.includes('#yugma-print-dossier'), 'Missing #yugma-print-dossier styling in print');
  assert(css.includes('page-break-inside: avoid') || css.includes('break-inside: avoid'), 'Missing avoid-break in print');
  assert(css.includes('print-stops-table'), 'Missing print stops table styling');
  assert(css.includes('print-budget-table'), 'Missing print budget table styling');
});

// ── TEST GROUP 3: JAVASCRIPT CALCULATION ENGINE & LOGIC ─────────────────────
// Mock browser environment to test the calculation engine in isolation
const vm = require('vm');
const domMock = {
  window: {
    addEventListener: () => {}
  },
  document: {
    addEventListener: () => {},
    getElementById: () => null,
    querySelectorAll: () => [],
    querySelector: () => null,
    activeElement: null
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  navigator: {},
  console: console
};
domMock.window.document = domMock.document;
domMock.window.localStorage = domMock.localStorage;
domMock.window.window = domMock.window;

// Evaluate script inside sandbox
vm.createContext(domMock);
vm.runInContext(js, domMock);

const YugmaPlanner = domMock.window.YugmaPlanner;

test('window.YugmaPlanner exposes calculation & print methods', () => {
  assert(typeof YugmaPlanner === 'object', 'YugmaPlanner not defined');
  assert(typeof YugmaPlanner.calculateBudget === 'function', 'calculateBudget missing');
  assert(typeof YugmaPlanner.renderBudgetCalculator === 'function', 'renderBudgetCalculator missing');
  assert(typeof YugmaPlanner.syncBudgetWithItinerary === 'function', 'syncBudgetWithItinerary missing');
  assert(typeof YugmaPlanner.preparePrintDossier === 'function', 'preparePrintDossier missing');
  assert(typeof YugmaPlanner.printItinerary === 'function', 'printItinerary missing');
  assert(typeof YugmaPlanner.formatINR === 'function', 'formatINR missing');
});

test('YUGMA_MONUMENT_TICKETS covers official rates for 22 monuments', () => {
  const tickets = YugmaPlanner.tickets;
  assert(tickets.taj_mahal.domestic === 50 && tickets.taj_mahal.foreign === 1100, 'Taj Mahal rates mismatch');
  assert(tickets.amber_fort.domestic === 100 && tickets.amber_fort.foreign === 500, 'Amber Fort rates mismatch');
  assert(tickets.brihadisvara.domestic === 0, 'Brihadisvara should be free entry');
  assert(tickets.statue_of_unity.domestic === 150, 'Statue of Unity entry mismatch');
  assert(tickets.golden_temple.domestic === 0, 'Golden Temple should be free');
});

test('Fuel Cost calculation formula is accurate: (Distance / Mileage) * Fuel Price * Num Vehicles', () => {
  const state = YugmaPlanner.state;
  state.budgetConfig.distanceKm = 300;
  state.budgetConfig.mileage = 15;
  state.budgetConfig.fuelPrice = 100;
  state.budgetConfig.numVehicles = 1;

  const res = YugmaPlanner.calculateBudget();
  // (300 / 15) * 100 * 1 = 20 * 100 = 2000
  assert.strictEqual(res.fuelCost, 2000, `Expected 2000, got ${res.fuelCost}`);
  assert.strictEqual(res.fuelLitres, 20, `Expected 20 litres, got ${res.fuelLitres}`);
});

test('Accommodation calculation formula is accurate: Room Rate * Rooms * Nights', () => {
  const state = YugmaPlanner.state;
  state.budgetConfig.roomRate = 4000;
  state.budgetConfig.numRooms = 2;
  state.budgetConfig.hotelNights = 3;

  const res = YugmaPlanner.calculateBudget();
  // 4000 * 2 * 3 = 24000
  assert.strictEqual(res.accommodationSubtotal, 24000, `Expected 24000, got ${res.accommodationSubtotal}`);
});

test('Food calculation formula is accurate: Daily Food Budget * Travellers * Days', () => {
  const state = YugmaPlanner.state;
  state.budgetConfig.dailyFood = 1000;
  state.budgetConfig.travellers = 4;
  state.budgetConfig.tripDays = 5;

  const res = YugmaPlanner.calculateBudget();
  // 1000 * 4 * 5 = 20000
  assert.strictEqual(res.foodSubtotal, 20000, `Expected 20000, got ${res.foodSubtotal}`);
});

test('Grand Total and Cost Per Person are mathematically exact', () => {
  const state = YugmaPlanner.state;
  state.budgetConfig.travellers = 2;
  const res = YugmaPlanner.calculateBudget();

  const expectedGrand = res.transportSubtotal + res.accommodationSubtotal + res.foodSubtotal + res.ticketsSubtotal + res.miscSubtotal;
  assert.strictEqual(res.grandTotal, expectedGrand, `Grand total mismatch`);
  assert.strictEqual(res.perPerson, Math.round(expectedGrand / 2), `Per person mismatch`);
});

test('Custom expenses dynamically add into miscellaneous subtotal', () => {
  const state = YugmaPlanner.state;
  const baseMisc = YugmaPlanner.calculateBudget().miscSubtotal;

  YugmaPlanner.addCustomExpense('Desert Camel Safari', 1200);
  const newMisc = YugmaPlanner.calculateBudget().miscSubtotal;

  assert.strictEqual(newMisc, baseMisc + 1200, `Custom expense not added properly`);
});

test('Format INR produces authentic Indian comma grouping', () => {
  assert.strictEqual(YugmaPlanner.formatINR(12500), '12,500');
  assert.strictEqual(YugmaPlanner.formatINR(150000), '1,50,000');
});

// ── TEST GROUP 4: SECURITY & CREDENTIAL CLEANLINESS ─────────────────────────
test('No hardcoded Gemini or Google API secrets in files', () => {
  const secretPattern = /AIza[0-9A-Za-z-_]{35}/;
  assert(!secretPattern.test(html), 'API key in html');
  assert(!secretPattern.test(js), 'API key in js');
  assert(!secretPattern.test(css), 'API key in css');
});

test('preparePrintDossier populates comprehensive A4 document with itinerary and budget table', () => {
  let dossierContent = '';
  domMock.document.getElementById = (id) => {
    if (id === 'yugma-print-dossier') {
      return {
        set innerHTML(val) { dossierContent = val; },
        get innerHTML() { return dossierContent; }
      };
    }
    return null;
  };

  // Generate itinerary first
  YugmaPlanner.generateItinerary();
  YugmaPlanner.preparePrintDossier();

  assert(dossierContent.includes('YUGMA CIVILIZATIONAL EXPEDITION DOSSIER'), 'Missing dossier title');
  assert(dossierContent.includes('Section 1: Day-by-Day Heritage Schedule'), 'Missing schedule section');
  assert(dossierContent.includes('Section 2: Journey Budget &amp; Financial Breakdown'), 'Missing budget breakdown section');
  assert(dossierContent.includes('A. TRANSPORTATION &amp; TRANSIT'), 'Missing transportation in print table');
  assert(dossierContent.includes('B. ACCOMMODATION &amp; STAYS'), 'Missing accommodation in print table');
  assert(dossierContent.includes('C. FOOD &amp; REGIONAL DINING'), 'Missing food in print table');
  assert(dossierContent.includes('D. MONUMENT ENTRY TICKETS'), 'Missing tickets in print table');
  assert(dossierContent.includes('E. MISCELLANEOUS &amp; CONTINGENCIES'), 'Missing misc in print table');
  assert(dossierContent.includes('TOTAL ESTIMATED EXPEDITION OUTLAY'), 'Missing grand total banner in print');
  assert(dossierContent.includes('Civilizational Sanctuary Guidelines &amp; ASI Advisory'), 'Missing sanctuary guidelines');
});

console.log(`\n─── TEST RESULTS: ${passedTests}/${totalTests} TESTS PASSED ───`);
if (passedTests === totalTests) {
  console.log('ALL VERIFICATIONS SUCCESSFUL! ✨\n');
} else {
  process.exit(1);
}
