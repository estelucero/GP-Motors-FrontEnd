// Función para buscar y mostrar vehículos
function mostrarVehiculosFiltrados(vehiculosFiltrados) {
  const sectionCard = document.querySelector(".section-card .wrapper .notifications");

  const tarjetasVehiculos = sectionCard.querySelectorAll(".single-box");
  tarjetasVehiculos.forEach((tarjeta) => tarjeta.remove());

  // Eliminar mensaje de "No se encontraron vehículos" si existe
  const mensajeNoVehiculos = sectionCard.querySelector(".no-vehiculos");
  if (mensajeNoVehiculos) {
    mensajeNoVehiculos.remove();
  }

  if (vehiculosFiltrados.length > 0) {
    vehiculosFiltrados.forEach((vehiculo) => {
      // Crear la tarjeta del vehículo

      const divAuto = document.createElement("div");
      divAuto.classList.add("single-box");
      divAuto.innerHTML = `
          <div class="box-avatar-text">
            <div class="avatar">
              <img src="../assets/imagenes/corolla.png" alt="perfil-imagen" />
            </div>
            <div class="box-text">
              <div class="text-patente">
                <p class="patente-p">${vehiculo[0].patente.toUpperCase()}</p>
              </div>
              <div class="text-flex">
                <p>Marca:</p>
                <p>${vehiculo[0].marca}</p>
              </div>
              <div class="text-flex">
                <p>Modelo:</p>
                <p>${vehiculo[0].modelo}</p>
              </div>
              <div class="text-flex">
                <p>Año de Fabricación:</p>
                <p>${vehiculo[0].año}</p>
              </div>
            </div>
          </div>
          <div class="box-img">
            <a><i class='user-qr bx bx-qr-scan controlar'></i></a>
          </div>
        `;

      // Añadir la tarjeta a la sección
      sectionCard.appendChild(divAuto);
    });

    // Después de crear los vehículos en el DOM, asignar eventos de edición
    guardarControlesVehiculo();

  } else {
    const mensaje = document.createElement("div");
    mensaje.innerHTML = `
    <i class='bx bx-ghost'></i>
    <p>No se encontraron vehículos con esa patente, marca o modelo.</p>
  `;
    mensaje.classList.add("no-vehiculos");
    sectionCard.appendChild(mensaje);
  }
}




// Función que se llama en la búsqueda
document.getElementById("searchButton").addEventListener("click", function () {
  const inputValue = document.getElementById("patenteInput").value.toLowerCase();
  const vehiculos = JSON.parse(localStorage.getItem("vehiculosRegistrados")) || [];
  console.log("entra")
  console.log(vehiculos)
  // Filtrar vehículos por patente, marca o modelo
  const vehiculosFiltrados = vehiculos.filter((vehiculo) =>
    vehiculo[0].patente.toLowerCase().includes(inputValue) ||
    vehiculo[0].marca.toLowerCase().includes(inputValue) ||
    vehiculo[0].modelo.toLowerCase().includes(inputValue)
  );

  // Mostrar vehículos filtrados
  mostrarVehiculosFiltrados(vehiculosFiltrados);
});