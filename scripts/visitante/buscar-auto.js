const inputBuscar = document.querySelector(".input-busqueda");
const contenedorLista = document.querySelector(".lista-autos");

// Función para mostrar los vehículos
const mostrarVehiculos = (lista) => {
  contenedorLista.innerHTML = ""; // Limpia el contenido previo

  if (lista.length === 0) {
    contenedorLista.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  lista.forEach((vehiculo) => {
    const card = document.createElement("div");
    card.classList.add("auto-box");

    card.innerHTML = `
      <div class="auto-top"></div>
      <img src="${vehiculo.imagen}" alt="${vehiculo.marca} ${vehiculo.modelo}">
      <h2>${vehiculo.marca} ${vehiculo.modelo}</h2>
      <div class="auto-perfil">
        <a href="#" class="auto-btn">
          <p>Ver Más</p>
        </a>
      </div>
    `;
    contenedorLista.appendChild(card);
  });
};

// Muestra todos los vehículos inicialmente
mostrarVehiculos(vehiculos);

// Evento para filtrar vehículos al escribir
inputBuscar.addEventListener("input", () => {
  const query = inputBuscar.value.toLowerCase();
  const resultadosFiltrados = vehiculos.filter(
    (v) =>
      v.marca.toLowerCase().includes(query) ||
      v.modelo.toLowerCase().includes(query)
  );

  mostrarVehiculos(resultadosFiltrados);
});