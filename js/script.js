// reference: https://www.w3schools.com/jsref/jsref_foreach.asp

// wait until the page loads
window.onload = function() {
  var links = document.querySelectorAll(".preview-link");
  var preview = document.getElementById("hover-preview");
  var projects = document.querySelectorAll(".project");
  var hoverText = document.getElementById("hover-text");

  // start with hover text hidden
  if (hoverText) {
    hoverText.style.opacity = "0";
  }

  // preview image when hovering sidebar links
  links.forEach(function(link) {
    link.onmouseover = function() {
      preview.src = this.dataset.image;
      preview.style.display = "block";
    };

    link.onmousemove = function(e) {
      preview.style.left = (e.clientX + 20) + "px";
      preview.style.top = (e.clientY + 20) + "px";
    };

    link.onmouseout = function() {
      preview.style.display = "none";
    };
  });

  // hover text following the mouse on project images
  projects.forEach(function(project) {
    project.onmouseover = function() {
      hoverText.style.opacity = "1";
    };

    project.onmousemove = function(e) {
      hoverText.style.left = (e.clientX + 15) + "px";
      hoverText.style.top = (e.clientY + 15) + "px";
    };

    project.onmouseout = function() {
      hoverText.style.opacity = "0";
    };
  });
};
