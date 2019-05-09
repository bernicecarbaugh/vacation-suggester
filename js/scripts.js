// back end logic
var vacationSelector = function(habitatInput, densityInput, continentInput, numOffset)  {
// parameters: user preferences and the numOffset
//  numOffset is expected to be 0 to 2 which represents the suggestion order
//  we use numOffset to present 3 different choices based on densityInput (1 to 3)
//  this ensures we have three different suggestions for any user preference
// output: the name of the suggested vacation destination

  var densitySelector = (densityInput + numOffset ) 
  // this will produce a number between 1 and 5 , which we will need to convert to 1 to 3 
  if ( densitySelector > 3) {
    densitySelector = densitySelector - 3 ;
  }
  // urban
  if (densitySelector === 1) {
    if (continentInput === "Asia") {
      if (habitatInput === "forest" || habitatInput === "mountain" ) {
        return "Tokyo, Japan";
        }
      else if (habitatInput === "beach" ||habitatInput === "desert") {
        return "Abu Dhabi, United Arab Emirates";
        }
      }
    else if (continentInput === "Europe") {
      if (habitatInput === "forest" || habitatInput === "mountain" ) {
        return "Munich, Germany";
        }
      else if (habitatInput === "beach" ||habitatInput === "desert") {
        return "Barcelona, Spain";
        }
      }
    // continentInput === "Americas" 
    else { 
      if (habitatInput === "forest" || habitatInput === "mountain" ) {
        return "Rio de Janeiro, Brazil";
        }
      else if (habitatInput === "beach" ||habitatInput === "desert") {
        return "Los Angeles, California, United States";
        }
      }
  }
  else if (densitySelector === 2) {
    if (continentInput === "Asia") {
      if (habitatInput === "forest" || habitatInput === "mountain" ) {
        return "Pyong Yang, South Korea";
        }
      else if (habitatInput === "beach" ||habitatInput === "desert") {
        return "Phuket, Thailand";
        }
      }
    else if (continentInput === "Europe") {
      if (habitatInput === "forest" || habitatInput === "mountain" ) {
        return "Copenhagen, Denmark";
        }
      else if (habitatInput === "beach" ||habitatInput === "desert") {
        return "Biarritz, France";
        }
      }
    // continentInput === "Americas" 
    else { 
      if (habitatInput === "forest" || habitatInput === "mountain" ) {
        return "Seattle, Washington, United States";
        }
      else if (habitatInput === "beach" ||habitatInput === "desert") {
        return "Costa Rica";
        }
    }
  }
  // else densitySelector === 3
  else {
    if (continentInput === "Asia") {
      if (habitatInput === "forest" || habitatInput === "mountain" ) {
        return "Himalayas, Bhutan";
        }
      else if (habitatInput === "beach" ||habitatInput === "desert") {
        return "Bali, Indonesia";
        }
      }
    else if (continentInput === "Europe") {
      if (habitatInput === "forest" || habitatInput === "mountain" ) {
        return "Retezat Mountains, Romania";
        }
      else if (habitatInput === "beach" ||habitatInput === "desert") {
        return "Mallorca, Spain";
        }
      }
    // continentInput === "Americas" 
    else { 
      if (habitatInput === "forest" || habitatInput === "mountain" ) {
        return "Patagonia, Chile";
        }
      else if (habitatInput === "beach" ||habitatInput === "desert") {
        return "Galapagos, Ecuador";
      }
    } 
  }
}

// front-end logic
$(document).ready(function() {
  $("form#input").submit(function(event) {
    event.preventDefault();
    
    // remove traces of previous runs
    // get user input; some inputs have defaults so no need to check for null values
    var habitatInput = $("input:radio[name=habitat]:checked").val();
    var continentInput = $("#continent").val();
    var densityInput = parseInt($("#density").val());
    var favColorInput = $("#favColor").val();
    // check that user entered something
    var activityInput = $("#activity").val();
    var whenInput = "";
    if($("#when1").is(":checked")) { 
      whenInput += $("#when1").val() + ", "
    }
    if($("#when2").is(":checked")) { 
      whenInput += $("#when2").val() + ", "
    }
    if($("#when3").is(":checked")) { 
      whenInput += $("#when3").val() + ", "
    }
    if($("#when4").is(":checked")) { 
      whenInput += $("#when4").val() + ", "
    }
    whenInput = whenInput.replace(/, $/,"");

    isValid(activityInput, "div-activity") ;
    isValid(whenInput, "div-when") ;
    
    if (activityInput && whenInput) {
      // other inputs will just be used to respond to user
      $("#when").text(whenInput);
      $("#activities").text(activityInput);
      $("div.output").fadeIn();
      $(".bgFavColor").css("background-color",favColorInput);
      // call helper function which changes only those elements that change for the different suggestions (1 to 3); since this is the first call, start with 1
      // send some inputs into back-end logic to get suggestions
      var suggestedVacation = vacationSelector(habitatInput, densityInput, continentInput, 0);
      console.log (suggestedVacation);
      changeOutputHTML (suggestedVacation, 1 );
      
    } else {
      alert ("We need more information to get you some awesome suggestions.")
    }
  })

  // check if passed input is valid; if valid, remove has-error class; else add has-error class 
  var isValid = function(toCheck, domID) {
    if ( toCheck ) {
      $("#" + domID).removeClass("has-error");
      return true;
    } else {
      $("#" + domID).addClass("has-error");
      return false;
    }
  }

  var changeOutputHTML = function(suggestedVacation, numOffset) {
    $("#suggestedVacation").text(suggestedVacation);
    // images are named all lower case, spaces are substituted with - and only through the first comma
    var imgFile = suggestedVacation.split(",")[0];
    imgFile = imgFile.replace(/\s/,"-");
    imgFile = "img/" + imgFile.toLowerCase() + ".jpg";
    
    $('#imgSuggestedVacation').attr('src',imgFile);
    $("#outputNavPage1").removeClass("active");
    $("#outputNavPage2").removeClass("active");
    $("#outputNavPage3").removeClass("active");
    $("#outputNavPage" + numOffset).addClass("active");
  }    

  $("#outputNavPage2").click(function() {
    changeOutputHTML (suggestedVacation, numOffset);
  })



})