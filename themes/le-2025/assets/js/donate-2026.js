const Donate2026 = {
  init() {
    const page = document.getElementById('page-Donate2026');
    if (!page) return;

    this.page = page;
    this.forms = page.querySelector('#cmp-DonationForms2026');
    this.formOverlay = page.querySelector('#cmp-Donate2026FormOverlay');
    this.formSpacer = page.querySelector('#cmp-Donate2026FormSpacer');
    this.lowerContent = page.querySelector('#cmp-Donate2026WaysToGive');
    this.desktopMediaQuery = window.matchMedia('(min-width: 768px)');

    window.addEventListener('hashchange', () => {
      this.syncAccordionToLocation();
    });

    window.addEventListener('popstate', () => {
      this.syncAccordionToLocation();
    });

    this.bindFormSpacerHeight();
    this.bindDonationTabs();
    this.bindAccordionLinks();

    if (window.location.hash) {
      this.syncAccordionToLocation();
    }

    this.syncFormSpacerHeight();
  },

  bindDonationTabs() {
    if (!this.forms) return;

    this.tabs = Array.from(this.forms.querySelectorAll('.donate-2026-tab'));
    this.panels = Array.from(this.forms.querySelectorAll('.donate-2026-embed-panel'));

    if (!this.tabs.length || !this.panels.length) return;

    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.activateDonationTab(tab.dataset.panel);
      });
    });

    const selectedTab = this.tabs.find(tab => tab.getAttribute('aria-selected') === 'true') || this.tabs[0];
    this.activateDonationTab(selectedTab.dataset.panel);
  },

  activateDonationTab(panelName) {
    if (!panelName || !this.tabs || !this.panels) return;

    this.tabs.forEach(tab => {
      const isSelected = tab.dataset.panel === panelName;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    this.panels.forEach(panel => {
      const isActive = panel.id === `donate-2026-panel-${panelName}`;
      panel.classList.toggle('active', isActive);
      panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });

    this.scheduleFormSpacerHeightSync?.();
  },

  bindFormSpacerHeight() {
    if (!this.formOverlay || !this.formSpacer) return;

    this.scheduleFormSpacerHeightSync = () => {
      if (this.formSpacerSyncFrame) return;

      this.formSpacerSyncFrame = requestAnimationFrame(() => {
        this.formSpacerSyncFrame = null;
        this.syncFormSpacerHeight();
      });
    };

    window.addEventListener('resize', this.scheduleFormSpacerHeightSync);
    window.addEventListener('load', this.scheduleFormSpacerHeightSync);

    if (this.desktopMediaQuery?.addEventListener) {
      this.desktopMediaQuery.addEventListener('change', this.scheduleFormSpacerHeightSync);
    } else if (this.desktopMediaQuery?.addListener) {
      this.desktopMediaQuery.addListener(this.scheduleFormSpacerHeightSync);
    }

    if (window.ResizeObserver) {
      this.formSpacerObserver = new ResizeObserver(this.scheduleFormSpacerHeightSync);
      this.formSpacerObserver.observe(this.formOverlay);

      if (this.lowerContent) {
        this.formSpacerObserver.observe(this.lowerContent);
      }
    }
  },

  syncFormSpacerHeight() {
    if (!this.formOverlay || !this.formSpacer) return;

    if (!this.desktopMediaQuery?.matches) {
      this.formSpacer.style.minHeight = '';
      return;
    }

    this.formSpacer.style.minHeight = '';

    const formBottom = this.formOverlay.getBoundingClientRect().bottom;
    const spacerTop = this.formSpacer.getBoundingClientRect().top;
    const shortfall = Math.max(Math.ceil(formBottom - spacerTop), 0);

    this.formSpacer.style.minHeight = shortfall ? `${shortfall}px` : '';
  },

  bindAccordionLinks() {
    this.page.querySelectorAll('.accordion-button').forEach(button => {
      button.addEventListener('click', () => {
        const item = button.closest('.accordion-item');
        if (!item) return;

        const isOpen = item.classList.contains('is-open');
        this.updateHistory(item.id, isOpen);
      });
    });
  },

  updateHistory(id, isOpen) {
    const url = new URL(window.location.href);
    url.hash = isOpen ? id : '';
    window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`);
  },

  syncAccordionToLocation() {
    const hash = window.location.hash.replace(/^#/, '');

    if (!hash) {
      this.closeAllAccordions();
      return;
    }

    this.openAccordionById(hash);
  },

  closeAllAccordions() {
    this.page.querySelectorAll('.accordion-item').forEach(item => {
      const button = item.querySelector('.accordion-button');
      const content = item.querySelector('.accordion-content');
      const icon = item.querySelector('.accordion-icon');

      if (!button || !content) return;

      button.classList.remove('active');
      button.setAttribute('aria-expanded', 'false');
      content.classList.add('hidden');
      item.classList.remove('is-open');

      if (icon) icon.textContent = '+';
    });

    this.scheduleFormSpacerHeightSync?.();
  },

  openAccordionById(id) {
    const target = document.getElementById(id);
    if (!target) return;

    this.closeAllAccordions();

    const item = target.classList.contains('accordion-item') ? target : target.closest('.accordion-item');
    if (!item) return;

    const button = item.querySelector('.accordion-button');
    const content = item.querySelector('.accordion-content');
    const icon = item.querySelector('.accordion-icon');

    if (!button || !content) return;

    button.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
    content.classList.remove('hidden');
    item.classList.add('is-open');
    if (icon) icon.textContent = '−';

    requestAnimationFrame(() => {
      item.scrollIntoView({ block: 'start' });
    });

    this.scheduleFormSpacerHeightSync?.();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Donate2026.init();
});
