// search all links (into definitions) linking to elements in the current page (href starts with #) 
// To set the title of the link to the definition it points to
document.querySelectorAll('.definition>a[href^="#"]').forEach(function(a){
	if ( a.title ) return;
	let href = a.href;
	let id = href.substring(href.indexOf('#')+1);
	if ( ! id ) return;
	let el = document.getElementById(id);
	if ( ! el ) {
		console.error("Invalid link to:"+id);
		return;
	}
	let title = el.parentNode.textContent;
	if ( title.match(/\./) ) {
		// We take everything until the last period. (Everything after are links such as "Wikipedia"
		title = title.match(/^.*\./)[0];
	}
	a.title = title;
});
