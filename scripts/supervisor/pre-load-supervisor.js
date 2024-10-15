// function mostrarPreloader() {
//     document.getElementById('preloader').style.display = 'flex'; // Muestra el preloader
//   }
  
//   function ocultarPreloader() {
//     // document.getElementById('preloader').style.display = 'none'; // Oculta el preloader
//     document.body.classList.remove('hidden-carga');
//   }



function ocultarPreloader() {
    $('#preloader').fadeOut(); 
    document.body.classList.remove('hidden-carga'); 
    console.log("as");
}

