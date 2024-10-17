let modoOscuroClaro = document.querySelector("#modoOscuroClaro")
let body = document.body
let modo =localStorage.getItem('modo')
body.className=modo
if (modo=="oscuro"){
    modoOscuroClaro.innerText='CAMBIAR A MODO CLARO'
}else {
    modoOscuroClaro.innerText='CAMBIAR A MODO OSCURO'
} 

modoOscuroClaro.addEventListener("click", (e)=>{
    if (body.className=='oscuro') {
        body.className='claro'
        modoOscuroClaro.innerText='CAMBIAR A MODO OSCURO'
    } else {
        body.className='oscuro'
        modoOscuroClaro.innerText='CAMBIAR A MODO CLARO'
    }
    localStorage.setItem('modo', body.className)
})