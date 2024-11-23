var control = JSON.parse(localStorage.getItem("controlGuardado"));
var vehiculosData = JSON.parse(localStorage.getItem("vehiculoControlar"));

//Eliminar control de localStorage//
function eliminarcControl() {
  vehiculosData[1] = vehiculosData[1].filter(item => item.id_control !== control.id_control)
  localStorage.setItem('vehiculoControlar', JSON.stringify(vehiculosData));
}
///
document.getElementById('inicio-viaje').addEventListener('click', function () {
  document.getElementById('inicio-viaje').disabled = true;

  fetch(`https://aaaaa-deploy-back.vercel.app/users/iniciarViajeVTV?patente=${control.patente}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      //alert('Viaje iniciado exitosamente.');


      document.getElementById('observaciones-vtv').style.display = 'flex';
      document.getElementById('comentario').style.display = 'block';
      document.getElementById('botones-audio-vtv').style.display = 'block';
      document.getElementById('botones-finalizar').style.display = 'block';
    })
    .catch((error) => {
      console.error('Error:', error);

      Swal.fire({
        icon: "error",
        title: "Hubo un error al inciar el viaje.",

      });
    });

});

// document.getElementById('detener-viaje').addEventListener('click', function () {
//   document.getElementById('inicio-viaje').disabled = true;
//   document.getElementById('detener-viaje').disabled = true;
//   document.getElementById('comentario').style.display = 'block';  // Mostrar el textarea
//   document.getElementById('botones-finalizar').style.display = 'block';  // Mostrar botones de control

//   fetch(`https://aaaaa-deploy-back.vercel.app/users/iniciarViajeVTV?patente${control.patente}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },

//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log('Success:', data);
//       alert('Viaje iniciado exitosamente.');


//     })
//     .catch((error) => {
//       console.error('Error:', error);
//       alert('Hubo un error al inciar el viaje.');
//     });
// });

document.getElementById('guardar-control').addEventListener('click', function () {

  //alert('Control guardado');
  document.getElementById('botones-finalizar').style.display = 'none'; // Ocultar botones de finalizar
  document.getElementById('observaciones-vtv').style.display = 'none';
  document.getElementById('comentario').style.display = 'none'; // Ocultar textarea
  document.getElementById('botones-audio-vtv').style.display = 'none';
  document.getElementById('inicio-viaje').disabled = false; // Habilitar el botón de inicio
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  const data = {
    "patente_vehiculo": control.patente,
    "resultado_vtv": true,
    "id_tecnico": usuario[5]
  };
  console.log(data)

  fetch("https://aaaaa-deploy-back.vercel.app/users/finalizarViajeVTV", {
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
      eliminarcControl();
      //alert('Control guardado exitosamente.');

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

document.getElementById('cancelar-control').addEventListener('click', function () {
  // Lógica para cancelar el control
  document.getElementById('botones-finalizar').style.display = 'none'; // Ocultar botones de finalizar
  document.getElementById('observaciones-vtv').style.display = 'none';
  document.getElementById('comentario').style.display = 'none'; // Ocultar textarea
  document.getElementById('botones-audio-vtv').style.display = 'none';
  document.getElementById('inicio-viaje').disabled = false; // Habilitar el botón de inicio
  let usuario = JSON.parse(localStorage.getItem("usuario"));
  const data = {
    "patente_vehiculo": control.patente,
    "resultado_vtv": false,
    "id_tecnico": usuario[5]
  };
  console.log(data)

  fetch("https://aaaaa-deploy-back.vercel.app/users/finalizarViajeVTV", {
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
      //alert('Control Cancelado exitosamente.');
      //eliminarcControl();

      Swal.fire({
        icon: "success",
        title: "Control Cancelado exitosamente."

      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "./auto-tecnico.html";
        }
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      //alert('Hubo un error al cancelar el control.');
      Swal.fire({
        icon: "error",
        title: "Hubo un error al cancelar el control.",

      }).then((result) => {
        if (result.isConfirmed) {
          location.reload(true);
        }
      });
    });



});

ocultarPreloader();