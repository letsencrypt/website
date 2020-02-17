(function(){
	
	if (document.readyState != "loading") {
		do404();
	} else {
		document.addEventListener("DOMContentLoaded", do404);
	}

	function do404() {
		var path = document.location.pathname.split("/");
		var last = decodeURIComponent(path[path.length-1]);
		last = last.replace(/[^\w]+/," ");
		document.getElementById("search-404").value = last;
	}


})();
