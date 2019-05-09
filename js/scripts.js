// back end logic
var vacationSelector = function(habitatInput, densityInput, continentInput, suggestionOrder)  {
// parameters: user preferences and the suggestion order
//  suggestion order expected to be 1 to 3 which represents the order in which it's presented
//  for first pass or suggestionOrder, stick closest to user's preference for density (city vs wilderness)
//  for second pass, go further
//  for last pass, go furthest
//  this ensures we have three different suggestions for any user preference
//  densityInput is expected to be an integer from 1 to 3
// output: the name of the suggested vacation destination

  // urban
  if (densityInput === 1) {
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
        vacationSelected = "Munich, Germany";
        }
      else if (habitatInput === "beach" ||habitatInput === "desert") {
        vacationSelected = "Barcelona, Spain";
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
  else if (densityInput === 2) {
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
        vacationSelected = "Copenhagen, Denmark";
        }
      else if (habitatInput === "beach" ||habitatInput === "desert") {
        vacationSelected = "Biarritz, France";
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
  // else densityInput === 3
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
        vacationSelected = "Retezat Mountains, Romania";
        }
      else if (habitatInput === "beach" ||habitatInput === "desert") {
        vacationSelected = "Mallorca, Spain";
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
      // send some inputs into back-end logic to get suggestions
      // other inputs will just be used to respond to user
      var suggestionOutput = vacationSelector(habitatInput, densityInput, continentInput, 1);
      $("#suggestion").text(suggestionOutput);
      $("#when").text(whenInput);
      $("#activities").text(activityInput);
      $("div.output").fadeIn();
      $("div.travelquote").css("background-color",favColorInput);
      alert(suggestionOutput);
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

})