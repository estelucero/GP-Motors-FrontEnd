var autoGuardado = JSON.parse(localStorage.getItem("vehiculoControlar"));
var controles = JSON.parse(localStorage.getItem("vehiculoControlar"))[1];
console.log(controles)
// Seleccionar los elementos del HTML donde se insertará la información/////////////////
const patenteElement = document.querySelector(".titulo");
const marcaElement = document.querySelector(
  ".auto-info-text-section:nth-child(2) p"
);
const modeloElement = document.querySelector(
  ".auto-info-text-section:nth-child(3) p"
);
const anoElement = document.querySelector(
  ".auto-info-text-section:nth-child(4) p"
);
const kilometrajeElement = document.querySelector(
  ".auto-info-text-section:nth-child(5) p"
);

patenteElement.textContent = autoGuardado[0].patente.toUpperCase();
marcaElement.textContent =
  autoGuardado[0].marca.charAt(0).toUpperCase() +
  autoGuardado[0].marca.slice(1).toLowerCase();
modeloElement.textContent =
  autoGuardado[0].modelo.charAt(0).toUpperCase() +
  autoGuardado[0].modelo.slice(1).toLowerCase();
anoElement.textContent = autoGuardado[0].año;
kilometrajeElement.textContent = `${autoGuardado[0].km} Km`;

// Enlistar Controles
function enlistarControles() {
  const contenedor = document.getElementById("notifications");
  const controlesGuardados = JSON.parse(localStorage.getItem("vehiculoControlar"))[1];

  // Verifica que hay controles pendientes antes de enlistar

  controlesGuardados.forEach((control) => {
    const singleBox = document.createElement("div");
    singleBox.classList.add("single-box");

    singleBox.innerHTML = `
          <div class="box-avatar-text">
            <div class="avatar">
              <img src="../assets/logos/${control.control}.png" alt="perfil-imagen" />
            </div>
            <div class="box-text">
              <div class="text-control">
                <p class="control-p">${control.control}</p>
              </div>
            </div>
          </div>
          <div class="box-img ">
            <a href="" class="reparar"><i class='icon-edit bx bx-wrench'></i></a>
          </div>
        `;

    contenedor.appendChild(singleBox);
  });

}
enlistarControles();


function guardarControlesVehiculo() {
  const botonesEditar = document.querySelectorAll(".reparar");
  const controlesGuardados = JSON.parse(localStorage.getItem("vehiculoControlar"))[1];
  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      // Evitar que el enlace redirija inmediatamente
      event.preventDefault();

      const controlBox = this.closest(".single-box");

      const controlObtenido = controlBox.querySelector(".control-p").textContent;
      const controlEncontrado = controlesGuardados.find(
        (control) => control.control.toUpperCase() === controlObtenido.toUpperCase()
      );
      console.log(controlEncontrado);

      // const datosVehiculo = {
      //   patente: patente,
      //   marca: vehiculoEncontrado.marca,
      //   modelo: vehiculoEncontrado.modelo,
      //   año: vehiculoEncontrado.año,
      //   km: vehiculoEncontrado.km,
      // };

      localStorage.setItem("controlGuardado", JSON.stringify(controlEncontrado));
      window.location.href = "./formulario-control.html";
    });
  });
}
guardarControlesVehiculo();
ocultarPreloader();