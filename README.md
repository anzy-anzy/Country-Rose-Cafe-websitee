# Country Rose Cafe — Static Website (concept, 2026 design)

**What's new in v2:** floating glass navigation · big editorial hero with animated "Since 2002" seal and rotating dishes ·
scrolling menu ticker · bento "why stop in" grid · **"What are you craving?"** mood picker (Sweet, Hearty, Spicy, Mexicali, Burgers,
Fresh, Kids + *Surprise me*) · swipeable plate carousel · dark "Our story" section · ticket-style call-to-order card ·
masonry gallery with a full-screen photo viewer · menu page with a sticky category sidebar that follows your scroll ·
floating-label forms · mobile quick-action dock · **Rosie**, a menu helper chat that answers only from the real menu and
config (hours, delivery, kids menu, prices, "under $10", dish lookups) — no AI service or API key involved.

## English / Español

An **EN | ES** switch sits in the top bar (and at the bottom of the phone menu). The choice is remembered on that device.
Everything switches: page text, buttons, menu categories and descriptions, cart, checkout, form errors, and Rosie
(she also understands questions typed in Spanish, e.g. "¿entregan a domicilio?" or "hamburguesa con tocino").

- Share a Spanish link: `index.html?lang=es` (works on every page).
- Open in Spanish by default: set `defaultLanguage: "es"` in `assets/js/config.js`.
- Edit Spanish wording: `assets/js/i18n.js` (site text) and `assets/js/menu-es.js` (menu descriptions).
- Dish names and prices stay as published so phone and kitchen orders match.
- Have a Spanish-speaking staff member review the wording before launch.

Plain HTML / CSS / JavaScript. **No install, no build.** Double-click `index.html` to open it in your browser.

```
index.html      Home: hero, intro, featured items, about, order, gallery, map, Facebook, contact form
menu.html       Full menu — 207 items, tabs, category links, live search, "Add" buttons
order.html      Online ordering: cart → your details (pickup/delivery) → review → confirmation
contact.html    Contact form + location, map, hours
404.html        Not-found page (used automatically by Netlify, GitHub Pages, S3/CloudFront)
assets/css/styles.css     All styling (brand colors at the top)
assets/js/config.js       ← business info, hours, form endpoints, demo mode (edit this)
assets/js/menu-data.js    ← every menu item and price (prices in cents: 1595 = $15.95)
assets/js/menu-es.js      ← Spanish menu categories & descriptions
assets/js/i18n.js         ← EN/ES switch + Spanish site text
assets/js/app.js          Cart, menu, forms, mobile menu
assets/images/            Put owner-approved photos here
tools/build_pages.py      Optional: regenerates the 5 pages if you change the shared header/footer
```

## Make the contact & order forms really send

A static site can't send email by itself. Connect a free form service in `assets/js/config.js`:

1. **Formspree** (easiest): create a form at formspree.io → copy the endpoint (`https://formspree.io/f/xxxxxx`) →
   `contactFormEndpoint: "https://formspree.io/f/xxxxxx"`. Use a second form for `orderFormEndpoint`.
2. **Web3Forms**: `contactFormEndpoint: "https://api.web3forms.com/submit"` and set `web3formsKey`.
3. **Your own backend**: n8n webhook, AWS API Gateway + Lambda, etc. — it receives JSON.

Until an endpoint is set, both forms validate fully and clearly tell the visitor **nothing was sent** (demo mode). No payment is ever collected.

## Replace photos

Photos are currently the restaurant's own images from its public website (need owner approval) or labelled placeholders.
Put approved files in `assets/images/` (e.g. `hero.jpg`) and change the matching `src` in the HTML — each image tag has a
`data-path` showing the expected file name. In `tools/build_pages.py` the `P = {...}` registry does this for all pages at once.

## Update menu / prices / business info

- Prices & items: `assets/js/menu-data.js` (add `"featured": true` to show an item on the homepage).
- Hours, phone, links, demo mode: `assets/js/config.js`. Set `hoursVerified: true` after filling in hours.

## Launch checklist

1. Owner approves content and photos; photos placed in `assets/images/`.
2. `demoMode: false` in `config.js` (removes the concept banner and notes).
3. Remove `<meta name="robots" content="noindex, nofollow">` from each page and replace `https://www.example.com` with the real domain.
4. Connect both form endpoints and send a test message + test order.
5. Deploy: drag the folder onto **Netlify Drop**, or use GitHub Pages, or AWS S3 + CloudFront (static hosting, `index.html` default, `404.html` error page).

## To verify with Country Rose Cafe

Weekly hours (not published) · whether delivery is offered · the 3% card-surcharge note · the "Best Breakfast" claim ·
a contact email · other social accounts · owner's story · menu spellings kept as published ("eegs", "iceburg", "refied", "Jalepenos") ·
approved photos and logo.
