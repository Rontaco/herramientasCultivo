const form = document.querySelector("form");
const output = document.querySelector("output");
const limpiar = document.querySelector("#limpiar");

function calculoVps(x) {
  return 0.61078 * Math.exp((17.27 * x) / (x + 237.3));
}

function evalVPD(vpd, etapa) {
  let rango;
  switch (etapa) {
    case "vegeTemprana":
      rango = { min: 0.8, max: 1.2 };
      break;
    case "preFlora":
      rango = { min: 1.2, max: 1.8 };
      break;
    case "floraTardia":
      rango = { min: 1.0, max: 1.6 };
      break;
    default:
      break;
  }

  if (vpd >= rango.min && vpd <= rango.max) {
    return "correcto";
  } else {
    return "inadecuado, deberias corregir tus parametros";
  }
}

//Variables VPD
let temperaturaValue,
  temperaturaHoja,
  pvsAmbiente,
  pvsHoja,
  vp,
  vpd,
  etapa,
  usoFarenheit,
  humedad,
  etapaIngresada;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { temperatura, humedad, etapas, tipoDeTemperatura } = e.target.elements;
  tipoDeTemperaturaValue = tipoDeTemperatura.value;
  const resultado = document.getElementById('resultado');
  resultado.classList.remove('oculto');
  

  if (tipoDeTemperaturaValue == "celsius") {
    temperaturaValue = Number(temperatura.value);
  } else {
    temperaturaValue = (5 / 9) * (Number(temperatura.value) - 32);
  }

  temperaturaHoja = temperaturaValue - 2;
  humedadValue = Number(humedad.value);
  etapasValue = etapas.value;

  pvsAmbiente = calculoVps(temperaturaValue);
  pvsHoja = calculoVps(temperaturaHoja);
  vp = pvsHoja * (humedadValue / 100);
  vpd = pvsAmbiente - vp;

  if (humedadValue < 0 || humedadValue > 100) {
    alert("La humedad no puede ser inferior a 0 ni mayor a 100");
  } else {
    output.innerText = `El valor del VPD es de ${vpd} y es ${evalVPD(vpd, etapasValue)}`;
  }
});
limpiar.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  output.textContent = "";
  resultado.classList.add('oculto');
});
