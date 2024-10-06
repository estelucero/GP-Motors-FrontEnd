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

function onScanSuccess(qrMessage) {
    document.getElementById('result').innerHTML = `
        <h2>Patente Leida Con Exito!</h2>
        <p>${qrMessage}</p>
    `;
    
    // Clears scanning instance
    html5QrcodeScanner.clear();
    document.getElementById('reader').remove();
}

function onScanError(errorMessage) {
    console.error(`Error en el escaneo: ${errorMessage}`);
}

Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
        // Busca la cámara trasera
        const rearCamera = devices.find(device => device.label.toLowerCase().includes('back'));
        
        // Si se encuentra la cámara trasera, usa su ID, si no, toma la primera cámara disponible
        const cameraId = rearCamera ? rearCamera.id : devices[0].id;

        // Crear instancia del escáner con la cámara seleccionada
        var html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", { fps: 30, qrbox: { width: 350, height: 350 } }
        );
        
        // Renderizar el escaneo utilizando la cámara seleccionada
        html5QrcodeScanner.render(onScanSuccess, onScanError, cameraId);
    } else {
        console.error("No se encontraron cámaras en el dispositivo.");
    }
}).catch(err => {
    console.error("Error al obtener las cámaras: ", err);
});
