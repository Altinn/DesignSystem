/* globals AltinnModal */
var sessionExpiredDialog = function() {
  var cookie;
  // How long does a session last
  var sessionTimeout = 30;
  // How long before checking for a valid session for the first time
  var firstCheckTimeout = sessionTimeout - 2;
  // How often to check if the session is valid
  var checkTimeout = 2;
  var cookieName = 'sessionExpiredDialog';
  var loggedInClass = '.a-personSwitcher.logged-in';
  var isLoggedIn;
  var intervarHandler = null;

  function minutesToMilliseconds(minutes) {
    return minutes * 60 * 1000;
  }

  function getCookie() {
    var cookieValue = document.cookie.replace(new RegExp('(?:(?:^|.*;\\s*)' + cookieName + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1');

    return cookieValue;
  }

  function stopInterval() {
    if (intervarHandler != null) {
      window.clearInterval(intervarHandler);
      intervarHandler = null;
    }
  }

  function showNoticeModal() {
    alert('The session has expired');
    // AltinnModal.loadModal({ url: '/loggedout', target: '#minModal' });
  }

  function deleteCookie() {
    document.cookie = cookieName + '=; expires=0';
  }

  function checkCookie() {
    var sessionExpiresIn;
    var now = new Date();

    cookie = getCookie();
    sessionExpiresIn = new Date(cookie);

    if (now > sessionExpiresIn) {
      deleteCookie();
      stopInterval();
      showNoticeModal();
      location.reload();
    }
  }

  function startCheckTimer() {
    intervarHandler = window.setInterval(checkCookie, minutesToMilliseconds(checkTimeout));
  }

  function createCookie() {
    var now = new Date();
    // We store the time when the session should expire, in 30 mins
    now.setTime(now.getTime() + minutesToMilliseconds(sessionTimeout));
    document.cookie = cookieName + '=' + now.toUTCString();
    // We start a timer to check in 28 mins, every 2 mins for an expired session
    window.setTimeout(startCheckTimer, minutesToMilliseconds(firstCheckTimeout));
  }

  // The login button should have a special class if the user is
  // logged in
  isLoggedIn = ($(loggedInClass).length > 0);
  if (isLoggedIn) {
    cookie = getCookie();
    if (cookie === '') {
      createCookie();
    } else {
      startCheckTimer();
    }
  } else {
    deleteCookie();
  }
};
