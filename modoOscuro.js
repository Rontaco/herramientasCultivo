let modoOscuroClaro = document.querySelector("#modoOscuroClaro");
let body = document.body;
let modo = localStorage.getItem("modo");
let imgLogo = document.querySelector("#logoHC");
body.className = modo;
if (modo == "oscuro") {
  modoOscuroClaro.innerText = "CAMBIAR A MODO CLARO";
  imgLogo.className = "logoHCOscuro";
} else {
  modoOscuroClaro.innerText = "CAMBIAR A MODO OSCURO";
  imgLogo.className = "logoHCClaro";
}

modoOscuroClaro.addEventListener("click", (e) => {
  if (body.className == "oscuro") {
    body.className = "claro";
    modoOscuroClaro.innerText = "CAMBIAR A MODO OSCURO";
    imgLogo.className = "logoHCClaro";
  } else {
    body.className = "oscuro";
    modoOscuroClaro.innerText = "CAMBIAR A MODO CLARO";
    imgLogo.className = "logoHCOscuro";
  }
  localStorage.setItem("modo", body.className);
});
