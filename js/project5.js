// reference: https://www.w3schools.com/jsref/jsref_foreach.asp

// wait until the page loads
window.onload = function() {
    var links = document.querySelectorAll(".preview-link");
    var preview = document.getElementById("hover-preview");
    var slides = document.querySelectorAll('.slide');
    var currentSlide = 0;
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxClose = document.getElementById('lightbox-close');
    var gridImages = document.querySelectorAll('.image-grid img');
  
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
  
    // show a specific slide
    function showSlide(index) {
      slides.forEach(function(slide) {
        slide.classList.remove('active');
      });
      slides[index].classList.add('active');
    }
  
    // next slide button
    document.querySelector('.next').addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  
    // previous slide button
    document.querySelector('.prev').addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  
    // start with first slide showing
    showSlide(currentSlide);
  
    // auto slide every 5 seconds
    setInterval(function() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 5000);
  
    // click grid image to open lightbox
    gridImages.forEach(function(img) {
      img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
      });
    });
  
    // close lightbox on close button
    lightboxClose.addEventListener('click', function() {
      lightbox.classList.remove('active');
    });
  
    // close lightbox if click outside image
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });
  };  