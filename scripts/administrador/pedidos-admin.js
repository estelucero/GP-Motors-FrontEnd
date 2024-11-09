var usuario = JSON.parse(localStorage.getItem("usuario"));


//Enlistar Stock
async function enlistarPedidos(pedidoConcesionario) {
  const tbody = document.querySelector('.table-body table tbody'); // Seleccionamos el tbody

  pedidoConcesionario.forEach((pedido) => {
    // Crear fila
    const fila = document.createElement('tr');
    fila.classList.add("fila");

    // Crear celdas para cada columna
    const celdaId = document.createElement('td');
    celdaId.classList.add('ocultar-columna');
    celdaId.innerHTML = `<p class="id-p">${pedido.id_pedido}</p>`;
    fila.appendChild(celdaId);

    const celdaNombre = document.createElement('td');
    celdaNombre.innerHTML = `<p>${pedido.nombre_proveedor.charAt(0).toUpperCase() + pedido.nombre_proveedor.slice(1).toLowerCase()}</p>`;
    fila.appendChild(celdaNombre);

    const celdaEmail = document.createElement('td');
    celdaEmail.innerHTML = `<p>${pedido.email_proveedor}</p>`;
    fila.appendChild(celdaEmail);

    const celdaRepuesto = document.createElement('td');
    celdaRepuesto.innerHTML = `<p>${pedido.nombre_pieza.charAt(0).toUpperCase() + pedido.nombre_pieza.slice(1).toLowerCase()}</p>`;
    fila.appendChild(celdaRepuesto);

    const celdaCantidad = document.createElement('td');
    celdaCantidad.innerHTML = `<p>${pedido.cantidad}</p>`;
    fila.appendChild(celdaCantidad);

    const celdaPrecio = document.createElement('td');
    celdaPrecio.innerHTML = `<p>$${pedido.precio}</p>`;
    fila.appendChild(celdaPrecio);

    const celdaFecha = document.createElement('td');
    celdaFecha.innerHTML = `<p>${pedido.fecha_pedido}</p>`;
    fila.appendChild(celdaFecha);



    const celdaEditar = document.createElement('td');
    celdaEditar.innerHTML = `
      <div class="box-img">
        <a class="editar-margin">
          <img src="../assets/logos/eliminar.png" alt="" class="user-pic-pic eliminar" id="edit-icon" />
        </a>
      </div>`;
    fila.appendChild(celdaEditar);

    // Agregar la fila al tbody
    tbody.appendChild(fila);
  });
}


//Get Controles Terminados
async function obtenerPedidos() {
  const url = `https://aaaaa-deploy-back.vercel.app/users/verPedidos`;

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
    pedidos = await response.json();
    const pedidosConcesionario = pedidos.filter(pedido => pedido.destino === usuario[5] && pedido.estado_pedido == 0);


    localStorage.setItem("pedidos", JSON.stringify(pedidosConcesionario));
    await enlistarPedidos(pedidosConcesionario);
    await eliminarPedido();

    // guardarEdicionStock();
    // listenerEdicion();
    //ocultarPreloader();

  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
  }
}

//Eliminar el auto
async function eliminarPedido() {
  const botonesEliminar = document.querySelectorAll(".eliminar");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", async function () {
      const fila = this.closest(".fila");

      const pedido = fila.querySelector(".id-p").textContent;

      // URL del endpoint para eliminar el vehículo
      const urlDeleteVehiculo = `https://aaaaa-deploy-back.vercel.app/users/eliminarPedido?id_pedido=${pedido}`;

      try {
        // Hacer la solicitud DELETE al endpoint
        const response = await fetch(urlDeleteVehiculo, {
          method: "DELETE",
        });

        if (response.ok) {
          // Si la solicitud es exitosa, eliminar el elemento visualmente del DOM

          console.log(`Pedido con id ${pedido} eliminado del sistema`);
          location.reload(true);
        } else {
          // Si hay un error, mostrar un mensaje
          console.error(
            `Error al eliminar el pedido con id ${pedido}: ${response.statusText}`
          );
          alert("No se pudo eliminar el pedido, intente nuevamente.");
        }
      } catch (error) {
        console.error("Error en la solicitud de eliminación:", error);
        alert("Ocurrió un error al intentar eliminar el pedido.");
      }
    });
  });
}


async function enlistarEntregados(pedidoConcesionario) {
  const tbody = document.querySelector('.table-body-finalizados table tbody'); // Seleccionamos el tbody

  pedidoConcesionario.forEach((pedido) => {
    // Crear fila
    const fila = document.createElement('tr');
    fila.classList.add("fila");

    // Crear celdas para cada columna
    const celdaId = document.createElement('td');
    celdaId.classList.add('ocultar-columna');
    celdaId.innerHTML = `<p class="id-p">${pedido.id_pedido}</p>`;
    fila.appendChild(celdaId);

    const celdaNombre = document.createElement('td');
    celdaNombre.innerHTML = `<p>${pedido.nombre_prov.charAt(0).toUpperCase() + pedido.nombre_prov.slice(1).toLowerCase()}</p>`;
    fila.appendChild(celdaNombre);

    const celdaEmail = document.createElement('td');
    celdaEmail.innerHTML = `<p>${pedido.email_prov}</p>`;
    fila.appendChild(celdaEmail);

    const celdaRepuesto = document.createElement('td');
    celdaRepuesto.innerHTML = `<p>${pedido.nombre_pieza_pedida.charAt(0).toUpperCase() + pedido.nombre_pieza_pedida.slice(1).toLowerCase()}</p>`;
    fila.appendChild(celdaRepuesto);

    const celdaCantidad = document.createElement('td');
    celdaCantidad.innerHTML = `<p>${pedido.cantidad}</p>`;
    fila.appendChild(celdaCantidad);

    const celdaPrecio = document.createElement('td');
    celdaPrecio.innerHTML = `<p>$${pedido.precio}</p>`;
    fila.appendChild(celdaPrecio);

    const celdaFecha = document.createElement('td');
    celdaFecha.innerHTML = `<p>${pedido.fecha_pedido}</p>`;
    fila.appendChild(celdaFecha);

    const celdaFechaFinalizado = document.createElement('td');
    celdaFechaFinalizado.innerHTML = `<p>${pedido.fecha_finalizacion}</p>`;
    fila.appendChild(celdaFechaFinalizado);




    // Agregar la fila al tbody
    tbody.appendChild(fila);
  });
}


async function obtenerEntregados() {
  const url = `https://aaaaa-deploy-back.vercel.app/users/obtenerPedidosFinalizadosPorConcesionario?id_concesionario=${usuario[5]}`;

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
      throw new Error("Error al obtener los datos de los pedidos");
    }

    // Convierte la respuesta a JSON
    pedidos = await response.json();
    // const pedidosConcesionario = pedidos.filter(pedido => pedido.destino === usuario[5] && pedido.estado_pedido == 0);


    // localStorage.setItem("pedidos", JSON.stringify(pedidosConcesionario));
    await enlistarEntregados(pedidos);


    // guardarEdicionStock();
    // listenerEdicion();


  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
  }
}

async function main() {
  await obtenerPedidos();
  await obtenerEntregados();
  ocultarPreloader();
}
main()
