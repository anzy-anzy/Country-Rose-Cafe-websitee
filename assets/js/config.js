/* ============================================================================
 *  COUNTRY ROSE CAFE — SITE CONFIGURATION (edit this one file)
 *  Verified from https://countryrosecafe-hollister.com/ on Sept 29, 2026.
 *  Anything marked PLACEHOLDER must be confirmed with the restaurant.
 * ========================================================================== */
window.CRC_CONFIG = {
  name: "Country Rose Cafe",
  tagline: "A Taste of Home",
  description:
    "Join us for breakfast and lunch in a cozy, easygoing atmosphere. Discover our American eats and explore our unique gift counter.",
  openSince: 2002,
  // Published on the restaurant's website — confirm wording, or set to null to hide.
  communityRecognition: 'Voted by Hollister residents as "Best Breakfast" running for over 20 years',

  address: { street: "756 San Benito Street", city: "Hollister", region: "CA", postalCode: "95023" },
  phone: { display: "(831) 635-0252", href: "tel:+18316350252" },

  links: {
    facebook: "https://www.facebook.com/profile.php?id=100068233964007",
    onlineOrdering: "https://countryrosecafe-hollister.com/order/countryrosecafe",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Country+Rose+Cafe%2C+756+San+Benito+Street%2C+Hollister%2C+CA+95023",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Country+Rose+Cafe%2C+756+San+Benito+Street%2C+Hollister%2C+CA+95023",
    mapEmbed: "https://www.google.com/maps?q=Country+Rose+Cafe,+756+San+Benito+Street,+Hollister,+CA+95023&output=embed",
  },

  deliveryEnabled: true,
  cardSurchargeNote:
    "If you use a credit card, this establishment will charge an additional 3.00% to help offset processing costs.",

  /* OPENING HOURS — PLACEHOLDER. Not published on the public website.
     Fill in e.g. { day: "Monday", hours: "7:00 AM – 2:00 PM" } and set hoursVerified: true. */
  hoursVerified: false,
  hours: [
    { day: "Monday", hours: "" }, { day: "Tuesday", hours: "" }, { day: "Wednesday", hours: "" },
    { day: "Thursday", hours: "" }, { day: "Friday", hours: "" }, { day: "Saturday", hours: "" }, { day: "Sunday", hours: "" },
  ],

  /* Language shown on first visit: "en" or "es". Visitors can switch with the EN | ES button. */
  defaultLanguage: "en",

  /* Proposal mode: shows the "Website concept" banner. Set false after the owner approves. */
  demoMode: true,

  /* ---------------- FORMS ----------------
     Static sites can't send email by themselves. Paste a form-service endpoint:
       • Formspree:  https://formspree.io/f/XXXXXXXX
       • Web3Forms:  https://api.web3forms.com/submit  (also set web3formsKey)
       • Your own:   n8n webhook, AWS API Gateway + Lambda, etc. (receives JSON)
     Leave empty ("") for demo mode — forms validate but clearly say nothing was sent. */
  contactFormEndpoint: "",
  orderFormEndpoint: "",
  web3formsKey: "", // public access key, only if you use Web3Forms
};
