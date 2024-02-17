$('#troca_frase').click(fraseAleatoria);
var fraseOriginal = $(".conteudo").html();

function atualizaTamanho() {
  var frase = $(".conteudo").text();
  var tamanhoFrase = frase.split(' ').length;
  var mostradorFrase = $("#tamanho_frase");
  mostradorFrase.text(tamanhoFrase);
}
function fraseAleatoria() {         
  $.get('https://typping-frases.vercel.app/', (data) => {
    var frase = $('.conteudo');
    var numAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numAleatorio].texto)
    fraseAtual = frase.html();
    atualizaTamanho();
  }).fail(() => {
    $('#erro_req').show();
  })
}

function comparador() {
  var conteudoDigitado = campo.val().trim();
  var novoConteudo = fraseAtual;
  var acertou = false

  var palavrasFrase = fraseAtual.split(' ');
  var palavrasDigitadas = conteudoDigitado.split(' ');

  for (var i = 0; i < palavrasFrase.length; i++) {
    var palavraFrase = palavrasFrase[i];
    var palavraDigitada = palavrasDigitadas[i] || "";

    if (palavraDigitada !== "") {
      if (palavraDigitada === palavraFrase) {
        novoConteudo = novoConteudo.replace(palavraFrase, palavraDigitada);
        acertou = true
      } else {
        novoConteudo = novoConteudo.replace(palavraFrase, '<mark class="bg-red-500 px-1 rounded">' + palavraFrase + '</mark>');
        acertou = false
      }
    }
  }
  if (acertou) {
    acertos++
    $('.contador_acertos').text(acertos)
  } else {
    erros++
    $('.contador_erros').text(erros)
  }

  $(".conteudo").html(novoConteudo);
}