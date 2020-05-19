// search all links (into definitions) linking to elements in the current page (href starts with #) 
// To set the title of the link to the definition it points to
document.querySelectorAll("[id^=\"def-\"]").forEach(function(def){
	const id = def.id;
	let title = def.closest(".definition").textContent;
	if ( title.match(/\.\s/) ) {
		// We take everything until the last period. (Everything after are links such as "Wikipedia"
		title = title.match(/^[\s\S]*\.\s/)[0];
		title = title.replace(/\n/g," ");
		title = title.replace(/\s\s+/g," ");
	}
	document.querySelectorAll(".definition>a[href^=\"#"+id+"\"]").forEach(function(a){
		a.title = title;
	});
});

// search for invalid links
/*eslint no-console: ["error", { allow: ["error"] }] */
document.querySelectorAll(".definition>a[href^=\"#\"]").forEach(function(a){
	if ( a.title ) return;
	let href = a.href;
	let id = href.substring(href.indexOf("#")+1);
	if ( ! id ) return;
	let el = document.getElementById(id);
	if ( ! el ) {
		console.error("Invalid link to:"+id);
		return;
	}
});