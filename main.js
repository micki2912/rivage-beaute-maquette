(function(){
  var nav = document.getElementById('siteNav');
  window.addEventListener('scroll', function(){
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  }, { passive:true });

  var toggle = document.getElementById('menuToggle');
  var panel = document.getElementById('mobilePanel');
  function closeMenu(){
    toggle.classList.remove('is-open');
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded','false');
  }
  toggle.addEventListener('click', function(){
    var open = toggle.classList.toggle('is-open');
    panel.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  panel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  document.querySelectorAll('.menu-more').forEach(function(btn){
    var extra = btn.previousElementSibling;
    if(!extra || !extra.classList.contains('menu-extra')) return;
    btn.addEventListener('click', function(){
      var open = extra.hidden;
      extra.hidden = !open;
      btn.classList.toggle('is-open', open);
      btn.firstChild.textContent = open ? 'Voir moins' : 'Voir plus';
    });
  });

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduced){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold:.15, rootMargin:'0px 0px -60px 0px' });
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('is-visible'); });
  }

  // ---- scroll-driven wave divider ----
  var waveCanvas = document.getElementById('waveCanvas');
  if(waveCanvas){
    var wctx = waveCanvas.getContext('2d');
    var wdpr = Math.min(window.devicePixelRatio || 1, 2);
    function waveResize(){
      var r = waveCanvas.getBoundingClientRect();
      waveCanvas.width = r.width * wdpr;
      waveCanvas.height = r.height * wdpr;
      wctx.setTransform(wdpr,0,0,wdpr,0,0);
    }
    waveResize();
    window.addEventListener('resize', waveResize);

    var waveStyles = getComputedStyle(document.documentElement);
    function waveCol(name){ return waveStyles.getPropertyValue(name).trim(); }

    function drawWave(t){
      var r = waveCanvas.getBoundingClientRect();
      var w = r.width, h = r.height;
      wctx.clearRect(0,0,w,h);

      var line = waveCol('--line-strong') || '#C3CEDA';
      var accent = waveCol('--accent') || '#0048A8';
      var scrollPhase = window.scrollY * 0.014;
      var idlePhase = reduced ? 0 : t * 0.0003;

      var layers = [
        { amp: h*0.30, freq: 0.017, speed: 1.0,  color: line,   alpha: .55 },
        { amp: h*0.20, freq: 0.026, speed: -0.7, color: accent, alpha: .28 },
        { amp: h*0.13, freq: 0.035, speed: 1.5,  color: line,   alpha: .35 }
      ];

      layers.forEach(function(layer){
        wctx.beginPath();
        for(var x=0; x<=w; x+=6){
          var y = h*0.5 + Math.sin(x*layer.freq + scrollPhase*layer.speed + idlePhase*layer.speed) * layer.amp;
          if(x===0) wctx.moveTo(x,y); else wctx.lineTo(x,y);
        }
        wctx.strokeStyle = layer.color;
        wctx.globalAlpha = layer.alpha;
        wctx.lineWidth = 1;
        wctx.stroke();
      });
      wctx.globalAlpha = 1;

      if(!reduced){ requestAnimationFrame(drawWave); }
    }
    if(reduced){ drawWave(0); }
    else { requestAnimationFrame(drawWave); }
  }

})();

// ---- panier (demande de commande par e-mail, sans paiement en ligne) ----
(function(){
  var STORAGE_KEY = 'rivage-cart-v1';
  var SHOP_EMAIL = 'rivage@bluewin.ch';
  var cart = {}; // name -> { price, qty }

  function loadCart(){
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      if(raw) cart = JSON.parse(raw) || {};
    }catch(e){ cart = {}; }
  }
  function saveCart(){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }catch(e){}
  }

  function money(n){
    return n.toFixed(2).replace('.00','') + '.–';
  }

  function totalCount(){
    var n = 0;
    for(var k in cart){ n += cart[k].qty; }
    return n;
  }
  function totalPrice(){
    var n = 0;
    for(var k in cart){ n += cart[k].qty * cart[k].price; }
    return n;
  }

  var cartCount = document.getElementById('cartCount');
  var cartItemsEl = document.getElementById('cartItems');
  var cartEmptyEl = document.getElementById('cartEmpty');
  var cartTotalEl = document.getElementById('cartTotal');
  var cartSend = document.getElementById('cartSend');
  var checkoutForm = document.getElementById('checkoutForm');
  var cartOverlay = document.getElementById('cartOverlay');
  var cartDrawer = document.getElementById('cartDrawer');
  var cartToggle = document.getElementById('cartToggle');
  var cartClose = document.getElementById('cartClose');

  function render(){
    var names = Object.keys(cart);
    cartEmptyEl.style.display = names.length ? 'none' : 'block';
    cartItemsEl.innerHTML = '';
    names.forEach(function(name){
      var item = cart[name];
      var li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML =
        '<span class="name">' + name + '</span>' +
        '<span class="qty">' +
          '<button type="button" data-act="dec" aria-label="Retirer un">−</button>' +
          '<span>' + item.qty + '</span>' +
          '<button type="button" data-act="inc" aria-label="Ajouter un">+</button>' +
        '</span>' +
        '<span class="line-price">' + money(item.qty * item.price) + '</span>' +
        '<button type="button" class="remove" data-act="remove">Retirer</button>';
      li.querySelector('[data-act="dec"]').addEventListener('click', function(){ changeQty(name, -1); });
      li.querySelector('[data-act="inc"]').addEventListener('click', function(){ changeQty(name, 1); });
      li.querySelector('[data-act="remove"]').addEventListener('click', function(){ removeItem(name); });
      cartItemsEl.appendChild(li);
    });
    cartTotalEl.textContent = money(totalPrice());
    var count = totalCount();
    if(count > 0){ cartCount.hidden = false; cartCount.textContent = count; }
    else { cartCount.hidden = true; }
    if(cartSend) cartSend.disabled = names.length === 0;
  }

  function buildOrderMailto(formData){
    var names = Object.keys(cart);
    var lines = names.map(function(name){
      var item = cart[name];
      return '- ' + name + ' x' + item.qty + ' — ' + money(item.qty * item.price) + ' CHF';
    });
    var body = 'Bonjour,%0D%0A%0D%0AJe souhaite commander :%0D%0A' + encodeURIComponent(lines.join('\n')) +
      '%0D%0A%0D%0ATotal : ' + encodeURIComponent(money(totalPrice())) + ' CHF' +
      '%0D%0A%0D%0ALivraison à :%0D%0A' + encodeURIComponent(
        formData.firstname + ' ' + formData.lastname + '\n' +
        formData.address + '\n' +
        formData.zip + ' ' + formData.city
      ) +
      '%0D%0A%0D%0ATéléphone : ' + encodeURIComponent(formData.phone) +
      '%0D%0A%0D%0APaiement souhaité : sur facture' +
      '%0D%0A%0D%0AMerci, au plaisir de vous lire.';
    return 'mailto:' + SHOP_EMAIL + '?subject=' + encodeURIComponent('Commande boutique — Rivage') + '&body=' + body;
  }

  function addItem(name, price){
    if(!cart[name]) cart[name] = { price: price, qty: 0 };
    cart[name].qty += 1;
    saveCart();
    render();
  }
  function changeQty(name, delta){
    if(!cart[name]) return;
    cart[name].qty += delta;
    if(cart[name].qty <= 0) delete cart[name];
    saveCart();
    render();
  }
  function removeItem(name){
    delete cart[name];
    saveCart();
    render();
  }

  function openCart(){
    cartOverlay.classList.add('is-open');
    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
  }
  function closeCart(){
    cartOverlay.classList.remove('is-open');
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
  }

  if(cartToggle){
    loadCart();
    render();

    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeCart(); });

    document.querySelectorAll('.shop-card').forEach(function(card){
      var btn = card.querySelector('.add-to-cart');
      if(!btn) return;
      btn.addEventListener('click', function(){
        var name = card.getAttribute('data-name');
        var price = parseFloat(card.getAttribute('data-price'));
        addItem(name, price);
        openCart();
        btn.classList.add('is-added');
        btn.textContent = 'Ajouté ✓';
        setTimeout(function(){ btn.classList.remove('is-added'); btn.textContent = 'Ajouter'; }, 1400);
      });
    });

    if(checkoutForm){
      checkoutForm.addEventListener('submit', function(e){
        e.preventDefault();
        if(Object.keys(cart).length === 0) return;
        var data = new FormData(checkoutForm);
        var formData = {
          firstname: (data.get('firstname') || '').trim(),
          lastname: (data.get('lastname') || '').trim(),
          phone: (data.get('phone') || '').trim(),
          address: (data.get('address') || '').trim(),
          zip: (data.get('zip') || '').trim(),
          city: (data.get('city') || '').trim()
        };
        window.location.href = buildOrderMailto(formData);
      });
    }

    // ---- bon cadeau : montant libre, dans une fenêtre modale ----
    var giftOpenBtn = document.getElementById('giftOpenBtn');
    var giftModal = document.getElementById('giftModal');
    var giftModalOverlay = document.getElementById('giftModalOverlay');
    var giftModalClose = document.getElementById('giftModalClose');
    var giftInput = document.getElementById('giftAmount');
    var giftPresets = document.querySelectorAll('.gift-preset');
    var giftAddBtn = document.getElementById('giftAddBtn');

    if(giftOpenBtn && giftModal){
      function openGiftModal(){
        giftModalOverlay.classList.add('is-open');
        giftModal.classList.add('is-open');
        giftModal.setAttribute('aria-hidden', 'false');
        giftInput.focus();
      }
      function closeGiftModal(){
        giftModalOverlay.classList.remove('is-open');
        giftModal.classList.remove('is-open');
        giftModal.setAttribute('aria-hidden', 'true');
        giftOpenBtn.focus();
      }
      function syncGiftPresets(){
        var val = giftInput.value;
        giftPresets.forEach(function(btn){
          btn.classList.toggle('is-active', btn.getAttribute('data-amount') === val);
        });
      }

      giftOpenBtn.addEventListener('click', openGiftModal);
      giftModalClose.addEventListener('click', closeGiftModal);
      giftModalOverlay.addEventListener('click', closeGiftModal);
      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && giftModal.classList.contains('is-open')) closeGiftModal();
      });

      giftPresets.forEach(function(btn){
        btn.addEventListener('click', function(){
          giftInput.value = btn.getAttribute('data-amount');
          syncGiftPresets();
        });
      });
      giftInput.addEventListener('input', syncGiftPresets);
      syncGiftPresets();

      giftAddBtn.addEventListener('click', function(){
        var amount = Math.round(parseFloat(giftInput.value));
        if(!amount || amount <= 0){ giftInput.focus(); return; }
        addItem('Bon cadeau — CHF ' + amount, amount);
        giftAddBtn.classList.add('is-added');
        giftAddBtn.textContent = 'Ajouté ✓';
        setTimeout(function(){
          giftAddBtn.classList.remove('is-added');
          giftAddBtn.textContent = 'Ajouter au panier';
          closeGiftModal();
          openCart();
        }, 700);
      });
    }
  }
})();
