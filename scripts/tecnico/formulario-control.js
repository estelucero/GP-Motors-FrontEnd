var control = JSON.parse(localStorage.getItem("controlGuardado"));


//Post de la reparacion//
document.getElementById('guardar-btn').addEventListener('click', function () {
    const patente = control.patente;  // Debes obtener este valor de algún campo en tu formulario
    const idTecnico = 1;  // Valor por defecto o seleccionado en el formulario
    const descripcion = document.getElementById('observaciones').value;
    const fechaRealizacion = new Date().toISOString().split('T')[0];  // Fecha actual
    const idPiezaUtilizada = 1;  // Ejemplo, podrías obtener esto de algún selector
    const concesionario = 1;  // Concesionario ID fijo o seleccionado
    const cantidad = parseInt(document.querySelector('.cant-repuesto').textContent, 10);  // Extraer la cantidad del repuesto

    const data = {
        "patente_vehiculo": patente,
        "id_tecnico": idTecnico,
        "descripcion": descripcion,
        "fecha_realizacion": fechaRealizacion,
        "id_pieza_utilizada": idPiezaUtilizada,
        "concesionario": concesionario,
        "cantidad": cantidad
    };

    fetch("https://aaaaa-deploy-back.vercel.app/users/registrarReparacion", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Control guardado exitosamente.');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Hubo un error al guardar el control.');
        });
});