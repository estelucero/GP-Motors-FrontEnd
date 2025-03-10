var usuario = JSON.parse(localStorage.getItem("usuario"));

async function obtenerVehiculosVTV() {
  const url = `https://aaaaa-deploy-back.vercel.app/users/obtenerVehiculosEnViaje?id_concesionaria=${usuario[5]}`;

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

    const vehiculosVTV = vehiculosData.filter(vehiculo => vehiculo.tipo === "vtv");


    console.log(vehiculosVTV);
    return vehiculosVTV;
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
  }
}

// Función para cargar la lista de vehículos dinámicamente
async function cargarVehiculos() {
  const sidebar = document.querySelector('.sidebar');
  const contentDiv = document.querySelector('.container-vtv');
  vehiculos = await obtenerVehiculosVTV();
  console.log(vehiculos)
  // Limpiar la sección de contenido para los detalles
  vehiculos.forEach(async vehiculo => {
    // Crear un nuevo div para el label de cada vehículo
    const label = document.createElement('div');
    label.classList.add('label');
    label.textContent = `Patente: ${vehiculo.patente_vehiculo}`;
    // Llamada a la función showContent cuando se hace clic

    // Agregar el label a la sidebar
    sidebar.appendChild(label);

    // Crear el div de contenido de cada vehículo
    const divContenido = document.createElement('div');
    divContenido.id = vehiculo.id_vehiculo;
    divContenido.classList.add('info-mapa');
    divContenido.style.display = "none";
    //divContenido.innerHTML = `<p>${vehiculo.patente_vehiculo}</p>`;
    contentDiv.appendChild(divContenido);
    label.setAttribute('onclick', `showContent('${vehiculo.id_vehiculo}', this)`);

  });
}

// // Función para mostrar el contenido correspondiente al vehículo seleccionado
// async function showContent(id, element) {
//   // Ocultar todos los contenidos y el mensaje inicial
//   document.querySelectorAll('.content div').forEach(div => {
//     div.classList.remove('active');
//   });
//   document.getElementById("content").style.display = "none";
//   // Ocultar el mensaje inicial
//   document.getElementById('mensaje-inicial').classList.remove('active');
//   document.getElementById(id).style.display = "block";
//   // Mostrar el contenido correspondiente
//   document.getElementById(id).classList.add('active');

//   // Seleccionar todos los labels y quitarles la clase 'selected'
//   const labels = document.querySelectorAll('.sidebar .label');
//   labels.forEach(label => {
//     label.classList.remove('selected');
//   });

//   // Añadir la clase 'selected' al label que ha sido clickeado
//   element.classList.add('selected');

//   await agregoMapa(id);
// }

let updateInterval; // Variable para almacenar el intervalo actual

// Función para mostrar el contenido correspondiente al vehículo seleccionado
async function showContent(id, element) {

  // Ocultar todos los contenidos y el mensaje inicial
  document.querySelectorAll('.content div').forEach(div => {
    div.classList.remove('active');

  });
  document.querySelectorAll('.info-mapa.active').forEach(div => {
    div._leaflet_id = null;
    div.innerHTML = "";
    div.style.display = "none";
  });
  document.getElementById("content").style.display = "none";
  // Ocultar el mensaje inicial
  document.getElementById('mensaje-inicial').classList.remove('active');
  document.getElementById(id).style.display = "block";
  // Mostrar el contenido correspondiente
  document.getElementById(id).classList.add('active');

  // Seleccionar todos los labels y quitarles la clase 'selected'
  const labels = document.querySelectorAll('.sidebar .label');
  labels.forEach(label => {
    label.classList.remove('selected');
  });

  // Añadir la clase 'selected' al label que ha sido clickeado
  element.classList.add('selected');

  // Limpia el intervalo anterior si existe
  if (updateInterval) {
    clearInterval(updateInterval);
  }

  // Ejecuta agregoMapa inmediatamente y luego cada 15 segundos
  await agregoMapa(id);
  updateInterval = setInterval(async () => {
    await agregoMapa(id);
  }, 15000);
}


// Cargar los vehículos cuando se cargue la página
async function main() {

  await cargarVehiculos();

  ocultarPreloader();
}
main();