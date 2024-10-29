var vehiculosData = JSON.parse(localStorage.getItem("vehiculoControlar"));
console.log(vehiculosData[0].patente);

////Codigo nuevo//
const html5QrCode = new Html5Qrcode("reader");
const qrCodeSuccessCallback = (decodedText, decodedResult) => {
  if (decodedText.toUpperCase() === vehiculosData[0].patente.toUpperCase()) {
    // Detiene el escáner
    html5QrCode.stop().then(() => {
      document.getElementById('reader').remove();
    }).catch(err => {
      console.error('Error al detener el escáner: ', err);
    });
    //LLeno el html
    document.getElementById('result').innerHTML = `
        <h2>Patente Leida Con Exito!</h2>
        <p>${decodedText}</p>
    `;

    setTimeout(function () {
      window.location.href = "./auto-tecnico.html"; // Refresca la página
    }, 1500);
  } else {
    document.getElementById('result').innerHTML = `
        <h2>Patente Erronea</h2>
        <p>Aparace: ${decodedText} y No ${vehiculosData[0].patente}</p>`;
    // Detiene el escáner
    html5QrCode.stop().then(() => {
      document.getElementById('reader').remove();
    }).catch(err => {
      console.error('Error al detener el escáner: ', err);
    });
    setTimeout(function () {
      location.reload(); // Refresca la página
    }, 1500);

  }
};
const qrCodeErrorCallback = (errorMessage) => {
  console.error(`Error en el escaneo: ${errorMessage}`);
};

const config = { fps: 30, qrbox: { width: 250, height: 250 } };
html5QrCode.start(
  { facingMode: "environment" },
  config,
  qrCodeSuccessCallback,
  qrCodeErrorCallback
).catch(err => {
  console.error(`Error al iniciar el escaneo: ${err}`);
});


//////////////////////////////////////////////////////////////////////////////////

// Función para llamar a Confirmar Pedido

function cargarPedido() {
  // Contenedor principal donde se insertará el pedido
  const contenedor = document.getElementById("cargar-pedido");

  // Contenido HTML de la tarjeta de pedido
  const contenido = `
    <div class="pedido-card">
      <h2>Confirmar Pedido</h2>
      <p class="descripcion">Por favor, revisa los datos antes de confirmar el pedido.</p>

      <div class="datos-pedido">
        <p><strong>Datos del Pedido:</strong></p>
        <ul>
          <li>ID Proveedor: <p>1</p></li>
          <li>Pieza: <p>1</p></li>
          <li>Nombre Proveedor: <p>Anacleto</p></li>
          <li>Cantidad: <p>20</p></li>
        </ul>
      </div>

      <div class="pedido-actions">
        <button id="btn-confirmar-pedido" class="btn-confirmar">Confirmar</button>
        <button id="btn-cancelar-pedido" class="btn-cancelar">Cancelar</button>
      </div>
    </div>
  `;

  // Insertar el contenido HTML en el contenedor
  contenedor.innerHTML = contenido;
}

///////////////////////////////////////////////////////////////////////////////////

// Función para crear y ajustar el tamaño del div #qr-shaded-region según el video
function createAndAdjustQRShadedRegion() {
  const reader = document.getElementById('reader');
  const video = reader.querySelector('video'); // Obtener el video dentro de #reader

  if (!reader || !video) return; // Si no existe el contenedor del lector QR o el video, salir

  const qrShadedRegion = document.getElementById('qr-shaded-region');
  const windowWidth = window.innerWidth;

  // Solo agregar el div si el ancho es menor a 768px y el div aún no existe
  if (windowWidth < 768 && !qrShadedRegion) {
    // Crear el div
    const newQRShadedRegion = document.createElement('div');
    newQRShadedRegion.id = 'qr-shaded-region';
    newQRShadedRegion.style.position = 'absolute';
    newQRShadedRegion.style.borderStyle = 'solid';
    newQRShadedRegion.style.borderColor = 'rgba(0, 0, 0, 0.48)';
    newQRShadedRegion.style.boxSizing = 'border-box';

    // Agregar el div dentro de #reader
    reader.appendChild(newQRShadedRegion);
  }

  // Ajustar el tamaño y la posición del #qr-shaded-region para que coincida con el video
  const shadedRegion = document.getElementById('qr-shaded-region');
  if (shadedRegion) {
    // Obtener las dimensiones y posición del video dentro del contenedor #reader
    const videoRect = video.getBoundingClientRect();
    const readerRect = reader.getBoundingClientRect();

    // Calcular las dimensiones relativas del video en relación al contenedor
    const width = videoRect.width;
    const height = videoRect.height;
    const top = videoRect.top - readerRect.top;
    const left = videoRect.left - readerRect.left;

    // Ajustar el tamaño y el inset del div para que coincida con el video
    shadedRegion.style.width = `${width}px`;
    shadedRegion.style.height = `${height}px`;
    shadedRegion.style.inset = `${top}px auto auto ${left}px`;
  }
}

// Ejecutar la función al cargar la página
window.onload = createAndAdjustQRShadedRegion;

// Ejecutar la función cuando se redimensione la ventana
window.onresize = createAndAdjustQRShadedRegion;
ocultarPreloader();
