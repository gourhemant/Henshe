/**
 * HENSHE EV Mobility Platform - Cyber Stealth Application Script
 * Theme: Cyber Stealth Dark
 * Features: Interactive 3D Scooter Showcase, Live Fuel Savings Calculator,
 * Smooth Navigation, Quick Dispatch Modal & Direct Hub WhatsApp Integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  HENSHE_APP.init();
});

const HENSHE_APP = {
  activeColorway: 'lime',

  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupModal();
    this.setupContactForm();
    this.setupScrollSpy();
    this.updateSavingsCalculator();

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  /* -------------------------------------------------------------
     1. Interactive Scooter Colorway Switcher
     ------------------------------------------------------------- */
  selectColorway(colorKey) {
    this.activeColorway = colorKey;
    const imgEl = document.getElementById('scooter-hero-img');
    const labelEl = document.getElementById('colorway-label');
    const glowRing = document.getElementById('scooter-glow-ring');

    const colorways = {
      lime: {
        src: './assets/ev-scooter-lime.jpg',
        name: 'Volt Lime',
        color: '#00F5A0',
        glow: 'rgba(0, 245, 160, 0.45)'
      },
      orange: {
        src: './assets/ev-scooter-orange.jpg',
        name: 'Blaze Orange',
        color: '#FF6B00',
        glow: 'rgba(255, 107, 0, 0.45)'
      },
      white: {
        src: './assets/ev-scooter-white.jpg',
        name: 'Arctic White',
        color: '#FFFFFF',
        glow: 'rgba(255, 255, 255, 0.35)'
      }
    };

    const target = colorways[colorKey] || colorways.lime;

    // Update active dot indicators
    ['lime', 'orange', 'white'].forEach(key => {
      const dot = document.getElementById('dot-' + key);
      if (dot) {
        if (key === colorKey) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      }
    });

    // Smooth transition
    if (imgEl) {
      imgEl.style.opacity = '0.4';
      imgEl.style.transform = 'scale(0.97)';
      setTimeout(() => {
        imgEl.src = target.src;
        imgEl.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      }, 150);
    }

    if (labelEl) {
      labelEl.textContent = target.name;
      labelEl.style.color = target.color;
    }

    if (glowRing) {
      glowRing.style.background = target.color;
    }
  },

  /* -------------------------------------------------------------
     2. Real-Time Petrol vs. EV Savings Calculator
     ------------------------------------------------------------- */
  updateSavingsCalculator() {
    const kmInput = document.getElementById('calc-daily-km');
    const petrolInput = document.getElementById('calc-petrol-price');

    const dailyKm = parseInt(kmInput?.value || 90, 10);
    const petrolPrice = parseFloat(petrolInput?.value || 96);

    // Update range readouts
    const displayKm = document.getElementById('display-daily-km');
    const displayPetrol = document.getElementById('display-petrol-price');

    if (displayKm) displayKm.textContent = `${dailyKm} km/day`;
    if (displayPetrol) displayPetrol.textContent = `₹${petrolPrice} / Litre`;

    // Assumptions for Indian 110-125cc petrol delivery bikes:
    // Avg mileage = 36 km/L in city stop-and-go traffic
    const monthlyKm = dailyKm * 30;
    const litresNeeded = monthlyKm / 36;
    const monthlyPetrolExpense = litresNeeded * petrolPrice;

    // Monthly maintenance for petrol bike (engine oil, chain, spark plug, brake pads) ~ ₹600/mo
    const petrolMaintenance = 600;
    const totalPetrolCost = Math.round(monthlyPetrolExpense + petrolMaintenance);

    // HENSHE Flat Monthly Commercial EV Rental (includes unlimited battery swaps + 100% free hub maintenance)
    // Daily equivalent is ₹146-180, monthly flat plan ~ ₹4,400
    const hensheRentalCost = 4400;

    // Net Pocket Savings
    const netSavings = Math.max(0, totalPetrolCost - hensheRentalCost);
    const annualSavings = netSavings * 12;

    // CO2 Savings: ~0.055 kg CO2 saved per km
    const co2SavedKg = Math.round((monthlyKm * 12 * 0.055));

    // Update UI elements
    const petrolCostEl = document.getElementById('val-petrol-monthly');
    const evCostEl = document.getElementById('val-ev-monthly');
    const netSavingsEl = document.getElementById('val-net-savings');
    const annualSavingsEl = document.getElementById('val-annual-savings');
    const co2El = document.getElementById('val-co2-cut');

    if (petrolCostEl) petrolCostEl.textContent = '₹' + totalPetrolCost.toLocaleString('en-IN');
    if (evCostEl) evCostEl.textContent = '₹' + hensheRentalCost.toLocaleString('en-IN');
    if (netSavingsEl) netSavingsEl.textContent = '₹' + netSavings.toLocaleString('en-IN');
    if (annualSavingsEl) annualSavingsEl.textContent = '₹' + annualSavings.toLocaleString('en-IN');
    if (co2El) co2El.textContent = `${co2SavedKg} kg`;
  },

  /* -------------------------------------------------------------
     3. Navigation & Smooth Scrolling
     ------------------------------------------------------------- */
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#') && targetId.length > 1) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            this.closeMobileMenu();

            const headerHeight = document.getElementById('site-header')?.offsetHeight || 72;
            const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight + 5;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  },

  /* -------------------------------------------------------------
     4. Scroll Spy (Active nav indicator)
     ------------------------------------------------------------- */
  setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      const scrollY = window.pageYOffset;
      const headerHeight = (document.getElementById('site-header')?.offsetHeight || 72) + 60;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  },

  /* -------------------------------------------------------------
     5. Mobile Menu Handling
     ------------------------------------------------------------- */
  setupMobileMenu() {
    const openBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-drawer-btn');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('drawer-backdrop');

    if (openBtn && drawer) {
      openBtn.addEventListener('click', () => {
        drawer.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => this.closeMobileMenu());
    }

    if (backdrop && drawer) {
      backdrop.addEventListener('click', () => this.closeMobileMenu());
    }
  },

  closeMobileMenu() {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer && !drawer.classList.contains('hidden')) {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
    }
  },

  /* -------------------------------------------------------------
     6. Quick Action Modal (Booking / Investment / Inquiry)
     ------------------------------------------------------------- */
  setupModal() {
    const modal = document.getElementById('action-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const backdrop = document.getElementById('modal-backdrop');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeModal());
    }

    const modalForm = document.getElementById('modal-quick-form');
    if (modalForm) {
      modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleModalSubmit();
      });
    }
  },

  openModal(type = 'rental', title = null) {
    const modal = document.getElementById('action-modal');
    const select = document.getElementById('modal-interest-select');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const formContainer = document.getElementById('modal-form-container');
    const successContainer = document.getElementById('modal-success-container');

    if (!modal) return;

    if (formContainer) formContainer.classList.remove('hidden');
    if (successContainer) successContainer.classList.add('hidden');

    if (select) {
      select.value = type;
    }

    if (type === 'rental') {
      if (modalTitle) modalTitle.textContent = title || 'Rent an Electric Scooter';
      if (modalSubtitle) modalSubtitle.textContent = 'Instant pickup in Gurugram & Noida • ₹0 Petrol Cost • Save ₹4,500+/mo';
    } else if (type === 'investment') {
      if (modalTitle) modalTitle.textContent = title || 'EV Fleet Investment Inquiry';
      if (modalSubtitle) modalSubtitle.textContent = 'Asset-backed ownership • 18-24% Target Yields • Monthly Bank Distributions';
    } else if (type === 'corporate') {
      if (modalTitle) modalTitle.textContent = title || 'Corporate Fleet Electrification';
      if (modalSubtitle) modalSubtitle.textContent = 'Turnkey zero-emission fleets for 3PL, e-commerce & quick commerce';
    } else {
      if (modalTitle) modalTitle.textContent = title || 'Get In Touch With HENSHE';
      if (modalSubtitle) modalSubtitle.textContent = 'Direct Hub Helpline: +91 9625592488 • Gurugram & Noida';
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  closeModal() {
    const modal = document.getElementById('action-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  },

  handleModalSubmit() {
    const name = document.getElementById('modal-name')?.value || 'Partner';
    const phone = document.getElementById('modal-phone')?.value || '';
    const interest = document.getElementById('modal-interest-select')?.value || 'rental';
    const location = document.getElementById('modal-city')?.value || 'Gurugram / Noida Hubs';

    const voucherId = 'HEN-' + Math.floor(100000 + Math.random() * 900000);

    const formContainer = document.getElementById('modal-form-container');
    const successContainer = document.getElementById('modal-success-container');
    const voucherEl = document.getElementById('modal-voucher-id');
    const whatsappBtn = document.getElementById('modal-whatsapp-cta');

    if (voucherEl) voucherEl.textContent = voucherId;

    if (whatsappBtn) {
      const text = encodeURIComponent(`Hello HENSHE, I have submitted an inquiry.\nReference: ${voucherId}\nName: ${name}\nPhone: ${phone}\nInterest: ${interest}\nLocation: ${location}`);
      whatsappBtn.href = `https://wa.me/919625592488?text=${text}`;
    }

    if (formContainer) formContainer.classList.add('hidden');
    if (successContainer) successContainer.classList.remove('hidden');
    if (typeof lucide !== 'undefined') lucide.createIcons();
  },

  /* -------------------------------------------------------------
     7. Main Page Contact Form Handling
     ------------------------------------------------------------- */
  setupContactForm() {
    const contactForm = document.getElementById('main-contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name')?.value || 'Friend';
        const phone = document.getElementById('contact-phone')?.value || '';
        const interest = document.getElementById('contact-interest')?.value || 'Inquiry';
        const notes = document.getElementById('contact-message')?.value || '';

        const refId = 'HEN-' + Math.floor(100000 + Math.random() * 900000);

        this.showToast(`Inquiry Received! Ref: ${refId}. Connecting to WhatsApp...`);

        setTimeout(() => {
          const text = encodeURIComponent(`Hello HENSHE Hub Team,\nInquiry Ref: ${refId}\nName: ${name}\nPhone: ${phone}\nInterest: ${interest}\nMessage: ${notes}`);
          window.open(`https://wa.me/919625592488?text=${text}`, '_blank');
        }, 1200);

        contactForm.reset();
      });
    }
  },

  /* -------------------------------------------------------------
     8. Toast Notifications
     ------------------------------------------------------------- */
  showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0b1322] text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold border border-[#00F5A0]/40 transition-all duration-300';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="text-[#00F5A0] font-bold">⚡</span> <span>${message}</span>`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 4000);
  }
};
