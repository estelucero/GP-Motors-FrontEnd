function cargaPagina(){

  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
  
    const contenido = document.getElementById("contenido");
    contenido.classList.remove("hidden-carga");
  });
  
}
cargaPagina();