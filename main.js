let continuar=true
while (continuar){
     //Ingreso temperatura
    let temperaturaIngresada = Number(prompt('Ingrese la temperatura del espacio a evaluar'))
    let temperaturaAmbiente
    while (isNaN(temperaturaIngresada)||(temperaturaIngresada==0)) {
        temperaturaIngresada = Number(prompt('El dato ingresado es incorrecto, ingrese la temperatura del espacio a evaluar'))
    }

    //Conversion a temperatura en celsius
    if (temperaturaIngresada>40) {
        let usoFarenheit = window.confirm("¿Estas ingresando la temperatura en Farenheits?")
            if (usoFarenheit) {
                temperaturaAmbiente = (5/9) * (temperaturaIngresada-32)
            }
    } else {
        temperaturaAmbiente=temperaturaIngresada
        }

    //Ingreso humedad
    let humedad = Number(prompt('Ingrese la humedad relativa del espacio a evaluar'))
    while (isNaN(humedad) || (humedad>100) || (humedad<0) || (humedad==0)) {
        humedad = Number(prompt('El dato ingresado es incorrecto, ingrese la humedad relativa del espacio a evaluar'))
    }

    //Ingreso etapa del ciclo
    let etapaIngresada = Number(prompt(
        'Ingrese la etapa en la del ciclo que se encuentra.\n' + 
        '1=Vegetacion Temprana.\n' +
        '2=Vegetación tardia o preflora.\n' +
        '3=Flora media o tardía.'))
    while (isNaN(etapaIngresada) || (etapaIngresada<0) || (etapaIngresada>3)) {
        etapaIngresada =Number(prompt(
            'El dato ingresado es incorrecto, ingrese la etapa en la del ciclo que se encuentra.\n' + 
            '1=Vegetacion Temprana.\n' +
            '2=Vegetación tardia o preflora.\n' +
            '3=Flora media o tardía.'))
    }
    //Forzado a numero entero
    let etapa = Math.floor(etapaIngresada)

    //Funcion para el calculo de presion de vapor
    function calculoVps(x)  {
        return 0.61078 * Math.exp((17.27 * x) / (x + 237.3))
    }

    //Calculo del VPD
    let temperaturaHoja=(temperaturaAmbiente - 2)
    let pvsAmbiente = calculoVps(temperaturaAmbiente)
    let pvsHoja =calculoVps(temperaturaHoja)
    let vp= pvsHoja * (humedad/100)
    let vpd= pvsAmbiente - vp

    //Funcion para declarar los rangos del VPD y devolución
    function evalVPD (vpd, etapa){
    let rango = 0
        switch (etapa) {
            case 1:
                rango = {min:0.8,max:1.2}
                break
            case 2:
                rango = {min:1.2,max:1.8}
                break
            case 3:
                rango = {min:1.0,max:1.6}
                break
            default:
                break }

        if (vpd>= rango.min && vpd <=rango.max) {
            return 'correcto'
        } else {
            return 'incorrecto, deberias corregir tus parametros'
        }
        }
    alert ('El valor del VPD es de '+vpd+' y es '+evalVPD(vpd,etapa))

    //Monitoreo
    console.log(temperaturaIngresada)
    console.log(temperaturaAmbiente)
    console.log(temperaturaHoja)
    console.log(pvsAmbiente)
    console.log(pvsHoja)
    console.log(vpd)
    console.log(etapa)
    console.log(evalVPD(vpd, etapa))

    //Repetición bucle
    continuar=confirm('¿Queres calcular de vuelta?')
}