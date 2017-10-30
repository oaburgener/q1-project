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

    let $xhr_1 = $.getJSON("https://forecast-calls-for-fashion.herokuapp.com/api/v2/products/359131344?pid=uid7364-40040942-41");

    $xhr_1.done(function(data){
      console.log("data: " + data)
    })


  //end of click function
  });
































// end of main document.ready function
});
