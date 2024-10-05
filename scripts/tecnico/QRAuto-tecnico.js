function onScanSuccess(qrMessage) {
    document.getElementById("qr-result").innerHTML = qrMessage;
    html5QrcodeScanner.clear();
}

function onScanError(errorMessage) {
    
    
    console.error(`Error en el escaneo: ${errorMessage}`);
}

var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: 250}
);
html5QrcodeScanner.render(onScanSuccess, onScanError);
