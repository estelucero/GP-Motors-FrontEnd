var usuario = JSON.parse(localStorage.getItem("usuario"))[5];
console.log(usuario);

function agregarReporte() {
  let url = "";
  if (usuario === 1) {
    url = "http://metabase-g3-ext.g4.potus.ar/public/dashboard/61b2a9d5-9bf8-4f21-9a10-cafbe5d189b5";
  } else if (usuario === 2) {
    url = "http://metabase-g3-ext.g4.potus.ar/public/dashboard/229741ad-7016-4070-b271-573d2bb99ab1"
  } else if (usuario === 29) {
    url = "http://metabase-g3-ext.g4.potus.ar/public/dashboard/d4717135-e344-4bd9-9b78-4e9b731557d5"
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








