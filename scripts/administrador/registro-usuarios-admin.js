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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completar los campos correctamente",
      });
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
      Swal.fire({
        icon: "success",
        title: "Perfecto..",
        text: "Usuario registrado exitosamente.",
      }).then((result) => {
        if (result.isConfirmed) {
          location.reload(); // Recarga la página al confirmar
        }
      });


      form.reset();
      document.querySelectorAll(".is-valid").forEach((input) => input.classList.remove("is-valid"));

    })
    .catch((error) => {


      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al registrar el usuario.",
      });
    });




}

//Enlistar usuarios
async function enlistarUsuarios(usuarios) {
  const tbody = document.querySelector('.table-body table tbody'); // Seleccionamos el tbody

  usuarios.forEach((user) => {
    // Crear fila
    const fila = document.createElement('tr');
    fila.classList.add("fila");

    // Crear celdas para cada columna
    const celdaId = document.createElement('td');
    celdaId.classList.add('ocultar-columna');
    celdaId.innerHTML = `<p class="id-p">${user.id_usuario}</p>`;
    fila.appendChild(celdaId);

    const celdaNombre = document.createElement('td');
    celdaNombre.innerHTML = `<p>${user.nombre.charAt(0).toUpperCase() + user.nombre.slice(1).toLowerCase()}</p>`;
    fila.appendChild(celdaNombre);

    const celdaApellido = document.createElement('td');
    celdaApellido.innerHTML = `<p>${user.apellido.charAt(0).toUpperCase() + user.apellido.slice(1).toLowerCase()}</p>`;
    fila.appendChild(celdaApellido);

    const celdaEmail = document.createElement('td');
    celdaEmail.innerHTML = `<p>${user.email}</p>`;
    fila.appendChild(celdaEmail);

    const celdaRol = document.createElement('td');
    celdaRol.innerHTML = `<p>${user.rol.charAt(0).toUpperCase() + user.rol.slice(1).toLowerCase()}</p>`;
    fila.appendChild(celdaRol);

    const celdaEditar = document.createElement('td');
    celdaEditar.innerHTML = `
      <div class="box-img">
        <a>
          <img src="../assets/logos/eliminar.png" alt="" class="user-pic-pic eliminar-usuario" id="eliminar-icon" />
        </a>
      </div>`;
    fila.appendChild(celdaEditar);

    // Agregar la fila al tbody
    tbody.appendChild(fila);
  });
}

//Elimino usuarios
async function eliminarUsuarios() {
  const botonesEliminar = document.querySelectorAll(".eliminar-usuario");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", async function () {
      const fila = boton.closest('.fila');
      const email_usuario = fila.querySelector('td:nth-child(4) p').textContent;


      //popupContainer.classList.add('active');
      Swal.fire({
        title: "Estas seguro de eliminar el usuario?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await eliminarUsuarioEndpoint(email_usuario);
        }
      });

    });
  });
}

async function eliminarUsuarioEndpoint(email_usuario) {
  const urlDeleteVehiculo = `https://aaaaa-deploy-back.vercel.app/users/eliminarUsuario?email=${email_usuario}`;

  try {
    // Hacer la solicitud DELETE al endpoint
    const response = await fetch(urlDeleteVehiculo, {
      method: "DELETE",
    });

    if (response.ok) {
      // Si la solicitud es exitosa, eliminar el elemento visualmente del DOM
      //vehiculoBox.remove();
      //console.log(`Vehículo con patente ${patente} eliminado del sistema`);
      Swal.fire({
        icon: "success",
        title: "Usuario eliminado con exito"

      }).then((result) => {
        if (result.isConfirmed) {
          location.reload(); // Recarga la página al confirmar
        }
      });
    } else {
      // Si hay un error, mostrar un mensaje
      console.error(
        `Error al eliminar el usuario con patente ${email_usuario}: ${response.statusText}`
      );

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo eliminar el usuario, intente nuevamente.",
      });
    }
  } catch (error) {
    console.error("Error en la solicitud de eliminación:", error);
    //alert("");
    Swal.fire({
      icon: "error",
      title: "Ocurrió un error al intentar eliminar el usuario.",

    });
  }
}

//Get usuarios
async function obtenerUsuarios() {
  const url = `https://aaaaa-deploy-back.vercel.app/users/usuariosPorConcesionaria?id_concesionario=${usuario[5]}`;

  try {
    // Realiza la solicitud GET
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error al obtener los datos de los vehículos");
    }

    // Convierte la respuesta a JSON
    usuarios = await response.json();

    await enlistarUsuarios(usuarios);



    await eliminarUsuarios();

    ocultarPreloader();
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
  }
}
obtenerUsuarios();



