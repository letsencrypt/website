(function() {
  let langs = navigator.languages || [ window.navigator.language ];
  langs.forEach( lang => {
    lang = lang.substring(0,2).toLowerCase();
    let elems = document.querySelectorAll("[data-langswitch^=\""+CSS.escape(lang)+"\"]");
    elems.forEach( e => { e.style.display = "block"; });  
  });
})();
