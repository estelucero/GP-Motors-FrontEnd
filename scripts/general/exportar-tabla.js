///////// Exportar en PDF
const pdf_btn = document.getElementById('toPDF'); 
const section_control = document.getElementById('section-control');
const section_titulo = document.getElementById('titulo-controles');

const toPDF = function (section_control, section_titulo) {
  if (!section_control || !section_titulo) {
    console.error("No se encontraron todas las secciones necesarias.");
    return;
  }

  const html_code = `
    <html>
      <head>
        <link rel="stylesheet" href="../styles/supervisor/controles-supervisor.css" />
        <style>
          @media print {
            @page {
              size: 11in 17in landscape; /* Fuerza tabloide (11x17 pulgadas) en horizontal */
              margin: 0; /* Ajusta el margen según sea necesario */
            }
            html, body {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact; /* Habilita gráficos de fondo */
              print-color-adjust: exact; /* Compatibilidad con otros navegadores */
            }
            .seccion-control, .seccion-titulo {
              width: 100%; /* Asegura que las secciones ocupen todo el ancho de la página */
              height: auto;
            }
          }
        </style>
        <title>Document</title>
      </head>
      <body>
        <section class="seccion-titulo">${section_titulo.innerHTML}</section>
        <section class="seccion-control">${section_control.innerHTML}</section>
      </body>
    </html>
  `;

  const new_window = window.open('', '', 'width=900, height=500, top=0');
  new_window.document.write(html_code);
  new_window.document.close(); 

  new_window.onload = () => {
    setTimeout(() => {
      new_window.print(); 
      new_window.close(); 
    }, 500); 
  };
}

pdf_btn.onclick = () => {
  toPDF(section_control, section_titulo); 
}


/////// Exportar en CSV
const downloadCSV = function(data, fileName = '') {
  const a = document.createElement('a');
  a.download = fileName || 'archivo.csv'; // Nombre del archivo por defecto
  a.href = `data:text/csv;charset=utf-8,${encodeURIComponent(data)}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const toCSV = function(table) {
  const t_heads = table.querySelectorAll('th');
  const tbody_rows = table.querySelectorAll('tbody tr');

  const headings = [...t_heads].map(head => head.textContent.trim()).join(',') + ',image name';

  const table_data = [...tbody_rows].map(row => {
    const cells = row.querySelectorAll('td');
    const imgElement = row.querySelector('img');
    const img = imgElement ? decodeURIComponent(imgElement.src) : ''; 
    
    const data_without_img = [...cells].map(cell => cell.textContent.replace(/,/g, ".").trim()).join(',');
    return data_without_img + ',' + img;
  }).join('\n'); 

  return headings + '\n' + table_data; 
}

const csv_btn = document.getElementById('toCSV');
csv_btn.onclick = () => {
  const csv = toCSV(document.getElementById('controlTable'));
  downloadCSV(csv, 'exported_data.csv');
}


// /////// Exportar en EXCEL
// const toExcel = function(table) {
//   const t_heads = table.querySelectorAll('th');
//   const tbody_rows = table.querySelectorAll('tbody tr');

//   const headings = [...t_heads].map(head => head.textContent.trim());
//   const data = [];

//   data.push([...headings, 'image name']);

//   tbody_rows.forEach(row => {
//     const cells = row.querySelectorAll('td');
//     const imgElement = row.querySelector('img');
//     const img = imgElement ? decodeURIComponent(imgElement.src) : ''; 

//     const rowData = [...cells].map(cell => cell.textContent.trim());
//     rowData.push(img); 

//     data.push(rowData);
//   });

//   const ws = XLSX.utils.aoa_to_sheet(data);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, 'Datos');

//   XLSX.writeFile(wb, 'exported_data.xlsx');
// }

// const excel_btn = document.getElementById('toEXCEL'); 
// excel_btn.onclick = () => {
//   const section_control = document.getElementById('section-control');
//   toExcel(section_control); 
// }





const toExcel = function(table) {
  const t_heads = table.querySelectorAll('th');
  const tbody_rows = table.querySelectorAll('tbody tr');

  const headings = [...t_heads].map(head => head.textContent.trim());
  const data = [];

  data.push([...headings, 'image name']);

  tbody_rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const imgElement = row.querySelector('img');
    const img = imgElement ? decodeURIComponent(imgElement.src) : ''; 

    const rowData = [...cells].map(cell => cell.textContent.trim());
    rowData.push(img); 

    data.push(rowData);
  });

  // Crear la hoja de trabajo
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Contar el número de columnas y generar automáticamente los anchos
  const numCols = headings.length + 1; // +1 porque se añade la columna de imagen
  ws['!cols'] = Array.from({ length: numCols }, () => ({ wch: 20 })); // Ancho de 20 para cada columna

  // Crear el libro de trabajo
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Datos');

  // Guardar el archivo
  XLSX.writeFile(wb, 'exported_data.xlsx');
}

// Asignar el evento click al botón
const excel_btn = document.getElementById('toEXCEL'); 
excel_btn.onclick = () => {
  const section_control = document.getElementById('section-control'); // Asegúrate de que este ID sea correcto
  toExcel(section_control); 
};