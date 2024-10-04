window.addEventListener('load', function () {
  setTimeout(function () {
    $(window).scrollTop(0);
    $('#preloader').fadeOut(); 
    document.body.classList.remove('hidden-carga'); 
  }, 700); 
});

