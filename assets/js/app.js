/* ============================================================================
 *  Country Rose Cafe — site behaviour (vanilla JS, no build step)
 *  Works from file:// (double-click index.html) and on any static host.
 * ========================================================================== */
(function () {
  "use strict";

  var C = window.CRC_CONFIG;
  var I18N = window.CRC_I18N || { lang: "en", t: function (x) { return x; }, L: function (e) { return e; }, apply: function () { } };
  var ES = I18N.lang === "es", t = I18N.t, L = I18N.L;
  var MENU = window.CRC_MENU || [];
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ------------------------------------------------------------------ icons */
  var P = {
    plus: '<path d="M12 5v14M5 12h14"/>', minus: '<path d="M5 12h14"/>',
    trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    plate: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/>',
  };
  function icon(n, cls) { return '<svg class="icon' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + P[n] + "</svg>"; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function money(c, from) { return "$" + (c / 100).toFixed(2) + (from ? "+" : ""); }

  /* ---------------------------------------------------------------- menu index */
  var ITEMS = {}, CAT_OF = {}, ALL = [];
  MENU.forEach(function (s) { s.categories.forEach(function (c) { c.items.forEach(function (i) { ITEMS[i.id] = i; CAT_OF[i.id] = { cat: c, sec: s }; ALL.push(i); }); }); });
  var SIDE_CATS = ["breakfast-sides", "lunch-sides", "sodas-drinks"];
  var MAINS = ALL.filter(function (i) { return SIDE_CATS.indexOf(CAT_OF[i.id].cat.id) < 0; });
  function byName(n) { return ALL.find(function (i) { return i.name === n; }); }
  function text(i) { return (i.name + " " + (i.descEn || "") + " " + (i.description || "")).toLowerCase(); }

  /* ------------------------------------------------------ photos & placeholders */
  function placeholderHTML(label, path) {
    return '<div class="placeholder" role="img" aria-label="Photo placeholder: ' + esc(label) + '"><div class="placeholder-card">' + icon("camera") +
      "<strong>" + esc(label) + "</strong><span>Owner photo needed</span>" + (path ? "<code>" + esc(path) + "</code>" : "") + "</div></div>";
  }
  function swap(img) {
    if (img.dataset.swapped) return; img.dataset.swapped = "1";
    var t = document.createElement("div"); t.innerHTML = placeholderHTML(img.dataset.label || img.alt, img.dataset.path);
    var btn = img.closest(".g-item"); if (btn) btn.classList.add("is-ph");
    img.replaceWith(t.firstChild);
  }
  function initPhotos(root) {
    $$("img.photo", root).forEach(function (img) {
      if (img.complete) { if (img.naturalWidth === 0) swap(img); return; }
      img.classList.add("loading");
      img.addEventListener("load", function () { img.classList.remove("loading"); });
      img.addEventListener("error", function () { swap(img); });
    });
  }

  /* ---------------------------------------------------------------------- cart */
  var KEY = "crc-cart-v1", MAX_QTY = 20, mem = [];
  function read() {
    try { var a = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(a) ? a.filter(function (l) { return ITEMS[l.id] && l.qty > 0; }) : []; }
    catch (e) { return mem.slice(); }
  }
  function write(lines) { mem = lines; try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch (e) { } document.dispatchEvent(new CustomEvent("cart:change")); }
  var Cart = {
    lines: read,
    qty: function (id) { var l = read().find(function (x) { return x.id === id; }); return l ? l.qty : 0; },
    add: function (id) { var ls = read(), l = ls.find(function (x) { return x.id === id; }); if (l) l.qty = Math.min(MAX_QTY, l.qty + 1); else ls.push({ id: id, qty: 1 }); write(ls); toast(ITEMS[id].name); pop(); },
    set: function (id, q) { var ls = read(); ls = q <= 0 ? ls.filter(function (x) { return x.id !== id; }) : ls.map(function (x) { if (x.id === id) x.qty = Math.min(MAX_QTY, q); return x; }); write(ls); },
    clear: function () { write([]); },
    count: function () { return read().reduce(function (n, l) { return n + l.qty; }, 0); },
    subtotal: function () { return read().reduce(function (n, l) { return n + ITEMS[l.id].price * l.qty; }, 0); },
  };
  function badges() {
    var n = Cart.count();
    $$("[data-cart-count]").forEach(function (b) { b.textContent = n; b.hidden = n === 0; });
    $$("[data-cart-link]").forEach(function (a) { a.setAttribute("aria-label", "View order, " + n + " item" + (n === 1 ? "" : "s")); });
  }
  function pop() { $$("[data-cart-count]").forEach(function (b) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }); }
  var tt;
  function toast(name) {
    var w = $("#toast"); if (!w) return;
    w.innerHTML = '<div class="toast">' + icon("check") + "<span>Added <strong>" + esc(name) + "</strong></span>" + (document.body.dataset.page === "order" ? "" : '<a href="order.html#cart">View order (' + Cart.count() + ")</a>") + "</div>";
    clearTimeout(tt); tt = setTimeout(function () { w.innerHTML = ""; }, 3200);
  }
  function addCtl(item) {
    var q = Cart.qty(item.id);
    if (!q) return '<button type="button" class="add-btn" data-add="' + item.id + '" aria-label="Add ' + esc(item.name) + ' to order">' + icon("plus") + " Add</button>";
    return '<div class="stepper" role="group" aria-label="' + esc(item.name) + ' quantity"><button type="button" data-dec="' + item.id + '" aria-label="' + (q === 1 ? "Remove " : "Decrease ") + esc(item.name) + '">' + icon("minus") + "</button><output>" + q + '</output><button type="button" data-add="' + item.id + '" aria-label="Increase ' + esc(item.name) + '"' + (q >= MAX_QTY ? " disabled" : "") + ">" + icon("plus") + "</button></div>";
  }
  function slot(item) { return '<div data-add-slot="' + item.id + '">' + addCtl(item) + "</div>"; }
  function refreshSlots() {
    $$("[data-add-slot]").forEach(function (s) {
      var had = s.contains(document.activeElement), dec = had && document.activeElement.hasAttribute("data-dec");
      s.innerHTML = addCtl(ITEMS[s.dataset.addSlot]);
      if (had) { var el = s.querySelector(dec ? "[data-dec]" : "[data-add]") || s.querySelector("button"); if (el) el.focus(); }
    });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-add]"); if (a) { Cart.add(a.dataset.add); return; }
    var d = e.target.closest("[data-dec]"); if (d) { Cart.set(d.dataset.dec, Cart.qty(d.dataset.dec) - 1); return; }
    var r = e.target.closest("[data-remove]"); if (r) Cart.set(r.dataset.remove, 0);
  });
  document.addEventListener("cart:change", function () { badges(); refreshSlots(); });

  /* ---------------------------------------------------------------- nav & sheet */
  function initNav() {
    var shell = $(".nav-shell");
    var on = function () { shell.classList.toggle("scrolled", scrollY > 10); };
    addEventListener("scroll", on, { passive: true }); on();
    var btn = $(".menu-toggle"), sheet = $("#sheet"); if (!btn || !sheet) return;
    var closeBtn = $(".sheet-close", sheet);
    function set(open) {
      sheet.hidden = !open; btn.setAttribute("aria-expanded", String(open)); document.body.style.overflow = open ? "hidden" : "";
      if (open) closeBtn.focus(); else btn.focus();
    }
    btn.addEventListener("click", function () { set(true); });
    closeBtn.addEventListener("click", function () { set(false); });
    sheet.addEventListener("click", function (e) { if (e.target.closest("nav a")) { sheet.hidden = true; document.body.style.overflow = ""; } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !sheet.hidden) set(false); });
  }

  /* -------------------------------------------------------------------- reveal */
  function initReveal() {
    var els = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* --------------------------------------------------------------------- hours */
  function initHours() {
    $$("[data-hours]").forEach(function (el) {
      el.innerHTML = C.hoursVerified
        ? '<dl class="hours-list">' + C.hours.map(function (h) { return "<dt>" + esc(h.day) + "</dt><dd>" + esc(h.hours || "Closed") + "</dd>"; }).join("") + "</dl>"
        : L('<p>Serving <strong>breakfast &amp; lunch</strong>. <a class="link" href="' + C.phone.href + '">Call ' + esc(C.phone.display) + "</a> for today&#39;s hours.</p>",
            '<p>Servimos <strong>desayuno y almuerzo</strong>. <a class="link" href="' + C.phone.href + '">Llama al ' + esc(C.phone.display) + "</a> para el horario de hoy.</p>") +
          (C.demoMode ? '<p class="hours-note">' + L("Weekly hours [PLACEHOLDER — VERIFY WITH RESTAURANT]", "Horario semanal [PENDIENTE — VERIFICAR CON EL RESTAURANTE]") + "</p>" : "");
    });
  }

  /* ------------------------------------------------------------------- marquee */
  function initMarquee() {
    $$("[data-marquee]").forEach(function (m, k) {
      var names = (k % 2 ? MAINS.slice().reverse() : MAINS).filter(function (_, i) { return i % 3 === k % 3; }).slice(0, 22).map(function (i) { return "<span>" + esc(i.name) + "</span>"; }).join("");
      m.innerHTML = names + names.replace(/<span>/g, '<span aria-hidden="true">');
    });
  }

  /* ---------------------------------------------------------- highlights rail */
  var HIGHLIGHTS = ["Pancakes Combo", "Super Breakfast Burrito", "Hollister Heat Pile", "John Wayne Omelet", "Hector’s Chilaquiles", "Bacon Cheeseburger", "Cowboy Scramble", "Nashville Double Smashburger", "Big Country Cakes (3)", "Rancher Burger"];
  var ROSE_DECO = '<svg class="deco" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6c9 0 16 6.4 16 15.2C40 31 32.4 38 24 38S8 31 8 21.2C8 12.4 15 6 24 6z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M24 13c4.8 0 8.4 3.6 8.4 8.2 0 4.8-4 8.4-8.4 8.4s-6-2.8-6-6.2c0-3.2 2.4-5.2 5.2-5.2" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  function initRail() {
    var rail = $("#rail"); if (!rail) return;
    rail.innerHTML = HIGHLIGHTS.map(byName).filter(Boolean).map(function (i, n) {
      return '<article class="plate">' + ROSE_DECO + '<span class="num">No. ' + String(n + 1).padStart(2, "0") + " · " + esc(CAT_OF[i.id].cat.name) + "</span><h3>" + esc(i.name) + "</h3>" +
        (i.description ? "<p>" + esc(i.description) + "</p>" : "") + '<div class="foot"><span class="price">' + money(i.price) + "</span>" + slot(i) + "</div></article>";
    }).join("");
    var prev = $("[data-rail-prev]"), next = $("[data-rail-next]");
    function by(dir) { rail.scrollBy({ left: dir * (rail.clientWidth * 0.8), behavior: reduceMotion ? "auto" : "smooth" }); }
    if (prev) prev.addEventListener("click", function () { by(-1); });
    if (next) next.addEventListener("click", function () { by(1); });
  }

  /* ----------------------------------------------------------- craving picker */
  var MOODS = [
    { id: "sweet", label: "Sweet", emo: "🥞", test: function (i) { return /pancake|cakes|french toast|waffle|fresh fruit|oatmeal/.test(text(i)); } },
    { id: "hearty", label: "Hearty", emo: "🥩", test: function (i) { return /steak|meat lover|big boy|gravy|pile|hash|john wayne|cowboy/.test(i.name.toLowerCase()); } },
    { id: "spicy", label: "Spicy", emo: "🌶️", test: function (i) { return /jalape|serrano|chorizo|pepper jack|heat|salsa|ortega/.test(text(i)); } },
    { id: "mexicali", label: "Mexicali", emo: "🌮", test: function (i) { return CAT_OF[i.id].cat.id === "mexicali" || /taco|enchilada|burrito|chilaquiles/.test(i.name.toLowerCase()); } },
    { id: "burger", label: "Burgers & melts", emo: "🍔", test: function (i) { return /burger|melt/.test(i.name.toLowerCase()); } },
    { id: "fresh", label: "Fresh & light", emo: "🥗", test: function (i) { return /salad|fresh fruit|veggie/.test(i.name.toLowerCase()); } },
    { id: "kids", label: "For the kids", emo: "🧒", test: function (i) { return CAT_OF[i.id].sec.id === "lil-buckaroos"; } },
  ];
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function dishHTML(i) {
    return '<article class="dish"><span class="cat">' + esc(CAT_OF[i.id].cat.name) + "</span><h3>" + esc(i.name) + "</h3>" + (i.description ? "<p>" + esc(i.description) + "</p>" : "<p></p>") +
      '<div class="foot"><span class="price">' + money(i.price, i.priceFrom) + "</span>" + slot(i) + "</div></article>";
  }
  function initCrave() {
    var box = $("#crave"); if (!box) return;
    var chips = $("#crave-chips"), out = $("#crave-results"), live = $("#crave-live"), current = MOODS[0];
    chips.innerHTML = MOODS.map(function (m, k) { return '<button type="button" class="chip" data-mood="' + m.id + '" aria-pressed="' + (k === 0) + '"><span class="emo" aria-hidden="true">' + m.emo + "</span>" + m.label + "</button>"; }).join("");
    function show(list, msg) { out.innerHTML = list.map(dishHTML).join(""); live.textContent = msg; }
    function pick(m) {
      current = m;
      $$(".chip", chips).forEach(function (c) { c.setAttribute("aria-pressed", String(c.dataset.mood === m.id)); });
      var list = shuffle(MAINS.filter(m.test)).slice(0, 3);
      show(list, m.label + ": " + list.map(function (i) { return i.name; }).join(", "));
    }
    chips.addEventListener("click", function (e) { var c = e.target.closest("[data-mood]"); if (c) pick(MOODS.find(function (m) { return m.id === c.dataset.mood; })); });
    $("#crave-surprise").addEventListener("click", function () {
      var btn = this, spins = reduceMotion ? 0 : 8, n = 0;
      $$(".chip", chips).forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
      btn.disabled = true; out.classList.add("shuffling");
      (function tick() {
        if (n++ < spins) { out.innerHTML = shuffle(MAINS).slice(0, 3).map(dishHTML).join(""); setTimeout(tick, 90); return; }
        out.classList.remove("shuffling"); btn.disabled = false;
        var list = shuffle(MAINS).slice(0, 3); show(list, "Surprise picks: " + list.map(function (i) { return i.name; }).join(", "));
      })();
    });
    pick(current);
  }

  /* ---------------------------------------------------------------- menu page */
  function hl(t, q) {
    if (!q || q.length < 2) return esc(t);
    var i = t.toLowerCase().indexOf(q.toLowerCase()); if (i < 0) return esc(t);
    return esc(t.slice(0, i)) + "<mark>" + esc(t.slice(i, i + q.length)) + "</mark>" + esc(t.slice(i + q.length));
  }
  function initMenu() {
    var root = $("#menu-browser"); if (!root) return;
    var orderable = root.dataset.orderable === "true", two = root.dataset.columns !== "1", side = $("#menu-side");
    var st = { sec: "all", q: "" };
    root.innerHTML = '<div class="menu-bar"><div class="search">' +
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
      '<label for="menu-search" class="sr-only">Search the menu</label><input id="menu-search" type="search" placeholder="Search 207 dishes — try “chorizo”, “waffle”, “burger”" autocomplete="off">' +
      '<button type="button" class="icon-btn clear" aria-label="Clear search" hidden>' + icon("close") + '</button></div>' +
      '<div class="scroller tabs" role="tablist" aria-label="Menu sections"></div><nav class="scroller jumps" aria-label="Jump to category"></nav></div>' +
      '<p class="sr-only" aria-live="polite" id="menu-live"></p><div class="menu-list" id="menu-list"></div>';
    var input = $("#menu-search", root), clear = $(".clear", root), tabs = $(".tabs", root), jumps = $(".jumps", root), list = $("#menu-list", root), live = $("#menu-live", root);
    var secs = [{ id: "all", name: "All" }].concat(MENU.map(function (s) { return { id: s.id, name: s.name }; }));

    if (side) {
      side.innerHTML = MENU.map(function (s) {
        return "<h2>" + esc(s.name) + "</h2>" + s.categories.map(function (c) { return '<a href="#cat-' + c.id + '" data-spy="' + c.id + '">' + esc(c.name) + "<span>" + c.items.length + "</span></a>"; }).join("");
      }).join("");
      side.addEventListener("click", function (e) { if (e.target.closest("a") && (st.q || st.sec !== "all")) { st.q = ""; st.sec = "all"; input.value = ""; clear.hidden = true; render(); } });
    }

    function render() {
      tabs.innerHTML = secs.map(function (s) { return '<button type="button" role="tab" class="tab" data-sec="' + s.id + '" aria-selected="' + (st.sec === s.id) + '">' + esc(s.name) + "</button>"; }).join("");
      var cats = [];
      (st.sec === "all" ? MENU : MENU.filter(function (s) { return s.id === st.sec; })).forEach(function (s) { s.categories.forEach(function (c) { cats.push({ c: c, s: s }); }); });
      var q = st.q.toLowerCase();
      if (q) cats = cats.map(function (x) { return { s: x.s, c: { id: x.c.id, name: x.c.name, note: x.c.note, items: x.c.items.filter(function (i) { return text(i).indexOf(q) > -1 || x.c.name.toLowerCase().indexOf(q) > -1; }) } }; }).filter(function (x) { return x.c.items.length; });
      jumps.hidden = !!q || cats.length < 2;
      jumps.innerHTML = cats.map(function (x) { return '<a href="#cat-' + x.c.id + '">' + esc(x.c.name) + "</a>"; }).join("");
      var total = cats.reduce(function (n, x) { return n + x.c.items.length; }, 0);
      live.textContent = q ? total + " items match " + st.q : "";
      if (!cats.length) { list.innerHTML = '<div class="empty"><p class="display-sm">Nothing matches “' + esc(st.q) + '”.</p><p class="muted" style="margin-top:.5rem">Try another word — or ask Rosie in the corner.</p><button type="button" class="btn btn-line" style="margin-top:1.25rem" data-reset>Show the full menu</button></div>'; return; }
      list.innerHTML = cats.map(function (x) {
        var c = x.c;
        return '<section class="menu-cat" id="cat-' + c.id + '" aria-labelledby="h-' + c.id + '"><div class="menu-cat-head"><div><span class="sec">' + esc(x.s.name) + '</span><h3 id="h-' + c.id + '">' + esc(c.name) + '</h3></div><span class="count">' + c.items.length + " item" + (c.items.length === 1 ? "" : "s") + "</span></div>" +
          (c.note ? '<p class="cat-note">' + esc(c.note) + "</p>" : "") + '<ul class="items' + (two ? " two" : "") + '">' + c.items.map(function (i) {
            return '<li class="item">' + (i.image ? '<div class="item-thumb"><img class="photo" src="' + esc(i.image) + '" alt="' + esc(i.name) + '" loading="lazy" data-label="' + esc(i.name) + '"></div>' : "") +
              '<div class="item-body"><div class="item-top"><h4>' + hl(i.name, st.q) + '</h4><span class="leader" aria-hidden="true"></span><span class="item-price"><span class="sr-only">Price </span>' + money(i.price, i.priceFrom) + "</span></div>" +
              (i.description ? '<p class="item-desc">' + hl(i.description, st.q) + "</p>" : "") + (orderable ? '<div class="item-actions">' + slot(i) + "</div>" : "") + "</div></li>";
          }).join("") + "</ul></section>";
      }).join("");
      initPhotos(list); spy();
    }
    tabs.addEventListener("click", function (e) { var t = e.target.closest("[data-sec]"); if (!t) return; st.sec = t.dataset.sec; render(); var s = $('[data-sec="' + st.sec + '"]', tabs); if (s) s.focus(); });
    input.addEventListener("input", function () { st.q = input.value.trim(); if (st.q) st.sec = "all"; clear.hidden = !input.value; render(); });
    clear.addEventListener("click", function () { input.value = ""; st.q = ""; clear.hidden = true; render(); input.focus(); });
    list.addEventListener("click", function (e) { if (e.target.closest("[data-reset]")) { input.value = ""; st.q = ""; st.sec = "all"; clear.hidden = true; render(); } });

    var io;
    function spy() {
      if (!side || !("IntersectionObserver" in window)) return;
      if (io) io.disconnect();
      io = new IntersectionObserver(function (en) {
        en.forEach(function (x) { if (x.isIntersecting) { $$("a", side).forEach(function (a) { a.classList.toggle("active", a.dataset.spy === x.target.id.slice(4)); }); } });
      }, { rootMargin: "-35% 0px -60% 0px" });
      $$(".menu-cat", list).forEach(function (s) { io.observe(s); });
    }
    render();
  }

  /* ------------------------------------------------------------- validation */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function okPhone(v) { var d = v.replace(/\D/g, ""); return d.length === 10 || (d.length === 11 && d[0] === "1"); }
  function showErr(form, errs) {
    $$("[data-error-for]", form).forEach(function (p) {
      var f = form.elements[p.dataset.errorFor], m = errs[p.dataset.errorFor] || ""; p.textContent = m;
      if (f && f.setAttribute) { if (m) { f.setAttribute("aria-invalid", "true"); f.setAttribute("aria-describedby", p.id); } else { f.removeAttribute("aria-invalid"); f.removeAttribute("aria-describedby"); } }
    });
    var first = Object.keys(errs)[0]; if (first && form.elements[first]) form.elements[first].focus();
    return !first;
  }
  function liveClear(form) { form.addEventListener("input", function (e) { var p = $('[data-error-for="' + e.target.name + '"]', form); if (p && p.textContent) { p.textContent = ""; e.target.removeAttribute("aria-invalid"); } }); }
  function send(endpoint, payload) {
    if (!endpoint) return Promise.resolve("demo");
    var body = Object.assign({}, payload); if (C.web3formsKey) body.access_key = C.web3formsKey;
    return fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body) })
      .then(function (r) { return r.ok ? "sent" : "error"; }).catch(function () { return "error"; });
  }
  function busy(b, on, label) { b.disabled = on; if (on) { b.dataset.l = b.innerHTML; b.innerHTML = '<span class="spinner" aria-hidden="true"></span> ' + label; } else if (b.dataset.l) b.innerHTML = b.dataset.l; }

  /* --------------------------------------------------------------- contact */
  function initContact() {
    var form = $("#contact-form"); if (!form) return; liveClear(form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements, v = { name: f.name.value.trim(), email: f.email.value.trim(), phone: f.phone.value.trim(), message: f.message.value.trim() }, st = $("#contact-status");
      st.innerHTML = "";
      if (f.company.value) { st.innerHTML = '<p class="alert alert-ok">Thanks!</p>'; return; }
      var er = {};
      if (v.name.length < 2) er.name = "Please enter your name.";
      if (!v.email) er.email = "Please enter your email address."; else if (!EMAIL.test(v.email)) er.email = "Please enter a valid email address.";
      if (v.phone && !okPhone(v.phone)) er.phone = "Please enter a valid 10-digit phone number.";
      if (v.message.length < 10) er.message = "Please write a short message (10+ characters).";
      if (!showErr(form, er)) return;
      var b = $("button[type=submit]", form); busy(b, true, "Sending…");
      send(C.contactFormEndpoint, Object.assign({ subject: "Website message from " + v.name, _subject: "Website message from " + v.name }, v)).then(function (r) {
        busy(b, false);
        if (r === "sent") { st.innerHTML = '<p class="alert alert-ok">' + L("Thank you! Your message was sent to ", "¡Gracias! Tu mensaje fue enviado a ") + esc(C.name) + ".</p>"; form.reset(); }
        else if (r === "demo") st.innerHTML = '<p class="alert alert-demo">' + L("<strong>Demo mode:</strong> your message looks great, but this form isn&#39;t connected to an inbox yet, so it was <strong>not</strong> delivered. Please call ", "<strong>Modo demostración:</strong> tu mensaje se ve muy bien, pero este formulario aún no está conectado a un buzón, así que <strong>no</strong> se envió. Por favor llama al ") + '<a class="link" href="' + C.phone.href + '">' + esc(C.phone.display) + "</a>.</p>";
        else st.innerHTML = '<p class="alert alert-err">' + L("Sorry — we couldn&#39;t send your message. Please call ", "Lo sentimos — no pudimos enviar tu mensaje. Por favor llama al ") + esc(C.phone.display) + ".</p>";
        st.focus();
      });
    });
  }

  /* ------------------------------------------------------------------ order */
  function initOrder() {
    var root = $("#order-app"); if (!root) return;
    var step = "menu", cust = {}, res = null;
    var STEPS = [["menu", "Choose"], ["details", "Details"], ["review", "Review"], ["done", "Confirmed"]];
    var views = { menu: $("#step-menu"), details: $("#step-details"), review: $("#step-review"), done: $("#step-done") }, stepsEl = $("#order-steps"), fab = $("#cart-fab");

    function cartHTML(inter) {
      var ls = Cart.lines(), n = Cart.count();
      var head = '<div class="cart-head"><h2>' + icon("bag") + " Your order</h2><span>" + n + " item" + (n === 1 ? "" : "s") + "</span></div>";
      if (!ls.length) return head + '<div class="cart-empty"><div class="plate-ico">' + icon("plate") + '</div><p class="big">Your plate is empty</p><p class="muted small" style="margin-top:.35rem">Tap “Add” on anything that looks good.</p><p class="small muted" style="margin-top:1rem">Or call <a class="link" href="' + C.phone.href + '">' + esc(C.phone.display) + "</a></p></div>";
      return head + '<ul class="cart-lines">' + ls.map(function (l) {
        var it = ITEMS[l.id];
        return '<li><div class="cl-top"><span>' + esc(it.name) + "</span><b>" + money(it.price * l.qty) + "</b></div>" + (inter
          ? '<div class="cl-bot"><div class="stepper soft" role="group" aria-label="' + esc(it.name) + ' quantity"><button type="button" data-dec="' + l.id + '" aria-label="Decrease ' + esc(it.name) + '">' + icon("minus") + "</button><output>" + l.qty + '</output><button type="button" data-add="' + l.id + '" aria-label="Increase ' + esc(it.name) + '"' + (l.qty >= MAX_QTY ? " disabled" : "") + ">" + icon("plus") + '</button></div><button type="button" class="remove-btn" data-remove="' + l.id + '" aria-label="Remove ' + esc(it.name) + '">' + icon("trash") + " Remove</button></div>"
          : '<p class="small muted">Qty ' + l.qty + " × " + money(it.price) + "</p>") + "</li>";
      }).join("") + '</ul><div class="cart-foot"><div class="subtotal"><span>Subtotal</span><b>' + money(Cart.subtotal()) + '</b></div><p class="small muted">Tax, fees &amp; any card surcharge confirmed by the restaurant.</p>' +
        (inter ? '<button type="button" class="btn btn-rose btn-block" data-go="details">Continue ' + icon("arrow", "arrow") + '</button><button type="button" class="text-btn" data-clear>Clear order</button>' : "") + "</div>";
    }
    function carts() {
      $$("[data-cart-panel]").forEach(function (el) { el.innerHTML = cartHTML(el.dataset.cartPanel === "interactive"); });
      var n = Cart.count();
      if (fab) { fab.hidden = !(step === "menu" && n > 0); fab.innerHTML = "<span>" + icon("bag") + " Review order · " + n + "</span><span>" + money(Cart.subtotal()) + "</span>"; }
      if (!n && (step === "details" || step === "review")) go("menu");
    }
    function go(s) {
      step = s;
      Object.keys(views).forEach(function (k) { views[k].hidden = k !== s; });
      var idx = STEPS.findIndex(function (x) { return x[0] === s; });
      stepsEl.innerHTML = STEPS.map(function (x, i) { return '<li class="' + (i === idx ? "cur" : i < idx ? "done" : "") + '"' + (i === idx ? ' aria-current="step"' : "") + '><span class="n">' + (i < idx ? icon("check") : i + 1) + "</span>" + x[1] + "</li>"; }).join("");
      if (s === "review") review();
      if (s === "done") done();
      carts();
      if (s !== "menu") { root.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); var h = views[s].querySelector("h2"); if (h) h.focus({ preventScroll: true }); }
    }
    var form = $("#details-form"), addr = $("#address-row"); liveClear(form);
    $$('input[name="fulfillment"]', form).forEach(function (r) { r.addEventListener("change", function () { addr.hidden = form.elements.fulfillment.value !== "delivery"; }); });
    if (!C.deliveryEnabled) { var dl = $("#choice-delivery"); if (dl) dl.remove(); }
    form.addEventListener("submit", function (e) {
      e.preventDefault(); var f = form.elements;
      cust = { name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim(), fulfillment: f.fulfillment.value || "pickup", address: f.address.value.trim(), notes: f.notes.value.trim() };
      var er = {};
      if (cust.name.length < 2) er.name = "Please enter your name.";
      if (!cust.phone) er.phone = "We need a phone number in case the kitchen has a question."; else if (!okPhone(cust.phone)) er.phone = "Please enter a valid 10-digit phone number.";
      if (cust.email && !EMAIL.test(cust.email)) er.email = "Please enter a valid email address.";
      if (cust.fulfillment === "delivery" && cust.address.length < 8) er.address = "Please enter a delivery address.";
      if (showErr(form, er)) go("review");
    });
    function review() {
      $("#review-lines").innerHTML = Cart.lines().map(function (l) { var it = ITEMS[l.id]; return "<li><span><b>" + l.qty + "×</b> " + esc(it.name) + "</span><span>" + money(it.price * l.qty) + "</span></li>"; }).join("");
      $("#review-subtotal").textContent = money(Cart.subtotal());
      $("#review-info").innerHTML = "<div><dt>" + (cust.fulfillment === "pickup" ? "Pickup" : "Delivery") + "</dt><dd>" + esc(cust.fulfillment === "pickup" ? C.address.street + ", " + C.address.city : cust.address) + "</dd></div><div><dt>Contact</dt><dd>" + esc(cust.name) + " · " + esc(cust.phone) + (cust.email ? "\n" + esc(cust.email) : "") + "</dd></div>" + (cust.notes ? '<div style="grid-column:1/-1"><dt>Notes</dt><dd>' + esc(cust.notes) + "</dd></div>" : "");
    }
    $("#place-order").addEventListener("click", function () {
      var b = this, lines = Cart.lines().map(function (l) { var it = ITEMS[l.id]; return { itemId: l.id, name: it.name, unitPrice: it.price, quantity: l.qty, lineTotal: it.price * l.qty }; });
      var ref = "CRC-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase(), sub = Cart.subtotal();
      busy(b, true, "Sending order…");
      send(C.orderFormEndpoint, { subject: "New website order " + ref, _subject: "New website order " + ref, reference: ref, createdAt: new Date().toISOString(), customer: cust, lines: lines, subtotal: money(sub),
        order_summary: lines.map(function (l) { return l.quantity + "x " + l.name + " — " + money(l.lineTotal); }).join("\n"), name: cust.name, phone: cust.phone, email: cust.email, fulfillment: cust.fulfillment, address: cust.address, notes: cust.notes })
        .then(function (r) { busy(b, false); res = { s: r, ref: ref, lines: lines, sub: sub }; if (r === "sent") Cart.clear(); go("done"); });
    });
    function done() {
      var r = res, h;
      if (r.s === "sent") h = '<div class="done-ico" style="background:var(--sage);color:#fff">' + icon("check") + '</div><h2 tabindex="-1" class="display-md" style="margin-top:1.25rem;outline:none">' + L("Order request sent!", "¡Pedido enviado!") + '</h2><p class="lede" style="margin:1rem auto 0">' + L("The restaurant received your request and may call to confirm timing and payment.", "El restaurante recibió tu pedido y puede llamarte para confirmar la hora y el pago.") + "</p>";
      else if (r.s === "demo") h = '<div class="done-ico" style="background:var(--butter)">' + icon("bag") + '</div><h2 tabindex="-1" class="display-md" style="margin-top:1.25rem;outline:none">' + L("Your order is ready to go", "Tu pedido está listo") + '</h2><p class="alert alert-demo" style="margin:1.25rem auto 0;max-width:36rem;text-align:left">' + L("<strong>Demo mode:</strong> online order submission isn&#39;t connected yet, so this order was <strong>not</strong> sent to the restaurant. Call to place it, or use the current ordering page.", "<strong>Modo demostración:</strong> el envío de pedidos en línea aún no está conectado, así que este pedido <strong>no</strong> se envió al restaurante. Llama para hacerlo, o usa la página de pedidos actual.") + "</p>";
      else h = '<h2 tabindex="-1" class="display-md" style="outline:none">' + L("We couldn&#39;t send your order", "No pudimos enviar tu pedido") + '</h2><p class="alert alert-err" style="margin:1rem auto 0;max-width:36rem">' + L("Please call ", "Por favor llama al ") + esc(C.phone.display) + L(" to place your order.", " para hacer tu pedido.") + "</p>";
      h += '<p class="ref">Ref · ' + r.ref + '</p><ul class="sum-lines" style="max-width:30rem;margin-inline:auto;text-align:left">' + r.lines.map(function (l) { return "<li><span>" + l.quantity + "× " + esc(l.name) + "</span><span>" + money(l.lineTotal) + "</span></li>"; }).join("") + "<li><b>Subtotal</b><b>" + money(r.sub) + "</b></li></ul>" +
        '<div class="btn-row" style="justify-content:center;margin-top:2rem"><a class="btn btn-rose" href="' + C.phone.href + '">' + icon("phone") + L(" Call ", " Llamar al ") + esc(C.phone.display) + "</a>" +
        (r.s !== "sent" ? '<a class="btn btn-line" href="' + C.links.onlineOrdering + '" target="_blank" rel="noopener noreferrer">Current ordering page ' + icon("external") + '<span class="sr-only"> (opens in a new tab)</span></a>' : "") + '<button type="button" class="btn btn-line" data-new>Start a new order</button></div>';
      $("#done-body").innerHTML = h;
    }
    root.addEventListener("click", function (e) {
      var g = e.target.closest("[data-go]"); if (g) { go(g.dataset.go); return; }
      if (e.target.closest("[data-clear]")) { Cart.clear(); return; }
      if (e.target.closest("[data-new]")) { if (res && res.s !== "sent") Cart.clear(); form.reset(); addr.hidden = true; go("menu"); }
    });
    document.addEventListener("cart:change", carts);
    go("menu");
  }

  /* --------------------------------------------------------------- lightbox */
  function initLightbox() {
    var lb = $("#lightbox"); if (!lb) return;
    var img = $("img", lb), cap = $("p", lb), close = $(".icon-btn", lb), last;
    document.addEventListener("click", function (e) {
      var b = e.target.closest(".g-item"); if (!b || b.classList.contains("is-ph")) return;
      var src = $("img.photo", b); if (!src) return;
      last = b; img.src = src.src; img.alt = src.alt; cap.textContent = src.alt; lb.hidden = false; close.focus(); document.body.style.overflow = "hidden";
    });
    function shut() { lb.hidden = true; document.body.style.overflow = ""; if (last) last.focus(); }
    close.addEventListener("click", shut);
    lb.addEventListener("click", function (e) { if (e.target === lb) shut(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) shut(); });
  }

  /* ------------------------------------------------ Rosie — menu assistant
   * A rule-based helper that answers ONLY from config.js + menu-data.js.
   * No AI service is called, so nothing is invented and no API key is exposed.
   * To upgrade to a Claude-powered assistant later, send the question to your
   * own backend (e.g. AWS Lambda) that calls the Claude API with the menu as
   * context, and render its reply in addBot(). Never put API keys in this file.
   */
  function initRosie() {
    var btn = $("#rosie-btn"), panel = $("#rosie"); if (!btn || !panel) return;
    var log = $(".rosie-log", panel), form = $(".rosie-form", panel), input = $("input", form), sugg = $(".rosie-sugg", panel), opened = false;
    var SUGG = L(["What's spicy?", "Kids menu", "Under $12", "Do you deliver?", "Hours?", "Where are you?", "Veggie options", "Surprise me"],
                 ["¿Qué hay picante?", "Menú infantil", "Menos de $12", "¿Entregan a domicilio?", "¿Horario?", "¿Dónde están?", "Opciones vegetarianas", "Sorpréndeme"]);
    sugg.innerHTML = SUGG.map(function (s) { return '<button type="button">' + esc(s) + "</button>"; }).join("");

    function add(cls, html) { var d = document.createElement("div"); d.className = "msg " + cls; d.innerHTML = html; log.appendChild(d); log.scrollTop = log.scrollHeight; return d; }
    function list(items, max) {
      items = items.slice(0, max || 5);
      return "<ul>" + items.map(function (i) { return "<li><span><b>" + esc(i.name) + '</b></span><span style="display:flex;align-items:center;gap:.5rem"><span class="p">' + money(i.price, i.priceFrom) + '</span><button type="button" class="mini-add" data-add="' + i.id + '" aria-label="' + esc(L("Add " + i.name + " to order", "Agregar " + i.name + " al pedido")) + '">' + icon("plus") + "</button></span></li>"; }).join("") + "</ul>";
    }
    function bot(html) {
      var tp = add("bot", '<span class="typing" aria-label="' + L("Rosie is typing", "Rosie está escribiendo") + '"><i></i><i></i><i></i></span>');
      setTimeout(function () { tp.innerHTML = html; log.scrollTop = log.scrollHeight; }, reduceMotion ? 0 : 520);
    }
    var tel = '<a href="' + C.phone.href + '">' + esc(C.phone.display) + "</a>";
    var menuLink = "<a href='menu.html'>" + L("menu", "menú") + "</a>";
    /* Spanish → English words so Spanish questions find English dish names */
    var ES_WORDS = { hamburguesa: "burger", hamburguesas: "burger", huevo: "egg", huevos: "eggs", hotcakes: "pancakes", panqueques: "pancakes", tocino: "bacon", salchicha: "sausage", jamon: "ham", pollo: "chicken", bistec: "steak", carne: "beef", arrachera: "skirt", ensalada: "salad", ensaladas: "salad", cafe: "coffee", jugo: "juice", pescado: "fish", camaron: "shrimp", camarones: "shrimp", calamar: "calamari", queso: "cheese", aguacate: "avocado", papas: "fries", frijoles: "beans", avena: "oatmeal", fruta: "fruit", pavo: "turkey", atun: "tuna", alitas: "wings", leche: "milk", te: "tea", refresco: "soda", limonada: "lemonade", chocolate: "chocolate", waffle: "waffle", "pan frances": "french toast", tacos: "tacos", enchiladas: "enchiladas", chilaquiles: "chilaquiles", burrito: "burrito", omelet: "omelet", omelette: "omelet", revuelto: "scramble", sandwich: "sandwich", "sándwich": "sandwich" };
    function unaccent(x) { return x.normalize("NFD").replace(/[̀-ͯ]/g, ""); }

    function answer(q) {
      var s = unaccent(q.toLowerCase().replace(/[’']/g, "'"));
      var m;
      if (/^(hi|hello|hey|yo|bonjour|hola|buenas|buenos)\b/.test(s)) return L("Hi there! 🌹 Ask me about the menu, prices, the kids menu, ordering or directions.", "¡Hola! 🌹 Pregúntame por el menú, los precios, el menú infantil, cómo ordenar o cómo llegar.");
      if (/hour|open|close|when|horario|hora|abren|abierto|cierran/.test(s)) return C.hoursVerified ? L("Our hours:", "Nuestro horario:") + "<br>" + C.hours.map(function (h) { return esc(t(h.day)) + ": " + esc(h.hours || t("Closed")); }).join("<br>") : L("We serve breakfast &amp; lunch. Weekly hours aren&#39;t listed on this site yet — please call " + tel + " for today&#39;s hours.", "Servimos desayuno y almuerzo. El horario semanal aún no está en este sitio — por favor llama al " + tel + " para el horario de hoy.");
      if (/where|address|location|direction|find you|map|donde|direccion|ubicacion|llegar|mapa/.test(s)) return L("We&#39;re at ", "Estamos en ") + "<b>756 San Benito Street, Hollister, CA 95023</b>. <a href='" + C.links.directions + "' target='_blank' rel='noopener noreferrer'>" + L("Get directions →", "Cómo llegar →") + "</a>";
      if (/park|estacion/.test(s)) return L("I don&#39;t have parking details — the team can help at " + tel + ".", "No tengo información de estacionamiento — el equipo te ayuda al " + tel + ".");
      if (/phone|call|number|telefono|llamar|numero/.test(s)) return L("Call us at " + tel + " — it&#39;s the fastest way to order or ask a question.", "Llámanos al " + tel + " — es la forma más rápida de ordenar o preguntar.");
      if (/deliver|pickup|pick up|take ?out|to go|order|domicilio|entreg|llevar|pedido|ordenar/.test(s)) return L("You can order for pickup" + (C.deliveryEnabled ? " or delivery" : "") + " right here: <a href='order.html'>start an order →</a> or call " + tel + ".", "Puedes ordenar para llevar" + (C.deliveryEnabled ? " o a domicilio" : "") + " aquí mismo: <a href='order.html'>empieza tu pedido →</a> o llama al " + tel + ".");
      if (/card|pay|cash|surcharge|credit|tarjeta|pago|pagar|efectivo/.test(s)) return C.cardSurchargeNote ? esc(t(C.cardSurchargeNote)) + L(" For other payment questions call " + tel + ".", " Para otras preguntas de pago llama al " + tel + ".") : L("Please call " + tel + " about payment options.", "Llama al " + tel + " para opciones de pago.");
      if (/gift|shop|souvenir|jewel|regalo|tienda|joya/.test(s)) return L("Yes! We have a unique gift counter with special finds — take a look when you visit. 🎁", "¡Sí! Tenemos un mostrador de regalos único con artículos especiales — échale un vistazo en tu visita. 🎁");
      if (/kid|child|buckaroo|little|nino|nina|infantil/.test(s)) { var k = ALL.filter(function (i) { return CAT_OF[i.id].sec.id === "lil-buckaroos"; }); return L("Our <b>Lil Buckaroo&#39;s</b> menu (" + k.length + " items):", "Nuestro menú infantil <b>Lil Buckaroo&#39;s</b> (" + k.length + " platillos):") + list(k, 9); }
      if (/veg|vegetarian|meatless|sin carne/.test(s)) { var VEG = ["Veggie Omelet", "Veggie Benedict", "Cheese Omelette", "Mushroom & Cheese", "Big Country Cakes (3)", "Short Cakes (2)", "Belgian Waffle", "Short French Toast (2)", "Big Country French Toast (3)", "Bowl Fresh Fruit", "Bowl Oatmeal", "Plain Caesar Salad", "Grilled Cheese Sandwich", "Kids Grilled Cheese"]; var v = VEG.map(byName).filter(Boolean); return L("A few items without meat in the name — please confirm ingredients with the staff:", "Algunos platillos sin carne en el nombre — confirma los ingredientes con el personal:") + list(shuffle(v), 5); }
      if (/spic|hot|heat|jalap|serrano|picante|picoso|enchiloso/.test(s)) return L("Bring the heat 🌶️", "¡Que pique! 🌶️") + list(shuffle(MAINS.filter(MOODS[2].test)), 5);
      if (/sweet|pancake|waffle|french toast|dulce|hotcake|panqueque/.test(s)) return L("Something sweet 🥞", "Algo dulce 🥞") + list(MAINS.filter(MOODS[0].test), 6);
      if ((m = s.match(/(?:under|menos de|debajo de|menor a)\s*\$?\s*(\d+)/)) || /cheap|budget|inexpensive|barato|economico/.test(s)) { var cap = m ? +m[1] * 100 : 1200; var u = MAINS.filter(function (i) { return i.price <= cap; }).sort(function (a, b) { return a.price - b.price; }); return u.length ? L("Dishes at " + money(cap) + " or less:", "Platillos de " + money(cap) + " o menos:") + list(u, 6) + (u.length > 6 ? "<small>" + L("…and " + (u.length - 6) + " more on the ", "…y " + (u.length - 6) + " más en el ") + menuLink + ".</small>" : "") : L("Nothing that low on the main menu — check the sides on the ", "Nada tan barato en el menú principal — revisa los acompañamientos en el ") + menuLink + "."; }
      if (/surprise|random|recommend|suggest|what should|popular|best|sorprend|recomienda|sugier|mejor/.test(s)) return L("Here are 3 random picks from the menu — tap + to add:", "Aquí tienes 3 sugerencias al azar del menú — toca + para agregar:") + list(shuffle(MAINS), 3);
      if (/drink|coffee|juice|soda|tea|bebida|cafe|jugo|refresco|tomar/.test(s)) { var d = ALL.filter(function (i) { return CAT_OF[i.id].cat.id === "sodas-drinks"; }); return L("Drinks:", "Bebidas:") + list(d, 8); }
      if (/thank|gracias/.test(s)) return L("You&#39;re welcome! Enjoy your meal 🌹", "¡De nada! Buen provecho 🌹");
      // item / keyword search (Spanish words are mapped to English dish names)
      var sq = s;
      Object.keys(ES_WORDS).forEach(function (w) { sq = sq.replace(new RegExp("\\b" + unaccent(w) + "\\b", "g"), ES_WORDS[w]); });
      var STOP = ["the", "and", "you", "have", "what", "any", "with", "for", "your", "how", "much", "does", "cost", "price", "is", "do", "que", "tienen", "hay", "cuanto", "cuesta", "precio", "del", "los", "las", "una", "uno", "con", "por", "para", "quiero"];
      var words = sq.replace(/[^a-z0-9 &]/g, " ").split(/\s+/).filter(function (w) { return w.length > 2 && STOP.indexOf(w) < 0; });
      if (words.length) {
        var scored = ALL.map(function (i) { var tx = unaccent(text(i)), n = i.name.toLowerCase(), sc = 0; words.forEach(function (w) { if (n.indexOf(w) > -1) sc += 3; else if (tx.indexOf(w) > -1) sc += 1; }); return { i: i, sc: sc }; }).filter(function (x) { return x.sc > 0; }).sort(function (a, b) { return b.sc - a.sc; });
        if (scored.length) {
          var top = scored[0].i;
          if (scored.length === 1 || scored[0].sc > scored[1].sc + 1) return "<b>" + esc(top.name) + "</b> — " + money(top.price, top.priceFrom) + (top.description ? "<br><span style='color:var(--ink-2)'>" + esc(top.description) + "</span>" : "") + list([top], 1);
          return L("Here&#39;s what I found on the menu:", "Esto encontré en el menú:") + list(scored.map(function (x) { return x.i; }), 5);
        }
      }
      return L("I&#39;m not sure about that one. The team can help at " + tel + ", or browse the <a href='menu.html'>full menu</a>.", "No estoy segura de eso. El equipo te ayuda al " + tel + ", o revisa el <a href='menu.html'>menú completo</a>.");
    }
    function ask(q) { q = q.trim(); if (!q) return; add("me", esc(q)); bot(answer(q)); }
    function open() {
      panel.hidden = false; btn.hidden = true; btn.setAttribute("aria-expanded", "true");
      if (!opened) { opened = true; bot(L("Hi, I&#39;m <b>Rosie</b> 🌹 — I know all " + ALL.length + " items on the Country Rose menu. What are you in the mood for?", "¡Hola! Soy <b>Rosie</b> 🌹 — conozco los " + ALL.length + " platillos del menú de Country Rose. ¿Qué se te antoja?")); }
      setTimeout(function () { input.focus(); }, 50);
    }
    function close() { panel.hidden = true; btn.hidden = false; btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    btn.addEventListener("click", open);
    $(".rosie-close", panel).addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) close(); });
    form.addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); input.value = ""; });
    sugg.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) ask(b.textContent); });
    $$("[data-open-rosie]").forEach(function (b) { b.addEventListener("click", open); });
  }

  /* -------------------------------------------------------------------- boot */
  document.addEventListener("DOMContentLoaded", function () {
    if (C.demoMode === false) $$(".demo-only").forEach(function (e) { e.remove(); });
    I18N.apply();
    $$("[data-year]").forEach(function (e) { e.textContent = new Date().getFullYear(); });
    $$("[data-count-items]").forEach(function (e) { e.textContent = ALL.length; });
    initNav(); initHours(); initMarquee(); initRail(); initCrave(); initMenu(); initContact(); initOrder(); initLightbox(); initRosie();
    initPhotos(); badges(); initReveal();
  });
})();
