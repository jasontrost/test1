/* ============================================
   Smarkets Company Pages — Shared Components
   Single source of truth for nav + footer
   ============================================ */

(function () {
    'use strict';

    // Determine current page from URL
    const path = window.location.pathname.replace(/\/+$/, '');
    const currentPage = path.substring(path.lastIndexOf('/') + 1) || 'index';

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

    // Ensure main element has skip link target (set in HTML, reinforced here)
    const mainEl = document.querySelector('main');
    if (mainEl) {
        if (!mainEl.id) mainEl.id = 'main-content';
        mainEl.setAttribute('tabindex', '-1');
    }

    // ── Smarkets Logo ───────────────────────────
    const logoIMG = `<img src="/smarkets-white-wordmark-no-padding.svg" alt="Smarkets" class="nav-logo">`;

    // ── Navigation ──────────────────────────────
    const navHTML = `
        <a href="/" class="nav-brand">
            ${logoIMG}
        </a>
        <ul class="nav-links">
            <li><a href="/about" class="${isActive('about')}"${ariaCurrent('about')}>About</a></li>
            <li><a href="/team" class="${isActive('team')}"${ariaCurrent('team')}>Team</a></li>
            <li><a href="/careers" class="${isActive('careers')}"${ariaCurrent('careers')}>Careers</a></li>
            <li><a href="/partnerships" class="${isActive('partnerships')}"${ariaCurrent('partnerships')}>Partnerships</a></li>
            <li><a href="/newsroom" class="${isActive('newsroom')}"${ariaCurrent('newsroom')}>Newsroom</a></li>
            <li><a href="/investors" class="${isActive('investors')}"${ariaCurrent('investors')}>Investors</a></li>
        </ul>
        <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-nav">&#9776;</button>
    `;

    const mobileNavHTML = `
        <div class="mobile-nav" id="mobile-nav" role="navigation" aria-label="Mobile navigation">
            <a href="/about" class="${isActive('about')}"${ariaCurrent('about')}>About</a>
            <a href="/team" class="${isActive('team')}"${ariaCurrent('team')}>Team</a>
            <a href="/careers" class="${isActive('careers')}"${ariaCurrent('careers')}>Careers</a>
            <a href="/partnerships" class="${isActive('partnerships')}"${ariaCurrent('partnerships')}>Partnerships</a>
            <a href="/newsroom" class="${isActive('newsroom')}"${ariaCurrent('newsroom')}>Newsroom</a>
            <a href="/investors" class="${isActive('investors')}"${ariaCurrent('investors')}>Investors</a>
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

            if (e.key === 'Escape') {
                closeMobileNav();
                return;
            }

            if (e.key === 'Tab') {
                const focusable = [toggle, ...getFocusableElements(mobileNav)];
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

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

            mobileNav.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', closeMobileNav);
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
                    <li><a href="https://betsbk.com" rel="noopener noreferrer">SBK Sportsbook</a></li>
                    <li><a href="https://docs.smarkets.com" rel="noopener noreferrer">API</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Company</h4>
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/team">Team</a></li>
                    <li><a href="/careers">Careers</a></li>
                    <li><a href="/newsroom">Newsroom</a></li>
                    <li><a href="/partnerships">Partnerships</a></li>
                    <li><a href="/investors">Investors</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Legal</h4>
                <ul>
                    <li><a href="https://help.smarkets.com/hc/en-gb/articles/213469085-Smarkets-Terms-and-Conditions" rel="noopener noreferrer">Terms of Service</a></li>
                    <li><a href="https://help.smarkets.com/hc/en-gb/articles/212816949-Privacy-Policy" rel="noopener noreferrer">Privacy Policy</a></li>
                    <li><a href="https://help.smarkets.com/hc/en-gb/categories/360001480391-Responsible-Gambling" rel="noopener noreferrer">Responsible Gambling</a></li>
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
                <p class="footer-copyright">&copy; ${new Date().getFullYear()} Smarkets. All rights reserved.</p>
            </div>
        </div>
    `;

    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = footerHTML;
    }

    // ── Scroll Animations ───────────────────────
    if ('IntersectionObserver' in window) {
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
    } else {
        // Fallback: show all elements immediately
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }

})();
