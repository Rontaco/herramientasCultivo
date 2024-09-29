//Funcion para el calculo de presion de vapor
function calculoVps(x)  {
    return 0.61078 * Math.exp((17.27 * x) / (x + 237.3))
}

//Funcion para declarar los rangos del VPD y devolución
function evalVPD (vpd, etapa){
    let rango
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
                break
            }
    
            if (vpd>= rango.min && vpd <=rango.max) {
                return 'correcto'
            } else {
                return 'incorrecto, deberias corregir tus parametros'
            }
            }
//Funcion para calculo de fertilzantes
function calculoFertilizantes(x) {
    fertilizanteVega=cantidadAgua*ratiosFertilización[x][0]
    fertilizanteMacro=cantidadAgua*ratiosFertilización[x][1]
    fertilizanteFlora=cantidadAgua*ratiosFertilización[x][2]
}

let temperaturaIngresada, temperaturaAmbiente, temperaturaHoja, pvsAmbiente, pvsHoja, vp, vpd, etapa, usoFarenheit, humedad, etapaIngresada
let horasDeLuz, ppfdPromedioDli, dliResultante
let cantidadAgua, opcionMenuFertilizantes, opcionMenuFertilizantesIngresada, fertilizanteVega, fertilizanteMacro, fertilizanteFlora, etapaFertilizante
let ratiosFertilización = {
    esqueje: [0.4, 0.4, 0.4],
    vegetativo: [3.6,2.4,1.2],
    preflora:[2.4, 2.4, 2.4],
    flora:[1.2,2.4,3.6],
    floraPlus:[1.2, 2.4, 4.8],
}
let opcionMenuIngresada, opcionMenu
let continuarMenu=true
let continuarVpd, continuarDli, continuarFertilizantes
while (continuarMenu){
    opcionMenuIngresada = Number(prompt(
        '¿Que herramienta desea usar?.\n'+
        '1: Calculadora VPD.\n'+
        '2: Calculadora DLI.\n'+
        '3: Calculadora Fertilizantes (WIP).\n'
    ))
    while (isNaN(opcionMenuIngresada) || (opcionMenuIngresada<0) || (opcionMenuIngresada>3)) {
        opcionMenuIngresada =Number(prompt(
            'La herramienta que desea utilizar es inexistente o esta en progreso, seleccione una opción.\n' + 
            '1: Calculadora VPD.\n'+
            '2: Calculadora DLI.\n'+
            '3: Calculadora Fertilizantes (WIP).\n'))
    }
opcionMenu=Math.floor(opcionMenuIngresada)
if (opcionMenu==1){
    continuarVpd=true
    while (continuarVpd){
        
        //Ingreso temperatura
       temperaturaIngresada = Number(prompt('Ingrese la temperatura del espacio a evaluar'))
       while (isNaN(temperaturaIngresada)||(temperaturaIngresada==0)) {
           temperaturaIngresada = Number(prompt('El dato ingresado es incorrecto, ingrese la temperatura del espacio a evaluar'))
       }
   
       //Conversion a temperatura en celsius
       if (temperaturaIngresada>40) {
           usoFarenheit = window.confirm("¿Estás ingresando la temperatura en Farenheits?")
               if (usoFarenheit) {
                   temperaturaAmbiente = (5/9) * (temperaturaIngresada-32)
               }
       } else {
           temperaturaAmbiente=temperaturaIngresada
           }
   
       //Ingreso humedad
       humedad = Number(prompt('Ingrese la humedad relativa del espacio a evaluar'))
       while (isNaN(humedad) || (humedad>100) || (humedad<0) || (humedad==0)) {
           humedad = Number(prompt('El dato ingresado es incorrecto, ingrese la humedad relativa del espacio a evaluar'))
       }
   
       //Ingreso etapa del ciclo
       etapaIngresada = Number(prompt(
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
       etapa = Math.floor(etapaIngresada)
   
       //Calculo del VPD
       temperaturaHoja=(temperaturaAmbiente - 2)
       pvsAmbiente = calculoVps(temperaturaAmbiente)
       pvsHoja =calculoVps(temperaturaHoja)
       vp= pvsHoja * (humedad/100)
       vpd= pvsAmbiente - vp
   
       //Monitoreo
       console.log(temperaturaIngresada)
       console.log(temperaturaAmbiente)
       console.log(temperaturaHoja)
       console.log(pvsAmbiente)
       console.log(pvsHoja)
       console.log(vpd)
       console.log(etapa)
       console.log(evalVPD(vpd, etapa))

       continuarVpd= confirm (
        'El valor del VPD es de '+vpd+' y es '+evalVPD(vpd,etapa)+'.\n'+
        '¿Desea volver a usar la calculadora VPD?'
    )
   }
}else if (opcionMenu==2){
    continuarDli=true
    while (continuarDli) {
    //Ingreso horas de luz
    horasDeLuz = Number(prompt('Ingrese la cantidad de horas de luz que usa por dia'))
    while (isNaN(horasDeLuz) || (horasDeLuz<0)|| (horasDeLuz>24)) {
        horasDeLuz = Number(prompt('El dato ingresado es incorrecto, ingrese la cantidad de horas de luz que usa por dia'))    
    }
    horasDeLuz=Math.round(horasDeLuz)
    
    ppfdPromedioDli= Number(prompt('Ingrese la cantidad de ppfd que usa en promedio'))
    while (isNaN(ppfdPromedioDli) || (ppfdPromedioDli<0)|| (ppfdPromedioDli>2000)) {
        ppfdPromedioDli = Number(prompt('El dato ingresado es incorrecto, ingrese la cantidad de ppfd que usa en promedio'))    
    }
    ppfdPromedioDli=Math.round(ppfdPromedioDli)

    //Lógica calculo DLI
    dliResultante = ppfdPromedioDli/horasDeLuz
    
    continuarDli = confirm(
        'El resultado es de '+dliResultante.toFixed(2)+' mol/m2/d.\n'+
        '¿Desea volver a usar la calculadora de DLI?'
    )
}
}else if (opcionMenu==3){
    continuarFertilizantes=true
    while (continuarFertilizantes) {
    cantidadAgua = Number(prompt('Ingrese la cantidad de litros de agua a usar'))
    while (isNaN(cantidadAgua) || (cantidadAgua<0)) {
        cantidadAgua = Number(prompt('El dato ingresado es incorrecto, ingrese la cantidad de litros de agua a usar'))
    }
    opcionMenuFertilizantesIngresada = Number(prompt(
        'Ingrese la etapa en la del ciclo que se encuentra.\n' + 
        '1=Esqueje\n' +
        '2=Vegetativo\n' +
        '3=Preflora\n' +
        '4=Flora\n' +
        '5=Flora Plus'
        ))
    while (isNaN(opcionMenuFertilizantesIngresada) || (opcionMenuFertilizantesIngresada<1) || (opcionMenuFertilizantesIngresada>5)) {
        opcionMenuFertilizantesIngresada = Number(prompt(
            'El dato ingresado es correcto, ingrese la etapa en la del ciclo que se encuentra.\n' + 
            '1=Esqueje\n' +
            '2=Vegetativo\n' +
            '3=Preflora\n' +
            '4=Flora\n' +
            '5=Flora Plus'
            ))
    }
    opcionMenuFertilizantes=Math.floor(opcionMenuFertilizantesIngresada)
    
    if (opcionMenuFertilizantes == 1) {
        calculoFertilizantes('esqueje')
    }else if (opcionMenuFertilizantes == 2) {
        calculoFertilizantes('vegetativo')
    }else if (opcionMenuFertilizantes == 3) {
        calculoFertilizantes('preflora')
    }else if (opcionMenuFertilizantes == 4) {
        calculoFertilizantes('flora')
    }else if (opcionMenuFertilizantes == 5) {
        calculoFertilizantes('floraplus')
    }
    continuarFertilizantes= confirm(
        'VEGA: ' + fertilizanteVega + 'ml\n'+
        'MACRO: ' + fertilizanteMacro + 'ml\n'+
        'FLORA: ' + fertilizanteFlora + 'ml\n' +
        'Desea volver a usar la calculadora de fertilizantes?')    
}}
continuarMenu=confirm('¿Desea usar otra herramienta?')}
