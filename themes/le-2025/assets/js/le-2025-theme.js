const Menu = {
  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initLanguageSelector();
      this.initMobileMenu();
      this.initDropdowns();
      this.initKeyboardNav();
      this.initResizeHandler();
    });
  },

  initLanguageSelector() {
    const langToggle = document.getElementById('language-toggle');
    const langSection = document.getElementById('language-section');

    if (langToggle && langSection) {
      // Add transition class after initial page load to enable smooth animations
      setTimeout(() => {
        langSection.classList.add('transition-all', 'duration-300', 'ease-in-out');
      }, 100);

      const closeSection = () => {
        langToggle.setAttribute('aria-expanded', false);
        langSection.classList.add('h-0', 'opacity-0');
        langSection.classList.remove('opacity-100');
        setTimeout(() => {
          langSection.classList.add('hidden');
        }, 300);
      };

      const openSection = () => {
        langToggle.setAttribute('aria-expanded', true);
        langSection.classList.remove('hidden');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            langSection.classList.remove('h-0', 'opacity-0');
            langSection.classList.add('opacity-100');
          });
        });
      };

      langToggle.addEventListener('click', () => {
        const isExpanded = langToggle.getAttribute('aria-expanded') === 'true';
        if (!isExpanded) {
          openSection();
        } else {
          closeSection();
        }
      });

      // Close language section when clicking outside
      document.addEventListener('click', (e) => {
        if (!langToggle.contains(e.target) && !langSection.contains(e.target) && langToggle.getAttribute('aria-expanded') === 'true') {
          closeSection();
        }
      });

      // Handle Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && langToggle.getAttribute('aria-expanded') === 'true') {
          closeSection();
          langToggle.focus();
        }
      });
    }
  },

  initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuToggle && mainNav) {
      // Set initial state
      if (window.innerWidth < 768) {
        mainNav.classList.add('hidden');
      }

      const updateNavHeight = () => {
        if (window.innerWidth >= 768) return;
        if (mainNav.classList.contains('hidden')) return;

        // Get the current scroll height and update maxHeight
        requestAnimationFrame(() => {
          mainNav.style.maxHeight = `${mainNav.scrollHeight}px`;
        });
      };

      const openMenu = () => {
        mainNav.classList.remove('hidden');
        mainNav.style.maxHeight = '0';
        mainNav.offsetHeight; // Force reflow
        updateNavHeight();
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
      };

      const closeMenu = () => {
        mainNav.style.maxHeight = '0';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');

        setTimeout(() => {
          if (mobileMenuToggle.getAttribute('aria-expanded') === 'false') {
            mainNav.classList.add('hidden');
          }
        }, 300);
      };

      mobileMenuToggle.addEventListener('click', () => {
        const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
        if (!isExpanded) {
          openMenu();
        } else {
          closeMenu();
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !mainNav.contains(e.target) &&
            mobileMenuToggle.getAttribute('aria-expanded') === 'true') {
          closeMenu();
        }
      });

      // Update maxHeight on window resize
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
          mainNav.style.maxHeight = '';
          mainNav.classList.remove('hidden');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        } else {
          updateNavHeight();
        }
      });

      // Export updateNavHeight so it can be used by dropdown handlers
      window.updateMobileNavHeight = updateNavHeight;
    }
  },

  adjustDropdownPosition(dropdown) {
    if (window.innerWidth < 768) return;

    // Temporarily make the dropdown visible but hidden to measure it
    const wasHidden = dropdown.classList.contains('hidden');
    if (wasHidden) {
      dropdown.style.visibility = 'hidden';
      dropdown.classList.remove('hidden');
    }

    const dropdownRect = dropdown.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Check if dropdown would overflow the viewport
    if (dropdownRect.right > viewportWidth - 16) { // 16px margin from right edge
      const overflowAmount = dropdownRect.right - (viewportWidth - 16);
      dropdown.style.left = `${-overflowAmount}px`;
    }

    // Restore the dropdown to its original visibility state
    if (wasHidden) {
      dropdown.classList.add('hidden');
      dropdown.style.visibility = '';
    }
  },

  showDropdown(button, dropdown) {
    // Position the dropdown before showing it
    this.adjustDropdownPosition(dropdown);

    // Now show the dropdown
    dropdown.classList.remove('hidden');
    button.setAttribute('aria-expanded', 'true');
  },

  hideDropdown(button, dropdown) {
    dropdown.classList.add('hidden');
    button.setAttribute('aria-expanded', 'false');
  },

  initDropdowns() {
    const dropdownButtons = document.querySelectorAll('[aria-controls^="dropdown-"]');
    const isMobile = () => window.innerWidth < 768;

    // Add click outside handler
    document.addEventListener('click', (e) => {
      // Check if click was outside all dropdowns and their buttons
      const clickedDropdownTrigger = e.target.closest('[aria-controls^="dropdown-"]');
      const clickedDropdownMenu = e.target.closest('[id^="dropdown-"]');
      const isOutsideDropdowns = !clickedDropdownTrigger && !clickedDropdownMenu;

      if (!isMobile() && isOutsideDropdowns) {
        // Close all open dropdowns
        dropdownButtons.forEach(button => {
          const dropdown = document.getElementById(button.getAttribute('aria-controls'));
          if (dropdown && !dropdown.classList.contains('hidden')) {
            this.hideDropdown(button, dropdown);
          }
        });
      }
    });

    dropdownButtons.forEach(button => {
      const dropdown = document.getElementById(button.getAttribute('aria-controls'));
      if (!dropdown) return;

      // Handle click for both mobile and desktop
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Close other dropdowns first
        dropdownButtons.forEach(otherButton => {
          if (otherButton !== button) {
            otherButton.setAttribute('aria-expanded', 'false');
            const otherDropdown = document.getElementById(otherButton.getAttribute('aria-controls'));
            if (otherDropdown) {
              otherDropdown.classList.add('hidden');
            }
          }
        });

        // Toggle current dropdown
        if (!isExpanded) {
          this.showDropdown(button, dropdown);
        } else {
          this.hideDropdown(button, dropdown);
        }

        // Update mobile nav height after dropdown toggle if on mobile
        if (isMobile() && window.updateMobileNavHeight) {
          setTimeout(window.updateMobileNavHeight, 10);
        }
      });
    });
  },

  initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      const activeElement = document.activeElement;
      const menuItem = activeElement.closest('[role="menuitem"]');

      if (!menuItem) return;

      const parentMenu = menuItem.closest('[role="menu"], [role="menubar"]');
      const menuItems = Array.from(parentMenu.querySelectorAll('[role="menuitem"]'));
      const index = menuItems.indexOf(menuItem);

      switch (e.key) {
        case 'ArrowRight':
          if (parentMenu.getAttribute('role') === 'menubar') {
            e.preventDefault();
            const nextIndex = (index + 1) % menuItems.length;
            menuItems[nextIndex].focus();
          }
          break;
        case 'ArrowLeft':
          if (parentMenu.getAttribute('role') === 'menubar') {
            e.preventDefault();
            const prevIndex = (index - 1 + menuItems.length) % menuItems.length;
            menuItems[prevIndex].focus();
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (menuItem.hasAttribute('aria-controls')) {
            const dropdown = document.getElementById(menuItem.getAttribute('aria-controls'));
            if (dropdown) {
              this.showDropdown(menuItem, dropdown);
              const firstDropdownItem = dropdown.querySelector('[role="menuitem"]');
              if (firstDropdownItem) firstDropdownItem.focus();
            }
          } else if (parentMenu.getAttribute('role') === 'menu') {
            const nextIndex = (index + 1) % menuItems.length;
            menuItems[nextIndex].focus();
          }
          break;
        case 'ArrowUp':
          if (parentMenu.getAttribute('role') === 'menu') {
            e.preventDefault();
            const prevIndex = (index - 1 + menuItems.length) % menuItems.length;
            menuItems[prevIndex].focus();
          }
          break;
        case 'Escape':
          const parentButton = parentMenu.previousElementSibling;
          if (parentButton && parentButton.hasAttribute('aria-controls')) {
            e.preventDefault();
            this.hideDropdown(parentButton, parentMenu);
            parentButton.focus();
          }
          break;
      }
    });
  },

  initResizeHandler() {
    let resizeTimer;
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const isDesktop = window.innerWidth >= 1024;
        const isMobile = window.innerWidth < 768;

        if (isDesktop && mainNav && mobileMenuToggle) {
          mainNav.classList.remove('hidden');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        } else if (isMobile && mainNav && mobileMenuToggle) {
          // Only hide the nav when in true mobile mode (< 768px)
          mainNav.classList.add('hidden');
        } else {
          // For tablet sizes (768px-1023px), keep the nav visible
          mainNav.classList.remove('hidden');
        }

        // Adjust any visible dropdowns
        const visibleDropdowns = document.querySelectorAll('[id^="dropdown-"]:not(.hidden)');
        visibleDropdowns.forEach(dropdown => this.adjustDropdownPosition(dropdown));
      }, 100);
    });
  }
};

Menu.init();
const Accordion = {
  init() {
    const accordionContainers = document.querySelectorAll('.accordion-container');
    if (accordionContainers.length === 0) {
      return;
    }

    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        const accordionItem = button.closest('.accordion-item');
        const contentId = button.getAttribute('aria-controls') || button.id.replace('accordion', 'content');
        const content = contentId ? document.getElementById(contentId) : null;
        const icon = button.querySelector('.accordion-icon');

        const hasIsOpenClass = accordionItem ? accordionItem.classList.contains('is-open') : false;
        const hasActiveClass = button.classList.contains('active');

        const shouldBeOpen = accordionItem && hasIsOpenClass && hasActiveClass;

        if (shouldBeOpen) {
            if (content) content.classList.remove('hidden');
            if (icon) icon.textContent = '−';
            button.setAttribute('aria-expanded', 'true');
            button.classList.add('active');
            if(accordionItem) accordionItem.classList.add('is-open');
        } else {
            if (content) content.classList.add('hidden');
            if (icon) icon.textContent = '+';
            button.setAttribute('aria-expanded', 'false');
            button.classList.remove('active');
            if(accordionItem) accordionItem.classList.remove('is-open');
        }
    });

    accordionButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();

        const clickedItem = this.closest('.accordion-item');
        if (!clickedItem) return;

        const contentId = this.getAttribute('aria-controls') || this.id.replace('accordion', 'content');
        const clickedContent = contentId ? document.getElementById(contentId) : null;
        const clickedIcon = this.querySelector('.accordion-icon');
        const accordionContainer = this.closest('.accordion-container');
        const wasActive = this.classList.contains('active');

        if (accordionContainer) {
          const siblingButtons = accordionContainer.querySelectorAll('.accordion-button');
          siblingButtons.forEach(otherButton => {
            if (otherButton !== this) {
              const otherItem = otherButton.closest('.accordion-item');
              if (!otherItem) return;

              const otherContentId = otherButton.getAttribute('aria-controls') || otherButton.id.replace('accordion', 'content');
              const otherContent = otherContentId ? document.getElementById(otherContentId) : null;
              const otherIcon = otherButton.querySelector('.accordion-icon');

              otherButton.classList.remove('active');
              otherItem.classList.remove('is-open');
              if (otherContent) otherContent.classList.add('hidden');
              if (otherIcon) otherIcon.textContent = '+';
              otherButton.setAttribute('aria-expanded', 'false');
            }
          });
        }

        if (wasActive) {
            this.classList.remove('active');
            clickedItem.classList.remove('is-open');
            if (clickedContent) clickedContent.classList.add('hidden');
            if (clickedIcon) clickedIcon.textContent = '+';
            this.setAttribute('aria-expanded', 'false');
        } else {
            this.classList.add('active');
            clickedItem.classList.add('is-open');
            if (clickedContent) clickedContent.classList.remove('hidden');
            if (clickedIcon) clickedIcon.textContent = '−';
            this.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Accordion.init();
});