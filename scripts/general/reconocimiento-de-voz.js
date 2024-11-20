const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnReset = document.getElementById('btnReset');
const textArea = document.getElementById('observaciones');

const recognition = new webkitSpeechRecognition();

recognition.continuous = false; // Cambiado a false para no continuar automáticamente
recognition.lang = 'es-ES';
recognition.interimResults = false;

// Estado inicial de los botones
setButtonsState(false, true, true); // Desactiva todos menos el "Comenzar"

function setButtonsState(start, stop, reset) {
  btnStart.disabled = start;   // Comenzar
  btnStop.disabled = stop;     // Detener
  btnReset.disabled = reset;   // Reiniciar
}

btnStart.addEventListener('click', () => {
  recognition.start();
  setButtonsState(true, false, true); // Desactiva "Comenzar", activa "Detener"
});

btnStop.addEventListener('click', () => {
  recognition.stop();
  setButtonsState(false, true, false); // Activa "Comenzar", desactiva "Detener"
});

btnReset.addEventListener('click', () => {
  textArea.value = ''; // Limpia el texto
  setButtonsState(false, true, true); // Activa "Comenzar", desactiva "Detener"
});

// Escuchar los resultados
recognition.onresult = (event) => {
  let nuevoTexto = event.results[event.results.length - 1][0].transcript.trim();
  nuevoTexto = nuevoTexto.charAt(0).toUpperCase() + nuevoTexto.slice(1);

  if (textArea.value.trim() !== '') {
    textArea.value = textArea.value.trim() + '. ';
  }

  textArea.value += nuevoTexto + ' ';
};

// Manejo del evento cuando el reconocimiento se detiene automáticamente
recognition.onend = () => {
  // Solo reinicia el reconocimiento si el botón de detener no está activado
  if (!btnStop.disabled) {
    recognition.start(); // Reinicia el reconocimiento si no se ha detenido
  }
};