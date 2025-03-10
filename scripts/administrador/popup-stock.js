function abrirPopup(datosVehiculo = {}) {
  const noEdicion = true;
  document.querySelector(".popup").classList.add("active");
  document.querySelector(".popup-container").classList.add("active");

  const popupTitulo = document.querySelector(".popup h2");
  const stockMinimoInput = document.querySelector("#stock_minimo");
  const stockMaximoInput = document.querySelector("#stock_maximo");
  const stockPrecioInput = document.querySelector("#stock_precio");
  const formElement = document.querySelector(".form-element");
  const patenteLabel = document.querySelector("label[for='patente']");
  const guardarBtnModificar = document.querySelector("#guardar-btn2");
  const cancelarBtn = document.querySelector("#cancelar-btn");


  // Ocultar el botón de modificar al abrir el popup
  guardarBtnModificar.style.display = "none";

  // Crear el botón "Modificar" si no existe
  let modificarBtn = document.querySelector("#modificar-btn");
  if (!modificarBtn) {
    modificarBtn = document.createElement("button");
    modificarBtn.textContent = "Modificar";
    modificarBtn.id = "modificar-btn";
    modificarBtn.classList.add("btn-form");
    modificarBtn.style.backgroundColor = "blue";
    // Insertar el botón "Modificar" justo antes del botón "Guardar"
    guardarBtnModificar.parentNode.insertBefore(modificarBtn, guardarBtnModificar);

    // Evento para habilitar los campos (excepto el de la patente)
    modificarBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Prevenir comportamiento por defecto

      // Habilitar los campos de edición excepto el de la patente
      stockPrecioInput.removeAttribute("disabled");
      stockMaximoInput.removeAttribute("disabled");
      stockMinimoInput.removeAttribute("disabled");

      modificarBtn.style.display = "none"; // Ocultar el botón "Modificar"

      // Mostrar el botón de modificar
      guardarBtnModificar.style.display = "block";

    });
  } else {
    modificarBtn.style.display = "block"; // Asegurarse de que el botón esté visible
  }
  popupTitulo.textContent = "Modificar Stock";

  // Completar los campos con los datos del vehículo
  stockPrecioInput.value = datosVehiculo.stockPrecio || '';
  stockMaximoInput.value = datosVehiculo.stockMaximo || '';
  stockMinimoInput.value = datosVehiculo.stockMinimo;

  // Deshabilitar todos los campos para evitar modificaciones antes de presionar "Modificar"
  stockPrecioInput.setAttribute("disabled", true);
  stockMaximoInput.setAttribute("disabled", true);
  stockMinimoInput.setAttribute("disabled", true);
}

// Función para cerrar el popup
function cerrarPopup() {
  document.querySelector(".popup").classList.remove("active");
  document.querySelector(".popup-container").classList.remove("active");
}

// Asignar el evento de cerrar al botón "Cancelar"
document.querySelector("#cancelar-btn").addEventListener("click", cerrarPopup);

// También asignamos el evento al botón de cerrar (si existe)
document.querySelector(".popup .close-btn").addEventListener("click", cerrarPopup);

// Agregar evento a los botones de edición
// document.querySelectorAll(".box-img a").forEach(function (editarBtn) {
//   editarBtn.addEventListener("click", function (e) {
//     const autoGuardado = JSON.parse(localStorage.getItem("vehiculoEditar"));
//     e.preventDefault(); // Evitar el comportamiento por defecto del ancla

//     // Obtener los datos del vehículo
//     // const datosVehiculo = {
//     //   patente: this.closest(".single-box").querySelector(".patente-p").textContent.trim(),
//     //   marca: this.closest(".single-box").querySelectorAll(".text-flex p")[1].textContent.trim(),
//     //   modelo: this.closest(".single-box").querySelectorAll(".text-flex p")[3].textContent.trim(),
//     //   fechaFabricacion: this.closest(".single-box").querySelectorAll(".text-flex p")[5].textContent.trim(),
//     //   cantKm: autoGuardado.km // Ejemplo: puedes agregar este dato en tu HTML si lo tienes
//     // };

//     abrirPopup(true); // true indica que es una edición
//   });
// });

function listenerEdicion() {
  document.querySelectorAll(".box-img a").forEach(function (editarBtn) {
    editarBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Evitar el comportamiento por defecto del ancla

      // Obtener la fila correspondiente al botón editar
      const fila = this.closest("tr");

      // Obtener los datos del vehículo desde las celdas
      const datosProveedor = {
        stockMinimo: fila.querySelector("td:nth-child(5) p").textContent.trim(),
        stockMaximo: fila.querySelector("td:nth-child(6) p").textContent.trim(),
        stockPrecio: fila.querySelector("td:nth-child(7) p").textContent.trim()
      };

      abrirPopup(datosProveedor); // true indica que es una edición
    });
  });
}



//Guardar pieza que clickea
function guardarEdicionStock() {
  const botonesEditar = document.querySelectorAll(".editar");
  const stockGuardados = JSON.parse(
    localStorage.getItem("stock")
  );

  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", function (event) {
      // Evitar que el enlace redirija inmediatamente
      event.preventDefault();

      const stockBox = this.closest(".fila");

      const stockBuscado = stockBox.querySelector(".id-p").textContent;
      const stockEncontrado = stockGuardados.find(
        (stock) => stock.id_pieza === parseInt(stockBuscado, 10)
      );
      console.log(stockEncontrado);



      localStorage.setItem("stockEditar", JSON.stringify(stockEncontrado));

    });
  });
}
// guardarEdicionProveedor();

////////////// Verifico para las clases validas////////////
function verificarClasesValidasFormulario() {

  const inputs = [
    document.getElementById('stockPrecio'),
    document.getElementById('stockMaximo'),
    document.getElementById('stockMinimo'),

  ];


  // for (let input of inputs) {
  //   if (input.classList.contains('is-invalid')) {
  //     return false;
  //   }
  // }

  return true;
}

//////////////Modificar Stock/////////////
document
  .getElementById("guardar-btn2")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let pieza = JSON.parse(localStorage.getItem("stockEditar"));
    if (verificarClasesValidasFormulario()) {

      const stockPrecio = document.getElementById("stock_precio").value.replace("$", "");
      const stockMaximo = document.getElementById("stock_maximo").value;
      const stockMinimo = document.getElementById("stock_minimo").value;



      if (!stockPrecio || !stockMaximo || !stockMinimo) {
        alert("Por favor, completa todos los campos.");
        return;
      }



      const datos = {
        id_pieza: parseInt(pieza.id_pieza, 10),
        precio_unitario: parseFloat(stockPrecio, 10),
        stock_max: parseInt(stockMaximo, 10),
        stock_min: parseInt(stockMinimo, 10)


      };
      console.log(datos);

      orquestaFormulario(datos);

    } else {
      alert("Completar los campos con datos validos");
    }
  });

async function modificarPrecio(datos) {

  await fetch(`https://aaaaa-deploy-back.vercel.app/users/actualizarPiezaStockOPrecioPorID?idpieza=${datos.id_pieza}&nvo_stock_act=${-1}&nvo_precio=${datos.precio_unitario}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    }


  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      //alert("Precio guardado con éxito");


      // Aquí puedes hacer alguna acción tras el éxito, como redirigir o limpiar el formulario
    })
    .catch((error) => {
      console.error("Error:", error);
      // alert("Hubo un problema al guardar el precio.");

    });

}

// async function modificarUmbral(datos) {
//   await fetch(`https://aaaaa-deploy-back.vercel.app/users/actualizarUmbralesPiezaPorID?idPieza=${datos.id_pieza}&nvoStockMax=${datos.stock_max}&nvoStockMin=${datos.stock_min}`, {
//     method: "PATCH",

//     headers: {
//       "Content-Type": "application/json",
//     }


//   })
//     .then((response) => {
//       if (!response.ok) {
//         response.json().then(error => {
//           throw new Error(error.detail[0]); // Extrae el mensaje detallado del error
//         });

//       }
//       return response.json();
//     })
//     .then((data) => {
//       alert("Umbral guardado con éxito");


//       // Aquí puedes hacer alguna acción tras el éxito, como redirigir o limpiar el formulario
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert(error);
//     });
// }

async function modificarUmbral(datos) {
  try {
    const response = await fetch(`https://aaaaa-deploy-back.vercel.app/users/actualizarUmbralesPiezaPorID?idPieza=${datos.id_pieza}&nvoStockMax=${datos.stock_max}&nvoStockMin=${datos.stock_min}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const result = await response.json(); // Lee el cuerpo de la respuesta una sola vez

    if (!response.ok) {
      throw new Error(result.detail[0]); // Extrae el mensaje detallado del error si la respuesta no es OK
    }

    //alert("Umbral guardado con éxito");



    // Aquí puedes hacer alguna acción tras el éxito, como redirigir o limpiar el formulario
  } catch (error) {
    console.error("Error:", error);
    //alert(error.message); // Muestra el mensaje de error

  }
}


async function orquestaFormulario(datos) {

  try {
    await modificarUmbral(datos);
    await modificarPrecio(datos);
    Swal.fire({
      icon: "success",
      title: "Perfecto..",
      text: "Cambios guardados con éxito.",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload(); // Recarga la página al confirmar
      }
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Hubo un problema al guardar.`,
    });
  }
  // await modificarUmbral(datos);
  // await modificarPrecio(datos);
  //location.reload(true);
}