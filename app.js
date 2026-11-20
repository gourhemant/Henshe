/**
 * HENSHE EV Mobility Platform - Modern & Streamlined Application Script
 * Clean, lightweight, and responsive logic matching the Luminano Group design pattern.
 */

document.addEventListener('DOMContentLoaded', () => {
  HENSHE_APP.init();
});

const HENSHE_APP = {
  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupModal();
    this.setupContactForm();
    this.setupScrollSpy();

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  /* -------------------------------------------------------------
     1. Navigation & Smooth Scrolling
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
            // Close mobile menu if open
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
     2. Scroll Spy (Active nav indicator)
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
     3. Mobile Menu Handling
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
     4. Quick Action Modal (Booking / Investment / Inquiry)
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

    // Modal form submit
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

    // Reset view
    if (formContainer) formContainer.classList.remove('hidden');
    if (successContainer) successContainer.classList.add('hidden');

    // Customize title & select based on type
    if (select) {
      select.value = type;
    }

    if (type === 'rental') {
      if (modalTitle) modalTitle.textContent = title || 'Rent an Electric Scooter';
      if (modalSubtitle) modalSubtitle.textContent = 'Instant pickup in Gurugram & Noida • ₹0 Petrol Cost • Save ₹4,500+/mo';
    } else if (type === 'investment') {
      if (modalTitle) modalTitle.textContent = title || 'EV Fleet Investment Inquiry';
      if (modalSubtitle) modalSubtitle.textContent = 'Asset-backed ownership • Regular monthly lease distributions • Tax depreciation';
    } else if (type === 'corporate') {
      if (modalTitle) modalTitle.textContent = title || 'Corporate Fleet Electrification';
      if (modalSubtitle) modalSubtitle.textContent = 'Zero-emission delivery fleets for 3PL, e-commerce, and quick commerce';
    } else {
      if (modalTitle) modalTitle.textContent = title || 'Get In Touch With HENSHE';
      if (modalSubtitle) modalSubtitle.textContent = 'Direct Hub Support: +91 9625592488 • Gurugram & Noida Hubs';
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
    const interest = document.getElementById('modal-interest-select')?.value || 'general';
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
     5. Main Page Contact Form Handling
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

        // Open WhatsApp after brief delay
        setTimeout(() => {
          const text = encodeURIComponent(`Hello HENSHE,\nInquiry Ref: ${refId}\nName: ${name}\nPhone: ${phone}\nTopic: ${interest}\nMessage: ${notes}`);
          window.open(`https://wa.me/919625592488?text=${text}`, '_blank');
        }, 1200);

        contactForm.reset();
      });
    }
  },

  /* -------------------------------------------------------------
     6. Toast Notifications
     ------------------------------------------------------------- */
  showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast-notice flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl text-xs font-semibold border border-emerald-500/40';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="text-emerald-400">⚡</span> <span>${message}</span>`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 4000);
  }
};
