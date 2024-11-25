document.addEventListener('DOMContentLoaded', () => {
  const inputs = {
    nombre: document.getElementById('filter-nombre'),
    apellido: document.getElementById('filter-apellido'),
    rol: document.getElementById('estado-select')
  };

  const noResultsMessage = document.getElementById('no-results-message');

  const filterTable = () => {
    const rows = document.querySelectorAll('.table-body tbody tr');
    let hasResults = false;

    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      const nombre = cells[0]?.textContent.trim().toLowerCase() || "";
      const apellido = cells[1]?.textContent.trim().toLowerCase() || "";
      const rol = cells[3]?.textContent.trim().toLowerCase() || "";

      const filters = {
        nombre: inputs.nombre.value.trim().toLowerCase(),
        apellido: inputs.apellido.value.trim().toLowerCase(),
        rol: inputs.rol.value.trim().toLowerCase()
      };

      const match =
        (!filters.nombre || nombre.includes(filters.nombre)) &&
        (!filters.apellido || apellido.includes(filters.apellido)) &&
        (!filters.rol || rol === filters.rol);

      row.style.display = match ? '' : 'none';
      if (match) {
        hasResults = true;
      }
    });

    noResultsMessage.style.display = hasResults ? 'none' : 'block';
  };

  // Aplica los filtros cada vez que cambian los inputs
  Object.values(inputs).forEach(input => {
    input.addEventListener('input', filterTable);
  });
});

document.getElementById('toggleButton').addEventListener('click', function () {
  const options = document.getElementById('id_export_file-options');
  options.classList.add('active');
});
