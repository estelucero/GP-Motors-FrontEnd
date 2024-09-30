/*document.getElementById("searchButton").addEventListener("click", function () {
  const inputValue = document.getElementById("patenteInput").value.toLowerCase();
  const vehiculos = JSON.parse(localStorage.getItem("vehiculosRegistrados")) || [];

  // Filtrar vehículos por patente
  const vehiculosFiltrados = vehiculos.filter((vehiculo) =>
    vehiculo.patente.toLowerCase().includes(inputValue)
  );
  console.log(vehiculosFiltrados);

  // Obtener la sección donde se mostrarán los vehículos
  const sectionCard = document.querySelector(".section-card .wrapper .notifications");

  // Eliminar solo las tarjetas de vehículos (mantener el botón de agregar auto)
  const tarjetasVehiculos = sectionCard.querySelectorAll(".single-box");
  tarjetasVehiculos.forEach((tarjeta) => tarjeta.remove());

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
                <p class="patente-p">${vehiculo.patente.toUpperCase()}</p>
              </div>
              <div class="text-flex">
                Marca: <p>${vehiculo.marca.charAt(0).toUpperCase() + vehiculo.marca.slice(1).toLowerCase()}</p>
              </div>
              <div class="text-flex">
                Modelo: <p>${vehiculo.modelo.charAt(0).toUpperCase() + vehiculo.modelo.slice(1).toLowerCase()}</p>
              </div>
              <div class="text-flex">
                Año de Fabricación: <p>${new Date(vehiculo.fechaFabricacion).getFullYear()}</p>
              </div>
            </div>
          </div>
          <div class="box-img">
            <a href="../views/auto.html">
              <img src="../assets/logos/edit-solid-24.png" alt="Editar" class="user-pic-pic" />
            </a>
            <img src="../assets/logos/eliminar.png" alt="Eliminar" class="user-pic-pic eliminar-auto" />
          </div>
        `;

      // Añadir la tarjeta a la sección
      sectionCard.appendChild(divAuto);

      // Asignar evento de eliminar después de agregar la tarjeta al DOM
      const eliminarIcon = divAuto.querySelector(".eliminar-auto");
      eliminarIcon.addEventListener("click", async (event) => {
        event.stopPropagation(); // Evita que el click se propague al evento de la tarjeta

        // Confirmar antes de eliminar
        const confirmacion = confirm(`¿Estás seguro de que quieres eliminar el vehículo con patente ${vehiculo.patente}?`);
        if (!confirmacion) return;

        try {
          const response = await fetch(`https://back-gestion-p1.vercel.app/users/eliminarVehiculoUsuarioParticular?patente=${vehiculo.patente}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            console.log(`Vehículo con patente ${vehiculo.patente} eliminado con éxito`);
            divAuto.remove(); // Eliminar la tarjeta sin recargar la página
          } else {
            const errorData = await response.json();
            console.error("Error al eliminar el vehículo:", errorData);
            alert("Hubo un problema al eliminar el vehículo.");
          }
        } catch (error) {
          console.error("Hubo un problema con la solicitud de eliminación:", error);
          alert("Error de red al intentar eliminar el vehículo.");
        }
      });
    });
  } else {
    // Si no hay resultados, se muestra este mensaje
    const mensaje = document.createElement("p");
    mensaje.textContent = "No se encontraron vehículos con esa patente.";
    sectionCard.appendChild(mensaje);
  }
});*/


///////////////////////////////////////////////

/*
document.getElementById("searchButton").addEventListener("click", function () {
  const inputValue = document.getElementById("patenteInput").value.toLowerCase();
  const vehiculos = JSON.parse(localStorage.getItem("vehiculosRegistrados")) || [];

  // Filtrar vehículos por patente
  const vehiculosFiltrados = vehiculos.filter((vehiculo) =>
    vehiculo.patente.toLowerCase().includes(inputValue)
  );
  console.log(vehiculosFiltrados);

  // Obtener la sección donde se mostrarán los vehículos
  const sectionCard = document.querySelector(".section-card .wrapper .notifications");

  // Eliminar solo las tarjetas de vehículos (mantener el botón de agregar auto)
  const tarjetasVehiculos = sectionCard.querySelectorAll(".single-box");
  tarjetasVehiculos.forEach((tarjeta) => tarjeta.remove());

  // Eliminar el mensaje de "No se encontraron vehículos" si existe
  const mensajeError = sectionCard.querySelector("p");
  if (mensajeError) {
    mensajeError.remove();
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
                <p class="patente-p">${vehiculo.patente.toUpperCase()}</p>
              </div>
              <div class="text-flex">
                Marca: <p>${vehiculo.marca.charAt(0).toUpperCase() + vehiculo.marca.slice(1).toLowerCase()}</p>
              </div>
              <div class="text-flex">
                Modelo: <p>${vehiculo.modelo.charAt(0).toUpperCase() + vehiculo.modelo.slice(1).toLowerCase()}</p>
              </div>
              <div class="text-flex">
                Año de Fabricación: <p>${new Date(vehiculo.fechaFabricacion).getFullYear()}</p>
              </div>
            </div>
          </div>
          <div class="box-img">
            <a class="editar-margin" href="">
              <img src="../assets/logos/edit-solid-24.png" alt="Editar" class="user-pic-pic" />
            </a>
            <img src="../assets/logos/eliminar.png" alt="Eliminar" class="user-pic-pic eliminar-auto" />
          </div>
        `;

      // Añadir la tarjeta a la sección
      sectionCard.appendChild(divAuto);

      // Asignar evento de eliminar después de agregar la tarjeta al DOM
      const eliminarIcon = divAuto.querySelector(".eliminar-auto");
      eliminarIcon.addEventListener("click", async (event) => {
        event.stopPropagation(); // Evita que el click se propague al evento de la tarjeta

        // Confirmar antes de eliminar
        const confirmacion = confirm(`¿Estás seguro de que quieres eliminar el vehículo con patente ${vehiculo.patente}?`);
        if (!confirmacion) return;

        try {
          const response = await fetch(`https://back-gestion-p1.vercel.app/users/eliminarVehiculoUsuarioParticular?patente=${vehiculo.patente}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            console.log(`Vehículo con patente ${vehiculo.patente} eliminado con éxito`);
            divAuto.remove(); // Eliminar la tarjeta sin recargar la página
          } else {
            const errorData = await response.json();
            console.error("Error al eliminar el vehículo:", errorData);
            alert("Hubo un problema al eliminar el vehículo.");
          }
        } catch (error) {
          console.error("Hubo un problema con la solicitud de eliminación:", error);
          alert("Error de red al intentar eliminar el vehículo.");
        }
      });
    });
  } else {
    // Si no hay resultados, se muestra este mensaje
    const mensaje = document.createElement("p");
    mensaje.textContent = "No se encontraron vehículos con esa patente.";
    sectionCard.appendChild(mensaje);
  }
});*/

////////////////////////////////////////////////


/*

document.getElementById("searchButton").addEventListener("click", function () {
  const inputValue = document.getElementById("patenteInput").value.toLowerCase();
  const vehiculos = JSON.parse(localStorage.getItem("vehiculosRegistrados")) || [];

  // Filtrar vehículos por patente, marca o modelo
  const vehiculosFiltrados = vehiculos.filter((vehiculo) =>
    vehiculo.patente.toLowerCase().includes(inputValue) ||
    vehiculo.marca.toLowerCase().includes(inputValue) ||
    vehiculo.modelo.toLowerCase().includes(inputValue)
  );
  console.log(vehiculosFiltrados);

  // Obtener la sección donde se mostrarán los vehículos
  const sectionCard = document.querySelector(".section-card .wrapper .notifications");

  // Eliminar solo las tarjetas de vehículos (mantener el botón de agregar auto)
  const tarjetasVehiculos = sectionCard.querySelectorAll(".single-box");
  tarjetasVehiculos.forEach((tarjeta) => tarjeta.remove());

  // Eliminar el mensaje de "No se encontraron vehículos" si existe
  const mensajeError = sectionCard.querySelector("p");
  if (mensajeError) {
    mensajeError.remove();
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
            <p class="patente-p">${vehiculo.patente.toUpperCase()}</p>
          </div>
          <div class="text-flex">
            <p>Marca:</p>
            <p>${vehiculo.marca.charAt(0).toUpperCase() + vehiculo.marca.slice(1).toLowerCase()}</p>
          </div>
          <div class="text-flex">
            <p>Modelo:</p>
            <p>${vehiculo.modelo.charAt(0).toUpperCase() + vehiculo.modelo.slice(1).toLowerCase()}</p>
          </div>
          <div class="text-flex">
            <p>Año de Fabricación:</p>
            <p>${vehiculo.año}</p>
          </div>
        </div>
      </div>
      <div class="box-img">
        <a class="editar-margin"><img src="../assets/logos/edit-solid-24.png" alt="" class="user-pic-pic editar" /></a>
        <img src="../assets/logos/eliminar.png" alt="" class="user-pic-pic eliminar-vehiculo" />
      </div>
    `;

      // Añadir la tarjeta a la sección
      sectionCard.appendChild(divAuto);


    });
  } else {
    // Si no hay resultados, se muestra este mensaje
    const mensaje = document.createElement("p");
    mensaje.textContent = "No se encontraron vehículos con esa patente, marca o modelo.";
    sectionCard.appendChild(mensaje);
  }
});

//Guardar auto que clickea
function guardarEdicionVehiculo() {
  const botonesEditar = document.querySelectorAll(".editar");
  const vehiculosGuardados = JSON.parse(
    localStorage.getItem("vehiculosRegistrados")
  );

  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      // Evitar que el enlace redirija inmediatamente
      event.preventDefault();

      const vehiculoBox = this.closest(".single-box");

      const patente = vehiculoBox.querySelector(".patente-p").textContent;
      const vehiculoEncontrado = vehiculosGuardados.find(
        (vehiculo) => vehiculo.patente.toUpperCase() === patente.toUpperCase()
      );
      console.log(vehiculoEncontrado);

      const datosVehiculo = {
        patente: patente,
        marca: vehiculoEncontrado.marca,
        modelo: vehiculoEncontrado.modelo,
        año: vehiculoEncontrado.año,
        km: vehiculoEncontrado.km,
      };

      localStorage.setItem("vehiculoEditar", JSON.stringify(datosVehiculo));

    });
  });
}
guardarEdicionVehiculo();*/



/////////////////////////////////////////////////////

// Función para buscar y mostrar vehículos
function mostrarVehiculosFiltrados(vehiculosFiltrados) {
  const sectionCard = document.querySelector(".section-card .wrapper .notifications");

  // Eliminar tarjetas previas
  const tarjetasVehiculos = sectionCard.querySelectorAll(".single-box");
  tarjetasVehiculos.forEach((tarjeta) => tarjeta.remove());

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
              <p class="patente-p">${vehiculo.patente.toUpperCase()}</p>
            </div>
            <div class="text-flex">
              <p>Marca:</p>
              <p>${vehiculo.marca.charAt(0).toUpperCase() + vehiculo.marca.slice(1).toLowerCase()}</p>
            </div>
            <div class="text-flex">
              <p>Modelo:</p>
              <p>${vehiculo.modelo.charAt(0).toUpperCase() + vehiculo.modelo.slice(1).toLowerCase()}</p>
            </div>
            <div class="text-flex">
              <p>Año de Fabricación:</p>
              <p>${vehiculo.año}</p>
            </div>
          </div>
        </div>
        <div class="box-img">
          <a class="editar-margin" href=""><img src="../assets/logos/edit-solid-24.png" alt="" class="user-pic-pic editar" /></a>
          <img src="../assets/logos/eliminar.png" alt="" class="user-pic-pic eliminar-vehiculo" />
        </div>
      `;

      // Añadir la tarjeta a la sección
      sectionCard.appendChild(divAuto);
    });

    // Después de crear los vehículos en el DOM, asignar eventos de edición
    guardarEdicionVehiculo();
    eliminarVehiculo();
  } else {
    const mensaje = document.createElement("p");
    mensaje.textContent = "No se encontraron vehículos con esa patente, marca o modelo.";
    sectionCard.appendChild(mensaje);
  }
}

//Guardar auto que clickea
function guardarEdicionVehiculo() {
  const botonesEditar = document.querySelectorAll(".editar");
  const vehiculosGuardados = JSON.parse(
    localStorage.getItem("vehiculosRegistrados")
  );

  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      event.preventDefault(); // Evitar redirección

      const vehiculoBox = this.closest(".single-box");

      // Obtener la patente del vehículo clickeado
      const patente = vehiculoBox.querySelector(".patente-p").textContent.trim();
      const vehiculoEncontrado = vehiculosGuardados.find(
        (vehiculo) => vehiculo.patente.toUpperCase() === patente.toUpperCase()
      );

      // Guardar el vehículo en localStorage para edición
      const datosVehiculo = {
        patente: vehiculoEncontrado.patente,
        marca: vehiculoEncontrado.marca,
        modelo: vehiculoEncontrado.modelo,
        año: vehiculoEncontrado.año,
        km: vehiculoEncontrado.km,
      };

      localStorage.setItem("vehiculoEditar", JSON.stringify(datosVehiculo));

      console.log('Vehículo guardado para edición:', datosVehiculo);

      // Lógica para abrir el popup de edición (si la tienes implementada)
      abrirPopup(true, datosVehiculo); // True indica que es edición
    });
  });
}


// Función que se llama en la búsqueda
document.getElementById("searchButton").addEventListener("click", function () {
  const inputValue = document.getElementById("patenteInput").value.toLowerCase();
  const vehiculos = JSON.parse(localStorage.getItem("vehiculosRegistrados")) || [];

  // Filtrar vehículos por patente, marca o modelo
  const vehiculosFiltrados = vehiculos.filter((vehiculo) =>
    vehiculo.patente.toLowerCase().includes(inputValue) ||
    vehiculo.marca.toLowerCase().includes(inputValue) ||
    vehiculo.modelo.toLowerCase().includes(inputValue)
  );

  // Mostrar vehículos filtrados
  mostrarVehiculosFiltrados(vehiculosFiltrados);
});