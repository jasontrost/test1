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

    // ── Smarkets Logo ───────────────────────────
    const logoIMG = `<img src="smarkets-white-wordmark-no-padding.svg" alt="Smarkets" class="nav-logo">`;

    // ── Navigation ──────────────────────────────
    const navHTML = `
        <a href="index.html" class="nav-brand">
            ${logoIMG}
        </a>
        <ul class="nav-links">
            <li><a href="about.html" class="${isActive('about.html')}">About</a></li>
            <li><a href="team.html" class="${isActive('team.html')}">Team</a></li>
            <li><a href="careers.html" class="${isActive('careers.html')}">Careers</a></li>
            <li><a href="partnerships.html" class="${isActive('partnerships.html')}">Partnerships</a></li>
            <li><a href="newsroom.html" class="${isActive('newsroom.html')}">Newsroom</a></li>
            <li><a href="investors.html" class="${isActive('investors.html')}">Investors</a></li>
        </ul>
        <button class="mobile-menu-toggle" aria-label="Toggle menu">&#9776;</button>
    `;

    const mobileNavHTML = `
        <div class="mobile-nav" id="mobile-nav">
            <a href="about.html" class="${isActive('about.html')}">About</a>
            <a href="team.html" class="${isActive('team.html')}">Team</a>
            <a href="careers.html" class="${isActive('careers.html')}">Careers</a>
            <a href="partnerships.html" class="${isActive('partnerships.html')}">Partnerships</a>
            <a href="newsroom.html" class="${isActive('newsroom.html')}">Newsroom</a>
            <a href="investors.html" class="${isActive('investors.html')}">Investors</a>
        </div>
    `;

    const nav = document.querySelector('nav');
    if (nav) {
        nav.innerHTML = navHTML;
        nav.insertAdjacentHTML('afterend', mobileNavHTML);

        // Mobile menu toggle
        const toggle = nav.querySelector('.mobile-menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        if (toggle && mobileNav) {
            toggle.addEventListener('click', () => {
                mobileNav.classList.toggle('open');
                toggle.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
            });
        }
    }

    // ── Footer ──────────────────────────────────
    const footerHTML = `
        <div class="footer-content">
            <div class="footer-col">
                <h4>Product</h4>
                <ul>
                    <li><a href="https://smarkets.com">Exchange</a></li>
                    <li><a href="https://sbk.com">SBK Sportsbook</a></li>
                    <li><a href="https://docs.smarkets.com">API</a></li>
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
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Responsible Gambling</a></li>
                    <li><a href="#">Cookie Policy</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Connect</h4>
                <div class="social-links">
                    <a href="https://twitter.com/smarkets" title="X / Twitter">𝕏</a>
                    <a href="https://linkedin.com/company/smarkets" title="LinkedIn">in</a>
                    <a href="https://instagram.com/smarkets" title="Instagram">IG</a>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-tertiary);">press@smarkets.com</p>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="footer-brand">
                ${logoIMG}
            </div>
            <div class="footer-legal">
                <a href="#">Terms</a>
                <a href="#">Privacy</a>
                <a href="#">Cookies</a>
                <a href="#">Responsible Gambling</a>
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

    // ── Prevent # links from scrolling ──────────
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => e.preventDefault());
    });

})();
