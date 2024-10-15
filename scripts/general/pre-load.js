window.onload = function () {
  document.documentElement.scrollTop = 0;
};

// window.addEventListener('DOMContentLoaded', function () {

//   setTimeout(function () {

//     $('#preloader').fadeOut();
//     document.body.classList.remove('hidden-carga');
//   }, 800);
// });

// function mostrarPreloader() {
//   document.getElementById('preloader').style.display = 'flex'; // Muestra el preloader
// }

// function ocultarPreloader() {
//   document.getElementById('preloader').style.display = 'none'; // Oculta el preloader
// }

// // Muestra el preloader al cargar la página
// window.onload = function() {
//   mostrarPreloader();
//   // Simular carga de contenido (cambiar el tiempo según sea necesario)
//   setTimeout(function() {
//       ocultarPreloader();
//   }, 800); // Cambia 3000 por el tiempo deseado en milisegundos
// };
function ocultarPreloader() {
  $('#preloader').fadeOut();
  document.body.classList.remove('hidden-carga');
  console.log("as");
}