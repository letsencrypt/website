// Used for simple collapsible content.
// Give each button for collapsing button a class of "collapsible-button"
// as well as a unique id.
// Give each div with the collapsible content a class of "collapsible-content"
// and the same id as the associated button with "-content" appended.

var coll = document.getElementsByClassName("collapsible-content");
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].style.display = "none";
}

var coll = document.getElementsByClassName("collapsible-button");
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("collapsible-active");

    // Find the collapsible content associated with this.
    // Do this by finding the element that has the same ID
    // but with "-content" appended.
    content = document.getElementById(this.id + "-content")
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
