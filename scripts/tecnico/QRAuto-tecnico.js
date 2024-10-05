function onScanSuccess(qrMessage) {
    document.getElementById('result').innerHTML = `
        <h2>Success!</h2>
        <p><a href="${result}">${result}</a></p>
        `;
        // Prints result as a link inside result element

        html5QrcodeScanner.clear();
        // Clears scanning instance

        document.getElementById('reader').remove();
}

function onScanError(errorMessage) {
    
    
    console.error(`Error en el escaneo: ${errorMessage}`);
}

var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 30,
        qrbox: { width: 350, height: 350 }}
);
html5QrcodeScanner.render(onScanSuccess, onScanError);
