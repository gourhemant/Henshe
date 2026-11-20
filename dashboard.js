/**
 * HENSHE EV Mobility Platform - Live Fleet Management Technology Simulator
 * Real-time IoT telematics, battery state of charge (SoC), utilization metrics
 */

const HENSHE_DASHBOARD = {
  currentFilter: 'all',
  vehicles: [],
  telemetryInterval: null,

  init() {
    this.vehicles = JSON.parse(JSON.stringify(HENSHE_DATA.demoFleetVehicles));
    this.renderFleetTable();
    this.startLiveTelemetrySimulation();
    this.bindFilterButtons();
  },

  bindFilterButtons() {
    const filterButtons = document.querySelectorAll('.fleet-filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.currentTarget.getAttribute('data-filter');
        this.currentFilter = filter;

        filterButtons.forEach(b => {
          b.classList.remove('bg-emerald-600', 'text-white', 'shadow-sm');
          b.classList.add('bg-slate-100', 'text-slate-600');
        });

        e.currentTarget.classList.add('bg-emerald-600', 'text-white', 'shadow-sm');
        e.currentTarget.classList.remove('bg-slate-100', 'text-slate-600');

        this.renderFleetTable();
      });
    });
  },

  renderFleetTable() {
    const tbody = document.getElementById('fleet-telematics-tbody');
    if (!tbody) return;

    let filtered = this.vehicles;
    if (this.currentFilter === 'active') {
      filtered = this.vehicles.filter(v => v.status.includes('Active'));
    } else if (this.currentFilter === 'available') {
      filtered = this.vehicles.filter(v => v.status === 'Available');
    } else if (this.currentFilter === 'maintenance') {
      filtered = this.vehicles.filter(v => v.status.includes('Service') || v.status.includes('Queue'));
    }

    tbody.innerHTML = filtered.map(v => {
      let statusBadge = '';
      if (v.status.includes('Active')) {
        statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> On Trip
        </span>`;
      } else if (v.status === 'Available') {
        statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <span class="w-2 h-2 rounded-full bg-blue-500"></span> Ready
        </span>`;
      } else {
        statusBadge = `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span> Service / Swap
        </span>`;
      }

      const socNum = parseInt(v.soc, 10);
      let socBarColor = 'bg-emerald-500';
      if (socNum < 25) socBarColor = 'bg-rose-500';
      else if (socNum < 50) socBarColor = 'bg-amber-500';

      return `
        <tr class="hover:bg-slate-50 transition-colors border-b border-slate-100">
          <td class="py-3 px-4 text-xs font-mono font-bold text-slate-800">${v.id}</td>
          <td class="py-3 px-4 text-xs font-medium text-slate-700">${v.model}</td>
          <td class="py-3 px-4 text-xs text-slate-600">${v.rider}</td>
          <td class="py-3 px-4">${statusBadge}</td>
          <td class="py-3 px-4">
            <div class="flex items-center gap-2">
              <div class="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div class="${socBarColor} h-2 rounded-full" style="width: ${v.soc}"></div>
              </div>
              <span class="text-xs font-semibold text-slate-700">${v.soc}</span>
            </div>
          </td>
          <td class="py-3 px-4 text-xs text-slate-600">${v.range}</td>
          <td class="py-3 px-4 text-xs text-slate-600">${v.location}</td>
          <td class="py-3 px-4 text-xs font-mono font-bold text-emerald-700">${v.speed}</td>
        </tr>
      `;
    }).join('');
  },

  startLiveTelemetrySimulation() {
    // Periodically update some vehicle speeds and SoC slightly to simulate live GPS/telematics stream
    if (this.telemetryInterval) clearInterval(this.telemetryInterval);

    this.telemetryInterval = setInterval(() => {
      this.vehicles.forEach(v => {
        if (v.status.includes('Active')) {
          const currentSpeed = parseInt(v.speed, 10);
          const variation = (Math.floor(Math.random() * 9) - 4);
          const newSpeed = Math.max(18, Math.min(52, currentSpeed + variation));
          v.speed = `${newSpeed} km/h`;
        }
      });
      this.renderFleetTable();
    }, 4000);
  }
};
