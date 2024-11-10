// Obtener elementos del DOM
const closeBtn = document.getElementById('close-btn-traslado');
const trasladarBtn = document.getElementById('trasladar-btn');
const initialOptions = document.getElementById('initial-options');
const trasladarOptions = document.getElementById('trasladar-options');
const cancelarTrasladoBtn = document.getElementById('cancelar-traslado-btn');

closeBtn.addEventListener('click', () => {
    document.querySelector(".popup").classList.remove("active");
    document.querySelector(".popup-container").classList.remove("active");
    resetPopup(); // Llamada para restablecer el popup al estado inicial
});

// Mostrar el select y los botones de guardar/cancelar al hacer clic en "Trasladar"
trasladarBtn.addEventListener('click', () => {
    initialOptions.style.display = 'none'; // Oculta opciones iniciales
    trasladarOptions.style.display = 'block'; // Muestra opciones de traslado
});

// Ocultar el select y volver a las opciones iniciales al hacer clic en "Cancelar"
cancelarTrasladoBtn.addEventListener('click', () => {
    trasladarOptions.style.display = 'none'; // Oculta opciones de traslado
    initialOptions.style.display = 'flex'; // Muestra opciones iniciales
});

function resetPopup() {
    initialOptions.style.display = 'flex'; // Muestra las opciones iniciales
    trasladarOptions.style.display = 'none'; // Oculta el select y los botones de traslado
}
