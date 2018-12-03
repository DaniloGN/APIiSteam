//Jose Danilo Guarizzo Neto 201520486

$(document).ready(function() {

  //carregar lista de jogos
    $.ajax({
      url: 'https://isteamgames.cleverapps.io/games',
      type: "GET",
      dataType: "json",
      success: function (response,status) {
          $.each( response, function(id,game) {
            $(".list-group").append('<li class="list-group-item"><p">Nome: '+game.name+'</p><p>Descrição: '+game.description+ '</p><p>Categoria: '+game.category+'</p> <p id="_id" disabled hidden>'+game._id+'</p><button type="button" class="btn btn-danger excluir">Excluir</button></li>');
            });
      },
      error: function (xhr, status) {
        console.log(JSON.stringify(xhr));
      }
    });
  
    $('#btnSearch').click(function () {
      $(".list-group").html('');
      var search = $('#contentSearch').val();
        $.get("https://isteamgames.cleverapps.io/games/search/"+search, function(response, status){
          $.each( response, function(id,game) {
            $(".list-group").append('<li class="list-group-item"><p>Nome: '+game.name+'</p><p>Descrição: '+game.description+ '</p><p>Categoria: '+game.category+'</p> <button type="button" class="btn btn-danger excluir">Excluir</button></li>');
            });
        });
    });
    $( ".list-group" ).on( "click", ".excluir", function( event ) {
        event.preventDefault();
          var url = 'https://isteamgames.cleverapps.io/games/'+$( this ).parent().children("#_id").text();
          console.log(url);
          $.ajax({
            url: url,
            type: 'delete',
            success: function(result,status) {
              alert("Jogo removido com sucesso");
              location.reload(true);
            },
            error: function(error){
              console.log("error");
            }
          });
    });

    $(".criar").click(function(){  
      $(".form-game").animate({
        width: "toggle"
      });
    });

    $("#btnCadastrar").click(function(){
      var name = $("#name").val();
      var description = $("#description").val();
      var category = $("#category").val();
      $.ajax({
            url: 'https://isteamgames.cleverapps.io/games',
            type: 'post',
            data: {
              name: name,
              description: description,
              category: category 
            },
            success: function(result,status) {
              alert("Jogo cadastrado com sucesso");
              location.reload(true);
            },
            error: function(error){
              console.log("error");
            }
          });
    });
  
});