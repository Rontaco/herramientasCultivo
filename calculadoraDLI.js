let form = document.querySelector("form")
let output = document.querySelector("output")
let limpiar = document.querySelector("#limpiar")

form.addEventListener("submit", (e) => {
    e.preventDefault() //para prevenir la recarga de la pagina

    const {horasDeLuz,ppfdPromedioDli} = e.target.elements //declaracion de las variables horasDeLuz y ppfdPromedioDli sacandolas del element porque lo tenemos asignado al for y con los nombres al html
    horasDeLuzValue = Number(horasDeLuz.value)
    ppfdPromedioDliValue = Number(ppfdPromedioDli.value)
    let dliResultante = ppfdPromedioDliValue*horasDeLuzValue*0.0036
    dliResultante = dliResultante.toFixed(2)
    if ((horasDeLuzValue>24) || (horasDeLuzValue<0) || (ppfdPromedioDliValue>2500) || (ppfdPromedioDliValue<0)){
        alert(`Los datos ingresados son incorrectos, vuelva a intentarlo`)
    }else {
    output.textContent = `${dliResultante} mol/m2/d.`
}})

//Boton para limpiar datos (podria estar pseudo agregado en el primer submit)
limpiar.addEventListener("click", (e) =>{
    e.preventDefault()
    form.reset()
    output.textContent= ""
})