/* ============================================
   Smarkets Company Pages — Shared Components
   Single source of truth for nav + footer
   ============================================ */

(function () {
    'use strict';

    // Determine current page from URL
    const path = window.location.pathname;
    const currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    function isActive(page) {
        return currentPage === page ? 'active' : '';
    }

    function ariaCurrent(page) {
        return currentPage === page ? ' aria-current="page"' : '';
    }

    // ── Skip Link ─────────────────────────────
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add id to main element for skip link target
    const mainEl = document.querySelector('main');
    if (mainEl) {
        mainEl.id = 'main-content';
        mainEl.setAttribute('tabindex', '-1');
    }

    // ── Smarkets Logo ───────────────────────────
    const logoIMG = `<img src="smarkets-white-wordmark-no-padding.svg" alt="Smarkets" class="nav-logo">`;

    // ── Navigation ──────────────────────────────
    const navHTML = `
        <a href="index.html" class="nav-brand">
            ${logoIMG}
        </a>
        <ul class="nav-links">
            <li><a href="about.html" class="${isActive('about.html')}"${ariaCurrent('about.html')}>About</a></li>
            <li><a href="team.html" class="${isActive('team.html')}"${ariaCurrent('team.html')}>Team</a></li>
            <li><a href="careers.html" class="${isActive('careers.html')}"${ariaCurrent('careers.html')}>Careers</a></li>
            <li><a href="partnerships.html" class="${isActive('partnerships.html')}"${ariaCurrent('partnerships.html')}>Partnerships</a></li>
            <li><a href="newsroom.html" class="${isActive('newsroom.html')}"${ariaCurrent('newsroom.html')}>Newsroom</a></li>
            <li><a href="investors.html" class="${isActive('investors.html')}"${ariaCurrent('investors.html')}>Investors</a></li>
        </ul>
        <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-nav">&#9776;</button>
    `;

    const mobileNavHTML = `
        <div class="mobile-nav" id="mobile-nav" role="navigation" aria-label="Mobile navigation">
            <a href="about.html" class="${isActive('about.html')}"${ariaCurrent('about.html')}>About</a>
            <a href="team.html" class="${isActive('team.html')}"${ariaCurrent('team.html')}>Team</a>
            <a href="careers.html" class="${isActive('careers.html')}"${ariaCurrent('careers.html')}>Careers</a>
            <a href="partnerships.html" class="${isActive('partnerships.html')}"${ariaCurrent('partnerships.html')}>Partnerships</a>
            <a href="newsroom.html" class="${isActive('newsroom.html')}"${ariaCurrent('newsroom.html')}>Newsroom</a>
            <a href="investors.html" class="${isActive('investors.html')}"${ariaCurrent('investors.html')}>Investors</a>
        </div>
    `;

    const nav = document.querySelector('nav');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
        nav.innerHTML = navHTML;
        nav.insertAdjacentHTML('afterend', mobileNavHTML);

        // Mobile menu toggle
        const toggle = nav.querySelector('.mobile-menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');

        // ── Focus trap helper ────────────────────
        function getFocusableElements(container) {
            return container.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
        }

        function trapFocus(e) {
            if (!mobileNav || !mobileNav.classList.contains('open')) return;
            const focusable = [toggle, ...getFocusableElements(mobileNav)];
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        function closeMobileNav() {
            mobileNav.classList.remove('open');
            toggle.textContent = '\u2630';
            toggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('nav-open');
            document.removeEventListener('keydown', trapFocus);
            toggle.focus();
        }

        function openMobileNav() {
            mobileNav.classList.add('open');
            toggle.textContent = '\u2715';
            toggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('nav-open');
            document.addEventListener('keydown', trapFocus);
            // Move focus into the mobile nav
            const firstLink = mobileNav.querySelector('a');
            if (firstLink) firstLink.focus();
        }

        if (toggle && mobileNav) {
            toggle.addEventListener('click', () => {
                if (mobileNav.classList.contains('open')) {
                    closeMobileNav();
                } else {
                    openMobileNav();
                }
            });

            // Close mobile nav when a link is clicked
            mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', closeMobileNav);
            });

            // Close mobile nav on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
                    closeMobileNav();
                }
            });
        }
    }

    // ── Footer ──────────────────────────────────
    const footerHTML = `
        <div class="footer-content">
            <div class="footer-col">
                <h4>Product</h4>
                <ul>
                    <li><a href="https://smarkets.com" rel="noopener noreferrer">Exchange</a></li>
                    <li><a href="https://sbk.com" rel="noopener noreferrer">SBK Sportsbook</a></li>
                    <li><a href="https://docs.smarkets.com" rel="noopener noreferrer">API</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Company</h4>
                <ul>
                    <li><a href="about.html">About</a></li>
                    <li><a href="team.html">Team</a></li>
                    <li><a href="careers.html">Careers</a></li>
                    <li><a href="newsroom.html">Newsroom</a></li>
                    <li><a href="partnerships.html">Partnerships</a></li>
                    <li><a href="investors.html">Investors</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Legal</h4>
                <ul>
                    <li><a href="terms.html">Terms of Service</a></li>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                    <li><a href="responsible-gambling.html">Responsible Gambling</a></li>
                    <li><a href="cookies.html">Cookie Policy</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Connect</h4>
                <div class="social-links">
                    <a href="https://twitter.com/smarkets" rel="noopener noreferrer" aria-label="Follow Smarkets on X (formerly Twitter)">
                        <span aria-hidden="true">\uD835\uDD4F</span>
                        <span class="sr-only">X / Twitter</span>
                    </a>
                    <a href="https://linkedin.com/company/smarkets" rel="noopener noreferrer" aria-label="Follow Smarkets on LinkedIn">
                        <span aria-hidden="true">in</span>
                        <span class="sr-only">LinkedIn</span>
                    </a>
                    <a href="https://instagram.com/smarkets" rel="noopener noreferrer" aria-label="Follow Smarkets on Instagram">
                        <span aria-hidden="true">IG</span>
                        <span class="sr-only">Instagram</span>
                    </a>
                </div>
                <p class="footer-press-email">press@smarkets.com</p>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="footer-brand">
                ${logoIMG}
            </div>
            <div class="footer-legal">
                <a href="terms.html">Terms</a>
                <a href="privacy.html">Privacy</a>
                <a href="cookies.html">Cookies</a>
                <a href="responsible-gambling.html">Responsible Gambling</a>
            </div>
            <div class="footer-copyright">
                &copy; ${new Date().getFullYear()} Smarkets. All rights reserved. Licensed and regulated by the UK Gambling Commission and Malta Gaming Authority.
            </div>
        </div>
    `;

    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = footerHTML;
    }

    // ── Scroll Animations ───────────────────────
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // ── Stagger animation observer ──────────────
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '';
                staggerObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stagger-in').forEach(el => {
        staggerObserver.observe(el);
    });

})();
