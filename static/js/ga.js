(function(){
"use strict";

// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
if ( window.doNotTrack == 1 || navigator.doNotTrack == 1
|| navigator.doNotTrack === "yes" || navigator.msDoNotTrack == 1 ) {
 return;
}

var googletagmanager = document.createElement('script');
googletagmanager.setAttribute('src','https://www.googletagmanager.com/gtag/js?id=UA-56433935-1');
document.head.appendChild(googletagmanager);

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
  el.addEventListener("click", function(){gtag_report_conversion(el.href)}, false);
}

})();
