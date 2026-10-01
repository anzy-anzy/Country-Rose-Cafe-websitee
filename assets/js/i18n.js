/* ============================================================================
 *  Country Rose Cafe — English / Español
 *  --------------------------------------------------------------------------
 *  English is written in the HTML (best for Google). When a visitor picks
 *  "ES", this file swaps every piece of text using the dictionary below and
 *  remembers the choice. Share a Spanish link with  ?lang=es  (e.g.
 *  index.html?lang=es).
 *
 *  To change a Spanish phrase: edit the value (right side) below.
 *  To add a phrase: add  "Exact English text": "Texto en español",
 *  Anything without a translation stays in English — nothing breaks.
 *  Menu descriptions live in menu-es.js.
 * ========================================================================== */
(function () {
  "use strict";
  var KEY = "crc-lang";
  var SUPPORTED = ["en", "es"];

  function pick() {
    try {
      var q = new URLSearchParams(location.search).get("lang");
      if (q && SUPPORTED.indexOf(q) > -1) { try { localStorage.setItem(KEY, q); } catch (e) { } return q; }
    } catch (e) { }
    try { var s = localStorage.getItem(KEY); if (s && SUPPORTED.indexOf(s) > -1) return s; } catch (e) { }
    return (window.CRC_CONFIG && window.CRC_CONFIG.defaultLanguage) || "en";
  }
  var lang = pick();

  /* ---------------------------------------------------------------- dictionary */
  var ES = {
    /* page titles & meta */
    "Country Rose Cafe | Breakfast & Lunch in Hollister, CA": "Country Rose Cafe | Desayunos y almuerzos en Hollister, CA",
    "Menu — Breakfast & Lunch | Country Rose Cafe, Hollister CA": "Menú — Desayuno y almuerzo | Country Rose Cafe, Hollister CA",
    "Order Online — Pickup & Delivery | Country Rose Cafe, Hollister CA": "Ordena en línea — Para llevar y a domicilio | Country Rose Cafe, Hollister CA",
    "Contact & Location | Country Rose Cafe, Hollister CA": "Contacto y ubicación | Country Rose Cafe, Hollister CA",
    "Page not found | Country Rose Cafe": "Página no encontrada | Country Rose Cafe",

    /* banner & navigation */
    "Skip to main content": "Saltar al contenido principal",
    "Website concept": "Propuesta de sitio web",
    "prepared for Country Rose Cafe · Not yet the official website · Order & contact forms run in demo mode": "preparada para Country Rose Cafe · Aún no es el sitio oficial · Los formularios de pedido y contacto están en modo demostración",
    "Hollister · Est. 2002": "Hollister · Desde 2002",
    "Home": "Inicio",
    "Menu": "Menú",
    "Our Story": "Nuestra historia",
    "Gallery": "Galería",
    "Contact": "Contacto",
    "Order Online": "Ordenar en línea",
    "Call (831) 635-0252": "Llamar al (831) 635-0252",
    "Get Directions": "Cómo llegar",
    "(opens in a new tab)": "(se abre en otra pestaña)",
    "(opens Google Maps)": "(abre Google Maps)",
    "756 San Benito Street · Hollister, CA": "756 San Benito Street · Hollister, CA",

    /* hero */
    "Since 2002": "Desde 2002",
    "Breakfast & lunch · Hollister, CA": "Desayuno y almuerzo · Hollister, CA",
    "A taste of home.": "Un sabor a hogar.",
    "Join us for breakfast and lunch in a cozy, easygoing atmosphere — American eats, big plates, and a unique gift counter.": "Acompáñanos a desayunar y almorzar en un ambiente acogedor y relajado — comida americana, platos generosos y un mostrador de regalos único.",
    "Come in for": "Ven por",
    "country cakes.": "unos hotcakes country.",
    "a John Wayne omelet.": "un omelet John Wayne.",
    "Hector's chilaquiles.": "los chilaquiles de Héctor.",
    "breakfast and lunch.": "desayuno y almuerzo.",
    "View the Menu": "Ver el menú",
    "Call Us": "Llámanos",
    "756 San Benito St, Hollister": "756 San Benito St, Hollister",
    "Dine in · Pickup · Delivery": "Comer aquí · Para llevar · A domicilio",
    "Gift counter inside": "Mostrador de regalos adentro",
    "Since": "Desde",
    "Buttermilk pancakes": "Hotcakes de buttermilk",
    "Big Country Cakes · three stacked": "Big Country Cakes · tres en torre",

    /* why stop in */
    "Why stop in": "Por qué visitarnos",
    "Real food. Big plates.": "Comida de verdad. Platos generosos.",
    "Since 2002.": "Desde 2002.",
    "A small-town cafe with a big menu — breakfast and lunch done the way you remember, in a room that feels like home.": "Un café de pueblo con un menú grande — desayunos y almuerzos como los recuerdas, en un lugar que se siente como en casa.",
    "Big country breakfasts": "Desayunos country abundantes",
    "Steak & eggs, scrambles, omelets, combos — served with potatoes and toast.": "Bistec con huevos, revueltos, omelets y combos — con papas y pan tostado.",
    "Open since": "Abierto desde",
    "More than two decades of breakfast & lunch.": "Más de dos décadas sirviendo desayunos y almuerzos.",
    "Gift counter": "Mostrador de regalos",
    "Unique finds and special gifts while you wait.": "Artículos únicos y regalos especiales mientras esperas.",
    "Voted by Hollister residents as “Best Breakfast” running for over 20 years.": "Elegido por los residentes de Hollister como el “Mejor Desayuno” por más de 20 años consecutivos.",
    "As published on the restaurant's website": "Según lo publicado en el sitio web del restaurante",
    "Dishes on the menu": "Platillos en el menú",
    "From Lil Buckaroo's plates to ribeye & eggs.": "Desde los platos Lil Buckaroo's hasta ribeye con huevos.",
    "Order ahead": "Ordena con anticipación",
    "Pickup or delivery — build your order in under a minute.": "Para llevar o a domicilio — arma tu pedido en menos de un minuto.",

    /* craving picker */
    "Can't decide?": "¿No te decides?",
    "What are you": "¿Qué se te",
    "craving": "antoja",
    "today?": "hoy?",
    "Pick a mood — we'll pull three dishes straight from the menu.": "Elige un antojo — te mostramos tres platillos directo del menú.",
    "Surprise me": "Sorpréndeme",
    "Sweet": "Dulce",
    "Hearty": "Abundante",
    "Spicy": "Picante",
    "Mexicali": "Mexicali",
    "Burgers & melts": "Hamburguesas y melts",
    "Fresh & light": "Fresco y ligero",
    "For the kids": "Para los niños",
    "Choose a craving": "Elige un antojo",

    /* highlights */
    "From the menu": "Del menú",
    "Plates worth": "Platos que valen",
    "getting up for.": "la pena madrugar.",
    "See all 207 items": "Ver los 207 platillos",
    "Scroll left": "Desplazar a la izquierda",
    "Scroll right": "Desplazar a la derecha",
    "Menu highlights": "Lo mejor del menú",

    /* story */
    "Our story": "Nuestra historia",
    "A taste of home,": "Un sabor a hogar,",
    "one plate at a time.": "plato por plato.",
    "Country Rose Cafe has been open since 2002, serving American breakfast and lunch in a cozy, easygoing atmosphere.": "Country Rose Cafe abrió sus puertas en 2002 y sirve desayunos y almuerzos americanos en un ambiente acogedor y relajado.",
    "Along with the food, there's a gift counter with unique finds and special gifts — a little something extra to discover when you visit.": "Además de la comida, hay un mostrador de regalos con artículos únicos y detalles especiales — algo extra para descubrir en tu visita.",
    "years as a Hollister breakfast favorite, as voted by residents": "años como el desayuno favorito de Hollister, según sus residentes",
    "[PLACEHOLDER — VERIFY WITH RESTAURANT]": "[PENDIENTE — VERIFICAR CON EL RESTAURANTE]",
    "The owner's own story — who started the cafe, the meaning of the name, family history — goes here once provided.": "Aquí irá la historia del dueño — quién fundó el café, el significado del nombre, la historia familiar — cuando la compartan.",

    /* order CTA */
    "Hungry?": "¿Tienes hambre?",
    "We'll get it started.": "Nosotros nos encargamos.",
    "Pickup or delivery from the full breakfast & lunch menu. Order online in a minute — or call and talk to a real person.": "Para llevar o a domicilio, con todo el menú de desayuno y almuerzo. Ordena en línea en un minuto — o llama y habla con una persona.",
    "Call to Order": "Llama para ordenar",
    "Call-in orders": "Pedidos por teléfono",
    "756 San Benito Street, Hollister": "756 San Benito Street, Hollister",
    "Prefer the current ordering page?": "¿Prefieres la página de pedidos actual?",

    /* gallery */
    "Pull up": "Toma",
    "a seat.": "asiento.",
    "More on Facebook": "Más en Facebook",
    "The cafe": "El café",
    "Burger or lunch plate": "Hamburguesa o plato de almuerzo",
    "Owner photo needed": "Foto del dueño pendiente",
    "Country breakfast": "Desayuno country",
    "Omelet or Mexicali plate": "Omelet o plato Mexicali",
    "Dining room & gifts": "Comedor y regalos",
    "Team or dining room photo": "Foto del equipo o del comedor",
    "Gift counter close-up": "Mostrador de regalos de cerca",
    "Proposal note: photos are from the restaurant's current public website or are labelled placeholders — all need owner approval before launch.": "Nota de la propuesta: las fotos provienen del sitio web público actual del restaurante o son espacios reservados — todas requieren la aprobación del dueño antes del lanzamiento.",
    "View photo: cafe exterior": "Ver foto: fachada del café",
    "View photo: pancakes": "Ver foto: hotcakes",
    "View photo: country breakfast": "Ver foto: desayuno country",
    "View photo: dining room and gift counter": "Ver foto: comedor y mostrador de regalos",
    "Photo viewer": "Visor de fotos",
    "Close photo": "Cerrar foto",
    "Exterior of Country Rose Cafe with its open sign": "Fachada de Country Rose Cafe con su letrero de abierto",
    "Buttermilk pancakes with butter and syrup": "Hotcakes de buttermilk con mantequilla y miel",
    "Hearty country breakfast platter with eggs, potatoes and toast": "Desayuno country abundante con huevos, papas y pan tostado",
    "Inside Country Rose Cafe — dining room and gift counter with jewelry displays": "Interior de Country Rose Cafe — comedor y mostrador de regalos con vitrinas de joyería",

    /* visit */
    "Visit us": "Visítanos",
    "Come as you are.": "Ven tal como eres.",
    "Leave full.": "Sal satisfecho.",
    "Call": "Llamar",
    "Address": "Dirección",
    "Phone": "Teléfono",
    "Hours": "Horario",
    "Service": "Servicio",
    "Map not loading?": "¿No carga el mapa?",
    "Open in Google Maps": "Abrir en Google Maps",
    "Map showing Country Rose Cafe at 756 San Benito Street, Hollister, CA 95023": "Mapa de Country Rose Cafe en 756 San Benito Street, Hollister, CA 95023",
    "Serving": "Servimos",
    "breakfast & lunch": "desayuno y almuerzo",
    "Closed": "Cerrado",
    "Monday": "Lunes", "Tuesday": "Martes", "Wednesday": "Miércoles", "Thursday": "Jueves", "Friday": "Viernes", "Saturday": "Sábado", "Sunday": "Domingo",

    /* social */
    "Stay in the loop": "Mantente al día",
    "Specials, photos & news.": "Especiales, fotos y noticias.",
    "Follow Country Rose Cafe on Facebook.": "Sigue a Country Rose Cafe en Facebook.",
    "Follow on Facebook": "Síguenos en Facebook",

    /* contact */
    "Say hello": "Salúdanos",
    "Let's": "Vamos a",
    "talk": "platicar",
    "Questions about the menu or the gift counter? Drop us a note — or call, it's the fastest way to reach the kitchen.": "¿Preguntas sobre el menú o el mostrador de regalos? Escríbenos — o llama, es la forma más rápida de comunicarte con la cocina.",
    "Country Rose Cafe on Facebook": "Country Rose Cafe en Facebook",
    "Your name *": "Tu nombre *",
    "Email *": "Correo electrónico *",
    "Email": "Correo electrónico",
    "(optional)": "(opcional)",
    "Your message *": "Tu mensaje *",
    "Company": "Empresa",
    "Send message": "Enviar mensaje",
    "We reply by email or phone.": "Respondemos por correo o por teléfono.",
    "Sending…": "Enviando…",
    "Please enter your name.": "Por favor escribe tu nombre.",
    "Please enter your email address.": "Por favor escribe tu correo electrónico.",
    "Please enter a valid email address.": "Por favor escribe un correo electrónico válido.",
    "Please enter a valid 10-digit phone number.": "Por favor escribe un número de teléfono válido de 10 dígitos.",
    "Please write a short message (10+ characters).": "Por favor escribe un mensaje corto (10 caracteres o más).",
    "We need a phone number in case the kitchen has a question.": "Necesitamos un teléfono por si la cocina tiene alguna pregunta.",
    "Please enter a delivery address.": "Por favor escribe una dirección de entrega.",
    "Thanks!": "¡Gracias!",

    /* footer & quick dock */
    "Hungry yet?": "¿Ya te dio hambre?",
    "Pull up a chair.": "Toma una silla.",
    "Visit": "Visítanos",
    "Explore": "Explora",
    "Full Menu": "Menú completo",
    "Country Rose Cafe · Hollister, California": "Country Rose Cafe · Hollister, California",
    "Website concept prepared for Country Rose Cafe · Demo version": "Propuesta de sitio web para Country Rose Cafe · Versión demo",
    "Directions": "Cómo llegar",
    "Quick actions": "Acciones rápidas",
    "Order now": "Ordenar",
    "BREAKFAST • LUNCH • HOLLISTER, CA • EST. 2002 •": "DESAYUNO • ALMUERZO • HOLLISTER, CA • DESDE 2002 •",

    /* Rosie */
    "Ask Rosie": "Pregúntale a Rosie",
    "— menu helper": "— asistente del menú",
    "Menu helper · answers from our menu": "Asistente del menú · responde con nuestro menú",
    "Automated helper — for anything else, call (831) 635-0252.": "Asistente automático — para todo lo demás, llama al (831) 635-0252.",
    "Rosie, the menu helper": "Rosie, la asistente del menú",
    "Close menu helper": "Cerrar asistente",
    "Suggested questions": "Preguntas sugeridas",
    "Ask about dishes, prices, kids menu…": "Pregunta por platillos, precios, menú infantil…",
    "Ask Rosie ": "Pregúntale a Rosie",
    "Send": "Enviar",
    "Rosie is typing": "Rosie está escribiendo",

    /* menu page */
    "Breakfast · Lunch · Lil Buckaroo's · Drinks": "Desayuno · Almuerzo · Lil Buckaroo's · Bebidas",
    "The": "El",
    "dishes and drinks, exactly as served. Search it, browse it, or tap “Add” to build your order.": "platillos y bebidas, tal como se sirven. Búscalo, recórrelo o toca “Agregar” para armar tu pedido.",
    "Loading menu…": "Cargando menú…",
    "Please enable JavaScript to browse the interactive menu, or call (831) 635-0252.": "Activa JavaScript para ver el menú interactivo, o llama al (831) 635-0252.",
    "Menu and prices as published on the restaurant's online menu (September 29, 2026). Prices and availability may change.": "Menú y precios según el menú en línea del restaurante (29 de septiembre de 2026). Los precios y la disponibilidad pueden cambiar.",
    "If you use a credit card, this establishment will charge an additional 3.00% to help offset processing costs.": "Si pagas con tarjeta de crédito, este establecimiento cobra un 3.00% adicional para cubrir los costos de procesamiento.",
    "Menu categories": "Categorías del menú",
    "Search the menu": "Buscar en el menú",
    "Clear search": "Borrar búsqueda",
    "Menu sections": "Secciones del menú",
    "Jump to category": "Ir a la categoría",
    "All": "Todo",
    "Show the full menu": "Ver el menú completo",
    "Try another word — or ask Rosie in the corner.": "Prueba otra palabra — o pregúntale a Rosie en la esquina.",
    "Add": "Agregar",
    "Price": "Precio",

    /* menu sections & categories (also in menu-es.js) */
    "Breakfast": "Desayuno",
    "Lunch": "Almuerzo",
    "Lunch Sides": "Acompañamientos",
    "Drinks": "Bebidas",

    /* order page */
    "Pickup & delivery": "Para llevar y a domicilio",
    "Order": "Ordena",
    "Online": "en línea",
    "Build your order from the full menu, then tell us how you'd like it. Prefer a real person? Call and we'll take it over the phone.": "Arma tu pedido con todo el menú y dinos cómo lo quieres. ¿Prefieres hablar con una persona? Llama y tomamos tu pedido por teléfono.",
    "Current ordering page": "Página de pedidos actual",
    "Demo ordering:": "Pedidos de demostración:",
    "the cart and checkout fully work, but submissions aren't connected to the restaurant yet (set": "el carrito y el pago funcionan por completo, pero los pedidos aún no llegan al restaurante (configura",
    "in": "en",
    "). No payment is collected. To order today, call (831) 635-0252.": "). No se cobra nada. Para ordenar hoy, llama al (831) 635-0252.",
    "Order progress": "Progreso del pedido",
    "Choose": "Elegir",
    "Details": "Datos",
    "Review": "Revisar",
    "Confirmed": "Confirmado",
    "Your order": "Tu pedido",
    "Your plate is empty": "Tu plato está vacío",
    "Tap “Add” on anything that looks good.": "Toca “Agregar” en lo que se te antoje.",
    "Or call": "O llama al",
    "Remove": "Quitar",
    "Subtotal": "Subtotal",
    "Tax, fees & any card surcharge confirmed by the restaurant.": "El restaurante confirma impuestos, cargos y recargo por tarjeta.",
    "Continue": "Continuar",
    "Clear order": "Vaciar pedido",
    "Your details": "Tus datos",
    "So the kitchen knows who it's for and how to reach you.": "Para que la cocina sepa para quién es y cómo contactarte.",
    "How would you like it?": "¿Cómo lo quieres?",
    "Pickup": "Para llevar",
    "Delivery": "A domicilio",
    "Fees & area confirmed by the restaurant": "El restaurante confirma costo y zona de entrega",
    "Full name *": "Nombre completo *",
    "Phone *": "Teléfono *",
    "Delivery address *": "Dirección de entrega *",
    "Notes — egg style, potatoes, meat choice, allergies, pickup time": "Notas — estilo de huevo, papas, carne, alergias, hora de recogida",
    "Review order": "Revisar pedido",
    "Back to menu": "Volver al menú",
    "Review your order": "Revisa tu pedido",
    "Tax, delivery fees and any card surcharge are confirmed by the restaurant. If you use a credit card, this establishment will charge an additional 3.00% to help offset processing costs.": "El restaurante confirma impuestos, costo de entrega y recargo por tarjeta. Si pagas con tarjeta de crédito, este establecimiento cobra un 3.00% adicional para cubrir los costos de procesamiento.",
    "Payment:": "Pago:",
    "no payment is taken on this website — the restaurant confirms your total and collects payment.": "en este sitio no se cobra nada — el restaurante confirma tu total y recibe el pago.",
    "Place order request": "Enviar pedido",
    "Edit details": "Editar datos",
    "Sending order…": "Enviando pedido…",
    "Contact": "Contacto",
    "Notes": "Notas",
    "Start a new order": "Empezar un pedido nuevo",
    "Online ordering needs JavaScript. Please call (831) 635-0252 to order.": "Los pedidos en línea necesitan JavaScript. Llama al (831) 635-0252 para ordenar.",

    /* 404 */
    "Oops —": "Ups —",
    "This page wandered off. The menu, ordering and our phone number are one tap away.": "Esta página se perdió. El menú, los pedidos y nuestro teléfono están a un toque.",
    "Back home": "Volver al inicio",
    "View the menu": "Ver el menú",

    /* accessibility labels */
    "Main": "Principal",
    "Country Rose Cafe — home": "Country Rose Cafe — inicio",
    "View order": "Ver pedido",
    "Open menu": "Abrir menú",
    "Site menu": "Menú del sitio",
    "Close menu": "Cerrar menú",
    "Mobile": "Móvil",
    "Call us at (831) 635-0252": "Llámanos al (831) 635-0252",
    "Photo placeholder: Burger or lunch plate": "Espacio para foto: hamburguesa o plato de almuerzo",
    "Photo placeholder: Omelet or Mexicali plate": "Espacio para foto: omelet o plato Mexicali",
    "Photo placeholder: Team or dining room photo": "Espacio para foto: equipo o comedor",
    "Photo placeholder: Gift counter close-up": "Espacio para foto: mostrador de regalos de cerca",
    "Language": "Idioma",
  };

  /* Pattern rules for text that contains numbers or dish names */
  var PATTERNS = [
    [/^(\d+) items?$/, function (m, n) { return n + (n === "1" ? " platillo" : " platillos"); }],
    [/^View order, (\d+) items?$/, function (m, n) { return "Ver pedido, " + n + (n === "1" ? " artículo" : " artículos"); }],
    [/^View order \((\d+)\)$/, "Ver pedido ($1)"],
    [/^Review order · (\d+)$/, "Revisar pedido · $1"],
    [/^Qty (\d+) × (.+)$/, "Cant. $1 × $2"],
    [/^Add (.+) to order$/, "Agregar $1 al pedido"],
    [/^Increase (.+)$/, "Aumentar $1"],
    [/^Decrease (.+)$/, "Disminuir $1"],
    [/^Remove (.+)$/, "Quitar $1"],
    [/^(.+) quantity$/, "Cantidad de $1"],
    [/^Added$/, "Agregado:"],
    [/^Ref · (.+)$/, "Ref. · $1"],
    [/^Call (\(\d{3}\) \d{3}-\d{4})$/, "Llamar al $1"],
    [/^(\d+) items match (.+)$/, "$1 resultados para $2"],
    [/^Search (\d+) dishes — try “chorizo”, “waffle”, “burger”$/, "Busca entre $1 platillos — prueba “chorizo”, “waffle”, “burger”"],
    [/^Nothing matches “(.+)”\.$/, "Nada coincide con “$1”."],
  ];

  function tr(s) {
    if (lang === "en" || !s) return s;
    var lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0], core = s.trim();
    if (!core) return s;
    var norm = core.replace(/[’]/g, "'");
    var hit = ES[core] || ES[norm];
    if (hit === undefined) {
      for (var i = 0; i < PATTERNS.length; i++) {
        var p = PATTERNS[i];
        if (p[0].test(core)) { hit = core.replace(p[0], p[1]); break; }
      }
    }
    return hit === undefined ? s : lead + hit + trail;
  }
  /* Choose between an English and Spanish version of a longer HTML message. */
  function L(en, es) { return lang === "es" && es != null ? es : en; }

  /* ------------------------------------------------------------ DOM walker */
  var SKIP = { SCRIPT: 1, STYLE: 1, CODE: 1, TEXTAREA: 1, NOSCRIPT: 0 };
  var ATTRS = ["placeholder", "aria-label", "alt", "title"];
  function translateNode(root) {
    if (lang === "en" || !root) return;
    if (root.nodeType === 3) { var v = tr(root.nodeValue); if (v !== root.nodeValue) root.nodeValue = v; return; }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    if (root.nodeType === 1) {
      if (SKIP[root.tagName] || root.closest("[data-no-i18n]")) return;
      translateAttrs(root);
    }
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode: function (n) {
        if (n.nodeType === 1) return SKIP[n.tagName] || n.hasAttribute("data-no-i18n") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    if (root.nodeType === 1 || root.nodeType === 9 || root.nodeType === 11) {
      $$el(root).forEach(translateAttrs);
    }
    var n, list = [];
    while ((n = walker.nextNode())) list.push(n);
    list.forEach(function (t) { var v = tr(t.nodeValue); if (v !== t.nodeValue) t.nodeValue = v; });
  }
  function $$el(root) { return Array.prototype.slice.call(root.querySelectorAll ? root.querySelectorAll("[placeholder],[aria-label],[alt],[title]") : []); }
  function translateAttrs(el) {
    if (el.closest && el.closest("[data-no-i18n]")) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i], v = el.getAttribute && el.getAttribute(a);
      if (v) { var t = tr(v); if (t !== v) el.setAttribute(a, t); }
    }
  }

  /* ------------------------------------------------------------ menu data */
  function localizeMenu() {
    var menu = window.CRC_MENU, es = window.CRC_MENU_ES;
    if (!menu) return;
    menu.forEach(function (s) {
      s.categories.forEach(function (c) {
        c.items.forEach(function (i) { i.descEn = i.description; });
      });
    });
    if (lang !== "es" || !es) return;
    menu.forEach(function (s) {
      if (es.sections[s.name]) ES[s.name] = es.sections[s.name];
      s.categories.forEach(function (c) {
        if (es.categories[c.name]) ES[c.name] = es.categories[c.name];
        if (c.note && es.notes[c.note]) c.note = es.notes[c.note];
        c.items.forEach(function (i) { if (i.description && es.descriptions[i.description]) i.description = es.descriptions[i.description]; });
      });
    });
  }
  localizeMenu();

  /* ------------------------------------------------------------ switcher */
  function setLang(next) {
    if (SUPPORTED.indexOf(next) < 0 || next === lang) return;
    try { localStorage.setItem(KEY, next); } catch (e) { }
    var url = new URL(location.href);
    if (url.searchParams.has("lang")) url.searchParams.set("lang", next);
    else if (!canStore()) url.searchParams.set("lang", next); // storage blocked: keep it in the URL
    location.href = url.toString();
  }
  function canStore() { try { localStorage.setItem("crc-t", "1"); localStorage.removeItem("crc-t"); return true; } catch (e) { return false; } }

  function initSwitchers() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-set-lang]"), function (b) {
      var on = b.getAttribute("data-set-lang") === lang;
      b.setAttribute("aria-pressed", String(on));
      b.addEventListener("click", function () { setLang(b.getAttribute("data-set-lang")); });
    });
  }

  function applyStatic() {
    document.documentElement.lang = lang === "es" ? "es" : "en-US";
    initSwitchers();
    if (lang === "en") return;
    document.title = tr(document.title);
    var md = document.querySelector('meta[name="description"]');
    if (md && META_ES[document.body.dataset.page]) md.setAttribute("content", META_ES[document.body.dataset.page]);
    translateNode(document.body);
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        if (m.type === "characterData") translateNode(m.target);
        else if (m.type === "attributes") translateAttrs(m.target);
        else m.addedNodes.forEach(translateNode);
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  var META_ES = {
    home: "Country Rose Cafe sirve desayunos y almuerzos en 756 San Benito Street, Hollister, CA — omelets, hotcakes, revueltos, hamburguesas, sándwiches y ensaladas en un café acogedor con un mostrador de regalos único. Abierto desde 2002. Llama al (831) 635-0252.",
    menu: "El menú completo de Country Rose Cafe: especialidades, omelets, hotcakes, combos, revueltos, desayunos Mexicali, sándwiches, ensaladas, hamburguesas, canastas, menú infantil y bebidas. Hollister, CA.",
    order: "Ordena desayuno y almuerzo de Country Rose Cafe en Hollister, CA para llevar o a domicilio, o llama al (831) 635-0252.",
    contact: "Contacta a Country Rose Cafe en 756 San Benito Street, Hollister, CA 95023. Llama al (831) 635-0252, obtén indicaciones o envíanos un mensaje.",
  };

  window.CRC_I18N = { lang: lang, t: tr, L: L, setLang: setLang, translate: translateNode, apply: applyStatic };
})();
