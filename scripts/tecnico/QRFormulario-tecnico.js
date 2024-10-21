var vehiculosData = JSON.parse(localStorage.getItem("vehiculoControlar"));
var respuestosData = JSON.parse(localStorage.getItem("respuestosRegistrados"));
console.log(vehiculosData[0].patente);
console.log(respuestosData);

//Guardar pieza en localStorage//
function guardarProducto(piezaEncontrada) {
  let piezasUtilizadas = JSON.parse(localStorage.getItem('piezasUtilizadas')) || [];

  // Agregar el nuevo producto al array
  piezasUtilizadas.push(piezaEncontrada);

  // Guardar el array actualizado en el localStorage
  localStorage.setItem('piezasUtilizadas', JSON.stringify(piezasUtilizadas));
}

////Codigo nuevo//
const html5QrCode = new Html5Qrcode("reader");
const qrCodeSuccessCallback = (decodedText, decodedResult) => {
  let piezasUtilizadas = JSON.parse(localStorage.getItem('piezasUtilizadas')) || [];
  const piezaNoRepetida = piezasUtilizadas.find(pieza => pieza.id_pieza === parseInt(decodedText, 10));
  const piezaEncontrada = respuestosData.find(pieza => pieza.id_pieza === parseInt(decodedText, 10));

  if (piezaEncontrada && piezaEncontrada.stock_actual > 0 && !piezaNoRepetida) {
    document.getElementById('result').innerHTML = `
        <h2>Producto Leído Con Éxito!</h2>
        <p>${piezaEncontrada.nombre}</p>
    `;
    // Detiene el escáner
    html5QrCode.stop().then(() => {
      document.getElementById('reader').remove();
    }).catch(err => {
      console.error('Error al detener el escáner: ', err);
    });
    guardarProducto(piezaEncontrada);
    setTimeout(function () {
      window.location.href = "./formulario-control.html"; // Refresca la página
    }, 1500);
  } else if (piezaEncontrada.stock_actual === 0) {
    document.getElementById('result').innerHTML = `
    <h2>Producto Sin Stock</h2>`;
    console.log(decodedText)
    // Detiene el escáner
    html5QrCode.stop().then(() => {
      document.getElementById('reader').remove();
    }).catch(err => {
      console.error('Error al detener el escáner: ', err);
    });
    setTimeout(function () {
      window.location.href = "./formulario-control.html";
    }, 1500);
  } else if (piezaNoRepetida) {
    document.getElementById('result').innerHTML = `
    <h2>Producto Ya Agregado</h2>`;
    console.log(decodedText)
    // Detiene el escáner
    html5QrCode.stop().then(() => {
      document.getElementById('reader').remove();
    }).catch(err => {
      console.error('Error al detener el escáner: ', err);
    });
    setTimeout(function () {
      window.location.href = "./formulario-control.html";
    }, 1500);
  } else {
    document.getElementById('result').innerHTML = `
        <h2>Producto Erroneo</h2>`;
    console.log(decodedText)
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
