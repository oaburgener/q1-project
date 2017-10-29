$(document).ready(function(){

  $('form').submit(function(event){
    event.preventDefault()
  });

  $(".button").on("click", function(){
    //grabs city and state in search bar
    let cityState = $("#location-search")[0].value;
    if (cityState === ""){
      alert("Please enter valid city and state. ex: Boulder, Colorado");
    }


    let $xhr =                      $.getJSON("http://api.wunderground.com/api/04feeaa9a8fd5234/conditions/q/CA/San_Francisco.json");
    $xhr.done(function(data){
      console.log("data: ", data);

      let $degrees = data.current_observation.feelslike_f
      console.log($degrees);





      //end of done function
    });

  //end of click function
  });
































// end of main document.ready function
});
