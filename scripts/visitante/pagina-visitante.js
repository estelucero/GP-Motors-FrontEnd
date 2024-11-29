let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
  menu.classList.toggle("move");
  navbar.classList.toggle("open-menu");
}

window.onscroll = () => {
  menu.classList.remove("move");
  navbar.classList.remove("open-menu");
}

function cargarAutos() {
  const autosContainer = document.querySelector(".autos-content");

  const autosAMostrar = vehiculos.slice(0, 8);

  autosContainer.innerHTML = "";

  autosAMostrar.forEach((auto) => {
    const autoBox = document.createElement("div");
    autoBox.classList.add("auto-box");

    autoBox.innerHTML = `
      <div class="auto-top"></div>
      <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}">
      <h2>${auto.marca} ${auto.modelo}</h2>
      <p>Año: ${auto.año}</p>
      <p>Patente: ${auto.patente}</p>
      <div class="auto-perfil">
        <a href="#" class="auto-btn">
          <p>Ver Más</p>
        </a>
      </div>
    `;

    autosContainer.appendChild(autoBox);
  });
}

document.addEventListener("DOMContentLoaded", cargarAutos);