// ==========Menu button click event start===========

var button = document.querySelector(".global-header .menu-button");

button.addEventListener('click', () => {
    document.querySelector(".global-header").classList.toggle("show-menu");
});

// ==========Menu button click event end===========

// ==========Menubar scroll down event start===========

// Get the element you want to add the class to
const header = document.querySelector('.global-header');

// Add a scroll event listener to the window
window.addEventListener('scroll', function() {
    
  // Get the current scroll position
  var scrollTop = window.pageYOffset;
  
  // If the scroll position is greater than 30 pixels, add the class else remove
  scrollTop > 30 ? header.classList.add("is-scrolled-30") : header.classList.remove("is-scrolled-30");
  scrollTop > 150 ? header.classList.add("is-scrolled-150") : header.classList.remove("is-scrolled-150");

});

// ==========Menubar scroll down event end===========

