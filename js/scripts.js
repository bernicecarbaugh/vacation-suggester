// back end logic

var vacation = function(habitat, density, color, continent, when) {
  return "anywhere";
}


// front-end logic
$(document).ready(function() {
  $("form#input").submit(function(event) {
    event.preventDefault();
    
    // remove traces of previous runs
    // get user input; some inputs have defaults so no need to check for null values
    var sHabitat = $("input:radio[name=habitat]:checked").val();
    var sContinent = $("#continent").val();
    var nDensity = parseInt($("#density").val());
    var sFavColor = $("#favColor").val();
    // check that user entered something
    var sActivity = $("#activity").val();
    var sWhen = "";
    if($("#when1").is(":checked")) { 
      sWhen += $("#when1").val() + ", "
    }
    if($("#when2").is(":checked")) { 
      sWhen += $("#when2").val() + ", "
    }
    if($("#when3").is(":checked")) { 
      sWhen += $("#when3").val() + ", "
    }
    if($("#when4").is(":checked")) { 
      sWhen += $("#when4").val() + ", "
    }

    isValid(sActivity, "div-activity") ;
    isValid(sWhen, "div-when") ;
    
    if (sActivity && sWhen) {
      alert ("display options");
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

