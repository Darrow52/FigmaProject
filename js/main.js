/* =========================
   Page entry point: every section script defines its own init function,
   main.js is loaded last and starts them.
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  initProduct();
  initReviews();
  initFaq();
  initNewsletter();
  initMarquees();
});
