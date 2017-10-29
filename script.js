$(document).ready(function(){

  $('form').submit(function(event){
    event.preventDefault()
  });

  $(".button").on("click", function(){
    //grabs city and state in search bar
    let zipcode = parseInt($("#location-search")[0].value);
    if (zipcode === ""){
      alert("Please enter valid zip code. ex: 80027");
    }
    console.log(zipcode);

    let $xhr = $.getJSON("http://api.wunderground.com/api/04feeaa9a8fd5234/conditions/q=" + zipcode + ".json");

    // ("http://api.wunderground.com/api/04feeaa9a8fd5234/conditions/q/80027.json");
    $xhr.done(function(data){
      // console.log("data: ", data);

      let $degrees = data.current_observation.feelslike_f
      console.log($degrees);

      //end of done function
    });



  //end of click function
  });
































// end of main document.ready function
});
