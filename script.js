$(document).ready(function(){

  $('form').submit(function(event){
    event.preventDefault()
  });

  $(".button").on("click", function(){
    //grabs city and state in search bar
    $(".locationText").empty();
    $(".outfits").empty();
    let zipcode = $("#location-search")[0].value;
    if (zipcode === ""){
      alert("Please enter valid zip code. ex: 80027");
    }
    console.log(zipcode);



    let $xhr = $.getJSON("http://api.wunderground.com/api/04feeaa9a8fd5234/conditions/forecast/q/" + zipcode + ".json");

    $xhr.done(function(data){
      console.log("data: ", data);

      let $degrees = data.current_observation.temp_f;
      let $place = data.current_observation.display_location.full;
      let $high = parseInt(data.forecast.simpleforecast.forecastday[0].high.fahrenheit);
      console.log(typeof $high);
      $(".locationText").append("It is currently: " + $degrees + " degrees fahrenheit, in " + $place);
      $(".locationText").append("Today's high will be: " + $high + " degrees fahrenheit");


      let $xhr_1 = $.getJSON("http://api.shopstyle.com/api/v2/lists?pid=uid7364-40040942-41&userId=oaburgener");

      $xhr_1.done(function(data1){
        console.log("data: ", data1);

        if($high <= 40){
          for (var i = 0; i < 5; i++){
            $(".outfits").append('<img src="' +
            //winter outfits
            data1.lists[1].favorites[i].product.image.sizes.Large.url + '">');
          };
        }else if($high >= 40 && $high <= 60){
          for (var i = 0; i < 5; i++){
            $(".outfits").append('<img src="' +
            //winter outfits
            data1.lists[4].favorites[i].product.image.sizes.Large.url + '">');
          };
        }else if($high >= 60 && $high <= 80){
          for (var i = 0; i < 5; i++){
            $(".outfits").append('<img src="' +
            //winter outfits
            data1.lists[3].favorites[i].product.image.sizes.Large.url + '">');
          };
        }else if($high >= 80){
          for (var i = 0; i < 5; i++){
            $(".outfits").append('<img src="' +
            //winter outfits
            data1.lists[2].favorites[i].product.image.sizes.Large.url + '">');
          };
        }
      //end of second done function
      });



      //end of first done function
    });



  //end of click
  });
































// end of main document.ready function
});
