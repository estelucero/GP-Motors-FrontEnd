var usuario = JSON.parse(localStorage.getItem("usuario"))[5];
console.log(usuario);

function agregarReporte() {
  let url = "";
  if (usuario === 1) {
    url = "https://helping-officially-locust.ngrok-free.app/public/dashboard/a3a2e038-1cd9-4c97-bb2b-b549f8d75472"
  } else if (usuario === 2) {
    url = "https://helping-officially-locust.ngrok-free.app/public/dashboard/158e2542-bd5c-4e84-9ce6-eea73c4bc18f"
  } else if (usuario === 29) {
    url = "https://helping-officially-locust.ngrok-free.app/public/dashboard/e6a42a34-4d25-4105-8085-35d228dee385"
  }



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

}

document.addEventListener("DOMContentLoaded", agregarReporte);






