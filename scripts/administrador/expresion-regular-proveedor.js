// // Definir las expresiones regulares
// const regexProveedor = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
// const regexRepuesto = /^[a-zA-Z0-9\s]{2,40}$/;
// const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const regexDireccion = /^[a-zA-Z0-9\s.,#-]{5,60}$/;
// const regexTelefono = /^\d{7,15}$/;

// // Función para validar cada campo
// function validarCampo(input, regex) {
//   if (regex.test(input.value)) {
//     input.classList.remove("is-invalid");
//     input.classList.add("is-valid");
//     input.nextElementSibling.style.display = "none"; // Ocultar mensaje de error
//   } else {
//     input.classList.remove("is-valid");
//     input.classList.add("is-invalid");
//     input.nextElementSibling.style.display = "block"; // Mostrar mensaje de error
//   }
// }

// // Agregar el evento de validación en tiempo real a cada campo
// document.getElementById("proveedor").addEventListener("input", function () {
//   validarCampo(this, regexProveedor);
// });

// document.getElementById("repuesto").addEventListener("input", function () {
//   validarCampo(this, regexRepuesto);
// });

// document.getElementById("mail").addEventListener("input", function () {
//   validarCampo(this, regexMail);
// });

// document.getElementById("direccion").addEventListener("input", function () {
//   validarCampo(this, regexDireccion);
// });

// document.getElementById("telefono").addEventListener("input", function () {
//   validarCampo(this, regexTelefono);
// });

// // Validar todos los campos al presionar el botón 'Guardar'
// document.getElementById("guardar-btn2").addEventListener("click", function (e) {
//   e.preventDefault();
  
//   validarCampo(document.getElementById("proveedor"), regexProveedor);
//   validarCampo(document.getElementById("repuesto"), regexRepuesto);
//   validarCampo(document.getElementById("mail"), regexMail);
//   validarCampo(document.getElementById("direccion"), regexDireccion);
//   validarCampo(document.getElementById("telefono"), regexTelefono);
// });

////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const proveedorInput = document.querySelector("#proveedor");
  const repuestoInput = document.querySelector("#repuesto");
  const mailInput = document.querySelector("#mail");
  const direccionInput = document.querySelector("#direccion");
  const telefonoInput = document.querySelector("#telefono");

  const proveedorFeedback = document.querySelector("#nombre-proveedor-feedback");
  const repuestoFeedback = document.querySelector("#repuesto-feedback");
  const mailFeedback = document.querySelector("#mail-feedback");
  const direccionFeedback = document.querySelector("#direccion-feedback");
  const telefonoFeedback = document.querySelector("#telefono-feedback");

  function validarTextoSoloLetras(texto) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(texto);
  }

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validarTelefono(telefono) {
    const regex = /^\d+$/; // Solo números
    return regex.test(telefono);
  }

  function mostrarError(input, feedback, mensaje) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    feedback.textContent = mensaje;
    feedback.style.display = "block";
  }

  function limpiarError(input, feedback) {
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");
    feedback.textContent = "";
    feedback.style.display = "none";
  }

  proveedorInput.addEventListener("input", function () {
    if (!validarTextoSoloLetras(proveedorInput.value)) {
      mostrarError(proveedorInput, proveedorFeedback, "El nombre del proveedor solo puede contener letras.");
    } else {
      limpiarError(proveedorInput, proveedorFeedback);
      proveedorInput.classList.add("is-valid");
    }
  });

  repuestoInput.addEventListener("input", function () {
    if (!validarTextoSoloLetras(repuestoInput.value)) {
      mostrarError(repuestoInput, repuestoFeedback, "El repuesto solo puede contener letras.");
    } else {
      limpiarError(repuestoInput, repuestoFeedback);
      repuestoInput.classList.add("is-valid");
    }
  });

  mailInput.addEventListener("input", function () {
    if (!validarEmail(mailInput.value)) {
      mostrarError(mailInput, mailFeedback, "Por favor, ingresa un correo válido.");
    } else {
      limpiarError(mailInput, mailFeedback);
      mailInput.classList.add("is-valid");
    }
  });

  direccionInput.addEventListener("input", function () {
    if (direccionInput.value.trim() === "") {
      mostrarError(direccionInput, direccionFeedback, "Campo Obligatorio.");
    } else {
      limpiarError(direccionInput, direccionFeedback);
      direccionInput.classList.add("is-valid");
    }
  });

  telefonoInput.addEventListener("input", function () {
    if (!validarTelefono(telefonoInput.value)) {
      mostrarError(telefonoInput, telefonoFeedback, "El teléfono debe contener solo números.");
    } else {
      limpiarError(telefonoInput, telefonoFeedback);
      telefonoInput.classList.add("is-valid");
    }
  });

  // Función para cerrar el popup
  function cerrarPopup() {
    // Limpiar clases de validación
    const inputs = document.querySelectorAll(".form-element input");
    inputs.forEach(input => {
      input.classList.remove("is-valid", "is-invalid");
    });

    // Limpiar mensajes de feedback
    const feedbacks = [
      proveedorFeedback,
      repuestoFeedback,
      mailFeedback,
      direccionFeedback,
      telefonoFeedback
    ];
    feedbacks.forEach(feedback => {
      feedback.textContent = "";
      feedback.style.display = "none";
    });

    // Ocultar el popup
    document.querySelector(".popup").classList.remove("active");
    document.querySelector(".popup-container").classList.remove("active");
  }

  // Asignar el evento de cerrar al botón "Cancelar"
  document.querySelector("#cancelar-btn").addEventListener("click", cerrarPopup);

  // También asignamos el evento al botón de cerrar (si existe)
  document.querySelector(".popup .close-btn").addEventListener("click", cerrarPopup);
});