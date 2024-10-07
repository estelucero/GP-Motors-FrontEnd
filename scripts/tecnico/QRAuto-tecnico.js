// function onScanSuccess(qrMessage) {
//     document.getElementById('result').innerHTML = `
//         <h2>Patente Leida Con Exito!</h2>
//         <p>${qrMessage}</p>
//         `;
//         // Prints result as a link inside result element

//         html5QrcodeScanner.clear();
//         // Clears scanning instance

//         document.getElementById('reader').remove();
// }

// function onScanError(errorMessage) {


//     console.error(`Error en el escaneo: ${errorMessage}`);
// }

// var html5QrcodeScanner = new Html5QrcodeScanner(
//     "reader", { fps: 30,
//         qrbox: { width: 350, height: 350 }}
// );
// html5QrcodeScanner.render(onScanSuccess, onScanError);


////Codigo nuevo//
// const html5QrCode = new Html5Qrcode("reader");
// const qrCodeSuccessCallback = (decodedText, decodedResult) => {
//   document.getElementById('result').innerHTML = `
//         <h2>Patente Leida Con Exito!</h2>
//         <p>${decodedText}</p>
//     `;
//   // Detiene el escáner
//   html5QrCode.stop().then(() => {
//     document.getElementById('reader').remove();
//   }).catch(err => {
//     console.error('Error al detener el escáner: ', err);
//   });
// };
// const qrCodeErrorCallback = (errorMessage) => {
//   console.error(`Error en el escaneo: ${errorMessage}`);
// };

// const config = { fps: 30, qrbox: { width: 250, height: 250 } };
// html5QrCode.start(
//   { facingMode: "environment" },
//   config,
//   qrCodeSuccessCallback,
//   qrCodeErrorCallback
// ).catch(err => {
//   console.error(`Error al iniciar el escaneo: ${err}`);
// });


/////////////////////////////////////////////////////////////////////

///Elimina las linea del QRScanner
// const observer = new MutationObserver((mutations) => {
//     mutations.forEach(mutation => {
//         if (mutation.type === 'childList') {
//             const qrShadedRegion = document.getElementById('qr-shaded-region');
//             if (qrShadedRegion) {
//                 const divs = qrShadedRegion.querySelectorAll('div');
//                 divs.forEach(div => div.remove()); // Elimina los divs
//             }
//         }
//     });
// });

// Configuración del observador
// observer.observe(document.body, { childList: true, subtree: true });


///////////////////////////////////////////////////////////////////////////////////

// Función para crear y ajustar el tamaño del div #qr-shaded-region según el video
// function createAndAdjustQRShadedRegion() {
//   const reader = document.getElementById('reader');
//   const video = reader.querySelector('video'); // Obtener el video dentro de #reader

//   if (!reader || !video) return; // Si no existe el contenedor del lector QR o el video, salir

//   const qrShadedRegion = document.getElementById('qr-shaded-region');
//   const windowWidth = window.innerWidth;

//   // Solo agregar el div si el ancho es menor a 768px y el div aún no existe
//   if (windowWidth < 768 && !qrShadedRegion) {
//     // Crear el div
//     const newQRShadedRegion = document.createElement('div');
//     newQRShadedRegion.id = 'qr-shaded-region';
//     newQRShadedRegion.style.position = 'absolute';
//     newQRShadedRegion.style.borderStyle = 'solid';
//     newQRShadedRegion.style.borderColor = 'rgba(0, 0, 0, 0.48)';
//     newQRShadedRegion.style.boxSizing = 'border-box';

//     // Agregar el div dentro de #reader
//     reader.appendChild(newQRShadedRegion);
//   }

//   // Ajustar el tamaño y la posición del #qr-shaded-region para que coincida con el video
//   const shadedRegion = document.getElementById('qr-shaded-region');
//   if (shadedRegion) {
//     // Obtener las dimensiones y posición del video dentro del contenedor #reader
//     const videoRect = video.getBoundingClientRect();
//     const readerRect = reader.getBoundingClientRect();

//     // Calcular las dimensiones relativas del video en relación al contenedor
//     const width = videoRect.width;
//     const height = videoRect.height;
//     const top = videoRect.top - readerRect.top;
//     const left = videoRect.left - readerRect.left;

//     // Ajustar el tamaño y el inset del div para que coincida con el video
//     shadedRegion.style.width = `${width}px`;
//     shadedRegion.style.height = `${height}px`;
//     shadedRegion.style.inset = `${top}px auto auto ${left}px`;
//   }
// }

// // Ejecutar la función al cargar la página
// window.onload = createAndAdjustQRShadedRegion;

// // Ejecutar la función cuando se redimensione la ventana
// window.onresize = createAndAdjustQRShadedRegion;


//////////////////////////////////////////////////////////////////////

// Función para crear y ajustar el tamaño del div #qr-shaded-region según el video
function createAndAdjustQRShadedRegion() {
  const reader = document.getElementById('reader');
  const video = reader.querySelector('video'); // Obtener el video dentro de #reader

  if (!reader || !video) return; // Si no existe el contenedor del lector QR o el video, salir

  // Esperar a que el video cargue sus metadatos
  video.addEventListener('loadedmetadata', () => {
    adjustQRShadedRegion();
  });

  // Ajustar la región sombreada cuando el video ya tiene metadatos
  function adjustQRShadedRegion() {
    const qrShadedRegion = document.getElementById('qr-shaded-region');
    const windowWidth = window.innerWidth;

    if (windowWidth < 768 && !qrShadedRegion) {
      const newQRShadedRegion = document.createElement('div');
      newQRShadedRegion.id = 'qr-shaded-region';
      newQRShadedRegion.style.position = 'absolute';
      newQRShadedRegion.style.borderStyle = 'solid';
      newQRShadedRegion.style.borderColor = 'rgba(0, 0, 0, 0.48)';
      newQRShadedRegion.style.boxSizing = 'border-box';

      reader.appendChild(newQRShadedRegion);
    }

    const shadedRegion = document.getElementById('qr-shaded-region');
    if (shadedRegion) {
      const videoRect = video.getBoundingClientRect();
      const readerRect = reader.getBoundingClientRect();

      const width = videoRect.width;
      const height = videoRect.height;
      const top = videoRect.top - readerRect.top;
      const left = videoRect.left - readerRect.left;

      shadedRegion.style.width = `${width}px`;
      shadedRegion.style.height = `${height}px`;
      shadedRegion.style.inset = `${top}px auto auto ${left}px`;
    }
  }

  // Debounce para optimizar el redimensionamiento
  let resizeTimeout;
  window.onresize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(adjustQRShadedRegion, 150); // Ajusta el valor según sea necesario
  };
}

// Configuración y ejecución del escáner QR con Html5Qrcode
const html5QrCode = new Html5Qrcode("reader");
const qrCodeSuccessCallback = (decodedText, decodedResult) => {
  document.getElementById('result').innerHTML = `
        <h2>Patente Leida Con Exito!</h2>
        <p>${decodedText}</p>
    `;
  // Detiene el escáner
  html5QrCode.stop().then(() => {
    document.getElementById('reader').remove();
  }).catch(err => {
    console.error('Error al detener el escáner: ', err);
  });
};

const qrCodeErrorCallback = (errorMessage) => {
  console.error(`Error en el escaneo: ${errorMessage}`);
};

// Configuración optimizada para el escaneo
const config = { fps: 15, qrbox: { width: 250, height: 250 } };

// Iniciar el escaneo al cargar la página
window.onload = () => {
  createAndAdjustQRShadedRegion();
  html5QrCode.start(
    { facingMode: "environment" },
    config,
    qrCodeSuccessCallback,
    qrCodeErrorCallback
  ).catch(err => {
    console.error(`Error al iniciar el escaneo: ${err}`);
  });
};
