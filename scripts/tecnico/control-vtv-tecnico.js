document.getElementById('inicio-viaje').addEventListener('click', function () {
  document.getElementById('inicio-viaje').disabled = true;
  document.getElementById('detener-viaje').disabled = false;
});

document.getElementById('detener-viaje').addEventListener('click', function () {
  document.getElementById('inicio-viaje').disabled = true;
  document.getElementById('detener-viaje').disabled = true;
  document.getElementById('comentario').style.display = 'block';  // Mostrar el textarea
  document.getElementById('botones-finalizar').style.display = 'block';  // Mostrar botones de control
});

document.getElementById('guardar-control').addEventListener('click', function () {
  // Lógica para guardar el control
  alert('Control guardado');
  document.getElementById('botones-finalizar').style.display = 'none'; // Ocultar botones de finalizar
  document.getElementById('comentario').style.display = 'none'; // Ocultar textarea
  document.getElementById('inicio-viaje').disabled = false; // Habilitar el botón de inicio
});

document.getElementById('cancelar-control').addEventListener('click', function () {
  // Lógica para cancelar el control
  document.getElementById('botones-finalizar').style.display = 'none'; // Ocultar botones de finalizar
  document.getElementById('comentario').style.display = 'none'; // Ocultar textarea
  document.getElementById('inicio-viaje').disabled = false; // Habilitar el botón de inicio
});

ocultarPreloader();