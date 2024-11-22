var usuario = JSON.parse(localStorage.getItem("usuario"));

document.addEventListener("DOMContentLoaded", async function () {
  const form = document.getElementById("form-registro");

  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const emailInput = document.getElementById("email");
  const dniInput = document.getElementById("dni");
  const sueldoInput = document.getElementById("sueldo");
  const rolSelect = document.getElementById("rol");
  const contraseñaInput = document.getElementById("contraseña");

  const feedbackNombre = document.getElementById("feedback-nombre");
  const feedbackApellido = document.getElementById("feedback-apellido");
  const feedbackEmail = document.getElementById("feedback-email");

  // Crear elementos de feedback adicionales
  const feedbackDni = document.createElement("div");
  feedbackDni.classList.add("invalid-feedback");
  dniInput.parentNode.appendChild(feedbackDni);

  const feedbackSueldo = document.createElement("div");
  feedbackSueldo.classList.add("invalid-feedback");
  sueldoInput.parentNode.appendChild(feedbackSueldo);

  const feedbackRol = document.createElement("div");
  feedbackRol.classList.add("invalid-feedback");
  rolSelect.parentNode.appendChild(feedbackRol);

  const feedbackContraseña = document.createElement("div");
  feedbackContraseña.classList.add("invalid-feedback");
  contraseñaInput.parentNode.appendChild(feedbackContraseña);

  // Expresiones regulares
  const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  const dniRegex = /^\d{7,8}$/;
  const contraseñaRegex = /^(?=.*[a-zA-Z])(?=.*\d).{7,}$/;

  // Funciones reutilizables
  function validarTextoSoloLetras(texto) {
    return soloLetrasRegex.test(texto);
  }

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validarDni(dni) {
    return dniRegex.test(dni);
  }

  function validarSueldo(sueldo) {
    return sueldo > 0;
  }

  function validarRol(rol) {
    return rol !== "";
  }

  function validarContraseña(contraseña) {
    return contraseñaRegex.test(contraseña);
  }

  function mostrarError(input, feedback, mensaje) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    feedback.textContent = mensaje;
    feedback.style.display = "block";
  }

  function limpiarError(input, feedback) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    feedback.textContent = "";
    feedback.style.display = "none";
  }

  // Eventos de validación
  nombreInput.addEventListener("input", function () {
    if (!validarTextoSoloLetras(nombreInput.value)) {
      mostrarError(nombreInput, feedbackNombre, "El nombre solo puede contener letras.");
    } else {
      limpiarError(nombreInput, feedbackNombre);
    }
  });

  apellidoInput.addEventListener("input", function () {
    if (!validarTextoSoloLetras(apellidoInput.value)) {
      mostrarError(apellidoInput, feedbackApellido, "El apellido solo puede contener letras.");
    } else {
      limpiarError(apellidoInput, feedbackApellido);
    }
  });

  emailInput.addEventListener("input", function () {
    if (!validarEmail(emailInput.value)) {
      mostrarError(emailInput, feedbackEmail, "Por favor, ingresa un correo válido.");
    } else {
      limpiarError(emailInput, feedbackEmail);
    }
  });

  dniInput.addEventListener("input", function () {
    if (!validarDni(dniInput.value)) {
      mostrarError(dniInput, feedbackDni, "El DNI debe tener 7 u 8 dígitos.");
    } else {
      limpiarError(dniInput, feedbackDni);
    }
  });

  sueldoInput.addEventListener("input", function () {
    if (!validarSueldo(sueldoInput.value)) {
      mostrarError(sueldoInput, feedbackSueldo, "El sueldo debe ser mayor a 0.");
    } else {
      limpiarError(sueldoInput, feedbackSueldo);
    }
  });

  rolSelect.addEventListener("change", function () {
    if (!validarRol(rolSelect.value)) {
      mostrarError(rolSelect, feedbackRol, "Debe seleccionar una opción.");
    } else {
      limpiarError(rolSelect, feedbackRol);
    }
  });

  contraseñaInput.addEventListener("input", function () {
    if (!validarContraseña(contraseñaInput.value)) {
      mostrarError(
        contraseñaInput,
        feedbackContraseña,
        "La contraseña debe tener al menos 7 caracteres e incluir al menos una letra y un número."
      );
    } else {
      limpiarError(contraseñaInput, feedbackContraseña);
    }
  });

  // Validar todo el formulario antes de enviar
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Validar todos los campos
    const nombreValido = validarTextoSoloLetras(nombreInput.value);
    const apellidoValido = validarTextoSoloLetras(apellidoInput.value);
    const emailValido = validarEmail(emailInput.value);
    const dniValido = validarDni(dniInput.value);
    const sueldoValido = validarSueldo(sueldoInput.value);
    const rolValido = validarRol(rolSelect.value);
    const contraseñaValida = validarContraseña(contraseñaInput.value);

    if (
      nombreValido &&
      apellidoValido &&
      emailValido &&
      dniValido &&
      sueldoValido &&
      rolValido &&
      contraseñaValida
    ) {
      // alert("Formulario enviado con éxito");
      await registrarUsuario();

    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  });
});

async function registrarUsuario() {
  const form = document.getElementById("form-registro");
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const emailInput = document.getElementById("email");
  const dniInput = document.getElementById("dni");
  const sueldoInput = document.getElementById("sueldo");
  const rolSelect = document.getElementById("rol");
  const contraseñaInput = document.getElementById("contraseña");
  data = {
    "nombre": nombreInput.value,
    "apellido": apellidoInput.value,
    "email": emailInput.value,
    "dni": dniInput.value,
    "id_concesionario": usuario[5],
    "sueldo": sueldoInput.value,
    "contraseña": contraseñaInput.value,
    "rol": rolSelect.value

  }
  fetch("https://aaaaa-deploy-back.vercel.app/users/registrarUsuario", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al registrar el usario");
      }
      return response.json();
    })
    .then(data => {

      alert('Usuario registrado exitosamente');
      form.reset();
      document.querySelectorAll(".is-valid").forEach((input) => input.classList.remove("is-valid"));

    })
    .catch((error) => {

      alert('Hubo un error al registrar el usuario.');
    });




}
ocultarPreloader();