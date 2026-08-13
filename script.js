/* =========================================================
   VESPER — script.js
   Sections: 1) Product data  2) Media helpers (real photos +
   fallback)  3) Cart  4) Search/Filter/Sort  5) Quick view
   6) Checkout  7) Nav/menu/scroll UI  8) Motion  9) Init
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     1) PRODUCT DATA
     Every entry is a real, existing watch model. Images are
     openly-licensed photographs hosted on Wikimedia Commons,
     referenced through Special:FilePath (a stable redirect
     that does not require a file hash, and is not subject to
     hotlink protection). Prices are approximate public
     reference points for demonstration only — not live
     retail quotes. Specs are simplified, well-known
     characteristics, not exhaustive official data sheets.

     To add a watch later: copy an object, give it a unique
     id, and fill in the fields. theme is 1-6 and picks the
     background/accent palette defined in style.css.
     image should be a Special:FilePath URL; commons() below
     builds one from a Commons file name.
  --------------------------------------------------------- */
  function commons(filename, width) {
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${filename}${width ? `?width=${width}` : ''}`;
  }

  const PRODUCTS = [
    { id: 'omega-speedmaster', brand: 'Omega', model: 'Speedmaster Professional', ref: 'Moonwatch', category: 'Chronograph', price: 7400, theme: 4,
      movement: 'Manual-wind chronograph', caseSize: '42mm steel', waterResist: '50m', strap: 'Steel bracelet',
      image: commons('Omega_speedmaster.jpg', 900),
      description: 'The manual-winding chronograph that has flown on every NASA crewed mission since Gemini 4, worn during the first American spacewalk and the Apollo 11 moon landing.' },

    { id: 'rolex-submariner', brand: 'Rolex', model: 'Submariner', ref: 'Date', category: 'Diver', price: 10900, theme: 1,
      movement: 'Automatic', caseSize: '41mm steel', waterResist: '300m', strap: 'Oyster steel bracelet',
      image: commons('Rolex-Submariner.jpg', 900),
      description: 'The reference dive watch since 1953 — a unidirectional rotating bezel, a Cerachrom insert, and the silhouette every other diver still gets compared to.' },

    { id: 'casio-gshock', brand: 'Casio', model: 'G-Shock DW-5600E', ref: 'DW-5600E', category: 'Field', price: 55, theme: 5,
      movement: 'Quartz digital', caseSize: '43mm resin', waterResist: '200m', strap: 'Resin strap',
      image: commons('Casio_G-Shock_DW-5600E_wristwatch.jpg', 900),
      description: 'The original G-Shock silhouette: a shock-resistant digital module in a resin case, built to survive drops that would end most other watches.' },

    { id: 'seiko-5', brand: 'Seiko', model: 'Seiko 5', ref: 'Automatic', category: 'Everyday', price: 275, theme: 2,
      movement: 'Automatic', caseSize: '37–43mm steel', waterResist: '~100m', strap: 'Steel bracelet',
      image: commons('Blue_Seiko_5_Watch.jpg', 900),
      description: 'The value benchmark of automatic watchmaking — day-date function, a visible balance wheel, and a reputation built on decades of reliability.' },

    { id: 'cartier-santos', brand: 'Cartier', model: 'Santos', ref: 'de Cartier', category: 'Dress', price: 7850, theme: 2,
      movement: 'Automatic', caseSize: '39.8mm steel', waterResist: '100m', strap: 'Steel bracelet with QuickSwitch',
      image: commons('Cartier_Santos_wristwatch.jpg', 900),
      description: 'Designed in 1904 for aviator Alberto Santos-Dumont — arguably the first modern wristwatch, and still one of the most-copied case shapes in the industry.' },

    { id: 'cartier-tank', brand: 'Cartier', model: 'Tank Solo', ref: 'XL 3800', category: 'Dress', price: 3550, theme: 3,
      movement: 'Quartz', caseSize: '31mm steel', waterResist: '30m', strap: 'Leather strap',
      image: commons('Cartier_Tank_Solo_XL_ref._3800.jpg', 900),
      description: 'Inspired by the aerial view of a WWI Renault tank in 1917 — bold Roman numerals, a chemin-de-fer track, and blued sword hands on a rectangular case.' },

    { id: 'tissot-couturier', brand: 'Tissot', model: 'Couturier', ref: 'Chronograph', category: 'Chronograph', price: 650, theme: 1,
      movement: 'Quartz chronograph', caseSize: '41mm steel', waterResist: '100m', strap: 'Steel bracelet',
      image: commons('Tissot_Couturier_watch_on_hand.jpg', 900),
      description: 'A clean, city-ready chronograph from Switzerland\'s highest-volume watchmaker — three sub-dials, a tachymeter bezel, and a reasonable price of entry.' },

    { id: 'breitling-navitimer', brand: 'Breitling', model: 'Navitimer B01', ref: 'Chronograph 41', category: 'Chronograph', price: 9400, theme: 4,
      movement: 'Automatic chronograph', caseSize: '41mm steel', waterResist: '30m', strap: 'Steel bracelet',
      image: commons('Breitling_Navitimer_chronograph_watch%2C_black_dial_and_golden_casing.jpg', 900),
      description: 'Introduced in 1952 for pilots, with a circular slide-rule bezel that can still compute fuel burn and airspeed — the watch that outlasted the instrument panel.' },

    { id: 'longines-diver', brand: 'Longines', model: 'Heritage Diver', ref: '1967 Re-edition', category: 'Diver', price: 2750, theme: 6,
      movement: 'Automatic', caseSize: '42mm steel', waterResist: '300m', strap: 'Steel bracelet',
      image: commons('Longines_Heritage_Diver_Chronograph_1967.jpg', 900),
      description: 'A faithful re-edition of a late-1960s dive chronograph — a vintage case profile and dial layout brought back with modern water resistance.' },

    { id: 'apple-watch-sport', brand: 'Apple', model: 'Watch Sport', ref: '38mm', category: 'Smartwatch', price: 249, theme: 5,
      movement: 'Smart / digital display', caseSize: '38mm aluminum', waterResist: 'Splash resistant', strap: 'Sport band',
      image: commons('Apple_Watch_Sport_-_38mm_Space_Gray_(3768).jpg', 900),
      description: 'The watch that brought fitness tracking, notifications, and app pairing to the wrist — an aluminum case built for daily, all-day wear.' },

    { id: 'hamilton-khaki', brand: 'Hamilton', model: 'Khaki Field X-Patrol', ref: 'Chronograph H21', category: 'Field', price: 945, theme: 3,
      movement: 'Automatic chronograph', caseSize: '44mm steel', waterResist: '100m', strap: 'Leather strap',
      image: commons('Hamilton_Khaki_X-Patrol-Chronograph_H21_(cropped).jpg', 900),
      description: 'Military-inspired legibility from a brand that once supplied watches to the U.S. armed forces — high-contrast dial, coin-edge bezel, tool-watch proportions.' },

    { id: 'citizen-ecodrive', brand: 'Citizen', model: 'Eco-Drive Diver', ref: "200m", category: 'Diver', price: 450, theme: 6,
      movement: 'Light-powered quartz (Eco-Drive)', caseSize: '42mm steel', waterResist: '200m', strap: 'Rubber strap',
      image: commons("Citizen_Eco-Drive_Diver's_200m_-_Diving_watch_(without_background)_(cropped).jpg", 900),
      description: 'Powered by any light source, never a battery change — a dive-rated case with the light-capturing Eco-Drive cell built invisibly behind the dial.' },

    { id: 'garmin-venu3', brand: 'Garmin', model: 'Venu 3', ref: 'GPS Smartwatch', category: 'Smartwatch', price: 450, theme: 5,
      movement: 'Smart / AMOLED display', caseSize: '45mm fiber-reinforced polymer', waterResist: '5 ATM', strap: 'Silicone band',
      image: commons('Garmin_Venu_3_(b).JPG', 900),
      description: 'A GPS fitness smartwatch built around a bright AMOLED display, on-wrist health tracking, and battery life measured in days rather than hours.' },
  ];

  const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const byId = id => PRODUCTS.find(p => p.id === id);
  const money = n => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  /* ---------------------------------------------------------
     2) MEDIA — real <img> with graceful failure handling.
     If a hotlinked photo fails to load, swap to a styled
     fallback (brand + model on a themed gradient) instead of
     a broken-image icon, and keep the layout intact.
  --------------------------------------------------------- */
  function mediaHtml(p, imgClass) {
    const initials = (p.brand[0] + (p.model.match(/[A-Z]/g)?.[1] || p.model[0])).toUpperCase();
    const label = p.model.toLowerCase().startsWith(p.brand.toLowerCase()) ? p.model : `${p.brand} ${p.model}`;
    return `
      <div class="media-frame">
        <img class="${imgClass || ''}" src="${p.image}" alt="${p.brand} ${p.model}" loading="lazy"
             onerror="this.classList.add('is-hidden'); this.nextElementSibling.classList.add('is-visible');">
        <div class="media-fallback" style="--accent:${themeAccent(p.theme)}">
          <strong>${initials}</strong>
          <span>${label}</span>
        </div>
      </div>`;
  }
  function themeAccent(theme) {
    const map = { 1: '#8A5A32', 2: '#8A5A32', 3: '#2F5D50', 4: '#C9A227', 5: '#5C6F9C', 6: '#8FA88C' };
    return map[theme] || '#8A5A32';
  }

  /* ---------------------------------------------------------
     3) CART — state, persistence, rendering
  --------------------------------------------------------- */
  const CART_KEY = 'vesper_cart_v1';
  let cart = loadCart();

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter(i => byId(i.id)) : [];
    } catch (e) { return []; }
  }
  function saveCart() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} }

  function addToCart(id, qty) {
    qty = qty || 1;
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += qty;
    else cart.push({ id, qty });
    saveCart(); renderCart(); bumpCartCount();
    showToast(`Added ${byId(id).brand} ${byId(id).model} to your bag`);
  }
  function removeFromCart(id) { cart = cart.filter(i => i.id !== id); saveCart(); renderCart(); }
  function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) { removeFromCart(id); return; }
    saveCart(); renderCart();
  }
  function cartTotals() {
    let count = 0, subtotal = 0;
    cart.forEach(i => { const p = byId(i.id); if (!p) return; count += i.qty; subtotal += p.price * i.qty; });
    return { count, subtotal };
  }

  const cartItemsEl = document.getElementById('cartItems');
  const cartEmptyEl = document.getElementById('cartEmpty');
  const cartSummaryEl = document.getElementById('cartSummary');
  const cartCountEl = document.getElementById('cartCount');
  const cartSubtotalEl = document.getElementById('cartSubtotal');

  function renderCart() {
    const { count, subtotal } = cartTotals();
    cartCountEl.textContent = count;
    cartSubtotalEl.textContent = money(subtotal);

    if (!cart.length) {
      cartItemsEl.innerHTML = '';
      cartEmptyEl.classList.add('is-visible');
      cartSummaryEl.classList.add('is-hidden');
      return;
    }
    cartEmptyEl.classList.remove('is-visible');
    cartSummaryEl.classList.remove('is-hidden');

    cartItemsEl.innerHTML = cart.map(item => {
      const p = byId(item.id);
      if (!p) return '';
      return `
      <div class="cart-item" data-id="${p.id}">
        <div class="cart-item-media">${mediaHtml(p)}</div>
        <div class="cart-item-info">
          <span class="cart-item-name">${p.brand} ${p.model}</span>
          <span class="cart-item-meta">${p.ref} · ${p.category}</span>
          <div class="cart-item-foot">
            <div class="qty-stepper">
              <button type="button" class="qty-dec" aria-label="Decrease quantity">−</button>
              <span>${item.qty}</span>
              <button type="button" class="qty-inc" aria-label="Increase quantity">+</button>
            </div>
            <span class="cart-item-price">${money(p.price * item.qty)}</span>
          </div>
          <button type="button" class="cart-item-remove">Remove</button>
        </div>
      </div>`;
    }).join('');
  }

  cartItemsEl.addEventListener('click', (e) => {
    const row = e.target.closest('.cart-item');
    if (!row) return;
    const id = row.dataset.id;
    if (e.target.classList.contains('qty-inc')) changeQty(id, 1);
    else if (e.target.classList.contains('qty-dec')) changeQty(id, -1);
    else if (e.target.classList.contains('cart-item-remove')) removeFromCart(id);
  });

  function bumpCartCount() {
    cartCountEl.classList.remove('bump');
    void cartCountEl.offsetWidth;
    cartCountEl.classList.add('bump');
  }

  const cartDrawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('overlay');
  function openCart() { cartDrawer.classList.add('is-open'); overlay.classList.add('is-open'); cartDrawer.setAttribute('aria-hidden', 'false'); }
  function closeCart() { cartDrawer.classList.remove('is-open'); overlay.classList.remove('is-open'); cartDrawer.setAttribute('aria-hidden', 'true'); }
  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartEmptyBrowse').addEventListener('click', () => { closeCart(); document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' }); });
  overlay.addEventListener('click', () => { closeCart(); closeSearch(); });

  /* ---------------------------------------------------------
     4) SHOWCASE — dynamic themed sections
  --------------------------------------------------------- */
  const showcaseEl = document.getElementById('showcase');
  function renderShowcase() {
    showcaseEl.innerHTML = PRODUCTS.map((p, i) => `
      <article class="showcase-section theme-${p.theme} ${i % 2 ? 'flip' : ''}" data-id="${p.id}">
        <div class="showcase-inner">
          <div class="showcase-media">
            <span class="showcase-index">N°${String(i + 1).padStart(2, '0')} / ${String(PRODUCTS.length).padStart(2, '0')}</span>
            <div class="showcase-media-bg" aria-hidden="true"></div>
            <div class="showcase-shoe">${mediaHtml(p)}</div>
          </div>
          <div class="showcase-text">
            <p class="eyebrow reveal">${p.category}</p>
            <p class="showcase-model reveal">${p.brand} · Ref. ${p.ref}</p>
            <h2 class="showcase-name reveal">${p.model}</h2>
            <p class="showcase-colorway reveal">${p.movement}</p>
            <p class="showcase-desc reveal">${p.description}</p>
            <div class="spec-plate reveal">
              <div><span>Price</span><span>${money(p.price)}</span></div>
              <div><span>Case</span><span>${p.caseSize}</span></div>
              <div><span>Water Resist</span><span>${p.waterResist}</span></div>
              <div><span>Strap</span><span>${p.strap}</span></div>
            </div>
            <div class="showcase-actions reveal">
              <span class="showcase-price">${money(p.price)}</span>
              <button type="button" class="btn btn-primary showcase-add" data-id="${p.id}">Add to Bag</button>
              <button type="button" class="btn btn-ghost showcase-view" data-id="${p.id}">Quick View</button>
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  showcaseEl.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.showcase-add');
    const viewBtn = e.target.closest('.showcase-view');
    if (addBtn) addToCart(addBtn.dataset.id);
    if (viewBtn) openQuickView(viewBtn.dataset.id);
  });

  /* ---------------------------------------------------------
     5) CATALOG — cards, search, filter, sort
  --------------------------------------------------------- */
  const catalogGrid = document.getElementById('catalogGrid');
  const resultCountEl = document.getElementById('resultCount');
  const emptyStateEl = document.getElementById('emptyState');
  const categoryChips = document.getElementById('categoryChips');
  const priceFilter = document.getElementById('priceFilter');
  const sortSelect = document.getElementById('sortSelect');
  const searchInput = document.getElementById('searchInput');

  let favorites = new Set();
  let state = { search: '', category: 'All', price: 'all', sort: 'featured' };

  function buildChips() {
    categoryChips.innerHTML = CATEGORIES.map((c, i) =>
      `<button type="button" class="chip ${i === 0 ? 'is-active' : ''}" data-cat="${c}">${c}</button>`
    ).join('');
  }

  function cardTemplate(p) {
    return `
    <article class="card" data-id="${p.id}">
      <div class="card-media">
        <span class="card-tag">${p.category}</span>
        <button type="button" class="card-fav ${favorites.has(p.id) ? 'is-active' : ''}" aria-label="Save to favorites" data-id="${p.id}">
          <svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 21s-7.5-4.9-10-9.3C.4 8.3 2.3 4.7 6 4.2c2.1-.3 4 .8 6 3 2-2.2 3.9-3.3 6-3 3.7.5 5.6 4.1 4 7.5C19.5 16.1 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
        </button>
        ${mediaHtml(p)}
      </div>
      <div class="card-body">
        <span class="card-cat">${p.brand}</span>
        <span class="card-name">${p.model}</span>
        <span class="card-colorway">${p.ref}</span>
        <div class="card-foot">
          <span class="card-price">${money(p.price)}</span>
          <div class="card-actions">
            <button type="button" class="card-quick" data-id="${p.id}" aria-label="Quick view ${p.brand} ${p.model}">
              <svg width="15" height="15" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>
            </button>
            <button type="button" class="card-add" data-id="${p.id}" aria-label="Add ${p.brand} ${p.model} to cart">
              <svg width="15" height="15" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2"/><line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2"/></svg>
            </button>
          </div>
        </div>
      </div>
    </article>`;
  }

  function getFiltered() {
    let list = PRODUCTS.slice();
    const q = state.search.trim().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.brand.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.ref.toLowerCase().includes(q)
      );
    }
    if (state.category !== 'All') list = list.filter(p => p.category === state.category);
    if (state.price !== 'all') {
      const [min, max] = state.price.split('-').map(Number);
      list = list.filter(p => p.price >= min && p.price <= max);
    }
    switch (state.sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name-asc': list.sort((a, b) => a.model.localeCompare(b.model)); break;
      case 'name-desc': list.sort((a, b) => b.model.localeCompare(a.model)); break;
      default: break;
    }
    return list;
  }

  function renderCatalog() {
    const list = getFiltered();
    resultCountEl.textContent = list.length;
    catalogGrid.innerHTML = list.map(cardTemplate).join('');
    emptyStateEl.hidden = list.length !== 0;
    catalogGrid.hidden = list.length === 0;
  }

  searchInput.addEventListener('input', () => { state.search = searchInput.value; renderCatalog(); });

  categoryChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    state.category = chip.dataset.cat;
    [...categoryChips.children].forEach(c => c.classList.toggle('is-active', c === chip));
    renderCatalog();
  });

  priceFilter.addEventListener('change', () => { state.price = priceFilter.value; renderCatalog(); });
  sortSelect.addEventListener('change', () => { state.sort = sortSelect.value; renderCatalog(); });

  document.querySelectorAll('[data-cat]').forEach(link => {
    if (link.tagName === 'A') {
      link.addEventListener('click', (e) => {
        const cat = link.dataset.cat;
        if (!cat || !CATEGORIES.includes(cat)) return;
        state.category = cat;
        [...categoryChips.children].forEach(c => c.classList.toggle('is-active', c.dataset.cat === cat));
        renderCatalog();
      });
    }
  });

  catalogGrid.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.card-fav');
    const quickBtn = e.target.closest('.card-quick');
    const addBtn = e.target.closest('.card-add');
    if (favBtn) {
      const id = favBtn.dataset.id;
      favorites.has(id) ? favorites.delete(id) : favorites.add(id);
      favBtn.classList.toggle('is-active');
      return;
    }
    if (quickBtn) openQuickView(quickBtn.dataset.id);
    if (addBtn) addToCart(addBtn.dataset.id);
  });

  /* ---------------------------------------------------------
     6) QUICK VIEW MODAL
  --------------------------------------------------------- */
  const quickViewOverlay = document.getElementById('quickViewOverlay');
  const quickViewBody = document.getElementById('quickViewBody');
  let qvQty = 1;

  function openQuickView(id) {
    const p = byId(id);
    if (!p) return;
    qvQty = 1;
    quickViewBody.innerHTML = `
      <div class="qv-media">${mediaHtml(p)}</div>
      <div>
        <p class="qv-model">${p.brand} · Ref. ${p.ref} · ${p.category}</p>
        <h2 class="qv-name">${p.model}</h2>
        <p class="qv-price">${money(p.price)}</p>
        <p class="qv-desc">${p.description}</p>
        <div class="qv-specs">
          <div><span>Movement</span><span>${p.movement}</span></div>
          <div><span>Case</span><span>${p.caseSize}</span></div>
          <div><span>Water Resist</span><span>${p.waterResist}</span></div>
          <div><span>Strap</span><span>${p.strap}</span></div>
        </div>
        <div class="qv-actions">
          <div class="qty-stepper" id="qvQtyStepper">
            <button type="button" class="qv-qty-dec" aria-label="Decrease quantity">−</button>
            <span id="qvQtyValue">1</span>
            <button type="button" class="qv-qty-inc" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="btn btn-primary qv-add" data-id="${p.id}">Add to Bag</button>
          <button type="button" class="btn btn-ghost qv-close-alt">Keep Browsing</button>
        </div>
      </div>`;
    quickViewOverlay.classList.add('is-open');
  }
  function closeQuickView() { quickViewOverlay.classList.remove('is-open'); }
  document.getElementById('quickViewClose').addEventListener('click', closeQuickView);
  quickViewOverlay.addEventListener('click', (e) => { if (e.target === quickViewOverlay) closeQuickView(); });
  quickViewBody.addEventListener('click', (e) => {
    const incBtn = e.target.closest('.qv-qty-inc');
    const decBtn = e.target.closest('.qv-qty-dec');
    const addBtn = e.target.closest('.qv-add');
    const closeAlt = e.target.closest('.qv-close-alt');
    if (incBtn) { qvQty += 1; document.getElementById('qvQtyValue').textContent = qvQty; }
    if (decBtn) { qvQty = Math.max(1, qvQty - 1); document.getElementById('qvQtyValue').textContent = qvQty; }
    if (addBtn) { addToCart(addBtn.dataset.id, qvQty); closeQuickView(); }
    if (closeAlt) closeQuickView();
  });

  /* ---------------------------------------------------------
     7) CHECKOUT
  --------------------------------------------------------- */
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const checkoutItemsEl = document.getElementById('checkoutItems');
  const ckSubtotalEl = document.getElementById('ckSubtotal');
  const ckTotalEl = document.getElementById('ckTotal');
  const checkoutForm = document.getElementById('checkoutForm');

  function openCheckout() {
    if (!cart.length) { showToast('Your bag is empty'); return; }
    const { subtotal } = cartTotals();
    checkoutItemsEl.innerHTML = cart.map(i => {
      const p = byId(i.id);
      return `<div class="ck-line"><span>${p.brand} ${p.model} × ${i.qty}</span><span>${money(p.price * i.qty)}</span></div>`;
    }).join('');
    ckSubtotalEl.textContent = money(subtotal);
    ckTotalEl.textContent = money(subtotal);
    closeCart();
    checkoutOverlay.classList.add('is-open');
  }
  function closeCheckout() { checkoutOverlay.classList.remove('is-open'); }
  document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
  document.getElementById('checkoutClose').addEventListener('click', closeCheckout);
  checkoutOverlay.addEventListener('click', (e) => { if (e.target === checkoutOverlay) closeCheckout(); });

  const FIELD_VALIDATORS = {
    ckName: v => v.trim().length >= 2 || 'Enter your full name.',
    ckEmail: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.',
    ckPhone: v => v.replace(/\D/g, '').length >= 7 || 'Enter a valid phone number.',
    ckAddress: v => v.trim().length >= 4 || 'Enter your street address.',
    ckCity: v => v.trim().length >= 2 || 'Enter your city.',
    ckPostal: v => v.trim().length >= 3 || 'Enter a valid postal code.',
  };

  function validateField(id) {
    const input = document.getElementById(id);
    const errorEl = document.querySelector(`.field-error[data-for="${id}"]`);
    const result = FIELD_VALIDATORS[id](input.value);
    if (result === true) { input.classList.remove('is-invalid'); errorEl.textContent = ''; return true; }
    input.classList.add('is-invalid'); errorEl.textContent = result; return false;
  }
  Object.keys(FIELD_VALIDATORS).forEach(id => {
    document.getElementById(id).addEventListener('blur', () => validateField(id));
  });

  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = Object.keys(FIELD_VALIDATORS).map(validateField).every(Boolean);
    if (!allValid) { showToast('Please fix the highlighted fields'); return; }
    const payment = checkoutForm.querySelector('input[name="payment"]:checked').value;
    const { count, subtotal } = cartTotals();
    const orderNum = 'VSP-' + Math.floor(100000 + Math.random() * 899999);

    document.getElementById('confirmOrderNum').textContent = orderNum;
    document.getElementById('confirmItemCount').textContent = `${count} item${count !== 1 ? 's' : ''} · ${payment}`;
    document.getElementById('confirmTotal').textContent = money(subtotal);
    const days = 3 + Math.floor(Math.random() * 4);
    document.getElementById('confirmDelivery').textContent = `${days}–${days + 2} business days`;

    cart = []; saveCart(); renderCart();
    checkoutForm.reset();
    closeCheckout();
    document.getElementById('confirmOverlay').classList.add('is-open');
  });
  document.getElementById('confirmClose').addEventListener('click', () => {
    document.getElementById('confirmOverlay').classList.remove('is-open');
  });

  /* ---------------------------------------------------------
     8) TOAST
  --------------------------------------------------------- */
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2400);
  }

  /* ---------------------------------------------------------
     9) NAV, MOBILE MENU, SEARCH BAR
  --------------------------------------------------------- */
  const nav = document.getElementById('siteNav');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  function toggleMenu() {
    const open = mobileMenu.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  }
  menuToggle.addEventListener('click', toggleMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', toggleMenu));

  const searchToggle = document.getElementById('searchToggle');
  const searchBar = document.getElementById('searchBar');
  const searchClose = document.getElementById('searchClose');
  function openSearch() {
    searchBar.classList.add('is-open');
    searchToggle.setAttribute('aria-expanded', 'true');
    setTimeout(() => document.getElementById('searchInput').focus(), 200);
  }
  function closeSearch() { searchBar.classList.remove('is-open'); searchToggle.setAttribute('aria-expanded', 'false'); }
  searchToggle.addEventListener('click', () => searchBar.classList.contains('is-open') ? closeSearch() : openSearch());
  searchClose.addEventListener('click', closeSearch);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSearch(); closeCart(); closeQuickView(); closeCheckout(); }
  });
  document.getElementById('searchInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' }); closeSearch(); }
  });

  let lastScrollY = window.scrollY;
  const darkSections = () => document.querySelectorAll('.showcase-section.theme-4, .showcase-section.theme-6, .about');

  function updateNavAppearance() {
    const y = window.scrollY;
    nav.classList.toggle('nav-hidden', y > lastScrollY && y > 200);
    lastScrollY = y;

    let overDark = false;
    darkSections().forEach(sec => {
      const r = sec.getBoundingClientRect();
      if (r.top < 90 && r.bottom > 90) overDark = true;
    });
    nav.classList.toggle('nav-dark', overDark);
  }
  window.addEventListener('scroll', () => requestAnimationFrame(updateNavAppearance), { passive: true });

  /* ---------------------------------------------------------
     10) SCROLL REVEAL (IntersectionObserver)
  --------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); } });
  }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });

  function observeReveals() {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  /* ---------------------------------------------------------
     11) MOTION — hero float + mouse-follow tilt on showcase
     media + cursor glow. Skipped on touch / reduced-motion.
  --------------------------------------------------------- */
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canHover && !reduceMotion) {
    const glow = document.getElementById('cursorGlow');
    const heroMedia = document.getElementById('heroMedia');

    window.addEventListener('mousemove', (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      glow.classList.add('is-active');

      const hero = document.getElementById('hero');
      const r = hero.getBoundingClientRect();
      if (e.clientY < r.bottom) {
        const dx = (e.clientX - r.width / 2) / r.width;
        const dy = (e.clientY - r.height / 2) / r.height;
        heroMedia.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`;
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => glow.classList.remove('is-active'));

    document.addEventListener('mousemove', (e) => {
      const sections = document.querySelectorAll('.showcase-section');
      sections.forEach(sec => {
        const r = sec.getBoundingClientRect();
        if (r.top > window.innerHeight || r.bottom < 0) return;
        const media = sec.querySelector('.showcase-shoe');
        if (!media) return;
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
          media.style.transform = '';
          return;
        }
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        media.style.transform = `rotateY(${dx * 10}deg) rotateX(${-dy * 8}deg) scale(1.03)`;
      });
    }, { passive: true });
  }

  function initScrollParallax() {
    if (reduceMotion) return;
    const media = document.querySelectorAll('.showcase-shoe');
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        media.forEach(m => {
          const r = m.closest('.showcase-section').getBoundingClientRect();
          const progress = 1 - Math.min(Math.max((r.top) / window.innerHeight, -1), 1);
          m.style.marginTop = `${(progress - 0.5) * -14}px`;
        });
      });
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     12) INIT
  --------------------------------------------------------- */
  function init() {
    document.getElementById('year').textContent = new Date().getFullYear();
    buildChips();
    renderShowcase();
    renderCatalog();
    renderCart();
    observeReveals();
    initScrollParallax();

    // Hero media = first product's photo
    const heroImg = document.getElementById('heroImg');
    const heroFallback = document.getElementById('heroFallback');
    const heroProduct = PRODUCTS[0];
    heroImg.src = heroProduct.image;
    heroImg.alt = `${heroProduct.brand} ${heroProduct.model}`;
    heroImg.addEventListener('error', () => {
      heroImg.style.display = 'none';
      heroFallback.hidden = false;
      heroFallback.textContent = `${heroProduct.brand} ${heroProduct.model}`;
    });

    document.getElementById('scrollCue').addEventListener('click', () => {
      document.getElementById('showcase').scrollIntoView({ behavior: 'smooth' });
    });

    setTimeout(observeReveals, 50);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
