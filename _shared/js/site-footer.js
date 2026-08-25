// Shared footer component — auto-detects path depth for relative links.
(function() {
  'use strict';

  function getRoot() {
    var p = window.location.pathname;
    // Section index pages (/pages/products/, /pages/resources/, …) and
    // their detail pages need ../../; resources sub-pages need ../../../.
    if (p.indexOf('/pages/resources/cases/') !== -1 ||
        p.indexOf('/pages/resources/blog/') !== -1) {
      return '../../../';
    }
    if (p.indexOf('/pages/') !== -1) {
      return '../../';
    }
    return '';
  }

  function buildHtml() {
    var r = getRoot();

    var svgFb = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>';
    var svgLi = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>';
    var svgYt = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>';
    var svgWa = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.05 24l1.69-6.16a11.87 11.87 0 0 1-1.59-5.95C.15 5.32 5.5 0 12.06 0a11.82 11.82 0 0 1 8.41 3.49 11.76 11.76 0 0 1 3.48 8.41c0 6.56-5.35 11.89-11.91 11.89a11.96 11.96 0 0 1-5.7-1.45L.05 24zM6.6 20.13c1.68.99 3.28 1.59 5.45 1.59 5.45 0 9.89-4.43 9.89-9.87a9.82 9.82 0 0 0-2.89-6.99 9.82 9.82 0 0 0-6.98-2.9c-5.46 0-9.9 4.43-9.9 9.87 0 2.28.67 3.99 1.79 5.78l-.99 3.62 3.63-.95zM17.5 14.38c-.07-.12-.27-.2-.57-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.01-1.04 2.47 1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.69.25-1.28.17-1.42z"/></svg>';
    var svgMail = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';

    return '<footer class="footer">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<div class="footer-logo"><img src="' + r + 'assets/gxon-logo-v2.png" alt="GXON AGRO" style="height:32px;width:auto;"><span>GXON AGRO</span></div>' +
          '<p>Global Grain Drying &amp; Post-Harvest Solution Provider. Engineering better harvest quality worldwide since 2014.</p>' +
          '<div class="footer-social">' +
            '<a href="https://www.facebook.com/gxonagro" target="_blank" rel="noopener" title="Facebook">' + svgFb + '</a>' +
            '<a href="https://www.linkedin.com/company/gxonagro" target="_blank" rel="noopener" title="LinkedIn">' + svgLi + '</a>' +
            '<a href="https://www.youtube.com/@gxonagro" target="_blank" rel="noopener" title="YouTube">' + svgYt + '</a>' +
            '<a href="https://wa.me/8618135726591" target="_blank" rel="noopener" title="WhatsApp">' + svgWa + '</a>' +
            '<a href="mailto:info@gxonagro.com" title="Email">' + svgMail + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Solutions</h4>' +
          '<ul>' +
            '<li><a href="' + r + 'pages/solutions/">Regional Solutions</a></li>' +
            '<li><a href="' + r + 'pages/solutions/">Solution Finder</a></li>' +
            '<li><a href="' + r + 'index.html#system">Post-Harvest System</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Products</h4>' +
          '<ul>' +
            '<li><a href="' + r + 'pages/products/#mobile">Mobile Dryer</a></li>' +
            '<li><a href="' + r + 'pages/products/#batch">Batch Dryer</a></li>' +
            '<li><a href="' + r + 'pages/products/#continuous">Continuous Tower</a></li>' +
            '<li><a href="' + r + 'pages/products/#system">Complete System</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Technology</h4>' +
          '<ul>' +
            '<li><a href="' + r + 'pages/technology/#low-breakage">Low Breakage</a></li>' +
            '<li><a href="' + r + 'pages/technology/#multi-fuel">Multi-Fuel Heating</a></li>' +
            '<li><a href="' + r + 'pages/technology/#control-system">PLC Control</a></li>' +
            '<li><a href="' + r + 'pages/technology/#drying-efficiency">Drying Efficiency</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Resources</h4>' +
          '<ul>' +
            '<li><a href="' + r + 'pages/resources/#cases">Case Studies</a></li>' +
            '<li><a href="' + r + 'pages/resources/#downloads">Downloads</a></li>' +
            '<li><a href="' + r + 'pages/resources/#blog">Blog</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Company</h4>' +
          '<ul>' +
            '<li><a href="' + r + 'pages/company/#about">About GXON</a></li>' +
            '<li><a href="' + r + 'pages/company/#manufacturing">Manufacturing</a></li>' +
            '<li><a href="' + r + 'pages/contact/#partnership">Become Distributor</a></li>' +
            '<li><a href="' + r + 'pages/contact/">Contact</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>&copy; 2026 GXON AGRO Equipment Co., Ltd. All rights reserved.</span>' +
        '<span>www.gxonagro.com</span>' +
      '</div>' +
    '</footer>';
  }

  function render() {
    var ph = document.getElementById('site-footer');
    if (ph) ph.outerHTML = buildHtml();
  }

  // Re-render footer with updated root path (called by PJAX after navigation)
  function rerender() {
    var existing = document.querySelector('.footer');
    if (existing) {
      existing.outerHTML = buildHtml();
    } else {
      render();
    }
  }

  // Initial render
  render();

  // Expose rerender for PJAX
  window.siteFooter = { rerender: rerender };
})();
