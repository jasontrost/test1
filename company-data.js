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
    offices:            ['London, UK', 'Malta'],
    headcount:          '100+',
    engineeringPct:     '65%',
    founder:            'Jason Trost',

    // ── Products & brands ────────────────────────
    exchangeName:       'Smarkets',
    sportsbookName:     'SBK',
    sbkLaunchYear:      2020,

    // ── Key metrics (as of FY 2024) ──────────────
    lifetimeVolume:     '$47B',
    revenue2024:        '$31.4M',
    ebitda2024:         '$10.2M',
    grossMargin:        '79%',
    sbkGrowthRate:      '82%',
    peakMAU:            '41k',
    lifetimeCustomers:  '1M+',     // lifetime registered, vs 41k peak monthly active
    tradingMargin:      '5%',      // vs industry avg ~12.5%

    // ── Fundraising ──────────────────────────────
    totalEquity:        '$35M',
    investors: [
        'Susquehanna Growth Equity',
        'Passion Capital',
        'DTCP',
        'Bolt Ventures',
        'Eberg Capital',
        'Game Changers Ventures'
    ],

    // ── Licensing ────────────────────────────────
    jurisdictions:      5,
    licences: [
        'UK Gambling Commission',
        'Malta Gaming Authority',
        'USA (Indiana)',
        'Ireland',
        'Sweden'
    ],

    // ── Partnerships ─────────────────────────────
    sailgpDeal:         '3-year',
    sailgpStart:        'February 2026',
    afcbSeason:         '2025/26',

    // ── Editorial conventions ────────────────────
    // Dates:    "Month YYYY" for recent, "YYYY" for older
    // Currency: "$" prefix, no decimals unless < $100M
    // Growth:   "X% year-on-year" or "X% YoY"
    // Hedging:  "as of [date]" on any metric that ages
    dataAsOf:           'February 2026',
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
