//Get de los vehiculos registrados
async function obtenerVehiculosRegistrados() {
  const url = `https://aaaaa-deploy-back.vercel.app/users/obtenerControlesPendientesPorConcesionario?id_concesionario=1`;

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
    const vehiculosData = await response.json();

    // Guarda los datos en el localStorage
    localStorage.setItem("vehiculosRegistrados", JSON.stringify(vehiculosData));

    console.log("Datos de vehículos registrados guardados en el localStorage");

    enlistarAutos();
    guardarControlesVehiculo();
    ocultarPreloader()
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
    const noVehiclesMessage = document.getElementById("no-vehicles-message");

    noVehiclesMessage.style.display = 'block';
  }
}
obtenerVehiculosRegistrados();

//Enlisto autos
function recuperarVehiculosRegistrados() {
  const vehiculosData = localStorage.getItem("vehiculosRegistrados");
  const vehiculos = vehiculosData ? JSON.parse(vehiculosData) : null;

  return vehiculos;
}

function enlistarAutos() {
  const vehiculosRegistrados = recuperarVehiculosRegistrados();
  console.log(vehiculosRegistrados);
  const contenedor = document.getElementById("notifications");

  // Verificar si no hay vehículos registrados
  if (vehiculosRegistrados === null || vehiculosRegistrados.length === 0 || vehiculosRegistrados === false) {
    const noVehiclesMessage = document.getElementById("no-vehicles-message");

    noVehiclesMessage.style.display = 'block';
    return;
  }

  vehiculosRegistrados.forEach((vehiculo) => {
    const singleBox = document.createElement("div");
    singleBox.classList.add("single-box");

    singleBox.innerHTML = `
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

    contenedor.appendChild(singleBox);
  });
}

//<img src="../assets/logos/qr.png" alt="" class="user-qr controlar" />


//Guardar auto que clickea

function guardarControlesVehiculo() {
  const botonesEditar = document.querySelectorAll(".controlar");
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
        (vehiculo) => vehiculo[0].patente.toUpperCase() === patente.toUpperCase()
      );
      console.log(vehiculoEncontrado);

      // const datosVehiculo = {
      //   patente: patente,
      //   marca: vehiculoEncontrado.marca,
      //   modelo: vehiculoEncontrado.modelo,
      //   año: vehiculoEncontrado.año,
      //   km: vehiculoEncontrado.km,
      // };

      localStorage.setItem("vehiculoControlar", JSON.stringify(vehiculoEncontrado));
      window.location.href = "./QRAuto-tecnico.html";
    });
  });
}
