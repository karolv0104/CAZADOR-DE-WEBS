/* Runs in <head> before first paint: enables JS styles and the once-per-visit intro. */
(function () {
  var d = document.documentElement, seen = false;
  d.classList.add('js');
  try { seen = sessionStorage.getItem('jmnii-intro') === '1'; } catch (e) {}
  if (!seen && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) d.classList.add('intro');
})();
