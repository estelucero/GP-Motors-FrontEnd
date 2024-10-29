document.addEventListener('DOMContentLoaded', () => {
  const piezaSelect = document.getElementById('estado-select');
  const noResultsMessage = document.getElementById('no-results-message');

  const filterTable = () => {
    const rows = document.querySelectorAll('#controlTable tbody tr');
    const selectedPieza = piezaSelect.options[piezaSelect.selectedIndex].text.trim().toLowerCase();
    let hasResults = false;

    rows.forEach(row => {
      const piezaNombre = row.children[1].textContent.trim().toLowerCase(); // Columna de "Nombre"

      // Compara si el nombre de la pieza en la tabla coincide con la opción seleccionada
      const match = selectedPieza === "todos" || piezaNombre === selectedPieza;

      row.style.display = match ? '' : 'none';
      if (match) hasResults = true;
    });

    noResultsMessage.style.display = hasResults ? 'none' : 'block';
  };

  // Filtra la tabla cada vez que cambia el valor del select de piezas
  piezaSelect.addEventListener('change', filterTable);
});

document.getElementById('toggleButton').addEventListener('click', function () {
  const options = document.getElementById('id_export_file-options');
  options.classList.add('active');
});
