// Ejemplo de cómo almacenar el token después de iniciar sesión
async function iniciarSesion() {

  await fetch('https://traccarargentinagpmotors.jumpingcrab.com/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    credentials: 'include', // Asegura que las cookies se envíen con la solicitud
    body: new URLSearchParams({
      email: 'este.lucero2212@gmail.com',
      password: '123'
    }).toString()
  })
    .then(response => response.json())
    .then(data => {
      console.log('Sesión iniciada, datos del usuario:', data);
      // Ya puedes realizar otras solicitudes autenticadas
    })
    .catch(error => console.error('Error:', error));
}

///Obtiene los dispositivos
async function obtenerDispositivo(id_vehiculo) {

  await fetch('https://traccarargentinagpmotors.jumpingcrab.com/api/devices', {
    method: 'GET',
    credentials: 'include' // Se envía la cookie de sesión
  })
    .then(response => response.json())
    .then(data => {
      console.log('Datos de dispositivos:', data);
      //obtenerPosicionesHorario(data[1].id)
      vehiculo = data.filter(dispositivo => dispositivo.uniqueId === "" + id_vehiculo);


    })
    .catch(error => console.error('Error:', error));
  return vehiculo[0];
}

async function obtenerPosicionesHorario(id_vehiculo) {


  dispositivo = await obtenerDispositivo(id_vehiculo);
  console.log(dispositivo)



  from = new Date(Date.now() - 16 * 1000).toISOString();;
  to = new Date().toISOString();
  // to = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  console.log(from + to)
  try {
    const response = await fetch(`https://traccarargentinagpmotors.jumpingcrab.com/api/positions?deviceId=${dispositivo.id}&from=${from}&to=${to}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Agrega tu token de autenticación si es necesario
        // 'Authorization': 'Bearer TU_TOKEN'
      },
      credentials: 'include', // Para enviar cookies de sesión si es necesario

    });

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    console.log('Posiciones obtenidas:', data);
    return data;
  } catch (error) {
    console.error('Error al obtener las posiciones:', error);
  }
}
////agregar al mapa
async function agregoMapa(id_vehiculo) {
  console.log("////////////////////////////")
  const mapContainer = document.getElementById(id_vehiculo);

  // Si ya existe un mapa en el contenedor, eliminarlo
  if (!mapContainer._leaflet_id) {
    // mapContainer._leaflet_id = null; // Eliminar referencia de Leaflet para reiniciar el mapa
    // mapContainer.innerHTML = ""; // Limpiar contenido del contenedor para eliminar el mapa anterior
    await iniciarSesion();
    map = L.map(`${id_vehiculo}`).setView([15, 15], 17); // Coordenadas iniciales (cambiar según necesidad)
  }




  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  // document.getElementById(`${id_vehiculo}`).style.display = "block";
  let vehicleMarker;



  data = await obtenerPosicionesHorario(id_vehiculo);
  console.log(data)
  if (data != 0) {
    position = data[0]
    const latitude = position.latitude;
    const longitude = position.longitude;
    // Actualizar o crear el marcador en el mapa
    if (vehicleMarker) {
      vehicleMarker.setLatLng([latitude, longitude]);
    } else {
      vehicleMarker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`Vehículo: ${position.deviceId}<br>Última actualización: ${new Date(position.fixTime)}`).openPopup();
      map.setView([latitude, longitude], 17); // Centrar el mapa en la posición del vehículo
    }
  } else {
    console.log('No se encontraron posiciones para el dispositivo especificado.');
  }
}
