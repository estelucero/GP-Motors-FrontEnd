var control = JSON.parse(localStorage.getItem("controlGuardado"));
var vehiculosData = JSON.parse(localStorage.getItem("vehiculoControlar"));
var tecnico = JSON.parse(localStorage.getItem("usuario"));
console.log(control);
console.log(vehiculosData)
//Obtener la cantidad de piezas que se utilizaron//
function obtenerPiezas() {
  const piezas = {};
  const piezasUsadas = JSON.parse(localStorage.getItem("piezasUtilizadas")) || [];
  // Usar un bucle for normal para recorrer el array de piezas
  for (let i = 0; i < piezasUsadas.length; i++) {
    const pieza = piezasUsadas[i];
    const cantidadLabel = document.getElementById(`cantidad-label-${i}`);
    const cantidad = parseInt(cantidadLabel.textContent, 10);

    // Solo añadir al objeto si la cantidad es mayor que 0
    if (cantidad > 0) {
      let id = pieza.id_pieza + '';

      piezas[id] = cantidad; // Usar id_pieza como clave
    }
  }
  console.log(piezas)
  return piezas;
}

//Post de la reparacion//
document.getElementById('guardar-btn').addEventListener('click', function () {
  const patente = control.patente;  // Debes obtener este valor de algún campo en tu formulario
  const idTecnico = tecnico[0];  // Valor por defecto o seleccionado en el formulario
  const descripcion = document.getElementById('observaciones').value;
  const fechaRealizacion = new Date().toISOString().split('T')[0];  // Fecha actual
  const piezas = obtenerPiezas();
  const concesionario = tecnico[5];  // Concesionario ID fijo o seleccionado
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
      //alert('Control guardado exitosamente.');
      eliminarcControl();
      Swal.fire({
        icon: "success",
        title: "Control guardado exitosamente."

      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "./auto-tecnico.html";
        }
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      //alert('Hubo un error al guardar el control.');
      Swal.fire({
        icon: "error",
        title: "Hubo un error al guardar el control.",

      }).then((result) => {
        if (result.isConfirmed) {
          location.reload(true);
        }
      });
    });
});

//Eliminar control de localStorage//
function eliminarcControl() {
  vehiculosData[1] = vehiculosData[1].filter(item => item.id_control !== control.id_control)
  localStorage.setItem('vehiculoControlar', JSON.stringify(vehiculosData));
}

function mostrarPiezas() {
  const piezas = JSON.parse(localStorage.getItem("piezasUtilizadas")) || [];
  const listaRepuestos = document.getElementById("lista-repuestos");
  listaRepuestos.innerHTML = "";

  piezas.forEach((pieza, index) => {
    const repuestoDiv = document.createElement("div");
    repuestoDiv.classList.add("repuesto-control");
    repuestoDiv.dataset.index = index;

    const label = document.createElement("label");
    label.setAttribute("for", "nombre-repuesto");
    label.textContent = pieza.nombre;

    const contenedorBotones = document.createElement("div");

    const botonMenos = document.createElement("button");
    botonMenos.id = `decrementar-${index}`;
    botonMenos.classList.add("boton-cant-repuesto");
    botonMenos.innerHTML = "<i class='bx bx-minus'></i>";

    const labelCantidad = document.createElement("label");
    labelCantidad.id = `cantidad-label-${index}`;
    labelCantidad.classList.add("cant-repuesto");
    labelCantidad.setAttribute("for", "cantidad");
    labelCantidad.textContent = "1";

    const botonMas = document.createElement("button");
    botonMas.id = `incrementar-${index}`;
    botonMas.classList.add("boton-cant-repuesto");
    botonMas.innerHTML = "<i class='bx bx-plus'></i>";

    contenedorBotones.appendChild(botonMenos);
    contenedorBotones.appendChild(labelCantidad);
    contenedorBotones.appendChild(botonMas);

    repuestoDiv.appendChild(label);
    repuestoDiv.appendChild(contenedorBotones);
    listaRepuestos.appendChild(repuestoDiv);

    // Lógica para el botón de aumentar
    botonMas.addEventListener("click", () => {
      let cantidad = parseInt(labelCantidad.textContent, 10);
      if (cantidad < pieza.stock_actual) {
        cantidad++;
        labelCantidad.textContent = cantidad;
        actualizarBotonMenos(cantidad, botonMenos);
      }
    });

    // Lógica para el botón de disminuir/eliminar
    botonMenos.addEventListener("click", () => {
      let cantidad = parseInt(labelCantidad.textContent, 10);
      if (cantidad > 1) {
        cantidad--;
        labelCantidad.textContent = cantidad;
        actualizarBotonMenos(cantidad, botonMenos);
      } else {
        piezas.splice(index, 1);
        localStorage.setItem("piezasUtilizadas", JSON.stringify(piezas));
        repuestoDiv.remove();
        if (piezas.length === 0) {
          listaRepuestos.style.border = "none";
        }
      }
    });

    actualizarBotonMenos(1, botonMenos);
  });

  if (piezas.length > 0) {
    listaRepuestos.style.border = "1px solid black";
  } else {
    listaRepuestos.style.border = "none";
  }
}

function actualizarBotonMenos(cantidad, botonMenos) {
  if (cantidad === 1) {
    botonMenos.innerHTML = "<i class='bx bxs-trash'></i>";
  } else {
    botonMenos.innerHTML = "<i class='bx bx-minus'></i>";
  }
}

mostrarPiezas();



ocultarPreloader();