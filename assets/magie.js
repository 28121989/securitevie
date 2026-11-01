/* Touche finale : apparitions douces, chiffres animés. Le contenu reste lisible sans JavaScript. */
(function(){
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;
  var d = document.documentElement;
  var cibles = document.querySelectorAll('.eq-carte, .experts li, .frise-osv li, .ac-entete, .ac-chiffres li, .ac-domaines li, .ac-carte, .carte, .dg-carte, .dp-pilier, .vm-mission, .vm-vision, .titre-section, .portefeuille, .dp-affiche');
  var hauteur = window.innerHeight;
  cibles.forEach(function(el, i){
    if (el.getBoundingClientRect().top < hauteur * 0.92) return; /* déjà visible : on ne touche à rien */
    el.classList.add('apparait');
    el.style.transitionDelay = ((i % 4) * 70) + 'ms';
  });
  var obs = new IntersectionObserver(function(entrees){
    entrees.forEach(function(e){
      if (!e.isIntersecting) return;
      e.target.classList.add('vu');
      obs.unobserve(e.target);
    });
  }, {rootMargin: '0px 0px -8% 0px'});
  document.querySelectorAll('.apparait').forEach(function(el){ obs.observe(el); });
  /* Chiffres clés : comptage progressif (sauf les années) */
  var chiffres = document.querySelectorAll('.ac-valeur');
  var obsC = new IntersectionObserver(function(entrees){
    entrees.forEach(function(e){
      if (!e.isIntersecting) return;
      obsC.unobserve(e.target);
      var el = e.target, fin = parseInt(el.textContent.replace(/\s/g,''), 10);
      if (isNaN(fin) || fin >= 1900 || String(fin) !== el.textContent.trim()) return;
      var debut = null, duree = 1100;
      function pas(t){ if(!debut) debut = t; var p = Math.min((t - debut) / duree, 1);
        el.textContent = Math.round(fin * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(pas); }
      requestAnimationFrame(pas);
    });
  }, {threshold: .6});
  chiffres.forEach(function(el){ obsC.observe(el); });
  d.classList.add('magie');
})();
