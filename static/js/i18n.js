(function() {

  if ( window.CSS && CSS.escape ) {
      let langs = navigator.languages || [ navigator.language ];
      langs.forEach( lang => {
        lang = lang.substring(0,2).toLowerCase();
        let elems = document.querySelectorAll("[data-langswitch^=\""+CSS.escape(lang)+"\"]");
        elems.forEach( e => { e.style.display = "block"; });  
      });
    }

})();
