$(document).ready(function(){

  $('form').submit(function(event){
    event.preventDefault()
  });

  $(".button").on("click", function(){
    //grabs city and state in search bar
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
      $(".location").append("It is currently: " + $degrees + " degrees fahrenheit, in " + $place);
      $(".location").append("Today's high will be: " + $high + " degrees fahrenheit");
      //end of first done function
    });

    let $xhr_1 = $.getJSON("http://api.shopstyle.com/api/v2/lists?pid=uid7364-40040942-41&userId=oaburgener");

    $xhr_1.done(function(data){
      console.log("data: ", data);

      // if($high <= 40){
        for (var i = 0; i < 5; i++){
          $(".outfits").append('<img src="' + data.lists[1].favorites[i].product.image.sizes.Large.url + '">');
        };
      // }
    //end of second done
    });

    // let $xhr_2 =  $.getJSON("http://api.shopstyle.com/api/v2/products/491295982?pid=uid7364-40040942-41");
    //
    // $xhr_2.done(function(data){
    //   console.log("data: ", data);
    // })

  //end of click function
  });
































// end of main document.ready function
});
