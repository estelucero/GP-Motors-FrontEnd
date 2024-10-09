function abrirPopup() {
  const noEdicion = true;
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
  const guardarBtnModificar = document.querySelector("#guardar-btn2");
  const cancelarBtn = document.querySelector("#cancelar-btn");


  // Ocultar el botón de modificar al abrir el popup
  guardarBtnModificar.style.display = "none";

  // Crear el botón "Modificar" si no existe
  let modificarBtn = document.querySelector("#modificar-btn");
  if (!modificarBtn) {
    modificarBtn = document.createElement("button");
    modificarBtn.textContent = "Modificar";
    modificarBtn.id = "modificar-btn";
    modificarBtn.classList.add("btn-form");
    modificarBtn.style.backgroundColor = "blue";
    // Insertar el botón "Modificar" justo antes del botón "Guardar"
    guardarBtnModificar.parentNode.insertBefore(modificarBtn, guardarBtnModificar);

    // Evento para habilitar los campos (excepto el de la patente)
    modificarBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Prevenir comportamiento por defecto

      // Habilitar los campos de edición excepto el de la patente
      modeloInput.removeAttribute("disabled");
      marcaInput.removeAttribute("disabled");
      anioFabInput.removeAttribute("disabled");
      kmInput.removeAttribute("disabled");

      modificarBtn.style.display = "none"; // Ocultar el botón "Modificar"

      // Mostrar el botón de modificar
      guardarBtnModificar.style.display = "block";

    });
  } else {
    modificarBtn.style.display = "block"; // Asegurarse de que el botón esté visible
  }
  popupTitulo.textContent = "Editar Vehículo";

  // Completar los campos con los datos del vehículo
  // patenteInput.value = datosVehiculo.patente || '';
  // modeloInput.value = datosVehiculo.modelo || '';
  // marcaInput.value = datosVehiculo.marca || '';
  // anioFabInput.value = datosVehiculo.fechaFabricacion || '';
  // kmInput.value = datosVehiculo.cantKm;

  // Deshabilitar todos los campos para evitar modificaciones antes de presionar "Modificar"
  patenteInput.setAttribute("disabled", true); // Mantener deshabilitado
  modeloInput.setAttribute("disabled", true);
  marcaInput.setAttribute("disabled", true);
  anioFabInput.setAttribute("disabled", true);
  kmInput.setAttribute("disabled", true);
}

// Función para cerrar el popup
function cerrarPopup() {
  document.querySelector(".popup").classList.remove("active");
  document.querySelector(".popup-container").classList.remove("active");
}

// Asignar el evento de cerrar al botón "Cancelar"
document.querySelector("#cancelar-btn").addEventListener("click", cerrarPopup);

// También asignamos el evento al botón de cerrar (si existe)
document.querySelector(".popup .close-btn").addEventListener("click", cerrarPopup);

// Agregar evento a los botones de edición
document.querySelectorAll(".box-img a").forEach(function (editarBtn) {
  editarBtn.addEventListener("click", function (e) {
    const autoGuardado = JSON.parse(localStorage.getItem("vehiculoEditar"));
    e.preventDefault(); // Evitar el comportamiento por defecto del ancla

    // Obtener los datos del vehículo
    // const datosVehiculo = {
    //   patente: this.closest(".single-box").querySelector(".patente-p").textContent.trim(),
    //   marca: this.closest(".single-box").querySelectorAll(".text-flex p")[1].textContent.trim(),
    //   modelo: this.closest(".single-box").querySelectorAll(".text-flex p")[3].textContent.trim(),
    //   fechaFabricacion: this.closest(".single-box").querySelectorAll(".text-flex p")[5].textContent.trim(),
    //   cantKm: autoGuardado.km // Ejemplo: puedes agregar este dato en tu HTML si lo tienes
    // };
    
    abrirPopup(true); // true indica que es una edición
  });
});

//Guardar auto que clickea
function guardarEdicionProveedor() {
  const botonesEditar = document.querySelectorAll(".editar");
  const proveedoresGuardados = JSON.parse(
    localStorage.getItem("proveedores")
  );

  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      // Evitar que el enlace redirija inmediatamente
      event.preventDefault();

      const vehiculoBox = this.closest(".single-box");

      const proveedor = vehiculoBox.querySelector(".email-p").textContent;
      const proveedorEncontrado = proveedoresGuardados.find(
        (proveedor) => proveedor.mail.toUpperCase() === proveedor.toUpperCase()
      );
      console.log(proveedorEncontrado);

      const datosProveedor = {
        nombre: proveedorEncontrado.nombre,
        repuesto: proveedorEncontrado.repuesto,
        email: proveedorEncontrado.email,
        direccion: proveedorEncontrado.direccion,
        telefono: proveedorEncontrado.telefono,
      };

      localStorage.setItem("proveedorEditar", JSON.stringify(datosProveedor));

    });
  });
}
// guardarEdicionProveedor();

////////////// Verifico para las clases validas////////////
function verificarClasesValidasFormulario() {

  const inputs = [
    document.getElementById('patente'),
    document.getElementById('modelo'),
    document.getElementById('marca'),
    document.getElementById('anio-fab'),
    document.getElementById('km')
  ];


  for (let input of inputs) {
    if (input.classList.contains('is-invalid')) {
      return false;
    }
  }

  return true;
}

//////////////Modificar el auto/////////////
// document
//   .getElementById("guardar-btn2")
//   .addEventListener("click", function (event) {
//     event.preventDefault();
//     if (verificarClasesValidasFormulario()) {

//       const patente = document.getElementById("patente").value;
//       const modelo = document.getElementById("modelo").value;
//       const marca = document.getElementById("marca").value;
//       const anioFab = document.getElementById("anio-fab").value;
//       const km = document.getElementById("km").value;


//       if (!patente || !modelo || !marca || !anioFab || !km || parseInt(km, 10) < 0) {
//         alert("Por favor, completa todos los campos.");
//         return;
//       }



//       const data = {
//         patente_vehiculo_modif: patente,
//         marca,
//         modelo,
//         año: anioFab,
//         km: parseInt(km, 10),

//       };
//       console.log(data);

//       fetch("https://aaaaa-deploy-back.vercel.app/users/modificarVehiculo", {
//         method: "PATCH",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify(data),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           alert("Vehículo guardado con éxito");
//           console.log(patente);
//           location.reload(true);
//           // Aquí puedes hacer alguna acción tras el éxito, como redirigir o limpiar el formulario
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//           alert("Hubo un problema al guardar el vehículo.");
//         });
//     } else {
//       alert("Completar los campos con datos validos");
//     }
//   });