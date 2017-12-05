// Sports array
  var sportsList = ['Nebraska Football', 'Scott Frost', 'Sun Devil Basketball', 'Arizona Basketball', 'Detroit Lions', 'Arizona Cardinals', 
  'Larry Fitzgerald', 'Phoenix Suns', 'Arizona Coyotes'];


  function displaysportsInfo(){   
    $('#sportsView').empty(); 
    var sports = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=zwbU8CcM47AjGoK1bYI5XuS7hVQMP12j&q=" + sports + "&limit=10&offset=0&rating=G&lang=en";

    $.ajax({url: queryURL, method: 'GET'})
       .done(function(response) {
           var results = response.data;
           for(var i=0; i < results.length; i++){
              if (results[i].rating == "r" || results[i].rating == "pg-13")
              {

              }
              else {
               var rating = results[i].rating;
               var p = $('<p>').text( "Rating: " + rating);
               var sportsImage = $('<img>');

               sportsImage.attr('src', results[i].images.fixed_height_still.url);
               sportsImage.attr('data-still', results[i].images.fixed_height_still.url);
               sportsImage.attr('data-animate', results[i].images.fixed_height.url);
               sportsImage.attr('data-state', 'still');
               sportsImage.addClass('sportsImage');               

               $('#sportsView').append(p);
               $('#sportsView').append(sportsImage);
              }
           }

      $('.sportsImage').on('click', function(){
          var state = $(this).attr('data-state'); 
            console.log(state);
            if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
      });        
      }); 
  }

  function renderButtons(){ 
    $('#buttonsView').empty();
    for (var i = 0; i < sportsList.length; i++){

        var a = $('<button>')
        a.addClass('sports');
        a.addClass("btn btn-dark"); 
        a.addClass("btn btn-dark btn-lg");
        a.attr('data-name', sportsList[i]);
        a.text(sportsList[i]);
        $('#buttonsView').append(a);
    }
  }
  $('#addsports').on('click', function(){
    var sports = $('#sports-input').val().trim();

    sportsList.push(sports);

    renderButtons();

    return false;
  })

  $(document).on('click', '.sports', displaysportsInfo);

  renderButtons();
