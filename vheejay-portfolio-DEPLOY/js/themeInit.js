/*
 * Runs in <head> before the page paints, so a dark visitor never sees a white flash.
 * It is a classic script (not a module) on purpose and mirrors getInitialTheme() in theme.js.
 */
(function () {
  var theme = null;
  try {
    theme = window.localStorage.getItem('portfolio-theme');
  } catch (error) {
    theme = null;
  }
  if (theme !== 'dark' && theme !== 'light') {
    var hour = new Date().getHours();
    theme = hour >= 18 || hour < 6 ? 'dark' : 'light';
  }
  document.documentElement.setAttribute('data-theme', theme);
})();
