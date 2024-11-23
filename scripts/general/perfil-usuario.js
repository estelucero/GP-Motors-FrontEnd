var usuario = JSON.parse(localStorage.getItem("usuario"));
nombre_usuario = document.getElementById('usuario');
nombre_usuario.innerHTML += `${usuario[1]} ${usuario[2]}`;


const linkInicio = document.getElementById("link-inicio");

if (usuario[3] == 'gerente') {
    linkInicio.setAttribute("href", "./inicio-gerente.html");
}
else if (usuario[3] == 'admin') {
    linkInicio.setAttribute("href", "./adminInicio.html");
}
else if (usuario[3] == 'supervisor') {
    linkInicio.setAttribute("href", "./inicio-supervisor.html");
}
else if (usuario[3] == 'técnico') {
    linkInicio.setAttribute("href", "./inicio-tecnico.html");
}

async function obtenerConcesionariaUsuario() {
    const url = 'https://aaaaa-deploy-back.vercel.app/users/verSedesConcesionarioRegistradas';

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
            throw new Error("Error al obtener los datos de los vehículos");

        }

        // Convierte la respuesta a JSON
        const concesionariasData = await response.json();

        const concesionariaUsuario = concesionariasData.filter(concesionaria => concesionaria.id_concesionario === usuario[5]);


        console.log(concesionariaUsuario);
        return concesionariaUsuario[0].nombre;
    } catch (error) {
        console.error("Hubo un problema con la solicitud:", error);
    }
}

async function llenarInformacionUsuario() {
    const wrapper = document.querySelector('.profile-details');
    const concesionaria = await obtenerConcesionariaUsuario();
    // Seleccionar cada elemento con nth-child
    const nombre = wrapper.querySelector(':nth-child(1)');
    const rol = wrapper.querySelector(':nth-child(2)');
    const email = wrapper.querySelector(':nth-child(3)');
    const sucursal = wrapper.querySelector(':nth-child(4)');
    nombre.innerHTML += `<span class="text-dato"> ${usuario[1].charAt(0).toUpperCase() + usuario[1].slice(1)} ${usuario[2].charAt(0).toUpperCase() + usuario[2].slice(1)}</span>`;
    // apellido.innerHTML += `<span class="text-dato">${usuario[2].charAt(0).toUpperCase() + usuario[2].slice(1)}</span>`;
    rol.innerHTML += `<span class="text-dato">${usuario[3].charAt(0).toUpperCase() + usuario[3].slice(1)}</span>`;
    email.innerHTML += `<span class="text-dato"> ${usuario[4]}</span>`;
    sucursal.innerHTML += `<span class="text-dato"> ${concesionaria}</span>`;


}

llenarInformacionUsuario();

ocultarPreloader();

