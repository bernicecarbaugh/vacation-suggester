// back end logic

var vacation = function(iHabitat, iDensity, iContinent) {
  if iContinent === "Asia"
  
  return "anywhere";
}


// front-end logic
$(document).ready(function() {
  $("form#input").submit(function(event) {
    event.preventDefault();
    
    // remove traces of previous runs
    // get user input; some inputs have defaults so no need to check for null values
    var iHabitat = $("input:radio[name=habitat]:checked").val();
    var iContinent = $("#continent").val();
    var iDensity = parseInt($("#density").val());
    var iFavColor = $("#favColor").val();
    // check that user entered something
    var iActivity = $("#activity").val();
    var iWhen = "";
    if($("#when1").is(":checked")) { 
      iWhen += $("#when1").val() + ", "
    }
    if($("#when2").is(":checked")) { 
      iWhen += $("#when2").val() + ", "
    }
    if($("#when3").is(":checked")) { 
      iWhen += $("#when3").val() + ", "
    }
    if($("#when4").is(":checked")) { 
      iWhen += $("#when4").val() + ", "
    }
    iWhen = iWhen.replace(/, $/,"");

    isValid(iActivity, "div-activity") ;
    isValid(iWhen, "div-when") ;
    
    if (iActivity && iWhen) {
      // send some inputs into back-end logic to get suggestions
      var oSuggestion = vacation(iHabitat, iDensity, iContinent);
      // other inputs will just be used to respond to user
      $("#suggestion").text(oSuggestion);
      $("#when").text(iWhen);
      $("#activities").text(iActivity);
      $("div.output").fadeIn();
      $("div.travelquote").css("background-color",iFavColor);
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

