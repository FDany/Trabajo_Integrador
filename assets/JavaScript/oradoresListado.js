

/* ---------------------- LISTA DE ORADORES ---------------------- */
function listarOradores() {
    
    const respuesta = fetch(`http://localhost:8080/web-app-23544/api/orador`);

    respuesta
        .then(response => response.json())
        .then(data => procesarListado(data))
        .catch(error => dibujarError(error))
}

const saveOradoresInFromLocal = (key, data) =>{
    localStorage.setItem(key, JSON.stringify(data)); // como texto
}

function procesarListado(data) {

    saveOradoresInFromLocal('oradores', data);

    const listarOradores = data;
    let rows = '';
    for(let orador of listarOradores) {
        console.log(orador);
        rows += `
        <tr>
            <th scope="row">${orador.id}</th>
            <td>${orador.nombre}</td>
            <td>${orador.apellido}</td>
            <td>${orador.mail}</td>
            <td>${orador.tema}</td>
            <td>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editar(${orador.id})">
                    Editar
                </button>

                <button onclick="eliminarOrador(${orador.id})" type="button" class="btn btn-danger">
                    Eliminar
                </button>
            </td>
        </tr>
        `
    }
    document.getElementById('usersRows').innerHTML = rows;
}

function dibujarError(error) {
    console.log(error);
    const alerta = `<div class="alert alert-danger" role="alert">
        ${error.toString()}
    </div>`;
    document.getElementById('msj').innerHTML = alerta;
}

document.getElementById('btnGetUsers').addEventListener('click',listarOradores);

/* ---------------------------------------------------------------- */


/* -------------------------- ELIMINACION ------------------------- */

eliminarOrador = (id) => {
    Swal.fire({
        title: "Estas seguro?",
        text: "No lo podras revertir!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminalo!"
    }).then((result) => {
        if (result.isConfirmed) {

            const oradores = getOradoresFromLocal();
            const oradorEliminado = oradores.find(o => o.id === id);

            fetch(`http://localhost:8080/web-app-23544/api/orador?id=${id}`, {
                method: "DELETE",
            })
            .then(response => response)
            .then(json => {

                Swal.fire({
                    title: "Eliminado!",
                    text: `Se ha eliminado a ${oradorEliminado.nombre} ${oradorEliminado.apellido}`,
                    icon: "success"
                });

                listarOradores();
            })
            .catch(err => console.log(err));


        }
    });
}

/* ---------------------------------------------------------------- */


/* -------------------- ACTUALIZACION DE DATOS -------------------- */

const getOradoresFromLocal = () => {
    const oradores = localStorage.getItem('oradores');
    if(oradores){
        return JSON.parse(oradores);  // esto es un array
    }
    return [];
}

const getOradorSeleccionado = () => {
    const obj = localStorage.getItem('oradorBuscado');
    if(obj){
        return JSON.parse(obj);
    }
    return null;
}

const removeOradorSeleccionado = () => {
    localStorage.removeItem('oradorBuscado');
}


const editar = (id) => {
    const oradores = getOradoresFromLocal(); // me devuelve un array
    const oradorBuscado = oradores.find(o => o.id === id);

    document.getElementById('nombreActualizar').value = oradorBuscado.nombre;
    document.getElementById('apellidoActualizar').value = oradorBuscado.apellido;
    document.getElementById('mailActualizar').value = oradorBuscado.mail;
    document.getElementById('temaActualizar').value = oradorBuscado.tema;
    
    // guardo el id/orador del orador que se quiere actualizar
    saveOradoresInFromLocal('oradorBuscado', oradorBuscado);
}

const actualizarOrador = () => {
    const oradorSeleccionado = getOradorSeleccionado();
    if(!oradorSeleccionado){
        return
    }

    // obtengo los datos del formulario del modal
    const nombre = document.getElementById('nombreActualizar').value;
    const apellido = document.getElementById('apellidoActualizar').value;
    const email = document.getElementById('mailActualizar').value;
    const tema = document.getElementById('temaActualizar').value;

    const orador = {
        nombre,
        apellido,
        email,
        tema,
    };

    fetch(`http://localhost:8080/web-app-23544/api/orador?id=${oradorSeleccionado.id}`, {
            method: "PUT",
            body: JSON.stringify(orador),
    })
    .then(response => response)  // devolvere un: status code 200
    .then(json => {
        // cargo de nuevo de la lista
        listarOradores();
        //limpio el oradorBuscado del localStorage
        removeOradorSeleccionado();

        cerrarModal();

        Swal.fire({
            title: "Actualizacion realizada!",
            icon: "success"
            
          });
    })
    .catch(err => console.log(err));
}
const cerrarModal = () => {
    document.getElementById('btnCerrarModal').click();
}
/* ---------------------------------------------------------------- */

