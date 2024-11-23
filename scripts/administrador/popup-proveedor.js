function abrirPopup(datosVehiculo = {}) {
  const noEdicion = true;
  document.querySelector(".popup").classList.add("active");
  document.querySelector(".popup-container").classList.add("active");

  const popupTitulo = document.querySelector(".popup h2");
  const proveedorInput = document.querySelector("#proveedor");
  const repuestoInput = document.querySelector("#repuesto");
  const mailInput = document.querySelector("#mail");
  const direccionInput = document.querySelector("#direccion");
  const validarBtn = document.querySelector("#normalizarBtn");
  const telefonoInput = document.querySelector("#telefono");
  const formElement = document.querySelector(".form-element");
  const patenteLabel = document.querySelector("label[for='patente']");
  const guardarBtnModificar = document.querySelector("#guardar-btn2");
  const cancelarBtn = document.querySelector("#cancelar-btn");


  // Ocultar el botón de modificar al abrir el popup
  validarBtn.style.display = "none";
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
      proveedorInput.removeAttribute("disabled");
      mailInput.removeAttribute("disabled");
      direccionInput.removeAttribute("disabled");
      telefonoInput.removeAttribute("disabled");

      modificarBtn.style.display = "none"; // Ocultar el botón "Modificar"

      // Mostrar el botón de modificar
      guardarBtnModificar.style.display = "block";
      validarBtn.style.display = "block";

    });
  } else {
    modificarBtn.style.display = "block"; // Asegurarse de que el botón esté visible
  }
  popupTitulo.textContent = "Modificar Proveedor";

  // Completar los campos con los datos del vehículo
  proveedorInput.value = datosVehiculo.nombre || '';
  repuestoInput.value = datosVehiculo.repuesto || '';
  mailInput.value = datosVehiculo.mail || '';
  direccionInput.value = datosVehiculo.direccion || '';
  telefonoInput.value = datosVehiculo.telefono;

  // Deshabilitar todos los campos para evitar modificaciones antes de presionar "Modificar"
  proveedorInput.setAttribute("disabled", true); // Mantener deshabilitado
  repuestoInput.setAttribute("disabled", true);
  mailInput.setAttribute("disabled", true);
  direccionInput.setAttribute("disabled", true);
  telefonoInput.setAttribute("disabled", true);
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
// document.querySelectorAll(".box-img a").forEach(function (editarBtn) {
//   editarBtn.addEventListener("click", function (e) {
//     const autoGuardado = JSON.parse(localStorage.getItem("vehiculoEditar"));
//     e.preventDefault(); // Evitar el comportamiento por defecto del ancla

//     // Obtener los datos del vehículo
//     // const datosVehiculo = {
//     //   patente: this.closest(".single-box").querySelector(".patente-p").textContent.trim(),
//     //   marca: this.closest(".single-box").querySelectorAll(".text-flex p")[1].textContent.trim(),
//     //   modelo: this.closest(".single-box").querySelectorAll(".text-flex p")[3].textContent.trim(),
//     //   fechaFabricacion: this.closest(".single-box").querySelectorAll(".text-flex p")[5].textContent.trim(),
//     //   cantKm: autoGuardado.km // Ejemplo: puedes agregar este dato en tu HTML si lo tienes
//     // };

//     abrirPopup(true); // true indica que es una edición
//   });
// });

function listenerEdicion() {
  document.querySelectorAll(".box-img a").forEach(function (editarBtn) {
    editarBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Evitar el comportamiento por defecto del ancla

      // Obtener la fila correspondiente al botón editar
      const fila = this.closest("tr");

      // Obtener los datos del vehículo desde las celdas
      const datosProveedor = {
        id: fila.querySelector("td:nth-child(1) p").textContent.trim(),
        nombre: fila.querySelector("td:nth-child(2) p").textContent.trim(),
        repuesto: fila.querySelector("td:nth-child(3) p").textContent.trim(),
        mail: fila.querySelector("td:nth-child(4) p").textContent.trim(),
        telefono: fila.querySelector("td:nth-child(5) p").textContent.trim(),
        direccion: fila.querySelector("td:nth-child(6) p").textContent.trim(),
      };

      abrirPopup(datosProveedor); // true indica que es una edición
    });
  });
}



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

      const vehiculoBox = this.closest(".fila");

      const proveedorBuscado = vehiculoBox.querySelector(".id-p").textContent;
      const proveedorEncontrado = proveedoresGuardados.find(
        (proveedor) => proveedor.id_pieza === parseInt(proveedorBuscado, 10)
      );
      console.log(proveedorEncontrado);



      localStorage.setItem("proveedorEditar", JSON.stringify(proveedorEncontrado));

    });
  });
}
// guardarEdicionProveedor();

////////////// Verifico para las clases validas////////////
function verificarClasesValidasFormulario() {

  const inputs = [
    document.getElementById('proveedor'),
    document.getElementById('mail'),
    document.getElementById('direccion'),
    document.getElementById('telefono'),

  ];


  for (let input of inputs) {
    if (input.classList.contains('is-invalid')) {
      return false;
    }
  }

  return true;
}

//////////////Modificar Proveedor/////////////
document
  .getElementById("guardar-btn2")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let pieza = JSON.parse(localStorage.getItem("proveedorEditar"));
    if (verificarClasesValidasFormulario()) {

      const proveedor = document.getElementById("proveedor").value;
      const mail = document.getElementById("mail").value;
      const direccion = document.getElementById("direccion").value;
      const telefono = document.getElementById("telefono").value;



      if (!proveedor || !mail || !direccion || !telefono) {
        alert("Por favor, completa todos los campos.");
        return;
      }



      const data = {
        id_pieza: pieza.id_pieza,
        nombre: proveedor,
        email: mail,
        direccion: direccion,
        celular: telefono,
        ubicacion: [
          "0", "0"
        ]

      };
      console.log(data);

      fetch("https://aaaaa-deploy-back.vercel.app/users/modificarProveedor", {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // alert("Proveedor guardado con éxito");

          // location.reload(true);
          Swal.fire({
            icon: "success",
            title: "Perfecto..",
            text: "Proveedor modificado con éxito.",
          }).then((result) => {
            if (result.isConfirmed) {
              location.reload(); // Recarga la página al confirmar
            }
          });

        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al modificar el vehículo",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completar los campos correctamente",
      });
    }
  });