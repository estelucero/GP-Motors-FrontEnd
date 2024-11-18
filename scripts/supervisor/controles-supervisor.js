var usuario = JSON.parse(localStorage.getItem("usuario"));
//Enlistar controles pendientes//
// async function enlistarControlesPendientes(controlesPendientes) {
//     const tbody = document.querySelector('.table-body table tbody'); // seleccionamos el tbody

//     controlesPendientes.forEach((vehiculo) => {
//         const datosVehiculo = vehiculo[0]; // datos del vehículo
//         const controles = vehiculo[1];     // controles del vehículo

//         controles.forEach((control) => {
//             // Crear fila
//             const fila = document.createElement('tr');

//             // Crear celdas para cada columna
//             const celdaId = document.createElement('td');
//             celdaId.textContent = control.id_control;
//             fila.appendChild(celdaId);

//             const celdaControl = document.createElement('td');
//             celdaControl.innerHTML = `<img src="../assets/logos/${control.control}.png" alt="">
//                                         <p>${control.control}</p>`; // Mostramos el control como texto
//             fila.appendChild(celdaControl);

//             const celdaPatente = document.createElement('td');
//             celdaPatente.textContent = control.patente;
//             fila.appendChild(celdaPatente);

//             const celdaTecnico = document.createElement('td');
//             celdaTecnico.innerHTML = `<strong>-</strong>`; // Aquí puedes reemplazar con un ID de técnico real si lo tienes
//             fila.appendChild(celdaTecnico);

//             const celdaEstado = document.createElement('td');
//             celdaEstado.innerHTML = '<p class="status pendiente">Pendiente</p>'; // Estado como "-"
//             fila.appendChild(celdaEstado);

//             const celdaFechaRealizado = document.createElement('td');
//             celdaFechaRealizado.innerHTML = `<strong>-</strong>`; // Fecha realizado como "-"
//             fila.appendChild(celdaFechaRealizado);

//             // Agregar fila a la tabla
//             tbody.appendChild(fila);
//         });
//     });
// }

//Enlistar controles terminados//
async function enlistarTodosControles(controlesTerminados) {
  const tbody = document.querySelector('.table-body table tbody'); // Seleccionamos el tbody

  controlesTerminados.forEach((control) => {
    // Crear fila
    const fila = document.createElement('tr');

    // Crear celdas para cada columna
    const celdaId = document.createElement('td');
    celdaId.textContent = control.id_control_pendiente;
    fila.appendChild(celdaId);


    const celdaControl = document.createElement('td');
    celdaControl.innerHTML = `<img src="../assets/logos/${control.nombre_control}.png" alt="">
        <p>${control.nombre_control}</p>`;
    fila.appendChild(celdaControl);

    const celdaPatente = document.createElement('td');
    celdaPatente.textContent = control.patente_vehiculo;
    fila.appendChild(celdaPatente);

    const celdaTecnico = document.createElement('td');
    celdaTecnico.textContent = control.nombre_tecnico || '-';
    fila.appendChild(celdaTecnico);

    const celdaEstado = document.createElement('td');
    if (control.estado === "terminado") {
      celdaEstado.innerHTML = '<p class="status terminado">Terminado</p>';
    } else if (control.estado === "pendiente") {
      celdaEstado.innerHTML = '<p class="status pendiente">Pendiente</p>';
    }

    fila.appendChild(celdaEstado);

    const celdaFechaRealizado = document.createElement('td');
    celdaFechaRealizado.innerHTML = `<strong>${control.fecha_control}</strong>`;
    fila.appendChild(celdaFechaRealizado);

    const celdaObservaciones = document.createElement('td');
    celdaObservaciones.classList.add('wrap-text');
    celdaObservaciones.textContent = control.observaciones || '-';
    fila.appendChild(celdaObservaciones);


    // Agregar la fila al tbody
    tbody.appendChild(fila);
  });
}

//Get Controles Pendientes
// async function obtenerControlesPendientes() {
//     const url = `https://aaaaa-deploy-back.vercel.app/users/obtenerControlesPendientesPorConcesionario?id_concesionario=1`;

//     try {
//         // Realiza la solicitud GET
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         // Verifica si la respuesta es exitosa
//         if (!response.ok) {
//             throw new Error("Error al obtener los datos de los vehículos");
//         }

//         // Convierte la respuesta a JSON
//         const controlesPendientes = await response.json();

//         await enlistarControlesPendientes(controlesPendientes)

//         console.log(controlesPendientes);
//     } catch (error) {
//         console.error("Hubo un problema con la solicitud:", error);
//     }
// }


//Get Controles Terminados
async function obtenerControles() {
  const url = `https://aaaaa-deploy-back.vercel.app/users/obtenerTodosLosControles`;

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
    controlesTerminados = await response.json();
    controlesTerminados = controlesTerminados.filter(control => control.concesionario === usuario[5])
    await enlistarTodosControles(controlesTerminados)

    console.log(controlesTerminados);
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
  }
}


//Enlistar el select del filtro

function enlistarControles(controles_disponibles) {
  const selectElemento = document.getElementById("control-select");
  console.log(controles_disponibles)
  selectElemento.innerHTML =
    '<option value=""  selected>Todos</option>';

  controles_disponibles.controles.forEach((control) => {
    const opcion = document.createElement("option");
    opcion.value = control;
    opcion.textContent = control;

    selectElemento.appendChild(opcion);
  });
}



const urlEndpoint =
  "https://aaaaa-deploy-back.vercel.app/users/listarControles";
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

    enlistarControles(datos);

    console.log("Datos guardados en localStorage:", datos);
  } catch (error) {
    // Manejo de errores
    console.error("Hubo un error al obtener los datos:", error);
  }
}



async function orquesta() {
  obtenerControlesDisponibles();
  await obtenerControles();
  ocultarPreloader();

}
orquesta();