

crearOrador = () => {
    const orador ={
        nombre:  document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        email: document.getElementById("email").value,
        tema: document.getElementById("tema").value
    };

    fetch('http://localhost:8080/web-app-23544/api/orador', {
            method: "POST",
            body: JSON.stringify(orador),
    })
    .then(response => response.json())
    .then(json => {
        alert(`Se ha registrado el orador id:${orador.id}`)
    })
    .catch(err => console.log(err));
}

document.getElementById("btnCrear").addEventListener('click',crearOrador);

