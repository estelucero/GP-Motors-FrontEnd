document.addEventListener('DOMContentLoaded', () => {
  const inputs = {
    nombre: document.getElementById('filter-nombre-finalizado'),
    repuesto: document.getElementById('filter-repuesto-finalizado')
  };

  const noResultsMessage = document.getElementById('no-results-message-finalizado');

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
    const rows = document.querySelectorAll('.table-body tbody tr');
    let hasResults = false;

    rows.forEach(row => {

      const nombre = row.children[1].textContent.trim().toLowerCase();
      const repuesto = row.children[3].textContent.trim().toLowerCase();

      const filters = {
        nombre: inputs.nombre.value.trim().toLowerCase(),
        repuesto: inputs.repuesto.value.trim().toLowerCase()
      };

      const match = (!filters.nombre || nombre.includes(filters.nombre)) &&
        (!filters.repuesto || repuesto.includes(filters.repuesto));

      row.style.display = match ? '' : 'none';
      if (match) {
        hasResults = true;
      }
    });

    noResultsMessage.style.display = hasResults ? 'none' : 'block';
  };

  wrapDateInStrong();

  // Aplica los filtros cada vez que cambian los inputs
  Object.values(inputs).forEach(input => {
    input.addEventListener('input', filterTable);
  });
});

document.getElementById('toggleButtonFinalizado').addEventListener('click', function () {
  const options = document.getElementById('id_export_file-options_finalizado');
  options.classList.add('active');
});
