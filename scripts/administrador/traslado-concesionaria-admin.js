var usuario = JSON.parse(localStorage.getItem("usuario"));
var vehiculosRegistrados = JSON.parse(localStorage.getItem("vehiculosRegistrados"));


function enlistarPatentesTraslado(vehiculosTraslado) {
  const selectPatente = document.getElementById('seleccionarPatente');
  vehiculosTraslado.forEach(vehiculo => {
    const option = document.createElement('option');
    option.value = vehiculo.patente_vehiculo;
    option.textContent = vehiculo.patente_vehiculo;
    selectPatente.appendChild(option);
  });
}

async function obtenerVehiculosTraslado() {
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

    const vehiculosTraslado = vehiculosData.filter(vehiculo => vehiculo.tipo === "traslado");

    enlistarPatentesTraslado(vehiculosTraslado);
    console.log(vehiculosTraslado);
    return vehiculosTraslado;
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
  }
}

// Función para cargar la lista de vehículos dinámicamente
async function cargarVehiculos() {
  const sidebar = document.querySelector('.sidebar');
  const contentDiv = document.querySelector('.container-vtv');
  vehiculos = await obtenerVehiculosTraslado();
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
  }, 5000);
}

////////////////////////////////////777
async function inciarTraslado() {
  // Obtener valores de los campos
  const selectPatente = document.getElementById('patente-traslado');
  const selectConcesionaria = document.getElementById('opcionesTraslado');
  const botonTraslado = document.getElementById('guardarTraslado');
  // Verificar que ambos campos estén completados



  botonTraslado.addEventListener('click', () => {
    patenteValue = selectPatente.value;
    concesionariaValue = selectConcesionaria.value;

    if (!patenteValue || !concesionariaValue) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Crear el objeto de traslado
    const traslado = {
      patente_vehiculo: patenteValue,
      concesionario_destino: concesionariaValue,

    };
    fetch("https://aaaaa-deploy-back.vercel.app/users/iniciarTraslado", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(traslado)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            throw new Error(error.detail);
          });
        }
        return response.json();
      })
      .then(data => {
        // console.log('Success:', data);
        // alert('Traslado guardado exitosamente.');
        // location.reload();
        Swal.fire({
          icon: "success",
          title: "Perfecto..",
          text: "Traslado guardado exitosamente.",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload(); // Recarga la página al confirmar
          }
        });
      })
      .catch((error) => {
        // console.error('Error:', error);
        // alert(`Hubo un error al guardar el traslado:${error}.`);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Hubo un error al guardar el traslado:${error}.`,
        });
      });


  });
}

//////////////////

async function recibirTraslado() {
  // Obtener valores de los campos
  const selectPatente = document.getElementById('seleccionarPatente');

  const botonTraslado = document.getElementById('confirmar-traslado');
  // Verificar que ambos campos estén completados



  botonTraslado.addEventListener('click', () => {
    patenteValue = selectPatente.value;


    if (!patenteValue) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // Crear el objeto de traslado

    fetch(`https://aaaaa-deploy-back.vercel.app/users/finalizarTraslado?patente=${patenteValue}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },

    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(error => {
            throw new Error(error.detail);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);

        Swal.fire({
          icon: "success",
          title: "Confirmacion de traslado guardado exitosamente."

        }).then((result) => {
          if (result.isConfirmed) {
            location.reload(); // Recarga la página al confirmar
          }
        });
      })
      .catch((error) => {
        console.error('Error:', error);

        Swal.fire({
          icon: "error",
          title: "Hubo un error al confirmar el traslado.",

        });
      });


  });
}

///////////Cargar patentes vehiculos registrados en select
function enlistarSelectAutosTrasladar() {
  const selectPatente = document.getElementById('patente-traslado');
  vehiculosRegistrados.forEach(vehiculo => {
    const option = document.createElement('option');
    option.value = vehiculo.patente;
    option.textContent = vehiculo.patente;
    selectPatente.appendChild(option);
  });
}
/////////////Obtener concesionarias
async function obtenerConcesionarias() {
  const url = `https://aaaaa-deploy-back.vercel.app/users/verSedesConcesionarioRegistradas`;

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
      throw new Error("Error al obtener los datos de la concesionaria");
    }

    // Convierte la respuesta a JSON
    const concesionariaData = await response.json();

    const concesionarias = concesionariaData.filter(concesionaria => concesionaria.id_concesionario != usuario[5]);


    console.log(concesionarias);
    return concesionarias;
  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
  }

}

//////Carga concesionarias en el select todas menos la misma
async function enlistarConcesionarias() {
  const selectConcesionaria = document.getElementById('opcionesTraslado');
  concesionarias = await obtenerConcesionarias()
  concesionarias.forEach(concesionaria => {
    const option = document.createElement('option');
    option.value = concesionaria.id_concesionario;
    option.textContent = concesionaria.nombre;
    selectConcesionaria.appendChild(option);
  });

}
// Cargar los vehículos cuando se cargue la página
async function main() {

  await enlistarConcesionarias()
  await cargarVehiculos();
  await inciarTraslado();
  await recibirTraslado();
  enlistarSelectAutosTrasladar();
  ocultarPreloader();
}
main();