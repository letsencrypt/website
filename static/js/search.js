(function(){
	
	if (document.readyState != "loading") {
		doSearch();
	} else {
		document.addEventListener("DOMContentLoaded", doSearch);
	}

	var summaryInclude = 60;
	var fuseOptions = {
		shouldSort: true,
		includeMatches: true,
		threshold: 0.4, // for parsing diacritics
		tokenize: true,
		location: 0,
		distance: 10000000,
		maxPatternLength: 40,
		minMatchCharLength: 1,
		keys: [
			{ name: "title", weight: 0.8 },
			{ name: "content", weight: 0.5 },
			{ name: "tags", weight: 0.8 },
			{ name: "categories", weight: 0.8 }
		]
	};

	function param(name) {
		return decodeURIComponent((location.search.split(name + "=")[1] || "").split("&")[0].replace(/\+/g, " "));
	}

	var searchQuery = param("s");
	var searchInput = document.getElementById("search-query")
	function doSearch() {
		if (searchQuery) {
			searchInput.value = searchQuery;
			executeSearch(searchQuery);
		}
		searchInput.focus();
	}

	function searchResult(data) {
		var pages = data;
		var fuse = new Fuse(pages, fuseOptions);
		var result = fuse.search(searchQuery);
		console.log({
			"matches": result
		});
		if (result.length > 0) {
			populateResults(result);
		} else {
			var para = document.createElement("p");
			para.innerText = "No matches found";
			document.getElementById("search-results").appendChild(para);
		}
	}

	function executeSearch(searchQuery) {
		var url = "/index.json";
		var lang = document.documentElement.lang;
		if ( ! lang.match(/^en\b/) ) {
			url = "/"+lang+"/index.json";
		}
		fetch(url).then(function(response) {
			return response.json().then(function(json){searchResult(json, searchQuery)});
		});
	}

	function populateResults(result) {
		var html = "";
		result.forEach(function (value, key) {
			var content = value.item.contents;
			var snippet = "";
			var snippetHighlights = [];
			if (fuseOptions.tokenize) {
				snippetHighlights.push(searchQuery);
			} else {
				value.matches.forEach(function (mvalue, matchKey) {
					if (mvalue.key == "tags" || mvalue.key == "categories") {
						snippetHighlights.push(mvalue.value);
					} else if (mvalue.key == "content") {
						var start = mvalue.indices[0][0] - summaryInclude > 0 ? mvalue.indices[0][0] - summaryInclude : 0;
						var end = mvalue.indices[0][1] + summaryInclude < content.length ? mvalue.indices[0][1] + summaryInclude : content.length;
						snippet += content.substring(start, end);
						snippetHighlights.push(mvalue.value.substring(mvalue.indices[0][0], mvalue.indices[0][1] - mvalue.indices[0][0] + 1));
					}
				});
			}

			if (snippet.length < 1) {
				snippet += content.substring(0, summaryInclude * 2);
			}
			
			html += `<div id="summary-${key}">
				<h4><a href="${value.item.permalink}">${value.item.title}</a></h4>
				<p>${snippet}</p>
				</div>`;
		});
		
		document.getElementById("search-results").innerHTML = html;
	}

})();
