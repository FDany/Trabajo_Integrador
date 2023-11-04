
function getValueById(id){
    return document.getElementById(id).value;
}

function updateValueById(id, value){
    document.getElementById(id).value = value;
}

function updatehtmlValueById(id, value){
    document.getElementById(id).innerHTML = value;
}

function resumen(){
    let opcion = parseInt(getValueById('categoria'));
    let cant = getValueById('cantidad');
    let pagar = 0;
    
    if (opcion === 1){
        pagar = cant*(200-(200*0.8));
    }
    else if (opcion === 2){
        pagar = cant*(200-(200*0.5));
    }
    else{
        pagar = cant*(200-(200*0.15));
    }

    updatehtmlValueById('total','Total a pagar: $'+pagar)
}



function borrar(){
    updateValueById('nombre','Nombre');
    updateValueById('apellido','Apellido');
    updateValueById('correo','Correo')
    updateValueById('cantidad','Cantidad')
    updateValueById('categoria','1')
}



function cardOpciones(valor){
    switch (valor){
        case 1:
            updateValueById('categoria','1');
            break;
        case 2:
            updateValueById('categoria','2');
            break;
        case 3:
            updateValueById('categoria','3');
            break;
    }
}


function categoriaEstudiante(){
    updateValueById('categoria','1');
}

function categoriaTraninee(){
    updateValueById('categoria','2');
}

function categoriaJunior(){
    updateValueById('categoria','3');
}



document.getElementById('borrar').addEventListener('click',borrar);
document.getElementById('resumen').addEventListener('click',resumen);

document.getElementById('cardEstudiante').addEventListener('click',categoriaEstudiante);
document.getElementById('cardTrainee').addEventListener('click',categoriaTrainee);
document.getElementById('cardJunior').addEventListener('click',categoriaJunior);