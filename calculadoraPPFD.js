const form =document.querySelector("form")
const output =document.querySelector("output")
const limpiar = document.querySelector("#limpiar")

let opcionLedsValue, resultadoFinalPpfd, mensajePpfd, lumenesValue, ppfdCalculados

class lucesFactores {
    constructor(factor, led, nombre) {
        this.factor = factor
        this.led = led
        this.nombre = nombre
    }
    calcularPpfd(lumenesIngresado){
        return lumenesIngresado * this.factor
    }
}

const led3000K = new lucesFactores(0.019027, true, "LED 3000K")
const led4000K = new lucesFactores(0.017823, true, "LED 4000K")
const led6000K = new lucesFactores(0.017823, true, "LED 6000K")
const sodio = new lucesFactores(0.012974, false, "Sodio")
const lec = new lucesFactores(0.018151, false, "LEC")

//Array para posterior indexado
const luces = [led3000K, led4000K, led6000K, sodio, lec]

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const {lumenes, opcionLeds} = e.target.elements
    lumenesValue = Number(lumenes.value)
    opcionLedsValue = opcionLeds.value
    
    ppfdCalculados = luces.map(luz => {
        return {
            nombre: luz.nombre,
            led: luz.led,
            resultado: luz.calcularPpfd(lumenesValue)
        }
    })

    if (opcionLedsValue === "si") {
        resultadoFinalPpfd = ppfdCalculados.filter(luz => luz.led === true)
    } else {
        resultadoFinalPpfd = ppfdCalculados;
    }

    mensajePpfd = opcionLedsValue === "si" ? "Resultados de luces LED:\n" : "Resultados de todas las luces:\n";
    resultadoFinalPpfd.forEach(luz => {
        mensajePpfd += `${luz.nombre}: ${luz.resultado.toFixed(2)} µmol/m²/s\n`;
    })
    output.innerText= `${mensajePpfd}`
})