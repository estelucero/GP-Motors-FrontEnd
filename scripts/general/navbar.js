var usuario = JSON.parse(localStorage.getItem("usuario"));
let menu = document.querySelector('.nav-bar');
let menuIcon = document.querySelector('.hamburger');



document.querySelector('.hamburger').onclick = () => {
  menu.classList.toggle('active');
}

window.onscroll = () => {
  menu.classList.remove('active');
}

document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
    menu.classList.remove('active');
  }
});

let subMenu = document.getElementById("subMenu");
function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}

const userInfoNav = document.querySelector('#user-info-nav');
const userInfoWrap = document.querySelector('#user-info-wrap');
userInfoNav.innerHTML += `
  <a href="./perfil-usuario.html">
    <h3 class="nombre-perfil-sesion">${usuario[1]}</h3>
  </a>
`;
userInfoWrap.innerHTML += `
  <a href="./perfil-usuario.html" class="sub-menu-link">
    <h3 class="nombre-perfil-sesion">${usuario[1]}</h3>
  </a>
  <span>></span>
`;