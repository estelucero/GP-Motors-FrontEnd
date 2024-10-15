const autoGuardado = JSON.parse(localStorage.getItem("vehiculoEditar"));
console.log(autoGuardado);




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

patenteElement.textContent = autoGuardado.patente.toUpperCase();
marcaElement.textContent =
  autoGuardado.marca.charAt(0).toUpperCase() +
  autoGuardado.marca.slice(1).toLowerCase();
modeloElement.textContent =
  autoGuardado.modelo.charAt(0).toUpperCase() +
  autoGuardado.modelo.slice(1).toLowerCase();
anoElement.textContent = autoGuardado.año;
kilometrajeElement.textContent = `${autoGuardado.km} Km`;

//////Obtener controles disponibles////////////////////////

const urlEndpoint =
  "https://aaaaa-deploy-back.vercel.app/users/listarControles";

// Función para obtener los datos del endpoint y guardarlos en localStorage
async function obtenerControlesDisponibles() {
  try {
    // Realiza la solicitud al endpoint
    const response = await fetch(urlEndpoint);

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }

    // Convierte la respuesta a JSON
    const datos = await response.json();

    // Guarda los datos en localStorage (puedes cambiar la clave si lo necesitas)
    localStorage.setItem("controles-disponibles", JSON.stringify(datos));

    console.log("Datos guardados en localStorage:", datos);
    selectControlesDisponibles();
    enlistarControlesSelect(datos.controles);
  } catch (error) {
    // Manejo de errores
    console.error("Hubo un error al obtener los datos:", error);
  }
}

obtenerControlesDisponibles();

//Poner en el select los controles disponibles para Post///
function selectControlesDisponibles() {
  const controles_disponibles_lista = JSON.parse(
    localStorage.getItem("controles-disponibles")
  );
  const controles_disponibles = controles_disponibles_lista.controles;

  const selectElemento = document.getElementById("campo_rubro");

  selectElemento.innerHTML =
    '<option value="" disabled selected>Seleccione</option>';

  controles_disponibles.forEach((control) => {
    const opcion = document.createElement("option");
    opcion.value = control;
    opcion.textContent = control;

    selectElemento.appendChild(opcion);
  });
}
//Enlistar el select del filtro con Controles Disponibles//

function enlistarControlesSelect(controles_disponibles) {
  const selectElemento = document.getElementById("control-select");
  console.log(controles_disponibles)
  selectElemento.innerHTML =
    '<option value=""  selected>Todos</option>';

  controles_disponibles.forEach((control) => {
    const opcion = document.createElement("option");
    opcion.value = control;
    opcion.textContent = control;

    selectElemento.appendChild(opcion);
  });
}

/////Post de los Controles///

const guardarBtn = document.getElementById("guardar-btn");
const selectControl = document.getElementById("campo_rubro");

guardarBtn.addEventListener("click", async function (event) {
  event.preventDefault();

  const valorSeleccionado = selectControl.value;

  if (!valorSeleccionado) {
    alert("Por favor, selecciona un tipo de alerta antes de guardar.");
    return;
  }

  // Preparar los datos a enviar en el body de la solicitud
  const datos = {
    patente: autoGuardado.patente,
    control: valorSeleccionado,
    concesionario: 1,
  };

  // Realizar la solicitud POST al endpoint
  try {
    const response = await fetch(
      "https://aaaaa-deploy-back.vercel.app/users/registrarControlPendiente",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      }
    );

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }

    // Manejo de la respuesta
    const resultado = await response.json();
    console.log("Control pendiente registrado:", resultado);
    alert("El control pendiente se ha registrado correctamente.");
    location.reload(true);
  } catch (error) {
    console.error("Error al registrar el control:", error);
    alert("Ocurrió un error al registrar el control.");
  }
});

// Get de los controles
async function obtenerControles() {
  const url = `https://aaaaa-deploy-back.vercel.app/users/consultarControlesPendientesPorPatente?patente=${autoGuardado.patente}`;

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
    const controles = await response.json();

    // Guarda los datos en el localStorage
    localStorage.setItem("controles-pendientes", JSON.stringify(controles));

    console.log("Controles guardados en el localStorage");
    return controles;
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
  }
}

// Enlistar Controles
async function enlistarControles() {
  const contenedor = document.getElementById("alertas");
  const controlesGuardados = await obtenerControles();

  // Verifica que hay controles pendientes antes de enlistar
  if (controlesGuardados && controlesGuardados.controles_pendientes) {
    controlesGuardados.controles_pendientes.forEach((control) => {
      const singleBox = document.createElement("div");
      singleBox.classList.add("alerta");

      singleBox.innerHTML = `
        <div class="box-avatar-text">
          <div class="avatar">
            <img src="../assets/logos/${control.control}.png" alt="perfil-imagen" />
          </div>
          <div class="box-text">
            <div class="text-patente">
              <p class="control-p">${control.control}</p>
            </div>
          </div>
        </div>
        <div class="box-img">
          <a href=""><img src="../assets/logos/eliminar.png" alt="" class="user-pic-pic eliminar-control" /></a>
        </div>
      `;

      contenedor.appendChild(singleBox);
    });
  } else {
    console.log("No hay controles pendientes.");
  }
}

// Orquesta Controles
async function manejarControles() {
  await enlistarControles(); // Espera a que se complete enlistarControles
  await eliminarControl(); // Luego llama a eliminarControl
  await obtenerControlesTerminados();
  window.scrollTo(0, 0);

  ocultarPreloader();
}

manejarControles();

// Eliminar control
function eliminarControl() {
  const botonesEliminar = document.querySelectorAll(".eliminar-control");
  const controles = JSON.parse(localStorage.getItem("controles-pendientes"));
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", async function () {
      event.preventDefault(); // Prevenir el comportamiento predeterminado
      const alerta = this.closest(".alerta");
      console.log("ELIMINO LOS CONTROLES");
      const control = alerta.querySelector(".control-p").textContent;
      console.log(autoGuardado.patente);

      // URL del endpoint para eliminar el vehículo
      const urlDeleteVehiculo = `https://aaaaa-deploy-back.vercel.app/users/eliminarControlesPendientes?patente=${autoGuardado.patente}&control=${control}`;

      try {
        // Hacer la solicitud DELETE al endpoint
        const response = await fetch(urlDeleteVehiculo, {
          method: "DELETE",
        });

        if (response.ok) {
          // Si la solicitud es exitosa, eliminar el elemento visualmente del DOM
          alerta.remove();
          console.log(controles.controles_pendientes)
          nuevosControles = controles.controles_pendientes.filter(eliminar => eliminar.control !== control)
          localStorage.setItem("controles-pendientes", JSON.stringify(nuevosControles));
          console.log(`Control con patente ${control} eliminado del sistema`);
          //location.reload(true);
        } else {
          // Si hay un error, mostrar un mensaje
          console.error(`Error al eliminar el control con patente ${control}: ${response.statusText}`);
          alert("No se pudo eliminar el control, intente nuevamente.");
        }
      } catch (error) {
        console.error("Error en la solicitud de eliminación:", error);
        //alert("Ocurrió un error al intentar eliminar el vehículo.");
      }
    });
  });
}
//Obtener controles terminados//
async function obtenerControlesTerminados() {
  const url = `https://aaaaa-deploy-back.vercel.app/users/verControlesVehiculosPorConcesionario?id_concesionario=1`;

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
    const controlesTerminados = await response.json();
    ///AMOR ESCRIBI ACA PARA QUE APAREZCA EL TEXTO EN EL HISTORIAL DE CONTROLES
    if (controlesTerminados === false) {
      return;
    }
    const controlesTerminadosPatente = controlesTerminados.filter(control => control.patente_vehiculo.includes(autoGuardado.patente))

    await enlistarControlesTerminados(controlesTerminadosPatente)

    console.log(controlesTerminados);
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
  }
}
//Enlistar controles terminados//
async function enlistarControlesTerminados(controlesTerminados) {
  const tbody = document.querySelector('.table-body table tbody'); // Seleccionamos el tbody

  controlesTerminados.forEach((control) => {

    const fila = document.createElement('tr');


    const celdaId = document.createElement('td');
    celdaId.textContent = control.id_control;
    fila.appendChild(celdaId);


    const celdaControl = document.createElement('td');
    celdaControl.innerHTML = `<img src="../assets/logos/${control.nombre_control}.png" alt="">
      <p>${control.nombre_control}</p>`;
    fila.appendChild(celdaControl);



    const celdaTecnico = document.createElement('td');
    celdaTecnico.textContent = control.nombre_tecnico;
    fila.appendChild(celdaTecnico);



    const celdaFechaRealizado = document.createElement('td');
    celdaFechaRealizado.innerHTML = `<strong>${control.fecha_control}</strong>`;
    fila.appendChild(celdaFechaRealizado);


    const celdaObservaciones = document.createElement('td');
    celdaObservaciones.classList.add('wrap-text');
    celdaObservaciones.textContent = control.observaciones || '-';
    fila.appendChild(celdaObservaciones);


    tbody.appendChild(fila);
  });
}

