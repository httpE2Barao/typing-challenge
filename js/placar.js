function inserePlacar(usuario, ppm, acertos, erros) {
  var placar = $('.placar').find('tbody');
  var usuario = 'User';
  var palavrasMinuto = ppm
  var linha = $("<tr>" +
    "<td>" + usuario + "</td>" +
    "<td>" + palavrasMinuto + "ppm" + "</td>" +
    "<td>" + acertos + "</td>" +
    "<td>" + erros + "</td>" +
    "<td>" + "<a class='botao_remover cursor-pointer'><i class='small material-icons'>delete</i></a>" + "</td>" +
  "</tr>");
  placar.prepend(linha)

  linha.find('.botao_remover').click(removeLinha)
}

function scrollPlacar() {
  var posicaoPlacar = $('.placar').offset().top - $(window).scrollTop() + "px";
  $("html, body").animate({
    scrollTop: posicaoPlacar
  }, 1000);
}

function removeLinha() {
  $(this).parent().parent().fadeOut();
  setTimeout(() => {
    $(this).parent().parent().remove();
  },1000)
}

function sincronizaPlacar() {
  var placar = [];
  var linhas = $('.placar').find('tr');

  linhas.each(function() {
    var usuario = $(this).find('td:nth-child(1)').text();
    var ppm = $(this).find('td:nth-child(2)').text();
    var acertos = $(this).find('td:nth-child(3)').text();
    var erros = $(this).find('td:nth-child(4)').text();

    var score = {
      usuario: usuario,
      palavrasPorMinuto: ppm,
      acertos: acertos,
      erros: erros
    };

    placar.push(score);
  });
  
  var dados = {
    placar: placar
  }
  $.post("https://typing-challenge-theta.vercel.app/JQuery/TypingChallenge/public/db.json", dados);
}

function atualizaPlacar() {
  $.get("https://typing-challenge-theta.vercel.app/JQuery/TypingChallenge/public/db.json",function(data){
    $(data).each(function(){
      inserePlacar(this.usuario, this.ppm, this.acertos, this.erros)
    })
  })
}
