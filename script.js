// Jonas Event Services — small shared behaviors (no dependencies)
(function(){
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ nav.classList.remove('is-open'); });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  // Level meters: animate decorative bars to data-level on view
  var meters = document.querySelectorAll('.meter');
  if('IntersectionObserver' in window && meters.length){
    var mio = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var meter = entry.target;
          var level = parseInt(meter.getAttribute('data-level') || '70', 10);
          var bars = meter.querySelectorAll('span');
          bars.forEach(function(bar, i){
            var h = Math.max(15, level - (bars.length - 1 - i) * 9 + (i % 2 === 0 ? 4 : -4));
            bar.style.height = Math.min(100, h) + '%';
          });
          meter.classList.add('is-live');
          mio.unobserve(meter);
        }
      });
    }, {threshold:.4});
    meters.forEach(function(m){ mio.observe(m); });
  }
})();
