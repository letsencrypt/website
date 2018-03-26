// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-56433935-1');

// AdWords Conversion Tracking
gtag('config', 'AW-872454614');
function gtag_report_conversion(url) {
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-872454614/r2JLCP7BiGwQ1rOCoAM',
      'event_callback': callback
  });
  return false;
}
var el = document.getElementById("getting-started-button");
if (el) {
  el.addEventListener("click", function(){gtag_report_conversion("https://letsencrypt.org/getting-started/")}, false);
}
