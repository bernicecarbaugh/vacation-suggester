// front-end logic
$(document).ready(function() {
  $("form#input").submit(function(event) {
    event.preventDefault();
    
    // reset from any previous runs
    $("#div-output").hide();

    // get user input
    // these inputs have defaults so no need to check for null values
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
      // call helper function to get suggestions, sending only those arguments that affect the vacation suggestion
      // since we want 3 suggestions, call the helper function three times
      // populate the output for all 3 pages but only show one page at a time
      var suggestedVacation1 = vacationSelector(habitatInput, densityInput, continentInput, 0);
      var suggestedVacation2 = vacationSelector(habitatInput, densityInput, continentInput, 1);
      var suggestedVacation3 = vacationSelector(habitatInput, densityInput, continentInput, 2);

      $('#imgSuggestedVacation1').attr('src',imgFileName(suggestedVacation1));
      $('#imgSuggestedVacation2').attr('src',imgFileName(suggestedVacation2));
      $('#imgSuggestedVacation3').attr('src',imgFileName(suggestedVacation3));
      
      $("span#suggestedVacation1").text(suggestedVacation1);
      $("span#suggestedVacation2").text(suggestedVacation2);
      $("span#suggestedVacation3").text(suggestedVacation3);

      // only display one page at a time
      changePage (1);

      // these inputs are only used to personalize output but not used in vacation selector function
      $("#when").text(whenInput);
      $("#activities").text(activityInput);
      $(".bgFavColor").css("background-color",favColorInput);
      // display output
      $("#div-output").show();
      
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

  var imgFileName = function(suggestedVacation) {
  // images are named all lower case, spaces are substituted with - and only through the first comma
      var strTemp = suggestedVacation.split(",")[0];
      strTemp = strTemp.replace(/\s/,"-");
      strTemp = "img/" + strTemp.toLowerCase() + ".jpg";
      return strTemp;
  }

  var changePage = function(numPage) {
  // this function hides or displays the appropriate text and image based on page
    $("li#outputNavPage1").removeClass("active");
    $("li#outputNavPage2").removeClass("active");
    $("li#outputNavPage3").removeClass("active");
    $("li#outputNavPage" + numPage).addClass("active");

    $("span#suggestedVacation1").hide();
    $("span#suggestedVacation2").hide();
    $("span#suggestedVacation3").hide();
    $("span#suggestedVacation" + numPage).fadeIn('slow');

    $("img#imgSuggestedVacation1").hide();
    $("img#imgSuggestedVacation2").hide();
    $("img#imgSuggestedVacation3").hide();
    $("img#imgSuggestedVacation" + numPage).slideDown('slow');
  }    

  $("#outputNavPage1").click(function() {
    changePage (1);
  })

  $("#outputNavPage2").click(function() {
    changePage (2);
  })

  $("#outputNavPage3").click(function() {
    changePage (3);
  })


})

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
          return "Pyeong Chang, South Korea";
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