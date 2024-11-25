var usuario = JSON.parse(localStorage.getItem("usuario"));


//Enlistar Stock
async function enlistarStock(stockConcesionario) {
  const tbody = document.querySelector('.table-body table tbody'); // Seleccionamos el tbody

  stockConcesionario.forEach((stock) => {
    // Crear fila
    const fila = document.createElement('tr');
    fila.classList.add("fila");

    // Crear celdas para cada columna
    const celdaId = document.createElement('td');
    celdaId.classList.add('ocultar-columna');
    celdaId.innerHTML = `<p class="id-p">${stock.id_pieza}</p>`;
    fila.appendChild(celdaId);

    const celdaNombre = document.createElement('td');
    celdaNombre.innerHTML = `<p>${stock.nombre.charAt(0).toUpperCase() + stock.nombre.slice(1).toLowerCase()}</p>`;
    fila.appendChild(celdaNombre);

    const celdaDescipcion = document.createElement('td');
    celdaDescipcion.innerHTML = `<p>${stock.descripcion}</p>`;
    fila.appendChild(celdaDescipcion);

    const celdaStockActual = document.createElement('td');
    celdaStockActual.innerHTML = `<p>${stock.stock_actual}</p>`;
    fila.appendChild(celdaStockActual);

    const celdaStockMinimo = document.createElement('td');
    celdaStockMinimo.innerHTML = `<p>${stock.stock_min}</p>`;
    fila.appendChild(celdaStockMinimo);

    const celdaStockMaximo = document.createElement('td');
    celdaStockMaximo.innerHTML = `<p>${stock.stock_max}</p>`;
    fila.appendChild(celdaStockMaximo);

    const celdaPrecio = document.createElement('td');
    celdaPrecio.innerHTML = `<p>$${stock.precio_unitario}</p>`;
    fila.appendChild(celdaPrecio);

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
async function obtenerStock() {
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
    stockConcesionario = await response.json();

    await enlistarStock(stockConcesionario);
    enlistarStockDisponible(stockConcesionario)
    localStorage.setItem("stock", JSON.stringify(stockConcesionario));
    console.log(stockConcesionario);
    guardarEdicionStock();
    listenerEdicion();
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
  }
}


//Enlistar el select del filtro
function enlistarStockDisponible(stock_disponibles) {
  const selectElemento = document.getElementById("estado-select");
  console.log(stock_disponibles)
  selectElemento.innerHTML =
    '<option value=""  selected>Todos</option>';

  stock_disponibles.forEach((stock) => {
    const opcion = document.createElement("option");
    opcion.value = stock.nombre.charAt(0).toUpperCase() + stock.nombre.slice(1).toLowerCase();
    opcion.textContent = stock.nombre.charAt(0).toUpperCase() + stock.nombre.slice(1).toLowerCase();

    selectElemento.appendChild(opcion);
  });
}


const urlEndpoint =
  "https://aaaaa-deploy-back.vercel.app/users/listarControles";
async function obtenerStockDisponibles() {
  try {
    // Realiza la solicitud al endpoint
    const response = await fetch(urlEndpoint);

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }

    // Convierte la respuesta a JSON
    const datos = await response.json();

    //enlistarStockDisponible(datos);

    console.log("Datos guardados en localStorage:", datos);
  } catch (error) {
    // Manejo de errores
    console.error("Hubo un error al obtener los datos:", error);
  }
}


async function orquesta() {
  //obtenerStockDisponibles();
  await obtenerStock();
  ocultarPreloader();
}
orquesta();