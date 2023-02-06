const validateDate = (birthDate) => {
    const DATE_REGEX = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
    const CURRENT_YEAR = new Date().getFullYear();

    /* Comprobar formato dd/mm/yyyy, que el no sea mayor de 12 y los días mayores de 31 */
    if (!birthDate.match(DATE_REGEX)) {
        return false;
    }

    /* Comprobar los días del mes */
    const dia = parseInt(birthDate.split('/')[0]);
    const mes = parseInt(birthDate.split('/')[1]);
    const año = parseInt(birthDate.split('/')[2]);
    const monthDays = new Date(año, mes, 0).getDate();
    if (dia > monthDays) {
        return false;
    }

    /* Comprobar que el año no sea superior al actual*/
    if (año > CURRENT_YEAR) {
        return false;
    }
    return true;
}

const validateHour = (hour) => {
    const HOUR_REGEX = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    const horacompletaActual = new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(new Date());

    if (!hour.match(HOUR_REGEX)) {
        return false;
    }

    /*const hora = parseInt(hour.split(':')[0]);
    const minuto = parseInt(hour.split(':')[1]);

    const horaActual = parseInt(horacompletaActual.split(':')[0]);
    const minutoActual = parseInt(horacompletaActual.split(':')[1]);

    if(hora > horaActual){
        return false;
    }

    if(minuto > minutoActual){
        return false;
    }*/
    return true;
}

function validarFechayHora(){
    let fechayhora=document.getElementById("entrada").value;
    let fecha =fechayhora.split(" ");

    let fechaValidada = false;
    let horaValidada = false;

    let validacionCompleta = false;

    for (let index = 0; index < fecha.length; index++) {
        if(index == 0){
            if(validateDate(fecha[0])){
                fechaValidada = true;
            }else{
                fechaValidada = false;
            }
        }else if(index == 1){
            if(validateHour(fecha[1])){
                horaValidada = true;
            }else{
                horaValidada = false;
            }
        }
    }
    if(fechaValidada == true && horaValidada == true){
        validacionCompleta = true;
    }else{
        validacionCompleta = false;
    }

    return validacionCompleta;
}

function mostrarFechayHoraActual(){
    let horaActual = new Intl.DateTimeFormat(undefined, { timeStyle: "short" }).format(new Date());

    let hoy = new Date();
    let fechaActual = hoy.toLocaleDateString();

    document.getElementById("resultado").value = fechaActual.concat(" ",horaActual);
}

function calcular(){
    let fechayhora=document.getElementById("entrada").value; 
    let fechaSeparada =fechayhora.split(" ");
    let fechaCompleta = fechaSeparada[0];
    let horaCompleta = fechaSeparada[1];

    let fechaDiferenciada = fechaCompleta.split("/");
    let horaDiferenciada = horaCompleta.split(":");
    

    let hoy = new Date();
    let fechaUsuario = new Date(fechaDiferenciada[2],fechaDiferenciada[1]-1,fechaDiferenciada[0],horaDiferenciada[0],horaDiferenciada[1]);
    
    console.log(fechaUsuario);
    
    let fechaResultante = hoy - fechaUsuario;

    let dias = Math.floor(fechaResultante / (24 * 3600 * 1000));
    let horas = Math.floor((fechaResultante / (3600 * 1000)) % 24);
    let min = Math.floor((fechaResultante / (60 * 1000)) % 60);

    let p_dias = 20 * dias;
    let p_horas = 1.2;
    if (horas == 1 && min > 0) p_horas += 1.5;

    if (horas > 1) {
        p_horas += 1.5 * (horas - 1);
        if (min > 0) p_horas += 1.5;
    }
    let p_horas_max = p_horas > 20 ? 20 : p_horas;
    let p_total = p_dias + p_horas_max;
    document.getElementById("precio").value = p_total + " €";
}

function resultado(){
    if(document.getElementById("entrada").value.length === 0){
        document.getElementById("error").innerHTML = "Debes introducir una fecha para calcular el precio";
    }else{
        if(validarFechayHora()){
            mostrarFechayHoraActual();
            calcular();
            document.getElementById("error").innerHTML = "";
        }else{
            document.getElementById("error").innerHTML = "Debes introducir una fecha correcta";
        }
    }
}

function resetear(){
    document.getElementById("error").innerHTML = "";
    document.getElementById("resultado").value = "";
    document.getElementById("entrada").value = "";
    document.getElementById("precio").value = "";
}