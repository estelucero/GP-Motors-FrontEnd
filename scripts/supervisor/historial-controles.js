document.addEventListener('DOMContentLoaded', () => {
  const inputs = {
    id: document.getElementById('filter-id'),
    tecnico: document.getElementById('filter-tecnico'),
    control: document.getElementById('control-select')
  };

  const noResultsMessage = document.getElementById('no-results-message');
  // const noControlesMessage = document.getElementById('no-controles-message');

  // Función para envolver la fecha en <strong>
  const wrapDateInStrong = () => {
    const dateCells = document.querySelectorAll('.table-body tbody tr td:nth-child(4)');
    dateCells.forEach(cell => {
      const dateText = cell.textContent.trim();
      if (dateText && !cell.querySelector('strong')) {
        cell.innerHTML = `<strong>${dateText}</strong>`;
      }
    });
  };

  const filterTable = () => {
    const selectedControl = inputs.control.value.trim().toLowerCase();
    const rows = document.querySelectorAll('.table-body tbody tr');
    let hasResults = false;

    rows.forEach(row => {
      // Asegurarse de que la fila tenga las celdas necesarias antes de acceder a ellas
      const idCell = row.children[0];
      const controlCell = row.children[1];
      const tecnicoCell = row.children[2];

      if (idCell && controlCell && tecnicoCell) {
        const id = idCell.textContent.trim().toLowerCase();
        const control = controlCell.querySelector('p').textContent.trim().toLowerCase();
        const tecnico = tecnicoCell.textContent.trim().toLowerCase();

        const filters = {
          id: inputs.id.value.trim().toLowerCase(),
          tecnico: inputs.tecnico.value.trim().toLowerCase(),
          control: selectedControl
        };

        // Comprobar si cada filtro coincide con el valor de la fila
        const match = id.includes(filters.id) &&
          control.includes(filters.control) &&
          tecnico.includes(filters.tecnico);

        // Mostrar u ocultar la fila dependiendo del resultado del filtro
        row.style.display = match ? '' : 'none';
        if (match) {
          hasResults = true;
        }
      }
    });

    // Mostrar u ocultar el mensaje de "No hay resultados"
    noResultsMessage.style.display = hasResults ? 'none' : 'block';

    // checkForNoControles();
  };

  // Lógica para mostrar el mensaje si no hay controles cargados
  // const checkForNoControles = () => {
  //   const rows = document.querySelectorAll('.table-body tbody tr');
  //   if (rows.length === 0) {
  //     noResultsMessage.style.display = 'block'; 
  //   } else {
  //     noResultsMessage.style.display = 'none'; 
  //   }
  // };
  // Ejecuta la función para verificar si hay controles cargados al cargar la página
  // checkForNoControles();

  // Aplicar el formato de fecha al cargar la página
  wrapDateInStrong();

  // Aplica los filtros cada vez que cambian los inputs
  Object.values(inputs).forEach(input => {
    input.addEventListener('input', filterTable);
    // Si es un select, también agrega el evento 'change' para actualizar al seleccionar
    if (input.tagName === 'SELECT') {
      input.addEventListener('change', filterTable);
    }
  });
});
