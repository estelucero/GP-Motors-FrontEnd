var usuario = JSON.parse(localStorage.getItem("usuario"));



async function obtenerLinkReport() {
  const url = `https://aaaaa-deploy-back.vercel.app/users/generarLink?id_concesionario=${usuario[5]}`;

  try {
    // Realiza la solicitud GET
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      throw new Error("Error al obtener los reportes");
    }

    // Convierte la respuesta a JSON
    const reportesData = await response.json();


    return reportesData.link;


  } catch (error) {
    console.error("Hubo un problema con la solicitud:", error);
  }

}
async function agregarReporte() {
  let url = "";
  url = await obtenerLinkReport();



  const iframe = document.createElement("iframe");
  iframe.src = url;
  iframe.width = "100%";
  iframe.height = "600";
  iframe.frameBorder = "0";
  iframe.allowTransparency = "true";
  iframe.classList.add("dashboard-iframe");



  const container = document.getElementById("iframe-container");
  console.log(container)
  container.appendChild(iframe);

  ocultarPreloader();

}

document.addEventListener("DOMContentLoaded", agregarReporte);









