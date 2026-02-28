/**
 * Smarkets — Canonical Company Data
 * ──────────────────────────────────
 * Single source of truth for numbers, dates, and facts used across the site.
 * Update this file when metrics change; every page pulls from here.
 *
 * Usage: <script src="/company-data.js"></script> (before components.js)
 * Then reference window.SM.founded, window.SM.headcount, etc.
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
    tradingMargin:      '5%',      // vs industry avg ~12.5%

    // ── Fundraising ──────────────────────────────
    totalEquity:        '$35M',
    investors: [
        'Susquehanna Growth Equity',
        'Passion Capital',
        'DTCP',
        'Bolt Ventures',
        'Eberg Capital'
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
