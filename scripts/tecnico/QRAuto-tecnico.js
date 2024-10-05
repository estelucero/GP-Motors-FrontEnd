function onScanSuccess(qrMessage) {
    document.getElementById("result").innerHTML = qrMessage;
    html5QrcodeScanner.clear();
}

function onScanError(errorMessage) {
    
    
    console.error(`Error en el escaneo: ${errorMessage}`);
}

var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 30,
        qrbox: { width: 350, height: 350 }}
);
html5QrcodeScanner.render(onScanSuccess, onScanError);
