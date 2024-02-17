var tempoInicial = parseInt($("#tempo_digitacao").text());
var fraseOriginal = $(".conteudo").html();
var fraseAtual = fraseOriginal;
var cronometroID;
var countdownActive = false;
var acertos = 0
var erros = 0

// $(document).ready(...)
$(() => {
  fraseAleatoria();
  atualizaTamanho();
  atualizaPlacar()
  inicializadorContadores();
  inicializadorCronometro();
  $("#btn_reiniciar").click(reinicializador)
})

const campo = $(".campo_digitar");

function inicializadorContadores() {
  var isEspacoPressionado = false;

  campo.on('input', () => {
    var conteudo = campo.val();

    var contadorPalavras = conteudo.split(/\S+/).length - 1;
    $(".contador_palavras").text(contadorPalavras);

    var contadorLetras = conteudo.length;
    $(".contador_letras").text(contadorLetras);

    if (isEspacoPressionado) {
      comparador();
      isEspacoPressionado = false;
    }
  });

  campo.on('keydown', (event) => {
    if (event.key === " ") {
      isEspacoPressionado = true;
    }
  });
}

function startCronometro() {
  var tempoRestante = parseInt($("#tempo_digitacao").text());
  cronometroID = setInterval(() => {
    tempoRestante--;
    $("#tempo_digitacao").text(tempoRestante);
    campo.attr("");
    if (tempoRestante < 1) {
      clearInterval(cronometroID);
      finalizaJogo();
    }
  }, 1000);
}

function inicializadorCronometro() {
  campo.on('focus', () => {
    if (!countdownActive) {
      startCronometro(); 
      countdownActive = true;
    }
  });
}

function finalizaJogo() {
  campo.attr('disabled', true);
  campo.css('background-color', 'lightgray');
  inserePlacar('Elias', $(".contador_palavras").text(), acertos, erros);
  scrollPlacar();
  sincronizaPlacar();
  countdownActive = false;
}

function reinicializador() {
  clearInterval(cronometroID);
  campo.attr('disabled', false);
  campo.val('');
  $(".contador_palavras").text('0');
  $(".contador_letras").text('0');
  $("#tempo_digitacao").text(tempoInicial);
  inicializadorCronometro();
  campo.css('background-color', 'white');
  $(".conteudo").html(fraseAtual);

  acertos = 0;
  $('.contador_acertos').text(acertos);
  erros = 0;
  $('.contador_erros').text(erros);
  
  countdownActive = false;
}
