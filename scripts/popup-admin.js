function abrirPopup(noEdicion, datosVehiculo = {}) {
  document.querySelector(".popup").classList.add("active");
  document.querySelector(".popup-container").classList.add("active");

  const popupTitulo = document.querySelector(".popup h2");
  const patenteInput = document.querySelector("#patente");
  const modeloInput = document.querySelector("#modelo");
  const marcaInput = document.querySelector("#marca");
  const anioFabInput = document.querySelector("#anio-fab");
  const kmInput = document.querySelector("#km");
  const formElement = document.querySelector(".form-element");
  const patenteLabel = document.querySelector("label[for='patente']");

  // Crear el label "Modificar datos del vehículo"
  let modificarLabel = document.querySelector(".modificar-label");
  if (!modificarLabel) {
    modificarLabel = document.createElement("span");
    modificarLabel.textContent = "Modificar datos del vehículo";
    modificarLabel.classList.add("modificar-label");

    // Insertar el label antes del label de patente
    formElement.insertBefore(modificarLabel, patenteLabel);
  } else {
    modificarLabel.style.display = "block"; // Asegurarse de que el label esté visible
  }

  // Crear el botón "Modificar" si no existe
  let modificarBtn = document.querySelector("#modificar-btn");
  if (!modificarBtn) {
    modificarBtn = document.createElement("button");
    modificarBtn.textContent = "Modificar";
    modificarBtn.id = "modificar-btn";
    modificarBtn.classList.add("btn-form");

    // Insertar el botón antes del label de patente
    formElement.insertBefore(modificarBtn, patenteLabel);

    // Evento para habilitar los campos (excepto el de la patente)
    modificarBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Prevenir comportamiento por defecto

      // Eliminar el label "Modificar datos del vehículo"
      modificarLabel.style.display = "none";

      // Habilitar los campos de edición excepto el de la patente
      modeloInput.removeAttribute("disabled");
      marcaInput.removeAttribute("disabled");
      anioFabInput.removeAttribute("disabled");
      kmInput.removeAttribute("disabled");

      modificarBtn.style.display = "none"; // Ocultar el botón "Modificar"
    });
  } else {
    modificarBtn.style.display = "block"; // Asegurarse de que el botón esté visible
  }

  if (noEdicion) {
    popupTitulo.textContent = "Editar Vehículo";

    // Completar los campos con los datos del vehículo
    patenteInput.value = datosVehiculo.patente || '';
    modeloInput.value = datosVehiculo.modelo || '';
    marcaInput.value = datosVehiculo.marca || '';
    anioFabInput.value = datosVehiculo.fechaFabricacion || '';
    kmInput.value = datosVehiculo.cantKm ;

    // Deshabilitar todos los campos para evitar modificaciones antes de presionar "Modificar"
    patenteInput.setAttribute("disabled", true); // Mantener deshabilitado
    modeloInput.setAttribute("disabled", true);
    marcaInput.setAttribute("disabled", true);
    anioFabInput.setAttribute("disabled", true);
    kmInput.setAttribute("disabled", true);

    modificarBtn.style.display = "block"; // Mostrar el botón "Modificar"
    modificarLabel.style.display = "block"; // Mostrar el label
  } else {
    popupTitulo.textContent = "Cargar Vehículo";

    // Limpiar los campos si es agregar
    patenteInput.value = '';
    modeloInput.value = '';
    marcaInput.value = '';
    anioFabInput.value = '';
    kmInput.value = '';

    // Hacer que todos los campos sean editables para agregar
    patenteInput.removeAttribute("disabled");
    modeloInput.removeAttribute("disabled");
    marcaInput.removeAttribute("disabled");
    anioFabInput.removeAttribute("disabled");
    kmInput.removeAttribute("disabled");

    modificarBtn.style.display = "none"; // Ocultar el botón "Modificar" en modo agregar
    modificarLabel.style.display = "none"; // Ocultar el label en modo agregar
  }
}

// Evento para cerrar el popup
function cerrarPopup() {
  document.querySelector(".popup").classList.remove("active");
  document.querySelector(".popup-container").classList.remove("active");
}

// Ejemplo de cómo abrir el popup
document.querySelector("#show-car").addEventListener("click", function () {
  abrirPopup(false); // false indica que es un nuevo vehículo (no es edición)
});

// Agregar evento a los botones de edición
document.querySelectorAll(".box-img a").forEach(function (editarBtn) {
  editarBtn.addEventListener("click", function (e) {
    const autoGuardado = JSON.parse(localStorage.getItem("vehiculoEditar"));
    e.preventDefault(); // Evitar el comportamiento por defecto del ancla
    
    // Obtener los datos del vehículo
    const datosVehiculo = {
      patente: this.closest(".single-box").querySelector(".patente-p").textContent.trim(),
      marca: this.closest(".single-box").querySelectorAll(".text-flex p")[1].textContent.trim(),
      modelo: this.closest(".single-box").querySelectorAll(".text-flex p")[3].textContent.trim(),
      fechaFabricacion: this.closest(".single-box").querySelectorAll(".text-flex p")[5].textContent.trim(),
      cantKm: autoGuardado.km// Ejemplo: puedes agregar este dato en tu HTML si lo tienes
    };
    console.log(datosVehiculo)
    abrirPopup(true, datosVehiculo); // true indica que es una edición
  });
});


//Guardar auto que clickea

function guardarEdicionVehiculo() {
  const botonesEditar = document.querySelectorAll(".editar");
  const vehiculosGuardados = JSON.parse(
    localStorage.getItem("vehiculosRegistrados")
  );
  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      // Evitar que el enlace redirija inmediatamente
      event.preventDefault();

      const vehiculoBox = this.closest(".single-box");

      const patente = vehiculoBox.querySelector(".patente-p").textContent;
      const vehiculoEncontrado = vehiculosGuardados.find(
        (vehiculo) => vehiculo.patente.toUpperCase() === patente.toUpperCase()
      );
      console.log(vehiculoEncontrado);

      const datosVehiculo = {
        patente: patente,
        marca: vehiculoEncontrado.marca,
        modelo: vehiculoEncontrado.modelo,
        año: vehiculoEncontrado.año,
        km: vehiculoEncontrado.km,
      };

      localStorage.setItem("vehiculoEditar", JSON.stringify(datosVehiculo));
      
    });
  });
}
guardarEdicionVehiculo();





// Función para cerrar el popup
function cerrarPopup() {
  document.querySelector(".popup").classList.remove("active");
  document.querySelector(".popup-container").classList.remove("active");
}

// Evento para abrir el popup en modo agregar
document.querySelector("#show-car").addEventListener("click", function () {
  abrirPopup(false); // false indica que es un nuevo vehículo (no es edición)
});

// Evento para cerrar el popup al hacer clic en el botón de cerrar o cancelar
document.querySelector(".popup .close-btn").addEventListener("click", cerrarPopup);
document.querySelector(".btn-form:nth-of-type(2)").addEventListener("click", cerrarPopup);

// Agregar evento a los botones de edición (ancla dentro de .box-img)
document.querySelectorAll(".box-img a").forEach(function (editarBtn) {
  editarBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Evitar el comportamiento por defecto del ancla
    const autoGuardado = JSON.parse(localStorage.getItem("vehiculoEditar"));
    // Obtener los datos del vehículo (esto depende de cómo los tienes estructurados)
    const datosVehiculo = {
      patente: this.closest(".single-box").querySelector(".patente-p").textContent.trim(),
      marca: this.closest(".single-box").querySelectorAll(".text-flex p")[1].textContent.trim(),
      modelo: this.closest(".single-box").querySelectorAll(".text-flex p")[3].textContent.trim(),
      fechaFabricacion: this.closest(".single-box").querySelectorAll(".text-flex p")[5].textContent.trim(),
      cantKm: autoGuardado.km // Ejemplo: puedes agregar este dato en tu HTML si lo tienes
    };

    abrirPopup(true, datosVehiculo); // true indica que es una edición
  });
});