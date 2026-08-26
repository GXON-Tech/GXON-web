/**
 * GXON AGRO — Quote Modal Module
 * Reusable Request Quote popup with two options:
 *   1. Submit Request (web form)
 *   2. Send WhatsApp (auto-fill message + jump to WhatsApp)
 *
 * Usage:
 *   <script src="../_shared/js/quote-modal.js" defer></script>
 *   <button data-quote-trigger
 *           data-product-name="Mobile Batch Grain Dryer"
 *           data-product-model="G-MR-5"
 *           data-product-capacity="5 T/batch, 10-20 TPD">
 *     Request Quote
 *   </button>
 *
 * Buttons without data-product-* attributes open a general inquiry.
 */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '8618135726591'; // Paul Sun — +86 181 3572 6591

  /* ---------- Country list (grouped) ---------- */
  var COUNTRY_GROUPS = [
    { label: 'Southeast Asia', items: [
      ['BN', '🇧🇳 Brunei'], ['KH', '🇰🇭 Cambodia'], ['ID', '🇮🇩 Indonesia'], ['LA', '🇱🇦 Laos'],
      ['MY', '🇲🇾 Malaysia'], ['MM', '🇲🇲 Myanmar'], ['PH', '🇵🇭 Philippines'], ['SG', '🇸🇬 Singapore'],
      ['TH', '🇹🇭 Thailand'], ['TL', '🇹🇱 Timor-Leste'], ['VN', '🇻🇳 Vietnam']
    ]},
    { label: 'East Asia', items: [
      ['CN', '🇨🇳 China'], ['JP', '🇯🇵 Japan'], ['KR', '🇰🇷 South Korea'], ['MN', '🇲🇳 Mongolia'], ['TW', '🇹🇼 Taiwan']
    ]},
    { label: 'South Asia', items: [
      ['AF', '🇦🇫 Afghanistan'], ['BD', '🇧🇩 Bangladesh'], ['BT', '🇧🇹 Bhutan'], ['IN', '🇮🇳 India'],
      ['MV', '🇲🇻 Maldives'], ['NP', '🇳🇵 Nepal'], ['PK', '🇵🇰 Pakistan'], ['LK', '🇱🇰 Sri Lanka']
    ]},
    { label: 'Central Asia', items: [
      ['KZ', '🇰🇿 Kazakhstan'], ['KG', '🇰🇬 Kyrgyzstan'], ['TJ', '🇹🇯 Tajikistan'],
      ['TM', '🇹🇲 Turkmenistan'], ['UZ', '🇺🇿 Uzbekistan']
    ]},
    { label: 'Middle East', items: [
      ['BH', '🇧🇭 Bahrain'], ['IR', '🇮🇷 Iran'], ['IQ', '🇮🇶 Iraq'], ['IL', '🇮🇱 Israel'],
      ['JO', '🇯🇴 Jordan'], ['KW', '🇰🇼 Kuwait'], ['LB', '🇱🇧 Lebanon'], ['OM', '🇴🇲 Oman'],
      ['PS', '🇵🇸 Palestine'], ['QA', '🇶🇦 Qatar'], ['SA', '🇸🇦 Saudi Arabia'], ['SY', '🇸🇾 Syria'],
      ['TR', '🇹🇷 Turkey'], ['AE', '🇦🇪 United Arab Emirates'], ['YE', '🇾🇪 Yemen']
    ]},
    { label: 'Africa', items: [
      ['DZ', '🇩🇿 Algeria'], ['AO', '🇦🇴 Angola'], ['BJ', '🇧🇯 Benin'], ['BW', '🇧🇼 Botswana'],
      ['BF', '🇧🇫 Burkina Faso'], ['BI', '🇧🇮 Burundi'], ['CM', '🇨🇲 Cameroon'], ['CV', '🇨🇻 Cape Verde'],
      ['TD', '🇹🇩 Chad'], ['KM', '🇰🇲 Comoros'], ['CG', '🇨🇬 Congo'], ['CI', "🇨🇮 Côte d'Ivoire"],
      ['EG', '🇪🇬 Egypt'], ['ET', '🇪🇹 Ethiopia'], ['GA', '🇬🇦 Gabon'], ['GM', '🇬🇲 Gambia'],
      ['GH', '🇬🇭 Ghana'], ['GN', '🇬🇳 Guinea'], ['KE', '🇰🇪 Kenya'], ['LS', '🇱🇸 Lesotho'],
      ['LR', '🇱🇷 Liberia'], ['LY', '🇱🇾 Libya'], ['MG', '🇲🇬 Madagascar'], ['MW', '🇲🇼 Malawi'],
      ['ML', '🇲🇱 Mali'], ['MR', '🇲🇷 Mauritania'], ['MU', '🇲🇺 Mauritius'], ['MA', '🇲🇦 Morocco'],
      ['MZ', '🇲🇿 Mozambique'], ['NA', '🇳🇦 Namibia'], ['NE', '🇳🇪 Niger'], ['NG', '🇳🇬 Nigeria'],
      ['RW', '🇷🇼 Rwanda'], ['SN', '🇸🇳 Senegal'], ['SC', '🇸🇨 Seychelles'], ['SL', '🇸🇱 Sierra Leone'],
      ['SO', '🇸🇴 Somalia'], ['ZA', '🇿🇦 South Africa'], ['SS', '🇸🇸 South Sudan'], ['SD', '🇸🇩 Sudan'],
      ['SZ', '🇸🇿 Eswatini'], ['TZ', '🇹🇿 Tanzania'], ['TG', '🇹🇬 Togo'], ['TN', '🇹🇳 Tunisia'],
      ['UG', '🇺🇬 Uganda'], ['ZM', '🇿🇲 Zambia'], ['ZW', '🇿🇼 Zimbabwe']
    ]},
    { label: 'Europe', items: [
      ['AL', '🇦🇱 Albania'], ['AD', '🇦🇩 Andorra'], ['AT', '🇦🇹 Austria'], ['BY', '🇧🇾 Belarus'],
      ['BE', '🇧🇪 Belgium'], ['BA', '🇧🇦 Bosnia and Herzegovina'], ['BG', '🇧🇬 Bulgaria'], ['HR', '🇭🇷 Croatia'],
      ['CY', '🇨🇾 Cyprus'], ['CZ', '🇨🇿 Czech Republic'], ['DK', '🇩🇰 Denmark'], ['EE', '🇪🇪 Estonia'],
      ['FI', '🇫🇮 Finland'], ['FR', '🇫🇷 France'], ['DE', '🇩🇪 Germany'], ['GR', '🇬🇷 Greece'],
      ['HU', '🇭🇺 Hungary'], ['IS', '🇮🇸 Iceland'], ['IE', '🇮🇪 Ireland'], ['IT', '🇮🇹 Italy'],
      ['LV', '🇱🇻 Latvia'], ['LI', '🇱🇮 Liechtenstein'], ['LT', '🇱🇹 Lithuania'], ['LU', '🇱🇺 Luxembourg'],
      ['MT', '🇲🇹 Malta'], ['MD', '🇲🇩 Moldova'], ['MC', '🇲🇨 Monaco'], ['ME', '🇲🇪 Montenegro'],
      ['NL', '🇳🇱 Netherlands'], ['MK', '🇲🇰 North Macedonia'], ['NO', '🇳🇴 Norway'], ['PL', '🇵🇱 Poland'],
      ['PT', '🇵🇹 Portugal'], ['RO', '🇷🇴 Romania'], ['RU', '🇷🇺 Russia'], ['SM', '🇸🇲 San Marino'],
      ['RS', '🇷🇸 Serbia'], ['SK', '🇸🇰 Slovakia'], ['SI', '🇸🇮 Slovenia'], ['ES', '🇪🇸 Spain'],
      ['SE', '🇸🇪 Sweden'], ['CH', '🇨🇭 Switzerland'], ['UA', '🇺🇦 Ukraine'], ['GB', '🇬🇧 United Kingdom'],
      ['VA', '🇻🇦 Vatican City']
    ]},
    { label: 'North America', items: [
      ['CA', '🇨🇦 Canada'], ['MX', '🇲🇽 Mexico'], ['US', '🇺🇸 United States']
    ]},
    { label: 'Central America & Caribbean', items: [
      ['BZ', '🇧🇿 Belize'], ['CR', '🇨🇷 Costa Rica'], ['CU', '🇨🇺 Cuba'], ['DO', '🇩🇴 Dominican Republic'],
      ['SV', '🇸🇻 El Salvador'], ['GT', '🇬🇹 Guatemala'], ['HT', '🇭🇹 Haiti'], ['HN', '🇭🇳 Honduras'],
      ['JM', '🇯🇲 Jamaica'], ['NI', '🇳🇮 Nicaragua'], ['PA', '🇵🇦 Panama']
    ]},
    { label: 'South America', items: [
      ['AR', '🇦🇷 Argentina'], ['BO', '🇧🇴 Bolivia'], ['BR', '🇧🇷 Brazil'], ['CL', '🇨🇱 Chile'],
      ['CO', '🇨🇴 Colombia'], ['EC', '🇪🇨 Ecuador'], ['GY', '🇬🇾 Guyana'], ['PY', '🇵🇾 Paraguay'],
      ['PE', '🇵🇪 Peru'], ['SR', '🇸🇷 Suriname'], ['UY', '🇺🇾 Uruguay'], ['VE', '🇻🇪 Venezuela']
    ]},
    { label: 'Oceania', items: [
      ['AU', '🇦🇺 Australia'], ['FJ', '🇫🇯 Fiji'], ['KI', '🇰🇮 Kiribati'], ['MH', '🇲🇭 Marshall Islands'],
      ['FM', '🇫🇲 Micronesia'], ['NR', '🇳🇷 Nauru'], ['NZ', '🇳🇿 New Zealand'], ['PW', '🇵🇼 Palau'],
      ['PG', '🇵🇬 Papua New Guinea'], ['WS', '🇼🇸 Samoa'], ['SB', '🇸🇧 Solomon Islands'],
      ['TO', '🇹🇴 Tonga'], ['TV', '🇹🇻 Tuvalu'], ['VU', '🇻🇺 Vanuatu']
    ]}
  ];

  /* ---------- CSS ---------- */
  var CSS = '' +
    '.qm-overlay{position:fixed;inset:0;background:rgba(26,26,26,0.55);backdrop-filter:blur(3px);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding:40px 16px;overflow-y:auto;opacity:0;visibility:hidden;transition:opacity .25s,visibility .25s}' +
    '.qm-overlay.qm-open{opacity:1;visibility:visible}' +
    '.qm-modal{background:#fff;border-radius:var(--r-lg);box-shadow:var(--sh-xl);width:100%;max-width:480px;max-height:calc(100vh - 80px);overflow:hidden;display:flex;flex-direction:column;transform:translateY(20px);transition:transform .25s}' +
    '.qm-overlay.qm-open .qm-modal{transform:translateY(0)}' +
    '.qm-header{background:#fff;border-bottom:1px solid var(--c-n6);padding:20px 24px;display:flex;align-items:center;justify-content:space-between;z-index:2;flex-shrink:0}' +
    '.qm-header h3{font-size:20px;font-weight:700;color:var(--c-dark);margin:0}' +
    '.qm-close{width:32px;height:32px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--c-n3);cursor:pointer;transition:all .15s;border:none;background:none}' +
    '.qm-close:hover{background:var(--c-n7);color:var(--c-n1)}' +
    '.qm-body{padding:24px;overflow-y:auto;flex:1}' +
    '.qm-product-info{background:var(--c-primary-bg);border:1px solid var(--c-silver);border-radius:var(--r-md);padding:14px 16px;margin-bottom:22px}' +
    '.qm-product-info .qm-pi-label{font-size:11px;font-weight:700;color:var(--c-n3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px}' +
    '.qm-product-info .qm-pi-row{display:flex;gap:8px;font-size:14px;color:var(--c-n1);margin:3px 0;align-items:baseline}' +
    '.qm-product-info .qm-pi-row .qm-pi-k{font-weight:700;min-width:78px;color:var(--c-n2)}' +
    '.qm-field{margin-bottom:18px}' +
    '.qm-field>label{display:block;font-size:13px;font-weight:700;color:var(--c-dark);margin-bottom:6px}' +
    '.qm-input{width:100%;border:1px solid var(--c-n6);border-radius:var(--r-sm);padding:11px 14px;font-size:15px;font-family:inherit;color:var(--c-n1);background:#fff;transition:border-color .15s;box-sizing:border-box}' +
    '.qm-input:focus{outline:none;border-color:var(--c-primary);box-shadow:0 0 0 3px rgba(8,79,50,0.12)}' +
    '.qm-textarea{resize:vertical;min-height:72px}' +
    '.qm-req{color:var(--c-orange-dark)}' +
    '.qm-error{border-color:var(--c-error) !important;box-shadow:0 0 0 3px rgba(192,57,43,0.12) !important}' +
    '.qm-errmsg{color:var(--c-error);font-size:12px;margin-top:4px;display:none}' +
    '.qm-errmsg.qm-show{display:block}' +
    /* country dropdown */
    '.qm-country-dd{position:relative}' +
    '.qm-dd-trigger{width:100%;border:1px solid var(--c-n6);border-radius:var(--r-sm);padding:11px 14px;font-size:15px;font-family:inherit;color:var(--c-n1);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:border-color .15s;box-sizing:border-box}' +
    '.qm-dd-trigger.qm-active{border-color:var(--c-primary);box-shadow:0 0 0 3px rgba(8,79,50,0.12)}' +
    '.qm-dd-trigger.qm-placeholder{color:var(--c-n4)}' +
    '.qm-dd-caret{font-size:12px;color:var(--c-n3);transition:transform .2s}' +
    '.qm-dd-trigger.qm-active .qm-dd-caret{transform:rotate(180deg)}' +
    '.qm-dd-menu{position:absolute;top:calc(100% + 4px);left:0;right:0;background:#fff;border:1px solid var(--c-n6);border-radius:var(--r-md);box-shadow:var(--sh-lg);z-index:10;max-height:260px;overflow:hidden;display:none;flex-direction:column}' +
    '.qm-dd-menu.qm-open{display:flex}' +
    '.qm-dd-search{padding:8px;border-bottom:1px solid var(--c-n7)}' +
    '.qm-dd-search input{width:100%;border:1px solid var(--c-n6);border-radius:var(--r-sm);padding:8px 10px;font-size:13px;font-family:inherit;box-sizing:border-box}' +
    '.qm-dd-options{overflow-y:auto;flex:1}' +
    '.qm-dd-group{padding:7px 14px 3px;font-size:10px;font-weight:700;color:var(--c-n3);text-transform:uppercase;letter-spacing:0.05em;background:var(--c-silver-bg);border-bottom:1px solid var(--c-n7)}' +
    '.qm-dd-opt{padding:10px 14px;font-size:14px;color:var(--c-n2);cursor:pointer;transition:background .12s;border-bottom:1px solid var(--c-n7)}' +
    '.qm-dd-opt:last-child{border-bottom:none}' +
    '.qm-dd-opt:hover{background:var(--c-primary-bg);color:var(--c-primary)}' +
    '.qm-dd-opt.qm-selected{background:var(--c-primary-bg);color:var(--c-primary);font-weight:700}' +
    /* divider */
    '.qm-divider{height:1px;background:var(--c-n6);margin:22px 0 18px}' +
    '.qm-divider-label{text-align:center;font-size:13px;font-weight:700;color:var(--c-n3);margin-bottom:16px}' +
    /* actions */
    '.qm-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px}' +
    '.qm-action{border:2px solid;border-radius:var(--r-md);padding:16px 14px;cursor:pointer;transition:all .2s;text-align:center;background:none;font-family:inherit}' +
    '.qm-action-submit{border-color:var(--c-primary);background:var(--c-primary);color:#fff}' +
    '.qm-action-submit:hover{background:var(--c-primary-dark);border-color:var(--c-primary-dark);transform:translateY(-2px);box-shadow:0 4px 16px rgba(8,79,50,0.3)}' +
    '.qm-action-wa{border-color:#25D366;background:#fff;color:var(--c-n1)}' +
    '.qm-action-wa:hover{background:#25D366;color:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(37,211,102,0.3)}' +
    '.qm-action .qm-act-icon{font-size:24px;display:block;margin-bottom:6px}' +
    '.qm-action .qm-act-title{font-size:15px;font-weight:700;display:block;margin-bottom:3px}' +
    '.qm-action .qm-act-desc{font-size:12px;opacity:0.85;display:block;line-height:1.4}' +
    /* success */
    '.qm-success{text-align:center;padding:36px 24px}' +
    '.qm-success-icon{font-size:48px;margin-bottom:12px}' +
    '.qm-success h3{font-size:22px;color:var(--c-primary);margin-bottom:10px}' +
    '.qm-success p{font-size:15px;color:var(--c-n2);margin-bottom:24px;max-width:320px;margin-left:auto;margin-right:auto}' +
    '.qm-receipt{background:var(--c-silver-bg);border:1px solid var(--c-n7);border-radius:var(--r-md);padding:14px 16px;margin:0 auto 24px;max-width:360px;text-align:left}' +
    '.qm-receipt .qm-cr-row{display:flex;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px solid var(--c-n7);font-size:14px;line-height:1.4}' +
    '.qm-receipt .qm-cr-row:last-child{border-bottom:none}' +
    '.qm-receipt .qm-cr-k{font-weight:700;color:var(--c-n2);flex-shrink:0}' +
    '.qm-receipt .qm-cr-v{color:var(--c-n1);text-align:right;word-break:break-word}' +
    '.qm-success-actions{display:flex;gap:12px;justify-content:center;align-items:center}' +
    '.qm-success-btn{background:var(--c-primary);color:#fff;border:none;border-radius:var(--r-md);padding:12px 28px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .2s}' +
    '.qm-success-btn:hover{background:var(--c-primary-dark);transform:translateY(-2px)}' +
    '.qm-success-wa{width:48px;height:48px;border-radius:var(--r-md);background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;transition:all .2s;flex-shrink:0;text-decoration:none}' +
    '.qm-success-wa:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(37,211,102,0.4)}' +
    /* responsive */
    '@media(max-width:520px){' +
      '.qm-overlay{padding:0;align-items:flex-end}' +
      '.qm-modal{max-width:100%;border-radius:var(--r-lg) var(--r-lg) 0 0;max-height:100vh}' +
      '.qm-actions{grid-template-columns:1fr}' +
    '}';

  /* ---------- Build country options HTML ---------- */
  function buildCountryOptions() {
    var html = '';
    for (var i = 0; i < COUNTRY_GROUPS.length; i++) {
      var g = COUNTRY_GROUPS[i];
      html += '<div class="qm-dd-group">' + g.label + '</div>';
      for (var j = 0; j < g.items.length; j++) {
        var item = g.items[j];
        html += '<div class="qm-dd-opt" data-value="' + item[0] + '" data-label="' + item[1] + '">' + item[1] + '</div>';
      }
    }
    return html;
  }

  /* ---------- Build modal HTML ---------- */
  function buildModalHTML() {
    return '' +
      '<div class="qm-overlay" id="qmOverlay">' +
        '<div class="qm-modal" role="dialog" aria-modal="true" aria-labelledby="qmTitle">' +
          '<div class="qm-header">' +
            '<h3 id="qmTitle">Request a Quote</h3>' +
            '<button class="qm-close" id="qmClose" aria-label="Close">&times;</button>' +
          '</div>' +
          '<div class="qm-body" id="qmBody">' +
            '<div class="qm-product-info" id="qmProductInfo" style="display:none">' +
              '<div class="qm-pi-label">Inquiry About</div>' +
              '<div id="qmProductRows"></div>' +
            '</div>' +
            '<form id="qmForm" novalidate>' +
              '<div class="qm-field">' +
                '<label>Your Name <span class="qm-req">*</span></label>' +
                '<input type="text" class="qm-input" id="qmName" placeholder="Full name">' +
                '<div class="qm-errmsg" id="qmNameErr">Please enter your name</div>' +
              '</div>' +
              '<div class="qm-field">' +
                '<label>Country/Region <span class="qm-req">*</span></label>' +
                '<div class="qm-country-dd">' +
                  '<button type="button" class="qm-dd-trigger qm-placeholder" id="qmCountryTrigger">' +
                    '<span class="qm-dd-value">Select country/region</span>' +
                    '<span class="qm-dd-caret">&#9660;</span>' +
                  '</button>' +
                  '<div class="qm-dd-menu" id="qmCountryMenu">' +
                    '<div class="qm-dd-search"><input type="text" id="qmCountrySearch" placeholder="Search country..."></div>' +
                    '<div class="qm-dd-options" id="qmCountryOptions">' + buildCountryOptions() + '</div>' +
                  '</div>' +
                '</div>' +
                '<input type="hidden" id="qmCountryValue">' +
                '<div class="qm-errmsg" id="qmCountryErr">Please select your country</div>' +
              '</div>' +
              '<div class="qm-field">' +
                '<label>WhatsApp Number <span class="qm-req">*</span></label>' +
                '<input type="text" class="qm-input" id="qmWhatsapp" placeholder="+880 1XXX XXXXXX">' +
                '<div class="qm-errmsg" id="qmWaErr">Please enter a valid WhatsApp number</div>' +
              '</div>' +
              '<div class="qm-field">' +
                '<label>Message (Optional)</label>' +
                '<textarea class="qm-input qm-textarea" id="qmMessage" placeholder="Tell us about your project, timeline, or specific requirements..."></textarea>' +
              '</div>' +
              '<div class="qm-divider"></div>' +
              '<div class="qm-divider-label">Choose how to connect</div>' +
              '<div class="qm-actions">' +
                '<button type="button" class="qm-action qm-action-submit" id="qmSubmitBtn">' +
                  '<span class="qm-act-icon">&#128203;</span>' +
                  '<span class="qm-act-title">Submit Request</span>' +
                  '<span class="qm-act-desc">We\'ll contact you within 24h</span>' +
                '</button>' +
                '<button type="button" class="qm-action qm-action-wa" id="qmWaBtn">' +
                  '<span class="qm-act-icon">&#128172;</span>' +
                  '<span class="qm-act-title">Send WhatsApp</span>' +
                  '<span class="qm-act-desc">Open WhatsApp with pre-filled message</span>' +
                '</button>' +
              '</div>' +
            '</form>' +
            '<div class="qm-success" id="qmSuccess" style="display:none">' +
              '<div class="qm-success-icon">&#9989;</div>' +
              '<h3 id="qmSuccessTitle">Request Sent!</h3>' +
              '<p>Thank you, <span id="qmSuccessName"></span>. Our team will contact you within 24 hours.</p>' +
              '<div class="qm-receipt" id="qmReceipt" style="display:none">' +
                '<div id="qmReceiptRows"></div>' +
              '</div>' +
              '<div class="qm-success-actions">' +
                '<button class="qm-success-btn" id="qmSuccessClose">Done</button>' +
                '<a class="qm-success-wa" id="qmSuccessWa" target="_blank" rel="noopener" title="Send via WhatsApp" href="#">' +
                  '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M.05 24l1.69-6.16a11.87 11.87 0 0 1-1.59-5.95C.15 5.32 5.5 0 12.06 0a11.82 11.82 0 0 1 8.41 3.49 11.76 11.76 0 0 1 3.48 8.41c0 6.56-5.35 11.89-11.91 11.89a11.96 11.96 0 0 1-5.7-1.45L.05 24zM6.6 20.13c1.68.99 3.28 1.59 5.45 1.59 5.45 0 9.89-4.43 9.89-9.87a9.82 9.82 0 0 0-2.89-6.99 9.82 9.82 0 0 0-6.98-2.9c-5.46 0-9.9 4.43-9.9 9.87 0 2.28.67 3.99 1.79 5.78l-.99 3.62 3.63-.95z"/></svg>' +
                '</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ---------- State ---------- */
  var state = {
    overlay: null,
    countryTrigger: null,
    countryMenu: null,
    countrySearch: null,
    countryOptions: null,
    countryValue: null,
    selectedCountryLabel: '',
    productInfo: null
  };

  /* ---------- Inject CSS ---------- */
  function injectCSS() {
    var style = document.createElement('style');
    style.setAttribute('data-qm', 'true');
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ---------- Inject modal HTML ---------- */
  function injectModal() {
    var div = document.createElement('div');
    div.innerHTML = buildModalHTML();
    var overlay = div.firstElementChild;
    document.body.appendChild(overlay);
    state.overlay = overlay;
    state.countryTrigger = overlay.querySelector('#qmCountryTrigger');
    state.countryMenu = overlay.querySelector('#qmCountryMenu');
    state.countrySearch = overlay.querySelector('#qmCountrySearch');
    state.countryOptions = overlay.querySelector('#qmCountryOptions');
    state.countryValue = overlay.querySelector('#qmCountryValue');
    bindModalEvents();
  }

  /* ---------- Bind events ---------- */
  function bindModalEvents() {
    var overlay = state.overlay;
    overlay.querySelector('#qmClose').addEventListener('click', closeModal);
    overlay.querySelector('#qmSuccessClose').addEventListener('click', closeModal);
    overlay.querySelector('#qmSuccessWa').addEventListener('click', function () {
      setTimeout(closeModal, 300);
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('qm-open')) closeModal();
    });

    /* Country dropdown */
    state.countryTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = state.countryMenu.classList.contains('qm-open');
      closeCountryMenu();
      if (!isOpen) {
        state.countryMenu.classList.add('qm-open');
        state.countryTrigger.classList.add('qm-active');
        state.countrySearch.value = '';
        filterOptions('');
        setTimeout(function () { state.countrySearch.focus(); }, 50);
      }
    });
    state.countrySearch.addEventListener('click', function (e) { e.stopPropagation(); });
    state.countrySearch.addEventListener('input', function () {
      filterOptions(this.value);
    });
    state.countryOptions.addEventListener('click', function (e) {
      var opt = e.target.closest('.qm-dd-opt');
      if (!opt) return;
      selectCountry(opt);
    });

    /* Submit & WhatsApp buttons */
    overlay.querySelector('#qmSubmitBtn').addEventListener('click', function () { submitForm(false); });
    overlay.querySelector('#qmWaBtn').addEventListener('click', function () { submitForm(true); });
  }

  /* ---------- Country dropdown helpers ---------- */
  function closeCountryMenu() {
    state.countryMenu.classList.remove('qm-open');
    state.countryTrigger.classList.remove('qm-active');
  }

  function filterOptions(query) {
    query = query.toLowerCase().trim();
    var opts = state.countryOptions.querySelectorAll('.qm-dd-opt');
    var currentGroup = null;
    opts.forEach(function (opt) {
      var label = opt.getAttribute('data-label').toLowerCase();
      var match = label.indexOf(query) !== -1;
      opt.style.display = match ? '' : 'none';
    });
    /* Hide empty groups */
    var groups = state.countryOptions.querySelectorAll('.qm-dd-group');
    groups.forEach(function (g) {
      var next = g.nextElementSibling;
      var hasVisible = false;
      while (next && !next.classList.contains('qm-dd-group')) {
        if (next.style.display !== 'none') { hasVisible = true; break; }
        next = next.nextElementSibling;
      }
      g.style.display = hasVisible ? '' : 'none';
    });
  }

  function selectCountry(opt) {
    var value = opt.getAttribute('data-value');
    var label = opt.getAttribute('data-label');
    state.countryValue.value = value;
    state.selectedCountryLabel = label;
    state.countryTrigger.querySelector('.qm-dd-value').textContent = label;
    state.countryTrigger.classList.remove('qm-placeholder');
    state.countryOptions.querySelectorAll('.qm-dd-opt').forEach(function (o) { o.classList.remove('qm-selected'); });
    opt.classList.add('qm-selected');
    closeCountryMenu();
    clearError('qmCountryErr');
    state.countryTrigger.classList.remove('qm-error');
  }

  /* ---------- Open / close ---------- */
  function openModal(productInfo) {
    state.productInfo = productInfo || {};
    var infoBox = state.overlay.querySelector('#qmProductInfo');
    var rowsContainer = state.overlay.querySelector('#qmProductRows');
    rowsContainer.innerHTML = '';

    if (productInfo && (productInfo.name || productInfo.model || productInfo.capacity)) {
      infoBox.style.display = 'block';
      if (productInfo.name) rowsContainer.innerHTML += '<div class="qm-pi-row"><span class="qm-pi-k">Product</span><span>' + escapeHTML(productInfo.name) + '</span></div>';
      if (productInfo.model) rowsContainer.innerHTML += '<div class="qm-pi-row"><span class="qm-pi-k">Model</span><span>' + escapeHTML(productInfo.model) + '</span></div>';
      if (productInfo.capacity) rowsContainer.innerHTML += '<div class="qm-pi-row"><span class="qm-pi-k">Capacity</span><span>' + escapeHTML(productInfo.capacity) + '</span></div>';
    } else {
      infoBox.style.display = 'none';
    }

    /* Reset form */
    state.overlay.querySelector('#qmForm').style.display = '';
    state.overlay.querySelector('#qmSuccess').style.display = 'none';
    state.overlay.querySelector('#qmName').value = '';
    state.overlay.querySelector('#qmWhatsapp').value = '';
    state.overlay.querySelector('#qmMessage').value = '';
    state.countryValue.value = '';
    state.selectedCountryLabel = '';
    state.countryTrigger.querySelector('.qm-dd-value').textContent = 'Select country/region';
    state.countryTrigger.classList.add('qm-placeholder');
    state.countryOptions.querySelectorAll('.qm-dd-opt').forEach(function (o) { o.classList.remove('qm-selected'); });
    clearAllErrors();

    state.overlay.classList.add('qm-open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { state.overlay.querySelector('#qmName').focus(); }, 200);
  }

  function closeModal() {
    state.overlay.classList.remove('qm-open');
    document.body.style.overflow = '';
    closeCountryMenu();
  }

  /* ---------- Validation ---------- */
  function validate() {
    var ok = true;
    var name = state.overlay.querySelector('#qmName').value.trim();
    var country = state.countryValue.value;
    var wa = state.overlay.querySelector('#qmWhatsapp').value.trim();

    if (!name) { showError('qmNameErr'); state.overlay.querySelector('#qmName').classList.add('qm-error'); ok = false; }
    else { clearError('qmNameErr'); state.overlay.querySelector('#qmName').classList.remove('qm-error'); }

    if (!country) { showError('qmCountryErr'); state.countryTrigger.classList.add('qm-error'); ok = false; }
    else { clearError('qmCountryErr'); state.countryTrigger.classList.remove('qm-error'); }

    /* WhatsApp: at least 7 digits, allow +, spaces, dashes */
    var waDigits = wa.replace(/\D/g, '');
    if (waDigits.length < 7) { showError('qmWaErr'); state.overlay.querySelector('#qmWhatsapp').classList.add('qm-error'); ok = false; }
    else { clearError('qmWaErr'); state.overlay.querySelector('#qmWhatsapp').classList.remove('qm-error'); }

    return ok;
  }

  function showError(id) { state.overlay.querySelector('#' + id).classList.add('qm-show'); }
  function clearError(id) { state.overlay.querySelector('#' + id).classList.remove('qm-show'); }
  function clearAllErrors() {
    state.overlay.querySelectorAll('.qm-errmsg').forEach(function (e) { e.classList.remove('qm-show'); });
    state.overlay.querySelectorAll('.qm-error').forEach(function (e) { e.classList.remove('qm-error'); });
  }

  /* ---------- Submit ---------- */
  function submitForm(viaWhatsApp) {
    var name = state.overlay.querySelector('#qmName').value.trim();
    var country = state.selectedCountryLabel;
    var wa = state.overlay.querySelector('#qmWhatsapp').value.trim();
    var message = state.overlay.querySelector('#qmMessage').value.trim();
    var p = state.productInfo;

    if (viaWhatsApp) {
      /* WhatsApp: no validation required — allow empty fields, use placeholders */
      var text = 'Hello GXON AGRO,\n\nI\'d like to request a quote';
      if (p.name || p.model || p.capacity) {
        text += ' for:\n';
        if (p.name) text += '\u2022 Product: ' + p.name + '\n';
        if (p.model) text += '\u2022 Model: ' + p.model + '\n';
        if (p.capacity) text += '\u2022 Capacity: ' + p.capacity + '\n';
      } else {
        text += '.\n';
      }
      /* Only include contact details that were filled in */
      var contactLines = [];
      if (name) contactLines.push('\u2022 Name: ' + name);
      if (country) contactLines.push('\u2022 Country: ' + country);
      if (wa) contactLines.push('\u2022 WhatsApp: ' + wa);
      if (contactLines.length) {
        text += '\nMy contact details:\n' + contactLines.join('\n') + '\n';
      }
      if (message) {
        text += '\nMessage: ' + message + '\n';
      }
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(url, '_blank');
      closeModal();
    } else {
      /* Web submit — requires validation */
      if (!validate()) return;
      var fields = [
        { label: 'Name', value: name },
        { label: 'Country', value: country },
        { label: 'WhatsApp', value: wa }
      ];
      if (message) fields.push({ label: 'Message', value: message });
      if (p.name) fields.unshift({ label: 'Product', value: p.name });
      if (p.model) fields.unshift({ label: 'Model', value: p.model });
      if (p.capacity) fields.unshift({ label: 'Capacity', value: p.capacity });
      showSuccess(fields, name);
    }
  }

  /* ---------- Show success / confirmation view ----------
   * fields: array of { label, value } — only non-empty values are shown.
   * name:   optional name to personalise the success message.
   */
  function showSuccess(fields, name) {
    var overlay = state.overlay;
    deliverLead(fields || []);
    /* Hide form + product info, show success view */
    overlay.querySelector('#qmForm').style.display = 'none';
    overlay.querySelector('#qmProductInfo').style.display = 'none';
    var success = overlay.querySelector('#qmSuccess');
    success.style.display = 'block';

    /* Title + personalised message */
    overlay.querySelector('#qmSuccessTitle').textContent = 'Request Received';
    overlay.querySelector('#qmSuccessName').textContent = name || '';

    /* Build receipt rows (only non-empty values) */
    var receiptHTML = '';
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].value) {
        receiptHTML += '<div class="qm-cr-row"><span class="qm-cr-k">' +
          escapeHTML(fields[i].label) + '</span><span class="qm-cr-v">' +
          escapeHTML(fields[i].value) + '</span></div>';
      }
    }
    var receipt = overlay.querySelector('#qmReceipt');
    var receiptRows = overlay.querySelector('#qmReceiptRows');
    if (receiptHTML) {
      receiptRows.innerHTML = receiptHTML;
      receipt.style.display = 'block';
    } else {
      receipt.style.display = 'none';
    }

    /* Build WhatsApp pre-filled message from the same fields */
    var waText = 'Hello GXON AGRO,\n\nI\'d like to request a quote.\n\n';
    for (var j = 0; j < fields.length; j++) {
      if (fields[j].value) {
        waText += '\u2022 ' + fields[j].label + ': ' + fields[j].value + '\n';
      }
    }
    waText += '\nPlease contact me to discuss the right drying setup.';
    var waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(waText);
    overlay.querySelector('#qmSuccessWa').href = waUrl;

    /* Ensure modal is open */
    overlay.classList.add('qm-open');
    document.body.style.overflow = 'hidden';
  }

  /* ---------- Public API: showConfirmation ----------
   * Called by page-level forms (homepage CTA, contact page) after collecting
   * their own field data. Opens the modal directly in the success/confirmation
   * view with a receipt of submitted info + Done button + WA button.
   *
   * Usage:
   *   window.GXONQuote.showConfirmation([
   *     { label: 'Country', value: 'Bangladesh' },
   *     { label: 'Crop',    value: 'Rice' },
   *     ...
   *   ]);
   */
  function showConfirmation(fields) {
    if (!state.overlay) init();
    if (!state.overlay) return;
    /* Reset form views (in case modal was previously used as a form) */
    state.overlay.querySelector('#qmForm').style.display = '';
    state.overlay.querySelector('#qmSuccess').style.display = 'none';
    state.overlay.querySelector('#qmProductInfo').style.display = 'none';
    /* Now show success/confirmation view */
    showSuccess(fields || [], '');
  }

  /* ---------- Deliver lead to backend (DingTalk robot) ----------
   * Fire-and-forget POST to the Cloudflare Function /api/quote. Failures are
   * reported to the console only; the visible success/WhatsApp fallback stays
   * intact so the lead is never blocked for the customer.
   */
  function deliverLead(fields) {
    try {
      fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'web', items: fields })
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).catch(function (err) {
        /* Non-fatal: lead still available via the WhatsApp button. */
        if (window.console && console.warn) {
          console.warn('[GXON] Lead delivery to DingTalk failed:', err && err.message);
        }
      });
    } catch (err) {
      /* ignore */
    }
  }

  /* ---------- Utils ---------- */
  function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ---------- Document click to close country menu ---------- */
  document.addEventListener('click', function (e) {
    if (!state.overlay) return;
    if (!state.overlay.contains(e.target)) {
      closeCountryMenu();
    } else if (!e.target.closest('.qm-country-dd')) {
      closeCountryMenu();
    }
  });

  /* ---------- Bind triggers via event delegation ----------
   * Uses document-level delegation so buttons loaded by PJAX
   * after initial init() also work without re-binding.
   */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-quote-trigger]') : null;
    if (!btn) return;
    e.preventDefault();
    var info = {
      name: btn.getAttribute('data-product-name') || '',
      model: btn.getAttribute('data-product-model') || '',
      capacity: btn.getAttribute('data-product-capacity') || ''
    };
    openModal(info);
  });

  /* ---------- Init ---------- */
  function init() {
    if (document.querySelector('[data-qm]')) return; /* already injected */
    injectCSS();
    injectModal();
  }

  /* ---------- Public API ---------- */
  window.GXONQuote = {
    showConfirmation: showConfirmation,
    WHATSAPP_NUMBER: WHATSAPP_NUMBER
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
