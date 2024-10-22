var usuario = JSON.parse(localStorage.getItem("usuario"));
//Enlistar proveedores//
async function enlistarTodosProveedores(proveedores) {
  const tbody = document.querySelector('.table-body table tbody'); // Seleccionamos el tbody

  proveedores.forEach((proveedor) => {
    // Crear fila
    const fila = document.createElement('tr');
    fila.classList.add("fila");
    // Crear celdas para cada columna
    const celdaId = document.createElement('td');
    celdaId.innerHTML = `<p class="id-p">${proveedor.id_pieza}</p>`;
    fila.appendChild(celdaId);

    const celdaNombre = document.createElement('td');
    celdaNombre.innerHTML = `<p>${proveedor.nombre_proveedor}</p>`;
    fila.appendChild(celdaNombre);

    const celdaRepuesto = document.createElement('td');
    celdaRepuesto.innerHTML = `<p>${proveedor.nombre}</p>`;
    fila.appendChild(celdaRepuesto);

    const celdaMail = document.createElement('td');
    celdaMail.innerHTML = `<p>${proveedor.email_proveedor}</p>`;
    fila.appendChild(celdaMail);

    const celdaTelefono = document.createElement('td');
    celdaTelefono.innerHTML = `<p>${proveedor.celular_proveedor}</p>`;
    fila.appendChild(celdaTelefono);

    const celdaDireccion = document.createElement('td');
    celdaDireccion.innerHTML = `<p>${proveedor.direccion_proveedor}</p>`;
    fila.appendChild(celdaDireccion);

    const celdaEditar = document.createElement('td');
    celdaEditar.innerHTML = `
      <div class="box-img">
        <a class="editar-margin">
          <img src="../assets/logos/edit-solid-24.png" alt="" class="user-pic-pic editar" id="edit-icon" />
        </a>
      </div>`;
    fila.appendChild(celdaEditar);

    // Agregar la fila al tbody
    tbody.appendChild(fila);
  });
}


//Get Controles Terminados
async function obtenerProveedores() {
  const url = `https://aaaaa-deploy-back.vercel.app/users/obtenerPiezasConcesionarioDB?id_concesionario=${usuario[5]}`;

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

    await enlistarTodosProveedores(controlesTerminados)
    localStorage.setItem("proveedores", JSON.stringify(controlesTerminados));
    console.log(controlesTerminados);
    guardarEdicionProveedor();
    listenerEdicion();
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
  //obtenerControlesDisponibles();
  await obtenerProveedores();
  ocultarPreloader();

}
orquesta();