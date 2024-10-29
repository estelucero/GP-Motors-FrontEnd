let mymap; 
let marker; 

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('normalizarBtn').addEventListener('click', mostrarResultados);
    document.getElementById('cancelar-btn').addEventListener('click', ocultarMapa);
    document.querySelector('.close-btn').addEventListener('click', ocultarMapa);
});

async function mostrarResultados() {
    const direccion = document.getElementById('direccion').value;
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = ''; // Limpiar resultados anteriores

    if (!direccion) {
        return; // Si no hay dirección, no hacer nada
    }

    const errores = validarDireccion(direccion);
    if (errores.length > 0) {
        errores.forEach(error => {
            const p = document.createElement('p');
            p.textContent = error;
            p.style.color = 'red';
            resultadosDiv.appendChild(p);
        });
        return; 
    }

    ocultarMapa(); 

    const resultados = await normalizarDireccion(direccion, 20);
    if (resultados && resultados.direccionesNormalizadas && resultados.direccionesNormalizadas.length > 0) {
        if (resultados.direccionesNormalizadas.length === 1) {
            const direccionNormalizada = resultados.direccionesNormalizadas[0];
            const lat = direccionNormalizada.coordenadas?.y;
            const lng = direccionNormalizada.coordenadas?.x;

            const detallesDireccion = await obtenerDetallesDireccion(lat, lng);
            if (detallesDireccion) {
                visibilidadMapa("si", direccionNormalizada.direccion, lat, lng, detallesDireccion);
            }
        } else {
            const lista = document.createElement('ul');
            lista.className = 'resultados-lista';
            resultados.direccionesNormalizadas.forEach(direccionNormalizada => {
                const li = document.createElement('li');
                li.textContent = direccionNormalizada.direccion;
                li.addEventListener('click', () => seleccionarDireccion(direccionNormalizada));
                lista.appendChild(li);
            });
            resultadosDiv.appendChild(lista);
        }
    } else {
        resultadosDiv.textContent = 'No se encontraron direcciones normalizadas.';
        resultadosDiv.style.display = 'block';
    }
}

function seleccionarDireccion(direccionNormalizada) {
    const inputDireccion = document.getElementById('direccion');
    inputDireccion.value = direccionNormalizada.direccion; 
    mostrarResultados(); 
}

function visibilidadMapa(visibilidad_ubicacion, direccion, lat, lng, detallesDireccion) {
    let contenedorPerfil = document.querySelector('.contenedor-perfil');
    if (!contenedorPerfil) {
        contenedorPerfil = document.createElement('div');
        contenedorPerfil.className = 'contenedor-perfil';
        const infoDireccion = document.createElement('div');
        infoDireccion.className = 'info-direccion';
        contenedorPerfil.appendChild(infoDireccion);
        document.getElementById('resultados').after(contenedorPerfil);
    }

    let contenedorMapa = document.getElementById('contenedor-mapa');
    if (!contenedorMapa) {
        contenedorMapa = document.createElement('div');
        contenedorMapa.id = 'contenedor-mapa';
        contenedorPerfil.appendChild(contenedorMapa);
    }

    if (visibilidad_ubicacion === "si") {
        let parrafoDireccion = document.querySelector('.contenedor-perfil .info-direccion p');
        if (!parrafoDireccion) {
            parrafoDireccion = document.createElement('p');
            document.querySelector('.contenedor-perfil .info-direccion').appendChild(parrafoDireccion);
        }
        parrafoDireccion.textContent = direccion; 

        initMap(lat, lng); 
    }
}

async function normalizarDireccion(direccion, maxOptions = 10, geocodificar = false, srid = 4326) {
    const baseUrl = "http://servicios.usig.buenosaires.gob.ar/normalizar/";

    const params = new URLSearchParams();
    params.append("direccion", direccion);
    params.append("maxOptions", maxOptions);
    params.append("geocodificar", geocodificar.toString().toUpperCase());
    params.append("srid", srid);

    const url = `${baseUrl}?${params.toString()}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

function validarDireccion(direccion) {
    const regexDireccion = /^[^\d]+/;
    const regexAltura = /\d+/;
    const regexPartido = /.*$/;

    let errores = [];

    if (!regexDireccion.test(direccion)) {
        errores.push("Falta la calle.");
    }

    if (!regexAltura.test(direccion)) {
        errores.push("Falta la altura.");
    }

    if (!regexPartido.test(direccion)) {
        errores.push("Falta el partido.");
    }

    return errores;
}

async function obtenerDetallesDireccion(lat, lng) {
    const baseUrl = `https://servicios.usig.buenosaires.gob.ar/normalizar/?lat=${lat}&lng=${lng}`;

    try {
        const response = await fetch(baseUrl);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return null;
    }
}

function initMap(lat, lng, detallesDireccion) {
  if (!mymap) {
      mymap = L.map('contenedor-mapa').setView([lat, lng], 17);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mymap);
  } else {
      mymap.setView([lat, lng], 17);
  }

  if (marker) {
      mymap.removeLayer(marker); 
  }

  marker = L.marker([lat, lng]).addTo(mymap)

      .openPopup();

  document.getElementById('contenedor-mapa').style.display = 'block';
}

function ocultarMapa() {
    const contenedorMapa = document.getElementById('contenedor-mapa');
    const contenedorDireccion = document.querySelector('.info-direccion');
    
    if (contenedorMapa) {
        contenedorMapa.style.display = 'none';
    }
    
    if (contenedorDireccion) {
        contenedorDireccion.innerHTML = ''; 
    }

    if (marker) {
        mymap.removeLayer(marker); 
        marker = null; 
    }
}