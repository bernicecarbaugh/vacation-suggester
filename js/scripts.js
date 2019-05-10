// front-end logic
$(document).ready(function() {
  $("form#input").submit(function(event) {
    event.preventDefault();
    
    // reset output
    $("#div-output").hide();

    // get user input
    // these inputs always have values so no need to check for null values
    var habitatInput = $("input:radio[name=habitat]:checked").val();
    var continentInput = $("#continent").val();
    var densityInput = parseInt($("#density").val());
    var favColorInput = $("#favcolor").val();

    // these inputs may be null, so check that user entered something
    var activityInput = $("#activity").val();
    isValid(activityInput, "div-activity") ;

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
    // replace final ", " with null string
    whenInput = whenInput.replace(/, $/,"");
    isValid(whenInput, "div-when") ;
    
    // call helper function to get suggestions, sending only those arguments that affect the vacation suggestion
    // since we want 3 suggestions, call the helper function three times
    // populate the output for all 3 pages but only show one page at a time
    if (activityInput && whenInput) {

      // I know this would be more efficient with arrays and loops but haven't learned that yet
      var suggestedVacation1 = vacationSelector(habitatInput, densityInput, continentInput, 0);
      var suggestedVacation2 = vacationSelector(habitatInput, densityInput, continentInput, 1);
      var suggestedVacation3 = vacationSelector(habitatInput, densityInput, continentInput, 2);

      $('img#suggested-image1').attr('src',imgFileName(suggestedVacation1));
      $('img#suggested-image2').attr('src',imgFileName(suggestedVacation2));
      $('img#suggested-image3').attr('src',imgFileName(suggestedVacation3));
      $("span#suggested-text1").text(suggestedVacation1);
      $("span#suggested-text2").text(suggestedVacation2);
      $("span#suggested-text3").text(suggestedVacation3);

      // display first page initially
      changePage (1);

      // these inputs are only used to personalize output but not used in vacation selector function
      $("#when").text(whenInput);
      $("#activities").text(activityInput);
      $("#div-output").css("border-color",favColorInput);
      
      // display output
      $("#div-output").show();
      
    } else {
      alert ("We need more information to get you some awesome suggestions.")
    }
  })

  $("#output-nav-page1").click(function() {
    changePage (1);
  })

  $("#output-nav-page2").click(function() {
    changePage (2);
  })

  $("#output-nav-page3").click(function() {
    changePage (3);
  })

  // sets styling of domID based on toCheck and returns whether toCheck is truthy or falsey
  var isValid = function(toCheck, domID) {
    if ( toCheck ) {
    // if truthy, remove has-error class; if falsey, add has-error class 
    $("#" + domID).removeClass("has-error");
      return true;
    } else {
      $("#" + domID).addClass("has-error");
      return false;
    }
  }

  // returns image file name based on suggestedVacation
  var imgFileName = function(suggestedVacation) {
  // naming convention: extract first part before comma, convert spaces to -, lowercase, .jpg suffix in img folder
      var strTemp = suggestedVacation.split(",")[0];
      strTemp = strTemp.replace(/\s/g,"-");
      strTemp = "img/" + strTemp.toLowerCase() + ".jpg";
      return strTemp;
  }

  // styles HTML elements in output based on numPage
  var changePage = function(numPage) {
    // highlight selected page number in pagination
    $("li.output-nav-page").removeClass("active");
    $("li#output-nav-page" + numPage).addClass("active");

    // display selected vacation text only
    $("span.suggested-text").hide();
    $("span#suggested-text" + numPage).fadeIn('slow');

    // display selected vacation image only
    $("img.suggested-image").hide();
    $("img#suggested-image" + numPage).fadeIn('slow');
  }    

})

// back end logic

// returns one vacation suggestion based on user inputs and an offset
var vacationSelector = function(habitatInput, densityInput, continentInput, numOffset)  {
  // parameters: user preferences and numOffset
  //  numOffset is expected to be 0 to 2 which represents the suggestion page (1 to 3)
  //  we use numOffset to present 3 different choices based on densityInput (1 to 3)
  //  this ensures we have three different suggestions for any user preference
  
    var densitySelector = (densityInput + numOffset ) 
    // this will be a number between 1 and 5 , which we will need to convert to 1 to 3 
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