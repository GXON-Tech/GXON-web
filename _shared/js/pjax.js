// PJAX engine — intercepts same-origin links, fetches target page,
// replaces only #pjax-main + title + page style + page script.
// Header/footer never reload. Vanilla JS, no dependencies.
(function() {
  'use strict';

  var PJAX_MAIN = '#pjax-main';
  var PAGE_STYLE_ID = 'page-style';
  var PAGE_SCRIPT_ATTR = 'data-page-script';

  function isSameOrigin(url) {
    try {
      var u = new URL(url, location.href);
      return u.origin === location.origin;
    } catch (e) { return false; }
  }

  function isHashOnly(href) {
    if (href.charAt(0) === '#') return true;
    try {
      var u = new URL(href, location.href);
      return u.pathname === location.pathname && u.hash && !u.search;
    } catch (e) { return false; }
  }

  function isExternal(href) {
    return /^(https?:)?\/\//i.test(href) && !isSameOrigin(href) ||
           /^(mailto:|tel:|wa\.me|whatsapp)/i.test(href);
  }

  function shouldIntercept(href, link) {
    if (!href) return false;
    if (link.target === '_blank') return false;
    if (link.hasAttribute('download')) return false;
    if (isExternal(href)) return false;
    if (isHashOnly(href)) return false;
    if (!isSameOrigin(href)) return false;
    return true;
  }

  function loadPage(url, pushState) {
    document.body.classList.add('pjax-loading');

    fetch(url, { headers: { 'X-PJAX': 'true' }, credentials: 'same-origin' })
      .then(function(res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');

        // 1. Update title
        document.title = doc.title;

        // 2. Replace page style (the <style id="page-style"> block)
        var oldStyle = document.getElementById(PAGE_STYLE_ID);
        var newStyle = doc.getElementById(PAGE_STYLE_ID);
        if (oldStyle && newStyle) {
          oldStyle.textContent = newStyle.textContent;
        }

        // 3. Replace main content
        var oldMain = document.querySelector(PJAX_MAIN);
        var newMain = doc.querySelector(PJAX_MAIN);
        if (oldMain && newMain) {
          oldMain.innerHTML = newMain.innerHTML;
        }

        // 4. Update URL BEFORE script re-execution so data-page-script reads correct hash
        if (pushState) {
          history.pushState({ url: url }, '', url);
        }

        // 5. Re-execute page-specific scripts (after URL is updated so hash is correct)
        var oldScripts = document.querySelectorAll('script[' + PAGE_SCRIPT_ATTR + ']');
        for (var i = 0; i < oldScripts.length; i++) oldScripts[i].remove();
        var newScripts = doc.querySelectorAll('script[' + PAGE_SCRIPT_ATTR + ']');
        for (var j = 0; j < newScripts.length; j++) {
          var s = document.createElement('script');
          if (newScripts[j].src) {
            s.src = newScripts[j].src;
          } else {
            s.textContent = newScripts[j].textContent;
          }
          s.setAttribute(PAGE_SCRIPT_ATTR, '');
          document.body.appendChild(s);
        }

        // 6. Re-render header & footer with correct root path for new location
        if (window.siteHeader && typeof window.siteHeader.rerender === 'function') {
          window.siteHeader.rerender();
        }
        if (window.siteFooter && typeof window.siteFooter.rerender === 'function') {
          window.siteFooter.rerender();
        }

        // 7. Scroll to hash target or top
        var hash = '';
        try {
          hash = new URL(url, location.href).hash;
        } catch (e) {}
        if (hash && hash.length > 1) {
          var target = document.querySelector(hash);
          if (target) {
            var offset = 72;
            var pos = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
          } else {
            window.scrollTo(0, 0);
          }
        } else {
          window.scrollTo(0, 0);
        }

        document.body.classList.remove('pjax-loading');
      })
      .catch(function(err) {
        // Fallback to full page load on error
        window.location.href = url;
      });
  }

  // Intercept link clicks
  document.addEventListener('click', function(e) {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    var link = e.target.closest ? e.target.closest('a[href]') : null;
    if (!link) return;

    var href = link.getAttribute('href');
    if (!shouldIntercept(href, link)) return;

    e.preventDefault();
    var absolute = new URL(href, location.href).href;
    loadPage(absolute, true);
  });

  // Handle back/forward
  window.addEventListener('popstate', function(e) {
    var url = (e.state && e.state.url) ? e.state.url : location.href;
    loadPage(url, false);
  });

  // Store initial state
  history.replaceState({ url: location.href }, '', location.href);
})();
