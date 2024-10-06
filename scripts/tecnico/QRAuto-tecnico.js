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

const config = { fps: 30, qrbox: { width: 250, height: 250 } };
html5QrCode.start(
    { facingMode: "environment" }, 
    config, 
    qrCodeSuccessCallback,
    qrCodeErrorCallback
).catch(err => {
    console.error(`Error al iniciar el escaneo: ${err}`);
});




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