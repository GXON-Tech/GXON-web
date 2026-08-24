// Shared header component — auto-detects path depth and active nav state.
// Exposes window.siteHeader.refresh() for PJAX to update active state.
(function() {
  'use strict';

  function getRoot() {
    var p = window.location.pathname;
    if (p.indexOf('/pages/resources/cases/') !== -1 ||
        p.indexOf('/pages/resources/blog/') !== -1) {
      return '../../../';
    }
    if (p.indexOf('/pages/products/') !== -1 ||
        p.indexOf('/pages/solutions/') !== -1) {
      return '../../';
    }
    if (p.indexOf('/pages/') !== -1) {
      return '../';
    }
    return '';
  }

  function getActive() {
    var p = window.location.pathname;
    if (p.indexOf('/solutions') !== -1) return 'solutions';
    if (p.indexOf('/products') !== -1) return 'products';
    if (p.indexOf('/technology') !== -1) return 'technology';
    if (p.indexOf('/resources') !== -1) return 'resources';
    if (p.indexOf('/company') !== -1) return 'company';
    if (p.indexOf('/contact') !== -1) return 'contact';
    return 'home';
  }

  // Map of nav name -> link element (populated after render)
  var navLinks = {};

  function buildHtml() {
    var r = getRoot();
    var a = getActive();
    function ac(name) { return name === a ? ' class="active"' : ''; }

    return '<header class="header" id="header">' +
        '<div class="header-inner">' +
          '<a href="' + r + 'index.html" class="header-logo">' +
            '<img src="' + r + 'assets/gxon-logo-v2.png" alt="GXON AGRO">' +
          '</a>' +
          '<nav class="header-nav">' +
            '<a href="' + r + 'index.html" data-nav="home"' + ac('home') + '>Home</a>' +
            '<a href="' + r + 'pages/solutions.html" data-nav="solutions"' + ac('solutions') + '>Solutions</a>' +
            '<a href="' + r + 'pages/products.html" data-nav="products"' + ac('products') + '>Products</a>' +
            '<a href="' + r + 'pages/technology.html" data-nav="technology"' + ac('technology') + '>Technology</a>' +
            '<div class="nav-dropdown-wrap">' +
              '<a href="' + r + 'pages/resources.html" data-nav="resources"' + ac('resources') + '>Resources &#9662;</a>' +
              '<div class="nav-dropdown">' +
                '<a href="' + r + 'pages/resources.html#cases">Case Studies</a>' +
                '<a href="' + r + 'pages/resources.html#downloads">Downloads</a>' +
                '<a href="' + r + 'pages/resources.html#blog">Blog &amp; Insights</a>' +
              '</div>' +
            '</div>' +
            '<a href="' + r + 'pages/company.html" data-nav="company"' + ac('company') + '>Company</a>' +
            '<div class="nav-dropdown-wrap">' +
              '<a href="' + r + 'pages/contact.html" data-nav="contact"' + ac('contact') + '>Contact &#9662;</a>' +
              '<div class="nav-dropdown">' +
                '<a href="' + r + 'pages/contact.html#sendquote">Request Solution</a>' +
                '<a href="' + r + 'pages/contact.html#partnership">Become Distributor</a>' +
                '<a href="' + r + 'pages/contact.html#exhibition">Exhibition</a>' +
                '<a href="' + r + 'pages/contact.html#social">Social Media</a>' +
              '</div>' +
            '</div>' +
          '</nav>' +
          '<div class="header-cta">' +
            '<span class="lang">EN</span>' +
          '</div>' +
          '<div class="mobile-toggle" id="mobileToggle"><span></span><span></span><span></span></div>' +
        '</div>' +
      '</header>';
  }

  function bindEvents() {
    var toggle = document.getElementById('mobileToggle');
    var nav = document.querySelector('.header-nav');
    if (toggle && nav) {
      toggle.addEventListener('click', function() {
        this.classList.toggle('open');
        nav.classList.toggle('open');
      });
    }

    var header = document.getElementById('header');
    if (header) {
      window.addEventListener('scroll', function() {
        header.classList.toggle('scrolled', window.scrollY > 20);
      });
    }
  }

  function render() {
    var ph = document.getElementById('site-header');
    if (ph) ph.outerHTML = buildHtml();
    bindEvents();
  }

  // Re-render header with updated root path + active state (called by PJAX after navigation)
  function rerender() {
    var existing = document.getElementById('header');
    if (existing) {
      existing.outerHTML = buildHtml();
      bindEvents();
    }
  }

  // Initial render
  render();

  // Expose rerender for PJAX
  window.siteHeader = { rerender: rerender };
})();
