//
// let numberCode = JSON.parse(localStorage.getItem('zipcode'));
// if(localStorage.hasOwnProperty('zipcode')){
//   var message = prompt("Would you like to use your previous zipcode?");
// };
// if(message === "yes"){
//   $("#location-search")[0].value = numberCode;
// };


function winterFunc(pancake) {
  let result = [];
  for(var i = 0; i < 7; i++) {
    result.push(pancake.lists[3].favorites[i].product.image.sizes.Large.url)
  }
  return result;
}
function fallFunc(pancake) {
  let result = [];
  for(var i = 0; i < 5; i++) {
    result.push(pancake.lists[6].favorites[i].product.image.sizes.Large.url)
  }
  return result;
}
function springFunc(pancake) {
  let result = [];
  for(var i = 0; i < 5; i++) {
    result.push(pancake.lists[5].favorites[i].product.image.sizes.Large.url)
  }
  return result;
}
function summerFunc(pancake) {
  let result = [];
  for(var i = 0; i < 5; i++) {
    result.push(pancake.lists[4].favorites[i].product.image.sizes.Large.url)
  }
  return result;
}

$(document).ready(function(){

  $('form').submit(function(event){
    event.preventDefault()
  });

  $(".button").on("click", function(){

    //empties boxes filled with text and pictures
    $(".locationText").empty();
    $(".outfits").empty();
    $(".outfits-text").empty();
    $(".extras").empty();

    //grabs city and state in search bar
    let zipcode = $("#location-search")[0].value;
    if (zipcode === ""){
      alert("Please enter valid zip code. ex: 80027");
    }
    console.log(zipcode);

    localStorage.setItem('zipcode', JSON.stringify(zipcode));

    let $xhr = $.getJSON("http://api.wunderground.com/api/04feeaa9a8fd5234/conditions/forecast/q/" + zipcode + ".json");

    $xhr.done(function dataWeather(data){
      console.log("data: ", data);

      let $degrees = data.current_observation.temp_f;
      let $place = data.current_observation.display_location.full;
      let $high = parseInt(data.forecast.simpleforecast.forecastday[0].high.fahrenheit);


      $(".locationText").append("It is currently " + $degrees + " degrees fahrenheit, in " + $place + "</br></br> Today's high will be: " + $high + " degrees fahrenheit");

      $(".outfits-text").append("Based on the weather conditions of " + $place + " we suggest a combination of the articles of clothing below!");

      let $feelsLike = data.current_observation.feelslike_f;

      $(".extras-text").append("It feels like " + $feelsLike + " degrees outside right now so you might want to wear a...");


      let $xhr_1 = $.getJSON("http://api.shopstyle.com/api/v2/lists?pid=uid7364-40040942-41&userId=oaburgener&includeProducts=7");

      $xhr_1.done(function dataGrab2(data1){
        console.log("data: ", data1);
        //winter outfits
        if($high <= 40){
          let clothesArray = winterFunc(data1)
          for (let element of clothesArray){
            $(".outfits").append('<img src="' + element + '">');
          };

        }else if($high >= 40 && $high <= 65){
          let clothesArray = fallFunc(data1)
          for (let element of clothesArray){
            $(".outfits").append('<img src="' + element + '">');
          };

        }else if($high >= 65 && $high <= 80){
          let clothesArray = springFunc(data1)
          for (let element of clothesArray){
            $(".outfits").append('<img src="' + element + '">');
          };

        }else if($high >= 80){
          let clothesArray = springFunc(data1)
          for (let element of clothesArray){
            $(".outfits").append('<img src="' + element + '">');
          };
        };

        //feels like area so you can wear extra when it's cold in the morning
        if($feelsLike <= 50){
            $(".extras").append('<img src="' +
            data1.lists[2].favorites[4].product.image.sizes.Large.url + '">');
            $(".extras").append('<img src="' +
            data1.lists[2].favorites[3].product.image.sizes.Large.url + '">');

        }else if($feelsLike >= 50 && $feelsLike <= 65 ){
            $(".extras").append('<img src="' +
            data1.lists[2].favorites[2].product.image.sizes.Large.url + '">');
            $(".extras").append('<img src="' +
            data1.lists[2].favorites[3].product.image.sizes.Large.url + '">');
            $(".extras").append('<img src="' +
            data1.lists[2].favorites[0].product.image.sizes.Large.url + '">');
        }else if($feelsLike >= 65){
            $(".extras").append('<img src="' +
            data1.lists[2].favorites[1].product.image.sizes.Large.url + '">');
        };


        //random accessory
        function accessoryArray(){
          let picturesArr = [];
          for(var i = 0; i < 5; i++){
            picturesArr.push(data1.lists[1].favorites[i].product.image.sizes.Large.url)
          }
          return picturesArr;
        }
        accessoryArray();


        function randomAccessory(){
          var pictures = accessoryArray();
          return $(".accessories-pics").append('<img src="' + pictures[(Math.floor(Math.random() * pictures.length))] + '">');
        }
        randomAccessory();





      //end of second done function
      });



      //end of first done function
    });



  //end of click
  });









// end of main document.ready function
});
