/**
 * Smarkets — Canonical Company Data
 * ──────────────────────────────────
 * Single source of truth for numbers, dates, and facts used across the site.
 * Update this file when metrics change; every page pulls from here.
 *
 * HOW IT WORKS
 * 1. This file defines window.SM with all canonical values.
 * 2. On DOMContentLoaded it finds every element with a data-sm="key"
 *    attribute and sets its textContent to window.SM[key].
 * 3. HTML still contains the value as fallback text (for SEO / no-JS),
 *    but JS overwrites it at runtime so you only need to update THIS file.
 *
 * Usage: <script src="/company-data.js" defer></script>
 *
 * Last reviewed: February 2026
 */

window.SM = {

    // ── Company basics ───────────────────────────
    founded:            2008,
    hqCity:             'London',
    hqDetail:           'St. Katharine Docks, next to Tower Bridge',
    headcount:          '100+',
    engineeringPct:     '45%',
    engineeringCount:   '45+',
    nationalities:      '27',
    languages:          '20+',

    // ── Key metrics (as of FY 2024) ──────────────
    lifetimeVolume:     '$60B',
    revenue2024:        '$31.4M',
    ebitda2024:         '$10.2M',
    grossMargin:        '79%',
    sbkGrowthRate:      '82%',

    // ── Fundraising ──────────────────────────────
    totalEquity:        '$35M',

    // ── Licensing ────────────────────────────────
    jurisdictions:      5,

    // ── Partnerships ─────────────────────────────
    sailgpDeal:         '3-year',
    sailgpStart:        'February 2026',
    afcbSeason:         '2025/26',
};

/* ── DOM hydration ────────────────────────────────
   Find every [data-sm] element and replace its text
   with the matching window.SM value.
   ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
    var els = document.querySelectorAll('[data-sm]');
    for (var i = 0; i < els.length; i++) {
        var key = els[i].getAttribute('data-sm');
        if (window.SM.hasOwnProperty(key)) {
            els[i].textContent = String(window.SM[key]);
        }
    }
});
