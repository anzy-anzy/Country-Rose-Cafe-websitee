#!/usr/bin/env python3
"""Generates the five HTML pages from shared partials.
   python3 tools/build_pages.py
You can also edit the generated .html files directly."""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Restaurant photos currently published on countryrosecafe-hollister.com (owner approval needed).
# When approved photos are supplied, copy them into assets/images/ and point these at the local files.
TOAST = os.environ.get("CRC_IMG_BASE", "https://d1w7312wesee68.cloudfront.net/restaurantImages/293e1b9b-fd53-4a47-a7d4-27c6b87f9032")
PHONE, TEL = "(831) 635-0252", "tel:+18316350252"
FB = "https://www.facebook.com/profile.php?id=100068233964007"
Q = "Country+Rose+Cafe%2C+756+San+Benito+Street%2C+Hollister%2C+CA+95023"
DIR = f"https://www.google.com/maps/dir/?api=1&amp;destination={Q}"
MAPS = f"https://www.google.com/maps/search/?api=1&amp;query={Q}"
EMBED = "https://www.google.com/maps?q=Country+Rose+Cafe,+756+San+Benito+Street,+Hollister,+CA+95023&amp;output=embed"
TOAST_ORDER = "https://countryrosecafe-hollister.com/order/countryrosecafe"
NT = 'target="_blank" rel="noopener noreferrer"'
SRN = '<span class="sr-only"> (opens in a new tab)</span>'


def svg(p, cls="icon", fill="none"):
    return f'<svg class="{cls}" viewBox="0 0 24 24" fill="{fill}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">{p}</svg>'


I = {
    "phone": svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
    "pin": svg('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'),
    "clock": svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    "bag": svg('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>'),
    "dir": svg('<path d="m3 11 19-9-9 19-2-8-8-2z"/>'),
    "arrow": svg('<path d="M5 12h14M13 6l6 6-6 6"/>', "icon arrow"),
    "left": svg('<path d="M19 12H5M11 18l-6-6 6-6"/>'),
    "ext": svg('<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
    "gift": svg('<path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>'),
    "menu": svg('<path d="M4 7h16M4 12h10M4 17h16"/>'),
    "close": svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    "shuffle": svg('<path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>'),
    "send": svg('<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>'),
    "mail": svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>'),
    "fb": '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>',
}

ROSE = """<svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle cx="24" cy="24" r="23" fill="#8e2436"/><path d="M24 12c4.5 0 8 3.2 8 7.6 0 4.9-3.8 8.4-8 8.4s-8-3.5-8-8.4C16 15.2 19.5 12 24 12z" fill="#c2414f" stroke="#fbf5ec" stroke-width="1.6"/><path d="M24 15.5c2.4 0 4.2 1.8 4.2 4.1 0 2.4-2 4.2-4.2 4.2s-3-1.4-3-3.1c0-1.6 1.2-2.6 2.6-2.6" fill="none" stroke="#fbf5ec" stroke-width="1.6" stroke-linecap="round"/><path d="M24 28v9" stroke="#fbf5ec" stroke-width="1.8" stroke-linecap="round"/><path d="M24 33c-3.5 0-6-2-6.5-4.5 3 0 5.6 1.4 6.5 4.5zM24 31.5c3 0 5.5-1.6 6-4-2.8 0-5.2 1.3-6 4z" fill="#e3e9da"/></svg>"""
ROSIE_AV = """<svg class="av" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="#f2c14e"/><path d="M24 11c5 0 9 3.6 9 8.5 0 5.4-4.2 9.3-9 9.3s-9-3.9-9-9.3C15 14.6 19 11 24 11z" fill="#8e2436"/><path d="M24 15c2.7 0 4.7 2 4.7 4.6 0 2.7-2.2 4.7-4.7 4.7s-3.4-1.6-3.4-3.5c0-1.8 1.4-2.9 2.9-2.9" fill="none" stroke="#fbf5ec" stroke-width="1.6" stroke-linecap="round"/><path d="M24 29v8" stroke="#6e7f5c" stroke-width="2" stroke-linecap="round"/><path d="M24 34c-3.2 0-5.4-1.8-5.9-4 2.7 0 5 1.2 5.9 4zM24 32.6c2.7 0 5-1.4 5.4-3.6-2.5 0-4.7 1.2-5.4 3.6z" fill="#6e7f5c"/></svg>"""
FLOURISH = '<svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true"><path d="M2 14C40 4 90 2 198 10" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/></svg>'
SPIN = """<div class="spin-badge" aria-hidden="true"><svg class="ring" viewBox="0 0 200 200"><defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><circle cx="100" cy="100" r="98" fill="#fffdf9"/><text font-family="Plus Jakarta Sans, sans-serif" font-size="14.5" font-weight="800" fill="#8e2436"><textPath href="#circ" textLength="486" lengthAdjust="spacing">BREAKFAST • LUNCH • HOLLISTER, CA • EST. 2002 • </textPath></text></svg><div class="core"><div><small>Since</small><b>2002</b></div></div></div>"""


CAMERA = svg('<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>')


def photo(key_or_src, alt="", path="", label=None, eager=False):
    if isinstance(key_or_src, tuple):
        src, alt, path, label = key_or_src
    else:
        src = key_or_src
    label = label or alt
    if not src:
        return (f'<div class="placeholder" role="img" aria-label="Photo placeholder: {label}"><div class="placeholder-card">'
                f'{CAMERA}'
                f'<strong>{label}</strong><span>Owner photo needed</span><code>{path}</code></div></div>')
    ld = 'fetchpriority="high"' if eager else 'loading="lazy"'
    return f'<img class="photo" src="{src}" alt="{alt}" {ld} decoding="async" data-label="{label}" data-path="{path}">'


PH = {
    "hero": (f"{TOAST}/20220129.jpg", "Exterior of Country Rose Cafe with its open sign", "assets/images/hero.jpg", "Hero photo — cafe exterior"),
    "pancakes": (f"{TOAST}/20231112.jpg", "Buttermilk pancakes with butter and syrup", "assets/images/breakfast.jpg", "Breakfast photo"),
    "platter": (f"{TOAST}/20240124.jpg", "Hearty country breakfast platter with eggs, potatoes and toast", "assets/images/country-breakfast.jpg", "Country breakfast photo"),
    "interior": (f"{TOAST}/Screenshot20250121at11904PM.png", "Inside Country Rose Cafe — dining room and gift counter with jewelry displays", "assets/images/restaurant.jpg", "Interior / gift counter photo"),
    "lunch": (None, "", "assets/images/lunch.jpg", "Lunch photo — burger or sandwich"),
}

NAV = [("index.html", "Home", "home"), ("menu.html", "Menu", "menu"), ("index.html#story", "Our Story", "about"),
       ("index.html#gallery", "Gallery", "gallery"), ("order.html", "Order Online", "order"), ("contact.html", "Contact", "contact")]
CUR = ' aria-current="page"'


def head(title, desc, page, canon):
    return f"""<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="keywords" content="Country Rose Cafe, Country Rose Cafe Hollister, breakfast Hollister CA, lunch Hollister CA, breakfast restaurant Hollister, restaurants in Hollister CA">
<!-- DEMO: remove this noindex line when the owner approves the launch -->
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="https://www.example.com/{canon}">
<meta name="theme-color" content="#fbf5ec">
<meta name="geo.region" content="US-CA"><meta name="geo.placename" content="Hollister">
<meta property="og:type" content="website"><meta property="og:site_name" content="Country Rose Cafe"><meta property="og:locale" content="en_US">
<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}">
<meta property="og:url" content="https://www.example.com/{canon}"><meta property="og:image" content="{TOAST}/20220129.jpg">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{title}"><meta name="twitter:description" content="{desc}"><meta name="twitter:image" content="{TOAST}/20220129.jpg">
<link rel="icon" href="assets/images/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&amp;family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..700,0..100,0..1;1,9..144,300..700,0..100,0..1&amp;family=Plus+Jakarta+Sans:wght@400..800&amp;display=swap">
<link rel="stylesheet" href="assets/css/styles.css">
<script>document.documentElement.classList.add("js")</script>
<script type="application/ld+json">
{{"@context":"https://schema.org","@type":"Restaurant","name":"Country Rose Cafe","description":"Breakfast and lunch in a cozy, easygoing atmosphere, with a unique gift counter.","telephone":"+18316350252","url":"https://www.example.com/","image":["{TOAST}/20220129.jpg","{TOAST}/20231112.jpg"],"address":{{"@type":"PostalAddress","streetAddress":"756 San Benito Street","addressLocality":"Hollister","addressRegion":"CA","postalCode":"95023","addressCountry":"US"}},"servesCuisine":["American","Breakfast","Lunch"],"hasMenu":"https://www.example.com/menu.html","foundingDate":"2002","acceptsReservations":false,"sameAs":["{FB}"],"potentialAction":{{"@type":"OrderAction","target":"{TOAST_ORDER}"}}}}
</script>
</head>
<body data-page="{page}">
<a class="skip-link" href="#main">Skip to main content</a>
<div class="demo-banner demo-only"><b>Website concept</b> prepared for Country Rose Cafe · Not yet the official website · Order &amp; contact forms run in demo mode</div>
{nav(page)}
<main id="main" tabindex="-1">
"""


def nav(page):
    links = "".join(f'<a href="{h}"{CUR if k == page else ""}>{t}</a>' for h, t, k in NAV if k != "order")
    sheet = "".join(f'<li><a href="{h}"{CUR if k == page else ""}>{t}</a></li>' for h, t, k in NAV)
    return f"""<div class="nav-shell">
  <nav class="nav" aria-label="Main">
    <a class="brand" href="index.html" aria-label="Country Rose Cafe — home">{ROSE}<span><span class="brand-name">Country Rose<span class="cafe-word"> Cafe</span></span><span class="brand-sub">Hollister · Est. 2002</span></span></a>
    <div class="nav-links">{links}</div>
    <div class="nav-actions">
      <a class="nav-phone" href="{TEL}">{I["phone"]}{PHONE}</a>
      <div class="lang" role="group" aria-label="Language / Idioma" data-no-i18n><button type="button" data-set-lang="en" aria-pressed="true"><span aria-hidden="true">EN</span><span class="sr-only">English</span></button><button type="button" data-set-lang="es" aria-pressed="false"><span aria-hidden="true">ES</span><span class="sr-only">Español</span></button></div>
      <a class="icon-btn" href="order.html#cart" data-cart-link aria-label="View order">{I["bag"]}<span class="badge" data-cart-count hidden>0</span></a>
      <a class="btn btn-rose nav-order" href="order.html">Order Online</a>
      <button type="button" class="icon-btn menu-toggle" aria-expanded="false" aria-controls="sheet" aria-label="Open menu">{I["menu"]}</button>
    </div>
  </nav>
</div>
<div id="sheet" class="sheet" hidden role="dialog" aria-modal="true" aria-label="Site menu">
  <div class="sheet-top"><span class="brand">{ROSE}<span class="brand-name" style="color:var(--paper)">Country Rose</span></span><button type="button" class="icon-btn sheet-close" aria-label="Close menu">{I["close"]}</button></div>
  <div><nav aria-label="Mobile"><ol>{sheet}</ol></nav>
    <div class="sheet-foot"><div class="lang lang-lg" role="group" aria-label="Language / Idioma" data-no-i18n><button type="button" data-set-lang="en" aria-pressed="true">English</button><button type="button" data-set-lang="es" aria-pressed="false">Español</button></div><a class="btn btn-butter" href="{TEL}">{I["phone"]} Call {PHONE}</a><a class="btn btn-ghost-light" href="{DIR}" {NT}>{I["dir"]} Get Directions{SRN}</a><p>756 San Benito Street · Hollister, CA</p></div>
  </div>
</div>"""


FOOT = f"""</main>
<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div class="big-cta">
        <h3>Hungry yet?<br><span class="italic" style="color:var(--butter)">Pull up a chair.</span></h3>
        <div class="btn-row"><a class="btn btn-butter" href="order.html">{I["bag"]} Order Online</a><a class="btn btn-ghost-light" href="{TEL}">{I["phone"]} {PHONE}</a></div>
      </div>
      <div><h2>Visit</h2><address><a href="{MAPS}" {NT}>756 San Benito Street<br>Hollister, CA 95023{SRN}</a></address><p style="margin-top:1rem"><a href="{FB}" {NT} style="display:inline-flex;gap:.5rem;align-items:center">{I["fb"]} Facebook{SRN}</a></p></div>
      <div><h2>Hours</h2><div data-hours></div></div>
      <div><h2>Explore</h2><ul><li><a href="menu.html">Full Menu</a></li><li><a href="order.html">Order Online</a></li><li><a href="index.html#story">Our Story</a></li><li><a href="index.html#gallery">Gallery</a></li><li><a href="contact.html">Contact</a></li></ul></div>
    </div>
    <div class="footer-bottom"><span>© <span data-year>2026</span> Country Rose Cafe · Hollister, California</span><span class="demo-only">Website concept prepared for Country Rose Cafe · Demo version</span></div>
    <p class="wordmark" aria-hidden="true">Country Rose</p>
  </div>
</footer>
<nav class="dock" aria-label="Quick actions">
  <a href="{TEL}">{I["phone"]}Call</a>
  <a href="{DIR}" {NT}>{I["dir"]}Directions</a>
  <a class="go" href="order.html">{I["bag"]}Order now</a>
</nav>
<button type="button" id="rosie-btn" class="rosie-btn" aria-expanded="false" aria-controls="rosie"><span class="pulse" aria-hidden="true"></span>{ROSIE_AV}<span class="txt">Ask Rosie</span><span class="sr-only"> — menu helper</span></button>
<section id="rosie" class="rosie" hidden aria-label="Rosie, the menu helper">
  <div class="rosie-head">{ROSIE_AV}<div><b>Rosie</b><small>Menu helper · answers from our menu</small></div><button type="button" class="icon-btn rosie-close" aria-label="Close menu helper">{I["close"]}</button></div>
  <div class="rosie-log" role="log" aria-live="polite" data-no-i18n></div>
  <div class="rosie-sugg" aria-label="Suggested questions" data-no-i18n></div>
  <form class="rosie-form" autocomplete="off"><label class="sr-only" for="rosie-q">Ask Rosie</label><input id="rosie-q" placeholder="Ask about dishes, prices, kids menu…" maxlength="200"><button type="submit" aria-label="Send">{I["send"]}</button></form>
  <p class="rosie-foot">Automated helper — for anything else, call {PHONE}.</p>
</section>
<div id="lightbox" class="lightbox" hidden role="dialog" aria-modal="true" aria-label="Photo viewer"><button type="button" class="icon-btn" aria-label="Close photo">{I["close"]}</button><div><img alt=""><p></p></div></div>
<div id="toast" class="toast-wrap" aria-live="polite"></div>
<script src="assets/js/config.js"></script>
<script src="assets/js/menu-data.js"></script>
<script src="assets/js/menu-es.js"></script>
<script src="assets/js/i18n.js"></script>
<script src="assets/js/app.js"></script>
</body>
</html>
"""

VISIT = f"""<section id="visit" class="section" aria-labelledby="visit-title">
  <div class="wrap">
    <div class="head-row reveal"><div><span class="kicker">Visit us</span><h2 id="visit-title" class="display-lg">Come as you are.<br><span class="italic rose">Leave full.</span></h2></div>
      <div class="btn-row"><a class="btn btn-dark" href="{DIR}" {NT}>{I["dir"]} Get Directions{SRN}</a><a class="btn btn-line" href="{TEL}">{I["phone"]} Call</a></div></div>
    <div class="visit">
      <div class="visit-card reveal">
        <div class="v-row"><span class="v-ico">{I["pin"]}</span><div><h3>Address</h3><address>Country Rose Cafe<br>756 San Benito Street<br>Hollister, CA 95023</address></div></div>
        <div class="v-row"><span class="v-ico">{I["phone"]}</span><div><h3>Phone</h3><a class="val" href="{TEL}">{PHONE}</a></div></div>
        <div class="v-row"><span class="v-ico">{I["clock"]}</span><div><h3>Hours</h3><div data-hours style="margin-top:.2rem"></div></div></div>
        <div class="v-row"><span class="v-ico">{I["bag"]}</span><div><h3>Service</h3><p class="val">Dine in · Pickup · Delivery</p></div></div>
      </div>
      <div class="map reveal" style="--d:.1s"><div class="pin-card">{ROSE.replace('class="brand-mark"', '')}Country Rose Cafe</div><iframe title="Map showing Country Rose Cafe at 756 San Benito Street, Hollister, CA 95023" src="{EMBED}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
    </div>
    <p class="small muted" style="margin-top:1rem">Map not loading? <a class="link" href="{MAPS}" {NT}>Open in Google Maps{SRN}</a></p>
  </div>
</section>"""


def contact(h="h2"):
    return f"""<section id="contact" class="section" aria-labelledby="contact-title">
  <div class="wrap contact-grid">
    <div class="reveal">
      <span class="kicker">Say hello</span>
      <{h} id="contact-title" class="display-lg" style="margin-top:.9rem">Let&#39;s <span class="italic rose">talk</span>.</{h}>
      <p class="lede" style="margin-top:1rem">Questions about the menu or the gift counter? Drop us a note — or call, it&#39;s the fastest way to reach the kitchen.</p>
      <ul class="c-list">
        <li><span class="v-ico">{I["pin"]}</span><address><b>Country Rose Cafe</b><br>756 San Benito Street, Hollister, CA 95023</address></li>
        <li><span class="v-ico">{I["phone"]}</span><a href="{TEL}" style="font-weight:800;font-size:1.2rem;text-decoration:none">{PHONE}</a></li>
        <li><span class="v-ico" style="color:#1877f2">{I["fb"]}</span><a class="link" href="{FB}" {NT}>Country Rose Cafe on Facebook{SRN}</a></li>
      </ul>
    </div>
    <div class="form-card reveal" style="--d:.1s">
      <form id="contact-form" class="form" novalidate>
        <div class="row2">
          <div><div class="fl"><input class="field" id="c-name" name="name" placeholder=" " autocomplete="name" maxlength="100" required><label for="c-name">Your name *</label></div><p class="field-error" id="c-name-err" data-error-for="name"></p></div>
          <div><div class="fl"><input class="field" id="c-email" name="email" type="email" inputmode="email" placeholder=" " autocomplete="email" maxlength="200" required><label for="c-email">Email *</label></div><p class="field-error" id="c-email-err" data-error-for="email"></p></div>
        </div>
        <div><div class="fl"><input class="field" id="c-phone" name="phone" type="tel" inputmode="tel" placeholder=" " autocomplete="tel" maxlength="30"><label for="c-phone">Phone <span class="opt">(optional)</span></label></div><p class="field-error" id="c-phone-err" data-error-for="phone"></p></div>
        <div><div class="fl"><textarea class="field" id="c-message" name="message" placeholder=" " rows="5" maxlength="2000" required></textarea><label for="c-message">Your message *</label></div><p class="field-error" id="c-message-err" data-error-for="message"></p></div>
        <div class="hp" aria-hidden="true"><label for="c-company">Company</label><input id="c-company" name="company" tabindex="-1" autocomplete="off"></div>
        <div class="btn-row" style="align-items:center"><button type="submit" class="btn btn-rose">{I["send"]} Send message</button><span class="small muted">We reply by email or phone.</span></div>
        <div id="contact-status" class="form-status" role="status" aria-live="polite" tabindex="-1"></div>
      </form>
    </div>
  </div>
</section>"""


def write(n, html):
    with open(os.path.join(ROOT, n), "w", encoding="utf-8") as f:
        f.write(html)


def page_hero(kicker, h1, lede, actions, extra=""):
    return f"""<section class="page-hero"><span class="hero-blob a" aria-hidden="true"></span><span class="hero-blob b" aria-hidden="true"></span>
  <div class="wrap"><div class="page-hero-grid">
    <div class="reveal"><span class="kicker">{kicker}</span><h1>{h1}</h1><p class="lede">{lede}</p></div>
    <div class="btn-row reveal" style="--d:.1s">{actions}</div>
  </div>{extra}</div>
</section>"""


# =========================================================== index.html
index = head("Country Rose Cafe | Breakfast &amp; Lunch in Hollister, CA",
             "Country Rose Cafe serves breakfast and lunch at 756 San Benito Street in Hollister, CA — omelets, pancakes, scrambles, burgers, sandwiches and salads in a cozy, easygoing cafe with a unique gift counter. Open since 2002. Call (831) 635-0252.",
             "home", "") + f"""
<section class="hero" aria-labelledby="hero-title">
  <span class="hero-blob a" aria-hidden="true"></span><span class="hero-blob b" aria-hidden="true"></span>
  <div class="wrap hero-grid">
    <div>
      <p class="hero-eyebrow reveal"><span class="dot">Since 2002</span> Breakfast &amp; lunch · Hollister, CA</p>
      <h1 id="hero-title" class="reveal" style="--d:.05s"><span class="line">Country</span><span class="line"><span class="flourish">Rose{FLOURISH}</span> <span class="cafe">Cafe</span></span></h1>
      <p class="lede reveal" style="--d:.12s"><span class="script" style="font-size:1.6em;color:var(--rose);line-height:1">A taste of home.</span><br>Join us for breakfast and lunch in a cozy, easygoing atmosphere — American eats, big plates, and a unique gift counter. <span class="rot-line">Come in for <span class="rotator" aria-hidden="true"><span>country cakes.</span><span>a John Wayne omelet.</span><span>Hector&#39;s chilaquiles.</span></span></span><span class="sr-only">breakfast and lunch.</span></p>
      <div class="btn-row reveal" style="--d:.18s">
        <a class="btn btn-rose" href="order.html">{I["bag"]} Order Online {I["arrow"]}</a>
        <a class="btn btn-line" href="menu.html">View the Menu</a>
        <a class="btn btn-line" href="{TEL}" aria-label="Call us at {PHONE}">{I["phone"]} Call Us</a>
      </div>
      <div class="hero-facts reveal" style="--d:.24s">
        <a href="{DIR}" {NT}>{I["pin"]} 756 San Benito St, Hollister{SRN}</a>
        <span>{I["bag"]} Dine in · Pickup · Delivery</span>
        <span>{I["gift"]} Gift counter inside</span>
      </div>
    </div>
    <div class="collage reveal" style="--d:.1s">
      {SPIN}
      <div class="main ph">{photo(PH["hero"], eager=True)}</div>
      <div class="inset ph">{photo(PH["pancakes"])}</div>
      <div class="note"><span class="script">Buttermilk pancakes</span><small>Big Country Cakes · three stacked</small></div>
    </div>
  </div>
  <div class="marquee" aria-hidden="true"><div class="marquee-track" data-marquee></div></div>
  <div class="marquee alt" aria-hidden="true"><div class="marquee-track" data-marquee></div></div>
</section>

<section id="why" class="section" aria-labelledby="why-title">
  <div class="wrap">
    <div class="head-row reveal"><div><span class="kicker">Why stop in</span><h2 id="why-title" class="display-lg">Real food. Big plates.<br><span class="italic rose">Since 2002.</span></h2></div>
      <p class="lede" style="max-width:26rem">A small-town cafe with a big menu — breakfast and lunch done the way you remember, in a room that feels like home.</p></div>
    <div class="bento">
      <a class="cell b-photo ph zoom reveal" href="menu.html">{photo(PH["platter"])}<div class="cap"><h3>Big country breakfasts</h3><p>Steak &amp; eggs, scrambles, omelets, combos — served with potatoes and toast.</p></div><span class="corner" style="color:#fff">{I["arrow"]}</span></a>
      <div class="cell b-stat reveal" style="--d:.05s"><span class="kicker" style="color:var(--espresso)">Open since</span><span class="num">2002</span><p>More than two decades of breakfast &amp; lunch.</p></div>
      <div class="cell b-gift reveal" style="--d:.1s"><div class="ph zoom">{photo(PH["interior"])}</div><div class="txt"><h3>{I["gift"]} Gift counter</h3><p>Unique finds and special gifts while you wait.</p></div></div>
      <div class="cell b-quote reveal" style="--d:.1s"><blockquote>Voted by Hollister residents as “Best Breakfast” running for over 20 years.</blockquote><small>As published on the restaurant&#39;s website</small></div>
      <a class="cell b-menu reveal" href="menu.html" style="--d:.15s;text-decoration:none"><span class="num" data-count-items>207</span><div><h3>Dishes on the menu</h3><p>From Lil Buckaroo&#39;s plates to ribeye &amp; eggs.</p></div><span class="corner" style="background:rgb(110 127 92 / .15)">{I["arrow"]}</span></a>
      <a class="cell b-order reveal" href="order.html" style="--d:.2s;text-decoration:none"><h3>Order ahead</h3><p>Pickup or delivery — build your order in under a minute.</p><span class="corner">{I["arrow"]}</span></a>
    </div>
  </div>
</section>

<section id="crave-section" class="section" style="padding-top:0" aria-labelledby="crave-title">
  <div class="wrap">
    <div id="crave" class="crave reveal">
      <div class="crave-top">
        <div><span class="kicker">Can&#39;t decide?</span><h2 id="crave-title" class="display-md" style="margin-top:.8rem">What are you <span class="italic rose">craving</span> today?</h2><p class="lede" style="margin-top:.75rem">Pick a mood — we&#39;ll pull three dishes straight from the menu.</p></div>
        <button type="button" id="crave-surprise" class="btn btn-dark">{I["shuffle"]} Surprise me</button>
      </div>
      <div id="crave-chips" class="chips" aria-label="Choose a craving"></div>
      <p id="crave-live" class="sr-only" aria-live="polite"></p>
      <div id="crave-results" class="crave-results"></div>
    </div>
  </div>
</section>

<section id="highlights" class="section" style="padding-top:0" aria-labelledby="hl-title">
  <div class="wrap">
    <div class="head-row reveal"><div><span class="kicker">From the menu</span><h2 id="hl-title" class="display-lg">Plates worth<br><span class="italic rose">getting up for.</span></h2></div>
      <div class="rail-ctrl"><button type="button" class="round" data-rail-prev aria-label="Scroll left">{I["left"]}</button><button type="button" class="round" data-rail-next aria-label="Scroll right">{I["arrow"]}</button></div></div>
    <div id="rail" class="rail" aria-label="Menu highlights"></div>
    <div class="btn-row" style="justify-content:center"><a class="btn btn-line" href="menu.html">See all 207 items {I["arrow"]}</a></div>
  </div>
</section>

<section id="story" class="dark section" aria-labelledby="story-title">
  <svg class="rose-watermark" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 6c9 0 16 6.4 16 15.2C40 31 32.4 38 24 38S8 31 8 21.2C8 12.4 15 6 24 6z" fill="none" stroke="#fbf5ec" stroke-width="1.2"/><path d="M24 13c4.8 0 8.4 3.6 8.4 8.2 0 4.8-4 8.4-8.4 8.4s-6-2.8-6-6.2c0-3.2 2.4-5.2 5.2-5.2" fill="none" stroke="#fbf5ec" stroke-width="1.2"/></svg>
  <div class="wrap story-grid">
    <div class="story-photos reveal"><div class="a ph">{photo(PH["interior"])}</div><div class="b ph">{photo(PH["pancakes"])}</div></div>
    <div class="story-copy reveal" style="--d:.1s">
      <span class="kicker light">Our story</span>
      <h2 id="story-title" class="display-lg" style="margin-top:.9rem">A taste of home, <span class="italic" style="color:var(--butter)">one plate at a time.</span></h2>
      <div class="body"><p>Country Rose Cafe has been open since 2002, serving American breakfast and lunch in a cozy, easygoing atmosphere.</p><p>Along with the food, there&#39;s a gift counter with unique finds and special gifts — a little something extra to discover when you visit.</p></div>
      <div class="years"><b>20+</b><span>years as a Hollister breakfast favorite, as voted by residents</span></div>
      <p class="note-box demo-only"><b>[PLACEHOLDER — VERIFY WITH RESTAURANT]</b> The owner&#39;s own story — who started the cafe, the meaning of the name, family history — goes here once provided.</p>
    </div>
  </div>
</section>

<section id="order" class="section" aria-labelledby="order-title">
  <div class="wrap">
    <div class="cta reveal">
      <div><span class="kicker light">Order ahead</span><h2 id="order-title" class="display-lg" style="margin-top:.9rem">Hungry?<br><span class="italic">We&#39;ll get it started.</span></h2>
        <p class="lede">Pickup or delivery from the full breakfast &amp; lunch menu. Order online in a minute — or call and talk to a real person.</p>
        <div class="btn-row"><a class="btn btn-butter" href="order.html">{I["bag"]} Order Online {I["arrow"]}</a><a class="btn btn-ghost-light" href="{TEL}">{I["phone"]} Call to Order</a></div></div>
      <div class="ticket"><span class="top">Call-in orders</span><a class="tel" href="{TEL}">{PHONE}</a><p class="small muted" style="margin-top:.5rem">756 San Benito Street, Hollister</p><hr><a class="ext link" href="{TOAST_ORDER}" {NT}>Prefer the current ordering page? {I["ext"]}{SRN}</a></div>
    </div>
  </div>
</section>

<section id="gallery" class="section" style="padding-top:0" aria-labelledby="gallery-title">
  <div class="wrap">
    <div class="head-row reveal"><div><span class="kicker">Gallery</span><h2 id="gallery-title" class="display-lg">Pull up <span class="italic rose">a seat.</span></h2></div>
      <a class="btn btn-fb" href="{FB}" {NT}>{I["fb"]} More on Facebook{SRN}</a></div>
    <ul class="gallery">
      <li class="reveal"><button type="button" class="g-item tall" aria-label="View photo: cafe exterior">{photo(PH["hero"])}<span class="label">The cafe</span></button></li>
      <li class="reveal"><button type="button" class="g-item sq" aria-label="View photo: pancakes">{photo(PH["pancakes"])}<span class="label">Buttermilk pancakes</span></button></li>
      <li class="reveal"><div class="g-item wide is-ph">{photo(None, "", "assets/images/gallery/lunch-burger.jpg", "Burger or lunch plate")}</div></li>
      <li class="reveal"><button type="button" class="g-item wide" aria-label="View photo: country breakfast">{photo(PH["platter"])}<span class="label">Country breakfast</span></button></li>
      <li class="reveal"><div class="g-item tall is-ph">{photo(None, "", "assets/images/gallery/omelet.jpg", "Omelet or Mexicali plate")}</div></li>
      <li class="reveal"><button type="button" class="g-item tall" aria-label="View photo: dining room and gift counter">{photo(PH["interior"])}<span class="label">Dining room &amp; gifts</span></button></li>
      <li class="reveal"><div class="g-item sq is-ph">{photo(None, "", "assets/images/gallery/dining-room.jpg", "Team or dining room photo")}</div></li>
      <li class="reveal"><div class="g-item wide is-ph">{photo(None, "", "assets/images/gallery/gift-counter.jpg", "Gift counter close-up")}</div></li>
    </ul>
    <p class="small muted demo-only" style="margin-top:1rem">Proposal note: photos are from the restaurant&#39;s current public website or are labelled placeholders — all need owner approval before launch.</p>
  </div>
</section>

{VISIT}

<section class="wrap" aria-labelledby="social-title"><div class="social reveal"><div><span class="kicker">Stay in the loop</span><h2 id="social-title" class="display-md" style="margin-top:.7rem">Specials, photos &amp; news.</h2><p class="lede" style="margin-top:.5rem">Follow Country Rose Cafe on Facebook.</p></div><a class="btn btn-fb" href="{FB}" {NT}>{I["fb"]} Follow on Facebook{SRN}</a></div></section>

{contact()}
""" + FOOT
write("index.html", index)

# =========================================================== menu.html
menu = head("Menu — Breakfast &amp; Lunch | Country Rose Cafe, Hollister CA",
            "The full Country Rose Cafe menu: specialties, omelets, country cakes, combos, scrambles, Mexicali breakfast, sandwiches, salads, burgers, baskets, kids' menu and drinks. Hollister, CA.",
            "menu", "menu.html") + page_hero(
    "Breakfast · Lunch · Lil Buckaroo&#39;s · Drinks", 'The <span class="italic rose">Menu</span>',
    '<span data-count-items>207</span> dishes and drinks, exactly as served. Search it, browse it, or tap &ldquo;Add&rdquo; to build your order.',
    f'<a class="btn btn-rose" href="order.html">{I["bag"]} Order Online</a><a class="btn btn-line" href="{TEL}">{I["phone"]} Call to Order</a>') + f"""
<div class="wrap menu-page" style="padding-bottom:3rem">
  <div class="menu-shell">
    <aside id="menu-side" class="menu-side" aria-label="Menu categories"></aside>
    <div style="min-width:0"><div id="menu-browser" data-orderable="true" data-columns="2"><p class="muted">Loading menu…</p></div>
      <noscript><p class="notice">Please enable JavaScript to browse the interactive menu, or call {PHONE}.</p></noscript>
      <div class="small muted" style="margin-top:3rem"><p>Menu and prices as published on the restaurant&#39;s online menu (September 29, 2026). Prices and availability may change.</p><p style="margin-top:.4rem">If you use a credit card, this establishment will charge an additional 3.00% to help offset processing costs.</p></div>
    </div>
  </div>
</div>
""" + FOOT
write("menu.html", menu)

# =========================================================== order.html
order = head("Order Online — Pickup &amp; Delivery | Country Rose Cafe, Hollister CA",
             "Order breakfast and lunch from Country Rose Cafe in Hollister, CA for pickup or delivery, or call (831) 635-0252 to order by phone.",
             "order", "order.html") + page_hero(
    "Pickup &amp; delivery", 'Order <span class="italic rose">Online</span>',
    "Build your order from the full menu, then tell us how you&#39;d like it. Prefer a real person? Call and we&#39;ll take it over the phone.",
    f'<a class="btn btn-line" href="{TEL}">{I["phone"]} Call to Order</a><a class="btn btn-line" href="{TOAST_ORDER}" {NT}>Current ordering page {I["ext"]}{SRN}</a>',
    f'<p class="notice demo-only reveal" style="margin-top:1.75rem;--d:.15s"><b>Demo ordering:</b> the cart and checkout fully work, but submissions aren&#39;t connected to the restaurant yet (set <code>orderFormEndpoint</code> in <code>assets/js/config.js</code>). No payment is collected. To order today, call {PHONE}.</p>') + f"""
<div class="wrap order-page" style="padding-bottom:3rem">
  <div id="order-app" style="scroll-margin-top:7rem">
    <ol id="order-steps" class="steps scroller" aria-label="Order progress"></ol>
    <div id="step-menu" class="order-layout">
      <div><div id="menu-browser" data-orderable="true" data-columns="1"><p class="muted">Loading menu…</p></div></div>
      <aside id="cart" class="sticky-aside" aria-label="Your order"><div class="cart" data-cart-panel="interactive"></div></aside>
      <a id="cart-fab" class="cart-fab" href="#cart" hidden></a>
    </div>
    <div id="step-details" class="order-layout" hidden>
      <form id="details-form" class="panel form" novalidate>
        <div><h2 tabindex="-1" class="display-md" style="outline:none">Your details</h2><p class="muted" style="margin-top:.5rem">So the kitchen knows who it&#39;s for and how to reach you.</p></div>
        <fieldset><legend>How would you like it?</legend>
          <div class="choice-grid">
            <label class="choice"><input type="radio" name="fulfillment" value="pickup" checked><span>Pickup<small>756 San Benito Street, Hollister</small></span></label>
            <label class="choice" id="choice-delivery"><input type="radio" name="fulfillment" value="delivery"><span>Delivery<small>Fees &amp; area confirmed by the restaurant</small></span></label>
          </div></fieldset>
        <div class="row2">
          <div><div class="fl"><input class="field" id="o-name" name="name" placeholder=" " autocomplete="name" maxlength="100" required><label for="o-name">Full name *</label></div><p class="field-error" id="o-name-err" data-error-for="name"></p></div>
          <div><div class="fl"><input class="field" id="o-phone" name="phone" type="tel" inputmode="tel" placeholder=" " autocomplete="tel" maxlength="30" required><label for="o-phone">Phone *</label></div><p class="field-error" id="o-phone-err" data-error-for="phone"></p></div>
        </div>
        <div><div class="fl"><input class="field" id="o-email" name="email" type="email" inputmode="email" placeholder=" " autocomplete="email" maxlength="200"><label for="o-email">Email <span class="opt">(optional)</span></label></div><p class="field-error" id="o-email-err" data-error-for="email"></p></div>
        <div id="address-row" hidden><div class="fl"><input class="field" id="o-address" name="address" placeholder=" " autocomplete="street-address" maxlength="300"><label for="o-address">Delivery address *</label></div><p class="field-error" id="o-address-err" data-error-for="address"></p></div>
        <div class="fl"><textarea class="field" id="o-notes" name="notes" placeholder=" " rows="3" maxlength="500"></textarea><label for="o-notes">Notes — egg style, potatoes, meat choice, allergies, pickup time</label></div>
        <div class="btn-row"><button type="submit" class="btn btn-rose">Review order {I["arrow"]}</button><button type="button" class="btn btn-line" data-go="menu">Back to menu</button></div>
      </form>
      <aside class="sticky-aside" aria-label="Your order"><div class="cart" data-cart-panel="compact"></div></aside>
    </div>
    <div id="step-review" hidden>
      <div class="panel narrow">
        <h2 tabindex="-1" class="display-md" style="outline:none">Review your order</h2>
        <ul id="review-lines" class="sum-lines"></ul>
        <div class="subtotal" style="margin-top:1rem"><span>Subtotal</span><b id="review-subtotal"></b></div>
        <p class="small muted" style="margin-top:.5rem">Tax, delivery fees and any card surcharge are confirmed by the restaurant. If you use a credit card, this establishment will charge an additional 3.00% to help offset processing costs.</p>
        <dl id="review-info" class="sum-box"></dl>
        <p class="notice" style="margin-top:1.5rem"><b>Payment:</b> no payment is taken on this website — the restaurant confirms your total and collects payment.</p>
        <div class="btn-row" style="margin-top:2rem"><button type="button" id="place-order" class="btn btn-rose">Place order request {I["arrow"]}</button><button type="button" class="btn btn-line" data-go="details">Edit details</button></div>
      </div>
    </div>
    <div id="step-done" hidden><div class="panel narrow center" role="status" id="done-body"></div></div>
  </div>
  <noscript><p class="notice">Online ordering needs JavaScript. Please call {PHONE} to order.</p></noscript>
</div>
""" + FOOT
write("order.html", order)

# =========================================================== contact.html
write("contact.html", head("Contact &amp; Location | Country Rose Cafe, Hollister CA",
                           "Contact Country Rose Cafe at 756 San Benito Street, Hollister, CA 95023. Call (831) 635-0252, get directions, or send us a message.",
                           "contact", "contact.html") + contact("h1") + VISIT + FOOT)

# =========================================================== 404.html
write("404.html", head("Page not found | Country Rose Cafe", "This page could not be found.", "404", "404.html") + f"""
<section class="page-hero center" style="padding-block:6rem"><span class="hero-blob a" aria-hidden="true"></span>
  <div class="wrap"><p class="script" style="font-size:3rem;color:var(--rose)">Oops —</p><h1 style="font-size:clamp(4rem,14vw,10rem)">4<span class="italic rose">0</span>4</h1>
  <p class="lede" style="margin:1rem auto 0">This page wandered off. The menu, ordering and our phone number are one tap away.</p>
  <div class="btn-row" style="justify-content:center;margin-top:2rem"><a class="btn btn-rose" href="index.html">Back home</a><a class="btn btn-line" href="menu.html">View the menu</a><a class="btn btn-line" href="{TEL}">{I["phone"]} {PHONE}</a></div></div>
</section>
""" + FOOT)
print("Built: index.html, menu.html, order.html, contact.html, 404.html")
