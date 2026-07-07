const Donate2026 = {
  init() {
    const page = document.getElementById('page-Donate2026');
    if (!page) return;

    this.page = page;
    this.forms = page.querySelector('#cmp-DonationForms2026');

    window.addEventListener('hashchange', () => {
      this.syncAccordionToLocation();
    });

    window.addEventListener('popstate', () => {
      this.syncAccordionToLocation();
    });

    this.bindDonationTabs();
    this.bindAccordionLinks();

    if (window.location.hash) {
      this.syncAccordionToLocation();
    }
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
      panel.hidden = !isActive;
    });
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
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Donate2026.init();
});
