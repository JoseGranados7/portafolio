(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* year */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* nav state + progress */
  var nav = document.getElementById('nav');
  var progress = document.getElementById('progress');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle('scrolled', y > 24);
    var h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  var menuBtn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  /* reveal on scroll */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* active link */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* spotlight */
  var spot = document.getElementById('spotlight');
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    window.addEventListener('mousemove', function (e) {
      spot.style.setProperty('--mx', e.clientX + 'px');
      spot.style.setProperty('--my', e.clientY + 'px');
    }, { passive: true });
  }

  /* project glow follows cursor */
  document.querySelectorAll('.project').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--px', (e.clientX - r.left) + 'px');
      card.style.setProperty('--py', (e.clientY - r.top) + 'px');
    });
  });

  /* rotating role */
  var words = ['Full Stack .NET', 'C# & SQL Server', 'Flutter', 'Astro'];
  var wordEl = document.getElementById('rotatorWord');
  if (wordEl && !reduce) {
    var i = 0;
    setInterval(function () {
      wordEl.classList.add('out');
      setTimeout(function () {
        i = (i + 1) % words.length;
        wordEl.textContent = words[i];
        wordEl.classList.remove('out');
      }, 350);
    }, 2800);
  }

  /* copy email */
  var copyBtn = document.getElementById('copyMail');
  var toast = document.getElementById('toast');
  var mail = 'granadosjose7j@gmail.com';
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { toast.classList.remove('show'); }, 2200);
  }
  copyBtn.addEventListener('click', function () {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(mail).then(function () {
        showToast('Correo copiado ✓');
      }).catch(function () { showToast(mail); });
    } else {
      var t = document.createElement('textarea');
      t.value = mail; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); showToast('Correo copiado ✓'); }
      catch (e) { showToast(mail); }
      document.body.removeChild(t);
    }
  });
})();
