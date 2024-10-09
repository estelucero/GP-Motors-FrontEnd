var control = JSON.parse(localStorage.getItem("controlGuardado"));
var vehiculosData = JSON.parse(localStorage.getItem("vehiculoControlar"));
console.log(control);
console.log(vehiculosData)
//Post de la reparacion//
document.getElementById('guardar-btn').addEventListener('click', function () {
    const patente = control.patente;  // Debes obtener este valor de algún campo en tu formulario
    const idTecnico = 2;  // Valor por defecto o seleccionado en el formulario
    const descripcion = document.getElementById('observaciones').value;
    const fechaRealizacion = new Date().toISOString().split('T')[0];  // Fecha actual
    const piezas = {
        "1": 3

    }
    const concesionario = 1;  // Concesionario ID fijo o seleccionado
    const idcontrol = control.id_control
    const data = {
        "patente_vehiculo": patente,
        "piezas": piezas,
        "id_tecnico": idTecnico,
        "observaciones": descripcion,

        "concesionario": concesionario,
        "fecha_control": fechaRealizacion,
        "id_control_pendiente": idcontrol

    };
    console.log(data)

    fetch("https://aaaaa-deploy-back.vercel.app/users/registrarControl", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Control guardado exitosamente.');
            eliminarcControl();
            window.location.href = "./auto-tecnico.html";
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Hubo un error al guardar el control.');
        });
});

//Eliminar control de localStorage//
function eliminarcControl() {
    vehiculosData[1] = vehiculosData[1].filter(item => item.id_control !== control.id_control)
    localStorage.setItem('vehiculoControlar', JSON.stringify(vehiculosData));
}