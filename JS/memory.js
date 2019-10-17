"Use strict";
  let btnComenzar = document.getElementById('comenzar');
  let btnConfirmar = document.getElementById('confirmar');
  let arrayCartas = document.getElementsByClassName('js-carta');
  let almacenDeAsignar = [0,0,0,0,0,0,0,0];
  let arrayInput = document.getElementsByClassName('radioButton');
  let fichasMarcadas = 0;
  /*CONTADORES PARA TABLERO DE INFORMACION*/
  let sumaAciertoActual = 0;
  let sumaErrorActual = 0;
  let sumaAciertoTotal = 0;
  let sumaErrorTotal = 0;
  /*IDs DE TABLERO DE INFORMACIÓN*/
    /*actual*/
  let pAciertoActual = document.getElementById('parrafoAciertoActual');
  let pErrorActual = document.getElementById('parrafoErrorActual');
    /*total*/
  let pAciertoTotal = document.getElementById('parrafoAciertoTotal');
  let pErrorTotal = document.getElementById('parrafoErrorTotal');

/*ASIGNAR MARCAS(cartas)*/
  btnComenzar.addEventListener('click', asignar);
  function asignar(){ /*asigna marcas a la cartas*/
    $('#divpAciertoActual').children().remove();
    $('#divpErrorActual').children().remove();
    sumaAciertoActual = 0;
    sumaErrorActual = 0;
    let pACero = document.createElement('P');
    let text = document.createTextNode(sumaAciertoActual);
    pACero.appendChild(text);
    document.getElementById('divpAciertoActual').appendChild(pACero);
    let pACero2 = document.createElement('P');
    let text2 = document.createTextNode(sumaErrorActual);
    pACero2.appendChild(text2);
    document.getElementById('divpErrorActual').appendChild(pACero2);

    fichasMarcadas = 0;
    btnConfirmar.disabled = false;

   for(let j = 0; j <=arrayInput.length-1; j++){
      arrayInput[j].disabled = false;
   }
   for(let i = 0; i <= arrayCartas.length-1; i++){
      let random = Math.random();
      if(random > 0.5) {
        almacenDeAsignar[i] = "diamante";
        arrayCartas[i].classList.add('js-asignarDiamante');
        fichasMarcadas++;
      }else{
        almacenDeAsignar[i] = "trebol";
        arrayCartas[i].classList.add('js-asignarTrebol');
    }
 }
 setTimeout('ocultarMarcas()', 1000);

}

/*OCULTAR LAS CARTAS AL SEGUNDO*/
 function ocultarMarcas(){
    for(let j = 0; j <= arrayCartas.length-1; j++){
      arrayCartas[j].classList.remove('js-asignarTrebol');
      arrayCartas[j].classList.remove('js-asignarDiamante');
      arrayCartas[j].classList.add('js-carta');
    }
  }

/*CHEQUEAR OPCION CONFIRMADA*/
  btnConfirmar.addEventListener('click', verificarOpcion);
  function verificarOpcion(){/*verifica si la carta elegida tiene un diamante o un trebol*/
    for(let k = 0; k <= arrayInput.length-1;k++){
      if(arrayInput[k].checked){
        if(almacenDeAsignar[k] === "diamante"){
          arrayCartas[k].classList.add('js-asignarDiamante');
          arrayInput[k].disabled = true;
          $('#divpAciertoActual').children().remove(); /*borra el punto que hay para poner la suma nueva*/
          $('#divpAciertoTotal').children().remove();
          acierto();
        }
        else if(almacenDeAsignar[k] === "trebol"){
         arrayCartas[k].classList.add('js-asignarTrebol');
         arrayInput[k].disabled = true;
         $('#divpErrorActual').children().remove();
         $('#divpErrorTotal').children().remove();
         error();
       }
      }
    }
  terminarPartida();
  }
/*SUMA UN ACIERTO*/
function acierto(){
  sumaAciertoActual++;
  sumaAciertoTotal++;
  let pCreado1 = document.createElement("P");
  let pPuntoAA = document.createTextNode(sumaAciertoActual);
  pCreado1.appendChild(pPuntoAA);
  document.getElementById('divpAciertoActual').appendChild(pCreado1);
  let pCreado1B = document.createElement("P");
  let pPuntoAT = document.createTextNode(sumaAciertoTotal);
  pCreado1B.appendChild(pPuntoAT);
  document.getElementById('divpAciertoTotal').appendChild(pCreado1B);
}

function error(){
  sumaErrorActual++;
  sumaErrorTotal++;
  let pCreado2 = document.createElement("P");
  let pPuntoEA = document.createTextNode(sumaErrorActual);
  pCreado2.appendChild(pPuntoEA);
  document.getElementById('divpErrorActual').appendChild(pCreado2);
  let pCreado2B = document.createElement("P");
  let pPuntoET = document.createTextNode(sumaErrorTotal);
  pCreado2B.appendChild(pPuntoET);
  document.getElementById('divpErrorTotal').appendChild(pCreado2B);
}

/*FINALIZA PARTIDA CUANDO ENCUENTRA TODOS LOS DIAMANTES SE DESHABILITA EL BOTON CONFIRMAR*/
function terminarPartida(){
  if(fichasMarcadas === sumaAciertoActual){
    btnConfirmar.disabled = true;
  }
}
