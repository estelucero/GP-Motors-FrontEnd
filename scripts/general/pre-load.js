window.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    window.scrollTo(0, 0);
    $('#preloader').fadeOut(); 
    document.body.classList.remove('hidden-carga'); 
  }, 700); 
});

