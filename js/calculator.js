/**
 * HENSHE EV Mobility Platform - Real-Time Financial & Operational Calculators
 * EV Investment Income Calculator | Rider Fuel Savings Calculator
 */

let investmentChartInstance = null;

const HENSHE_CALCULATORS = {
  // Scenario presets
  scenarios: {
    conservative: {
      utilization: 70,
      rentalDays: 24,
      desc: "Lower shift demand, seasonal monsoon or maintenance reserve buffer."
    },
    moderate: {
      utilization: 85,
      rentalDays: 26,
      desc: "Standard steady urban quick-commerce & food delivery shift profile."
    },
    optimistic: {
      utilization: 95,
      rentalDays: 28,
      desc: "Peak festival & double-shift high-density logistics deployment."
    }
  },

  currentScenario: 'moderate',

  formatINR(amount) {
    if (isNaN(amount) || amount === null) return "₹0";
    return "₹" + Math.round(amount).toLocaleString('en-IN');
  },

  // Calculate EV Investment Projections
  calculateInvestment() {
    const numEVs = parseInt(document.getElementById('calc-ev-count')?.value || 5, 10);
    const costPerEV = parseFloat(document.getElementById('calc-ev-cost')?.value || 85000);
    const dailyRate = parseFloat(document.getElementById('calc-daily-rate')?.value || 250);
    const rentalDays = parseInt(document.getElementById('calc-rental-days')?.value || 26, 10);
    const utilization = parseFloat(document.getElementById('calc-utilization')?.value || 85);
    const monthlyMaint = parseFloat(document.getElementById('calc-maint-cost')?.value || 450);
    const monthlyOps = parseFloat(document.getElementById('calc-ops-cost')?.value || 550);
    const mgmtFeePercent = parseFloat(document.getElementById('calc-mgmt-fee')?.value || 15);
    const insuranceReservePercent = parseFloat(document.getElementById('calc-reserve-fee')?.value || 5);
    const investorSharePercent = parseFloat(document.getElementById('calc-investor-share')?.value || 75);

    // Update displayed range labels
    this.updateInputDisplay('val-ev-count', numEVs + (numEVs === 1 ? ' EV' : ' EVs'));
    this.updateInputDisplay('val-ev-cost', this.formatINR(costPerEV));
    this.updateInputDisplay('val-daily-rate', this.formatINR(dailyRate) + '/day');
    this.updateInputDisplay('val-rental-days', rentalDays + ' Days');
    this.updateInputDisplay('val-utilization', utilization + '%');
    this.updateInputDisplay('val-maint-cost', this.formatINR(monthlyMaint) + '/EV');
    this.updateInputDisplay('val-ops-cost', this.formatINR(monthlyOps) + '/EV');
    this.updateInputDisplay('val-mgmt-fee', mgmtFeePercent + '%');
    this.updateInputDisplay('val-reserve-fee', insuranceReservePercent + '%');
    this.updateInputDisplay('val-investor-share', investorSharePercent + '%');

    // 1. Total Investment
    const totalInvestment = numEVs * costPerEV;

    // 2. Gross Rental Revenue (adjusted for utilization and active days)
    const effectiveDays = rentalDays * (utilization / 100);
    const grossMonthlyRevenue = numEVs * dailyRate * effectiveDays;

    // 3. Operating Expenses (maintenance & charging/telematics ops per vehicle)
    const directOperatingExpenses = numEVs * (monthlyMaint + monthlyOps);

    // 4. Operating Surplus
    const operatingSurplus = Math.max(0, grossMonthlyRevenue - directOperatingExpenses);

    // 5. Fees & Reserves
    const mgmtFee = operatingSurplus * (mgmtFeePercent / 100);
    const insuranceReserve = grossMonthlyRevenue * (insuranceReservePercent / 100);

    // 6. Distributable Surplus
    const distributableSurplus = Math.max(0, operatingSurplus - mgmtFee - insuranceReserve);

    // 7. Potential Investor Monthly Distribution
    const investorMonthlyDistribution = distributableSurplus * (investorSharePercent / 100);

    // 8. Annualized Projections
    const annualizedDistribution = investorMonthlyDistribution * 12;
    const annualCashYield = totalInvestment > 0 ? (annualizedDistribution / totalInvestment) * 100 : 0;

    // Output to UI
    this.setInnerHtml('res-total-investment', this.formatINR(totalInvestment));
    this.setInnerHtml('res-gross-revenue', this.formatINR(grossMonthlyRevenue));
    this.setInnerHtml('res-operating-expenses', this.formatINR(directOperatingExpenses + insuranceReserve));
    this.setInnerHtml('res-operating-surplus', this.formatINR(operatingSurplus));
    this.setInnerHtml('res-distributable-surplus', this.formatINR(distributableSurplus));
    this.setInnerHtml('res-monthly-distribution', this.formatINR(investorMonthlyDistribution));
    this.setInnerHtml('res-annual-distribution', this.formatINR(annualizedDistribution));
    this.setInnerHtml('res-annual-yield', annualCashYield.toFixed(1) + '% p.a.');

    // Update Breakdown Visuals
    this.updateChart(grossMonthlyRevenue, directOperatingExpenses + insuranceReserve, mgmtFee, investorMonthlyDistribution);

    return {
      totalInvestment,
      grossMonthlyRevenue,
      directOperatingExpenses,
      operatingSurplus,
      distributableSurplus,
      investorMonthlyDistribution,
      annualizedDistribution,
      annualCashYield
    };
  },

  applyScenario(scenarioName) {
    this.currentScenario = scenarioName;
    const scenario = this.scenarios[scenarioName];
    if (!scenario) return;

    const utilInput = document.getElementById('calc-utilization');
    const daysInput = document.getElementById('calc-rental-days');

    if (utilInput) utilInput.value = scenario.utilization;
    if (daysInput) daysInput.value = scenario.rentalDays;

    // Update scenario button states
    ['conservative', 'moderate', 'optimistic'].forEach(s => {
      const btn = document.getElementById(`btn-scenario-${s}`);
      if (btn) {
        if (s === scenarioName) {
          btn.className = "scenario-btn px-4 py-2 text-xs md:text-sm font-semibold rounded-lg bg-emerald-600 text-white shadow-sm transition-all";
        } else {
          btn.className = "scenario-btn px-4 py-2 text-xs md:text-sm font-medium rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all";
        }
      }
    });

    const noteEl = document.getElementById('scenario-desc-note');
    if (noteEl) {
      noteEl.innerText = scenario.desc;
    }

    this.calculateInvestment();
  },

  updateChart(grossRevenue, expenses, mgmtFee, investorPayout) {
    const canvas = document.getElementById('investment-breakdown-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    const data = [
      Math.max(0, Math.round(investorPayout)),
      Math.max(0, Math.round(mgmtFee)),
      Math.max(0, Math.round(expenses))
    ];

    if (investmentChartInstance) {
      investmentChartInstance.data.datasets[0].data = data;
      investmentChartInstance.update();
    } else {
      const ctx = canvas.getContext('2d');
      investmentChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Investor Payout', 'HENSHE Mgmt & Tech', 'Operating & Reserves'],
          datasets: [{
            data: data,
            backgroundColor: ['#16a34a', '#064e3b', '#94a3b8'],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                font: { family: 'Manrope', size: 11 }
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => ` ${context.label}: ₹${context.raw.toLocaleString('en-IN')}/mo`
              }
            }
          },
          cutout: '68%'
        }
      });
    }
  },

  // Rider Petrol vs EV Savings Calculator
  calculateRiderSavings() {
    const dailyKmInput = document.getElementById('rider-daily-km');
    const petrolPriceInput = document.getElementById('rider-petrol-price');
    const mileageInput = document.getElementById('rider-petrol-mileage');

    const dailyKm = parseFloat(dailyKmInput?.value || 100);
    const petrolPrice = parseFloat(petrolPriceInput?.value || 105);
    const mileage = parseFloat(mileageInput?.value || 35);
    const workDays = 26;

    // Display labels
    this.updateInputDisplay('val-rider-km', `${dailyKm} km / day`);
    this.updateInputDisplay('val-rider-petrol', `₹${petrolPrice} / L`);
    this.updateInputDisplay('val-rider-mileage', `${mileage} km / L`);

    // Petrol Scooter Cost per month
    const litresPerDay = dailyKm / mileage;
    const fuelCostPerDay = litresPerDay * petrolPrice;
    const petrolMaintPerDay = dailyKm * 0.40; // Oil, engine wear, servicing
    const totalPetrolCostDay = fuelCostPerDay + petrolMaintPerDay;
    const monthlyPetrolExpense = totalPetrolCostDay * workDays;

    // HENSHE EV Cost per month (Weekly plan prorated ~₹164/day, zero petrol, free swaps, zero maintenance)
    const evRentalPerDay = 164;
    const monthlyEVExpense = evRentalPerDay * workDays;

    // Net Rider Savings
    const netMonthlySavings = Math.max(0, monthlyPetrolExpense - monthlyEVExpense);
    const annualSavings = netMonthlySavings * 12;

    this.setInnerHtml('res-petrol-daily', this.formatINR(totalPetrolCostDay) + '/day');
    this.setInnerHtml('res-petrol-monthly', this.formatINR(monthlyPetrolExpense) + '/month');
    this.setInnerHtml('res-ev-monthly', this.formatINR(monthlyEVExpense) + '/month');
    this.setInnerHtml('res-rider-monthly-savings', this.formatINR(netMonthlySavings));
    this.setInnerHtml('res-rider-annual-savings', this.formatINR(annualSavings) + ' Saved / Year');

    const pctSaved = monthlyPetrolExpense > 0 ? Math.round((netMonthlySavings / monthlyPetrolExpense) * 100) : 0;
    this.setInnerHtml('res-rider-savings-pct', `${pctSaved}% Extra Take-Home`);
  },

  updateInputDisplay(elementId, value) {
    const el = document.getElementById(elementId);
    if (el) el.innerText = value;
  },

  setInnerHtml(elementId, html) {
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = html;
  },

  init() {
    // Attach event listeners to investment sliders
    const investInputIds = [
      'calc-ev-count', 'calc-ev-cost', 'calc-daily-rate', 'calc-rental-days',
      'calc-utilization', 'calc-maint-cost', 'calc-ops-cost', 'calc-mgmt-fee',
      'calc-reserve-fee', 'calc-investor-share'
    ];

    investInputIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.calculateInvestment());
      }
    });

    // Attach event listeners to rider savings sliders
    ['rider-daily-km', 'rider-petrol-price', 'rider-petrol-mileage'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.calculateRiderSavings());
      }
    });

    // Initial calculations
    this.calculateInvestment();
    this.calculateRiderSavings();
  }
};
