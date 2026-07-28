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
    '.qm-modal{background:#fff;border-radius:12px;box-shadow:0 16px 48px rgba(0,0,0,0.24);width:100%;max-width:480px;max-height:calc(100vh - 80px);overflow:hidden;display:flex;flex-direction:column;transform:translateY(20px);transition:transform .25s}' +
    '.qm-overlay.qm-open .qm-modal{transform:translateY(0)}' +
    '.qm-header{background:#fff;border-bottom:1px solid #C8CBD0;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;z-index:2;flex-shrink:0}' +
    '.qm-header h3{font-size:20px;font-weight:700;color:#24282D;margin:0}' +
    '.qm-close{width:32px;height:32px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:20px;color:#6B6B6B;cursor:pointer;transition:all .15s;border:none;background:none}' +
    '.qm-close:hover{background:#D6D9DC;color:#1A1A1A}' +
    '.qm-body{padding:24px;overflow-y:auto;flex:1}' +
    '.qm-product-info{background:#EAF3EF;border:1px solid #BFC3C7;border-radius:8px;padding:14px 16px;margin-bottom:22px}' +
    '.qm-product-info .qm-pi-label{font-size:11px;font-weight:700;color:#6B6B6B;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px}' +
    '.qm-product-info .qm-pi-row{display:flex;gap:8px;font-size:14px;color:#1A1A1A;margin:3px 0;align-items:baseline}' +
    '.qm-product-info .qm-pi-row .qm-pi-k{font-weight:700;min-width:78px;color:#4A4A4A}' +
    '.qm-field{margin-bottom:18px}' +
    '.qm-field>label{display:block;font-size:13px;font-weight:700;color:#24282D;margin-bottom:6px}' +
    '.qm-input{width:100%;border:1px solid #C8CBD0;border-radius:6px;padding:11px 14px;font-size:15px;font-family:inherit;color:#1A1A1A;background:#fff;transition:border-color .15s;box-sizing:border-box}' +
    '.qm-input:focus{outline:none;border-color:#084F32;box-shadow:0 0 0 3px rgba(8,79,50,0.12)}' +
    '.qm-textarea{resize:vertical;min-height:72px}' +
    '.qm-req{color:#D4841A}' +
    '.qm-error{border-color:#C0392B !important;box-shadow:0 0 0 3px rgba(192,57,43,0.12) !important}' +
    '.qm-errmsg{color:#C0392B;font-size:12px;margin-top:4px;display:none}' +
    '.qm-errmsg.qm-show{display:block}' +
    /* country dropdown */
    '.qm-country-dd{position:relative}' +
    '.qm-dd-trigger{width:100%;border:1px solid #C8CBD0;border-radius:6px;padding:11px 14px;font-size:15px;font-family:inherit;color:#1A1A1A;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:border-color .15s;box-sizing:border-box}' +
    '.qm-dd-trigger.qm-active{border-color:#084F32;box-shadow:0 0 0 3px rgba(8,79,50,0.12)}' +
    '.qm-dd-trigger.qm-placeholder{color:#9B9B9B}' +
    '.qm-dd-caret{font-size:12px;color:#6B6B6B;transition:transform .2s}' +
    '.qm-dd-trigger.qm-active .qm-dd-caret{transform:rotate(180deg)}' +
    '.qm-dd-menu{position:absolute;top:calc(100% + 4px);left:0;right:0;background:#fff;border:1px solid #C8CBD0;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,0.16);z-index:10;max-height:260px;overflow:hidden;display:none;flex-direction:column}' +
    '.qm-dd-menu.qm-open{display:flex}' +
    '.qm-dd-search{padding:8px;border-bottom:1px solid #D6D9DC}' +
    '.qm-dd-search input{width:100%;border:1px solid #C8CBD0;border-radius:4px;padding:8px 10px;font-size:13px;font-family:inherit;box-sizing:border-box}' +
    '.qm-dd-options{overflow-y:auto;flex:1}' +
    '.qm-dd-group{padding:7px 14px 3px;font-size:10px;font-weight:700;color:#6B6B6B;text-transform:uppercase;letter-spacing:0.05em;background:#F0F1F3;border-bottom:1px solid #D6D9DC}' +
    '.qm-dd-opt{padding:10px 14px;font-size:14px;color:#4A4A4A;cursor:pointer;transition:background .12s;border-bottom:1px solid #D6D9DC}' +
    '.qm-dd-opt:last-child{border-bottom:none}' +
    '.qm-dd-opt:hover{background:#EAF3EF;color:#084F32}' +
    '.qm-dd-opt.qm-selected{background:#EAF3EF;color:#084F32;font-weight:700}' +
    /* divider */
    '.qm-divider{height:1px;background:#C8CBD0;margin:22px 0 18px}' +
    '.qm-divider-label{text-align:center;font-size:13px;font-weight:700;color:#6B6B6B;margin-bottom:16px}' +
    /* actions */
    '.qm-actions{display:grid;grid-template-columns:1fr 1fr;gap:12px}' +
    '.qm-action{border:2px solid;border-radius:10px;padding:16px 14px;cursor:pointer;transition:all .2s;text-align:center;background:none;font-family:inherit}' +
    '.qm-action-submit{border-color:#084F32;background:#084F32;color:#fff}' +
    '.qm-action-submit:hover{background:#053D24;border-color:#053D24;transform:translateY(-2px);box-shadow:0 4px 16px rgba(8,79,50,0.3)}' +
    '.qm-action-wa{border-color:#25D366;background:#fff;color:#1A1A1A}' +
    '.qm-action-wa:hover{background:#25D366;color:#fff;transform:translateY(-2px);box-shadow:0 4px 16px rgba(37,211,102,0.3)}' +
    '.qm-action .qm-act-icon{font-size:24px;display:block;margin-bottom:6px}' +
    '.qm-action .qm-act-title{font-size:15px;font-weight:700;display:block;margin-bottom:3px}' +
    '.qm-action .qm-act-desc{font-size:12px;opacity:0.85;display:block;line-height:1.4}' +
    /* success */
    '.qm-success{text-align:center;padding:36px 24px}' +
    '.qm-success-icon{font-size:48px;margin-bottom:12px}' +
    '.qm-success h3{font-size:22px;color:#084F32;margin-bottom:10px}' +
    '.qm-success p{font-size:15px;color:#4A4A4A;margin-bottom:24px;max-width:320px;margin-left:auto;margin-right:auto}' +
    '.qm-success-btn{background:#084F32;color:#fff;border:none;border-radius:8px;padding:12px 28px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit}' +
    '.qm-success-btn:hover{background:#053D24}' +
    /* responsive */
    '@media(max-width:520px){' +
      '.qm-overlay{padding:0;align-items:flex-end}' +
      '.qm-modal{max-width:100%;border-radius:12px 12px 0 0;max-height:100vh}' +
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
              '<h3>Request Sent!</h3>' +
              '<p>Thank you, <span id="qmSuccessName"></span>. Our team will contact you within 24 hours.</p>' +
              '<button class="qm-success-btn" id="qmSuccessClose">Done</button>' +
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
      state.overlay.querySelector('#qmForm').style.display = 'none';
      var success = state.overlay.querySelector('#qmSuccess');
      success.style.display = 'block';
      state.overlay.querySelector('#qmSuccessName').textContent = name;
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

  /* ---------- Bind triggers ---------- */
  function bindTriggers() {
    var triggers = document.querySelectorAll('[data-quote-trigger]');
    triggers.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var info = {
          name: btn.getAttribute('data-product-name') || '',
          model: btn.getAttribute('data-product-model') || '',
          capacity: btn.getAttribute('data-product-capacity') || ''
        };
        openModal(info);
      });
    });
  }

  /* ---------- Init ---------- */
  function init() {
    if (document.querySelector('[data-qm]')) return; /* already injected */
    injectCSS();
    injectModal();
    bindTriggers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
