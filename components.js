/* ============================================
   Smarkets Company Pages — Shared Components
   Single source of truth for nav + footer
   ============================================ */

(function () {
    'use strict';

    // ── Base path detection ───────────────────
    // Detect relative prefix from how components.js is referenced.
    // Root pages use "components.js" → prefix "", subdir pages use "../components.js" → prefix "../"
    const scriptEl = document.querySelector('script[src$="components.js"]');
    const srcAttr = scriptEl ? scriptEl.getAttribute('src') : '';
    const prefix = srcAttr.replace(/components\.js$/, '');
    // Helper: make internal paths relative (strips leading "/" and prepends prefix)
    function bp(path) {
        const rel = prefix + path.replace(/^\//, '');
        return rel || './';
    }

    // Determine current page from URL
    // Handles: /about, /about/, /about/index.html, /about.html
    const cleanPath = window.location.pathname
        .replace(/\/+$/, '')
        .replace(/\/index(?:\.html?)?$/, '')
        .replace(/\.html?$/, '');
    const currentPage = cleanPath.substring(cleanPath.lastIndexOf('/') + 1) || 'index';

    function isActive(page) {
        return currentPage === page ? 'active' : '';
    }

    function ariaCurrent(page) {
        return currentPage === page ? ' aria-current="page"' : '';
    }

    // Ensure main element has skip link target (set in HTML, reinforced here)
    const mainEl = document.querySelector('main');
    if (mainEl) {
        if (!mainEl.id) mainEl.id = 'main-content';
        mainEl.setAttribute('tabindex', '-1');
    }

    // ── Smarkets Logo ───────────────────────────
    const logoIMG = `<img src="${bp('/Smarkets_logo.png')}" alt="Smarkets" class="nav-logo">`;

    // ── Navigation ──────────────────────────────
    const navHTML = `
        <a href="${bp('/')}" class="nav-brand">
            ${logoIMG}
        </a>
        <ul class="nav-links">
            <li><a href="${bp('/about')}" class="${isActive('about')}"${ariaCurrent('about')}>About</a></li>
            <li><a href="${bp('/team')}" class="${isActive('team')}"${ariaCurrent('team')}>Team</a></li>
            <li><a href="${bp('/careers')}" class="${isActive('careers')}"${ariaCurrent('careers')}>Careers</a></li>
            <li><a href="${bp('/office')}" class="${isActive('office')}"${ariaCurrent('office')}>Office</a></li>
            <li><a href="${bp('/partnerships')}" class="${isActive('partnerships')}"${ariaCurrent('partnerships')}>Partnerships</a></li>
            <li><a href="${bp('/newsroom')}" class="${isActive('newsroom')}"${ariaCurrent('newsroom')}>Newsroom</a></li>
            <li><a href="${bp('/investors')}" class="${isActive('investors')}"${ariaCurrent('investors')}>Investors</a></li>
        </ul>
        <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-nav">&#9776;</button>
    `;

    const mobileNavHTML = `
        <div class="mobile-nav" id="mobile-nav" role="navigation" aria-label="Mobile navigation">
            <a href="${bp('/about')}" class="${isActive('about')}"${ariaCurrent('about')}>About</a>
            <a href="${bp('/team')}" class="${isActive('team')}"${ariaCurrent('team')}>Team</a>
            <a href="${bp('/careers')}" class="${isActive('careers')}"${ariaCurrent('careers')}>Careers</a>
            <a href="${bp('/office')}" class="${isActive('office')}"${ariaCurrent('office')}>Office</a>
            <a href="${bp('/partnerships')}" class="${isActive('partnerships')}"${ariaCurrent('partnerships')}>Partnerships</a>
            <a href="${bp('/newsroom')}" class="${isActive('newsroom')}"${ariaCurrent('newsroom')}>Newsroom</a>
            <a href="${bp('/investors')}" class="${isActive('investors')}"${ariaCurrent('investors')}>Investors</a>
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
                if (focusable.length === 0) return;
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
        <div class="footer-top">
            <a href="${bp('/')}" class="footer-brand" aria-label="Smarkets home">
                <img src="${bp('/Smarkets_logo.png')}" alt="Smarkets" class="footer-logo">
            </a>
            <a href="${bp('/careers')}#open-roles" class="footer-cta">View open roles &rarr;</a>
        </div>
        <div class="footer-content">
            <div class="footer-col">
                <h4>Products</h4>
                <ul>
                    <li><a href="https://smarkets.com" rel="noopener noreferrer">Exchange</a></li>
                    <li><a href="https://betsbk.com" rel="noopener noreferrer">SBK Sportsbook</a></li>
                    <li><a href="https://hanson.as" rel="noopener noreferrer">Hanson</a></li>
                    <li><a href="https://docs.smarkets.com" rel="noopener noreferrer">API</a></li>
                </ul>
                <div class="footer-app-links">
                    <div class="footer-app-group">
                        <span class="footer-app-label">Smarkets</span>
                        <a href="https://apps.apple.com/gb/app/smarkets-betting-exchange/id1155643579" rel="noopener noreferrer" aria-label="Smarkets on the App Store">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.smarkets" rel="noopener noreferrer" aria-label="Smarkets on Google Play">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.808 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z"/></svg>
                        </a>
                    </div>
                    <div class="footer-app-group">
                        <span class="footer-app-label">SBK</span>
                        <a href="https://apps.apple.com/gb/app/sbk-sports-betting-online/id1371054563" rel="noopener noreferrer" aria-label="SBK on the App Store">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.smarkets.sbk" rel="noopener noreferrer" aria-label="SBK on Google Play">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.808 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-col">
                <h4>Company</h4>
                <ul>
                    <li><a href="${bp('/about')}">About</a></li>
                    <li><a href="${bp('/team')}">Team</a></li>
                    <li><a href="${bp('/office')}">Office</a></li>
                    <li><a href="${bp('/careers')}">Careers</a></li>
                    <li><a href="${bp('/newsroom')}">Newsroom</a></li>
                    <li><a href="${bp('/partnerships')}">Partnerships</a></li>
                    <li><a href="${bp('/investors')}">Investors</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Legal</h4>
                <ul>
                    <li><a href="https://help.smarkets.com/hc/en-gb/articles/213469085-Smarkets-Terms-and-Conditions" rel="noopener noreferrer">Terms of Service</a></li>
                    <li><a href="https://help.smarkets.com/hc/en-gb/articles/212816949-Privacy-Policy" rel="noopener noreferrer">Privacy Policy</a></li>
                    <li><a href="https://help.smarkets.com/hc/en-gb/categories/360001480391-Responsible-Gambling" rel="noopener noreferrer">Responsible Gambling</a></li>
                    <li><a href="https://smarkets.com/about/licensing/" rel="noopener noreferrer">Licensing</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Connect</h4>
                <div class="social-links">
                    <a href="https://x.com/smarkets" rel="noopener noreferrer" aria-label="Follow Smarkets on X (formerly Twitter)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        <span class="sr-only">X / Twitter</span>
                    </a>
                    <a href="https://linkedin.com/company/smarkets" rel="noopener noreferrer" aria-label="Follow Smarkets on LinkedIn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        <span class="sr-only">LinkedIn</span>
                    </a>
                    <a href="https://instagram.com/smarkets" rel="noopener noreferrer" aria-label="Follow Smarkets on Instagram">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>
                        <span class="sr-only">Instagram</span>
                    </a>
                </div>
                <p class="footer-contact"><strong>Press</strong> <a href="mailto:press@smarkets.com">press@smarkets.com</a></p>
                <p class="footer-contact"><strong>General</strong> <a href="mailto:support@smarkets.com">support@smarkets.com</a></p>
                <p class="footer-address">Smarkets Limited &middot; Commodity Quay, St Katharine Docks, London E1W 1AZ</p>
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

    // Reveal page now that nav + footer are injected (prevents FOUC)
    document.body.classList.remove('no-js');
    document.body.classList.add('ready');

})();
