document.addEventListener('DOMContentLoaded', () => {
  const inputs = {
    id: document.getElementById('filter-id'),
    patente: document.getElementById('filter-patente'),
    tecnico: document.getElementById('filter-tecnico'),
    control: document.getElementById('control-select'),
    estado: document.getElementById('estado-select')
  };

  const noResultsMessage = document.getElementById('no-results-message');
  // const noControlesMessage = document.getElementById('no-controles-message'); 

  const updateStatusClasses = () => {
    const statusElements = document.querySelectorAll('.table-body tbody tr .status');
    statusElements.forEach(statusElement => {
      const text = statusElement.textContent.trim().toLowerCase();
      statusElement.classList.remove('pendiente', 'terminado');
      if (text === 'pendiente') {
        statusElement.classList.add('pendiente');
      } else if (text === 'terminado') {
        statusElement.classList.add('terminado');
      }
    });
  };

  const wrapDateInStrong = () => {
    const dateCells = document.querySelectorAll('.table-body tbody tr td:nth-child(6)');
    dateCells.forEach(cell => {
      const dateText = cell.textContent.trim();
      if (dateText && !cell.querySelector('strong')) {
        cell.innerHTML = `<strong>${dateText}</strong>`;
      }
    });
  };

  const filterTable = () => {
    const selectedControl = inputs.control.value.trim().toLowerCase();
    const selectedEstado = inputs.estado.value.trim().toLowerCase();
    const rows = document.querySelectorAll('.table-body tbody tr');
    let hasResults = false;

    rows.forEach(row => {
      const id = row.children[0].textContent.trim().toLowerCase();
      const control = row.children[1].querySelector('p').textContent.trim().toLowerCase();
      const patente = row.children[2].textContent.trim().toLowerCase();
      const tecnico = row.children[3].textContent.trim().toLowerCase();
      const estado = row.children[4].textContent.trim().toLowerCase();

      const filters = {
        id: inputs.id.value.trim().toLowerCase(),
        patente: inputs.patente.value.trim().toLowerCase(),
        tecnico: inputs.tecnico.value.trim().toLowerCase(),
        control: selectedControl,
        estado: selectedEstado
      };

      const match = (!filters.id || id.includes(filters.id)) &&
        (!filters.control || control.includes(filters.control)) &&
        (!filters.patente || patente.includes(filters.patente)) &&
        (!filters.tecnico || tecnico.includes(filters.tecnico)) &&
        (!filters.estado || estado.includes(filters.estado));

      row.style.display = match ? '' : 'none';
      if (match) {
        hasResults = true;
      }
    });

    noResultsMessage.style.display = hasResults ? 'none' : 'block';

    // checkForNoControles();
  };

  // // Lógica para mostrar el mensaje si no hay controles cargados
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

  // Actualiza las clases de estado y envuelve las fechas en <strong> al cargar la página
  updateStatusClasses();
  wrapDateInStrong();

  // Aplica los filtros cada vez que cambian los inputs
  Object.values(inputs).forEach(input => {
    input.addEventListener('input', filterTable);
    if (input.tagName === 'SELECT') {
      input.addEventListener('change', filterTable);
    }
  });
});