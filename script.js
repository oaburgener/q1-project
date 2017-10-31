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

      let $degrees = data.current_observation.feelslike_f
      console.log($degrees);
      //end of done function
    });

    let $xhr_1 = $.getJSON("http://api.shopstyle.com/api/v2/lists?pid=uid7364-40040942-41&userId=oaburgener");

    // "http://api.shopstyle.com/api/v2/products/359131344?pid=uid7364-40040942-41"

    $xhr_1.done(function(data){
      console.log("data: ", data);
      
      $(".outfits").append('<img src="' + data.lists[1].favorites[0].product.image.sizes.Large.url + '">');
      $(".outfits").append('<img src="' + data.lists[1].favorites[1].product.image.sizes.Large.url + '">');
      $(".outfits").append('<img src="' + data.lists[1].favorites[2].product.image.sizes.Large.url + '">');
      $(".outfits").append('<img src="' + data.lists[1].favorites[3].product.image.sizes.Large.url + '">');
      $(".outfits").append('<img src="' + data.lists[1].favorites[4].product.image.sizes.Large.url + '">');


      // ('<img src=" + data.lists[1].favorites[0].product.image.sizes.Best.url + "/>');
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
