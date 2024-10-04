window.addEventListener('DOMContentLoaded', function () {
  $(window).scrollTop(0);
  setTimeout(function () {
    $('#preloader').fadeOut(); 
    document.body.classList.remove('hidden-carga'); 
  }, 500); 
});