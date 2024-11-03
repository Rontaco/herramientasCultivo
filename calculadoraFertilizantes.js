const form = document.querySelector("form");
const output = document.querySelector("output");
const limpiar = document.querySelector("#limpiar");

function calculoFertilizantes(x) {
  fertilizanteVega = cantidadAguaValue * ratiosFertilización[x][0];
  fertilizanteVega = fertilizanteVega.toFixed(2);
  fertilizanteMacro = cantidadAguaValue * ratiosFertilización[x][1];
  fertilizanteMacro = fertilizanteMacro.toFixed(2);
  fertilizanteFlora = cantidadAguaValue * ratiosFertilización[x][2];
  fertilizanteFlora = fertilizanteFlora.toFixed(2);
}
let cantidadAguaValue,
  fertilizanteVega,
  fertilizanteMacro,
  fertilizanteFlora,
  etapasValue;

const ratiosFertilización = {
  esqueje: [0.4, 0.4, 0.4],
  vegetativo: [3.6, 2.4, 1.2],
  preflora: [2.4, 2.4, 2.4],
  flora: [1.2, 2.4, 3.6],
  floraPlus: [1.2, 2.4, 4.8],
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { cantidadAgua, etapas } = e.target.elements;
  cantidadAguaValue = Number(cantidadAgua.value);
  etapasValue = etapas.value;
  calculoFertilizantes(etapasValue);
  output.innerHTML = `VEGA = ${fertilizanteVega}ml<br>
    MACRO= ${fertilizanteMacro}ml<br>
    FLORA= ${fertilizanteFlora}ml
    `;
  console.log(cantidadAguaValue);
  console.log(etapasValue);
});
limpiar.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  output.textContent = "";
});
