
function reestablecerInputs(){
    
    document.getElementById("nombre").value = "";
    document.getElementById("nombre").placeholder = "Nombre";
    document.getElementById("apellido").value = "";
    document.getElementById("apellido").placeholder = "Apellido";
    document.getElementById("email").value = "";
    document.getElementById("email").placeholder = "...@gmail.com";
    document.getElementById("tema").value = "";
    document.getElementById("tema").placeholder = "(java, react, javaScript, ...)";
}

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
        //alert(`Se ha registrado el orador id:${orador.id}`)

        Swal.fire({
            title: `${orador.nombre} ${orador.apellido} se ha registrado con exito.`,
            icon: "success"
            
        });
        
    })
    .catch(err => console.log(err));
    
    reestablecerInputs();
}

document.getElementById("btnCrear").addEventListener('click',crearOrador);

