
let numberCode = JSON.parse(localStorage.getItem('zipcode'));
if(localStorage.hasOwnProperty('zipcode')){
  $("#location-search")[0].value = numberCode;
};
womensList = {
  winter: 9,
  fall: 12,
  spring: 11,
  summer: 10
}

mensList = {
  winter: 6,
  fall: 5,
  spring: 4,
  summer: 3
}
function winterFunc(pancake, listNumber) {
  let result = [];
  for(var i = 0; i < 5; i++) {
    result.push(pancake.lists[listNumber].favorites[i].product.image.sizes.Large.url)
  }
  return result;
}
function fallFunc(pancake, listNumber) {
  let result = [];
  for(var i = 0; i < 5; i++) {
    result.push(pancake.lists[listNumber].favorites[i].product.image.sizes.Large.url)
  }
  return result;
}
function springFunc(pancake, listNumber) {
  let result = [];
  for(var i = 0; i < 5; i++) {
    result.push(pancake.lists[listNumber].favorites[i].product.image.sizes.Large.url)
  }
  return result;
}
function summerFunc(pancake, listNumber) {
  let result = [];
  for(var i = 0; i < 5; i++) {
    result.push(pancake.lists[listNumber].favorites[i].product.image.sizes.Large.url)
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
    $(".extras-text").empty();
    $(".accessories-pics").empty();
    $(".accessories-text").empty();

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


      $(".locationText").append("It is currently " + $degrees + " degrees fahrenheit, in " + $place + "</br></br> Today's high will be: " + $high + " degrees fahrenheit").css("border", "5px dotted black");

      $(".outfits-text").append("Based on the weather conditions of " + $place + " we suggest a combination of the articles of clothing below!");

      let $feelsLike = data.current_observation.feelslike_f;

      $(".extras-text").append("It feels like " + $feelsLike + " degrees outside right now so you might want to bring an extra...");


      let $xhr_1 = $.getJSON("http://api.shopstyle.com/api/v2/lists?pid=uid7364-40040942-41&userId=oaburgener&limit=13");

      $xhr_1.done(function dataGrab2(data1){
        console.log("data: ", data1);
        if($("#select-menu").val() === "womens-clothing"){

          if($high <= 40){
            let clothesArray = winterFunc(data1, womensList.winter)
            for (let element of clothesArray){
              $(".outfits").append('<img src="' + element + '">');
            };

          }else if($high >= 40 && $high <= 65){
            let clothesArray = fallFunc(data1, womensList.fall)
            for (let element of clothesArray){
              $(".outfits").append('<img src="' + element + '">');
            };

          }else if($high >= 65 && $high <= 80){
            let clothesArray = springFunc(data1, womensList.spring)
            for (let element of clothesArray){
              $(".outfits").append('<img src="' + element + '">');
            };

          }else if($high >= 80){
            let clothesArray = summerFunc(data1, womensList.summer)
            for (let element of clothesArray){
              $(".outfits").append('<img src="' + element + '">');
            };
          };

          //feels like area so you can wear extra when it's cold in the morning
          if($feelsLike <= 50){
              $(".extras").append('<img src="' +
              data1.lists[8].favorites[4].product.image.sizes.Large.url + '">');
              $(".extras").append('<img src="' +
              data1.lists[8].favorites[3].product.image.sizes.Large.url + '">');

          }else if($feelsLike >= 50 && $feelsLike <= 65 ){
              $(".extras").append('<img src="' +
              data1.lists[8].favorites[2].product.image.sizes.Large.url + '">');
              $(".extras").append('<img src="' +
              data1.lists[8].favorites[3].product.image.sizes.Large.url + '">');
              $(".extras").append('<img src="' +
              data1.lists[8].favorites[0].product.image.sizes.Large.url + '">');
          }else if($feelsLike >= 65){
              $(".extras").append('<img src="' +
              data1.lists[8].favorites[1].product.image.sizes.Large.url + '">');
          };

          //random accessory
          $(".accessories-text").append("And just for fun here is an extra accessory...");

          function accessoryArray(){
            let picturesArr = [];
            for(var i = 0; i < 5; i++){
              picturesArr.push(data1.lists[7].favorites[i].product.image.sizes.Large.url)
            }
            return picturesArr;
          }
          accessoryArray();


          function randomAccessory(){
            var pictures = accessoryArray();
            return $(".accessories-pics").append('<img src="' + pictures[(Math.floor(Math.random() * pictures.length))] + '">');
          }
          randomAccessory();

//mens clothing/////////
        }else if($("#select-menu").val() === "mens-clothing"){
          console.log($(".preference").val());
          if($high <= 40){
            let clothesArray = winterFunc(data1, mensList.winter)
            for (let element of clothesArray){
              $(".outfits").append('<img src="' + element + '">');
            };

          }else if($high >= 40 && $high <= 65){
            let clothesArray = fallFunc(data1, mensList.fall)
            for (let element of clothesArray){
              $(".outfits").append('<img src="' + element + '">');
            };

          }else if($high >= 65 && $high <= 80){
            let clothesArray = springFunc(data1, mensList.spring)
            for (let element of clothesArray){
              $(".outfits").append('<img src="' + element + '">');
            };

          }else if($high >= 80){
            let clothesArray = summerFunc(data1, mensList.summer)
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
              data1.lists[2].favorites[3].product.image.sizes.Large.url + '">');
              $(".extras").append('<img src="' +
              data1.lists[2].favorites[2].product.image.sizes.Large.url + '">');
              $(".extras").append('<img src="' +
              data1.lists[2].favorites[1].product.image.sizes.Large.url + '">');
          }else if($feelsLike >= 65){
              $(".extras").append('<img src="' +
              data1.lists[2].favorites[0].product.image.sizes.Large.url + '">');
          };

          //random accessory
          $(".accessories-text").append("And just for fun here is an extra accessory...");

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
        }


        //winter outfits






      //end of second done function
      });



      //end of first done function
    });



  //end of click
  });









// end of main document.ready function
});
