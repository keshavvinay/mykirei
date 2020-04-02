
$(document).ready(function() {
  'use strict';

  var baselineWidth = $(window).width();
  var fullHeight;
  var q6PositionTop;
  var q6PosiitionBottom;
  var q6PosiitionBottomOffset;
  var selectedLookQuestion = [];
  var selectedLookAnswer = [];
  var selectedQuestionAnswer = [];
  var redirectionURL = [];
  var removelist = [];

  if (!window.kaoAPI.isAuthorring) {
	$('#divYourLookError').addClass('message-errors-hidden');
  }
  
  function loadFunctions() {
    // make look selectors square
    var selectorCount = $('.LookSelectorTool__selectorVector, .LookSelectorTool__selectorRaster, .LookSelectorTool__selectorText').length;


    $('.LookSelectorTool__selectorVector, .LookSelectorTool__selectorRaster, .LookSelectorTool__selectorText').each(function(i){
      $(this).css('height', Math.round($(this).width()));
      $(this).children('img').css('height', Math.round($(this).width()));
      if(i == selectorCount - 1) {
        // open the first panel
        expandClickedPanel($('.LookSelectorTool__step:first .LookSelectorTool__stepHeading'));
      }
    });

  }

  function handleSelectors(clickedSelector) {

    // handle marking selector checked if previously unchecked
    if(!clickedSelector.hasClass('selected') || clickedSelector.hasClass('LookSelectorTool__tapToSkip')) {
        
        // Product Filter - 2
        var selectedQuestionString = clickedSelector.find('input').attr("id");
        if (selectedQuestionString != undefined && selectedQuestionString.indexOf("-") > -1) {
        	var selectedQuestionArray =  selectedQuestionString.split("-");
			var selectedQuestion = selectedQuestionArray[0].toUpperCase();
			var linkTrackEvents = '';
			var selectedQuestionAnalytics = selectedQuestion + '_Product Filter';
        }
        var eventArrays = {"Q1" : "event30,event42", "Q2" : "event31,event43", "Q3" : "event32,event44", "Q4" : "event33,event45", "Q5" : "event34,event46", "Q6_SKIP" : "event35,event40,event47", "Q6_NEXT" : "event35,event41,event47","Q7" : "event36,event48", "Q8" : "event37,event49", "Q9" : "event38,event50"};  
        // Product Filter - 2

      // handle all questions except question 6
      if(!$(clickedSelector).parent().hasClass('LookSelectorTool__selectorWrap6') && !$(clickedSelector).parent().parent().hasClass('LookSelectorTool__selectorWrap6')) {
        clickedSelector.addClass('selected');

        // mark siblings unselected, select this one
        clickedSelector.siblings('.LookSelectorTool__selector').removeClass('selected').children('input').prop('checked', false);
        
        // Product Filter - 2
        if( typeof s !== "undefined" ) {        
          s.linkTrackVars="events";
          s.linkTrackEvents=eventArrays[selectedQuestion];
          s.events=eventArrays[selectedQuestion];
          s.tl(this,'o', selectedQuestionAnalytics);
        }
        // Product Filter - 2
        
      }

      // handle question 6 which can have up to two selectors selected and an overlay to skip a second selection
      else {
        // handle actual selectors
        if(!clickedSelector.hasClass('LookSelectorTool__tapToSkip')) {
            
          if(clickedSelector.parent().children('.selected').length === 0) {
            // Product Filter - 2        
            if( typeof s !== "undefined" ) {  
              s.linkTrackVars="events";
              s.linkTrackEvents=eventArrays["Q6_SKIP"];
              s.events=eventArrays["Q6_SKIP"];
              s.tl(this,'o', selectedQuestionAnalytics);
            }
            // Product Filter - 2
            
            clickedSelector.addClass('selected');
            // $('.LookSelectorTool__tapToSkip').addClass('LookSelectorTool__tapToSkipVisible');
            
            clickedSelector.parent().parent().parent().removeClass('activeStep').addClass('expandedStep');
            var nextStep = clickedSelector.parent().parent().parent().next();
            $(nextStep).children().each(function(){
              fullHeight = fullHeight + $(this).outerHeight(true);
            });
            $(nextStep).addClass('activeStep').css('max-height', fullHeight);
            
            return false;
          }
          else if(clickedSelector.parent().children('.selected').length == 1) {
            // Product Filter - 2    
            if( typeof s !== "undefined" ) {      
              s.linkTrackVars="events";
              s.linkTrackEvents=eventArrays["Q6_NEXT"];
              s.events=eventArrays["Q6_NEXT"];
              s.tl(this,'o', selectedQuestionAnalytics);
            }
            // Product Filter - 2
            
            clickedSelector.addClass('selected');
            $('.LookSelectorTool__tapToSkip').removeClass('LookSelectorTool__tapToSkipVisible');
          }
          else {
            setTimeout(function() {
              clickedSelector.children().prop('checked', false);
            }, 100);
            return false;
          }
        }

        // handle the skip button
        else {

          if(clickedSelector.parent().parent().children('.selected').length === 0) {
            return false;
          }

          clickedSelector.removeClass('LookSelectorTool__tapToSkipVisible');

          setTimeout(function() {
            clickedSelector.parent().parent().parent().removeClass('activeStep').addClass('expandedStep');
            var nextStep = clickedSelector.parent().parent().parent().next();
            $(nextStep).children().each(function(){
              fullHeight = fullHeight + $(this).outerHeight(true);
            });
            $(nextStep).addClass('activeStep').css('max-height', fullHeight);
            setTimeout(function() {
              $('body').scrollTo(nextStep, {
                duration: 300,
                offset: -50
              });

            }, 100);
          }, 200);
          
          // Product Filter - 2
          if( typeof s !== "undefined" ) {  
            s.linkTrackVars="events";
            s.linkTrackEvents=eventArrays["Q6_SKIP"];
            s.events=eventArrays["Q6_SKIP"];
            s.tl(this,'o', 'Q6_Product Filter');
          }
          // Product Filter - 2

          return false;
        }

      }

      // collapse the parent wrapper of this element and open the next one
      setTimeout(function() {
        clickedSelector.parent().parent().removeClass('activeStep').addClass('expandedStep');
        var nextStep = clickedSelector.parent().parent().next();
        $(nextStep).children().each(function(){
          fullHeight = fullHeight + $(this).outerHeight(true);
        });
        $(nextStep).addClass('activeStep').css('max-height', fullHeight);

        if(nextStep.children().hasClass('LookSelectorTool__selectorWrap6')) {
          var q6PositionTop = $('.LookSelectorTool__selectorWrap6').offset().top;
          var q6PosiitionBottom = $('.LookSelectorTool__selectorWrap6').offset().top + $('.LookSelectorTool__selectorWrap6').height();
          resetQ6ScrollSpy(q6PositionTop, q6PosiitionBottom);
        }


        setTimeout(function() {
          $('body').scrollTo(nextStep, {
            duration: 300,
            offset: -50
          });

        }, 100);
      }, 200);


    }

    // handle marking selector unchecked if previously checked
    else {
      clickedSelector.removeClass('selected');
    }


  }

  function selectFinal(clickedSelector) {

    // mark siblings unselected, select this one and add an data attribute showing that it was selected
    clickedSelector.siblings('.LookSelectorTool__selector.selected').removeClass('selected');
    // clickedSelector.addClass('selected').attr('data-selected', 'selected');
	clickedSelector.addClass('selected');
    
    // Product Filter - 2
    var selectedQuestionString = clickedSelector.find('input').attr("id");
    if (selectedQuestionString != undefined && selectedQuestionString.indexOf("-") > -1) {
        var selectedQuestionArray =  selectedQuestionString.split("-");
        var selectedQuestion = selectedQuestionArray[0].toUpperCase();
        var linkTrackEvents = '';
        var selectedQuestionAnalytics = selectedQuestion + '_Product Filter';
    }
    var eventArrays = {"Q1" : "event30,event42", "Q2" : "event31,event43", "Q3" : "event32,event44", "Q4" : "event33,event45", "Q5" : "event34,event46", "Q6_SKIP" : "event35,event40,event47", "Q6_NEXT" : "event35,event41,event47","Q7" : "event36,event48", "Q8" : "event37,event49", "Q9" : "event38,event50"};  
    
    if( typeof s !== "undefined" ) {  
      s.linkTrackVars="events";
      s.linkTrackEvents=eventArrays[selectedQuestion];
      s.events=eventArrays[selectedQuestion];
      s.tl(this,'o', selectedQuestionAnalytics);
    }
    // Product Filter - 2

    setTimeout(function() {
        clickedSelector.parent().parent().removeClass('activeStep');
        setTimeout(function() {
          $('body').scrollTo('.LookSelectorTool__submit', {
            duration: 300,
            offset: -100
          });
        }, 200);
      }, 1000);
  }

  function expandClickedPanel(clickedHeading) {
    fullHeight = $(clickedHeading).outerHeight(true) + $(clickedHeading).nextAll().outerHeight(true) + 70;
    $(clickedHeading).parent().addClass('activeStep').css('max-height', fullHeight);
  }

  function resetQ6ScrollSpy(q6PositionTop, q6PosiitionBottom) {


      // reset q6 scrollspy after document height changes (like when a panel opens)
      $('.LookSelectorTool__selectorWrap6').scrollspy('destroy');
      $('.LookSelectorTool__selectorWrap6').scrollspy({
        min: q6PositionTop,
        max: q6PosiitionBottom - 100,
        onEnter: function(element, position) {
            if($('.LookSelectorTool__selectorWrap6').parent().hasClass('activeStep')) {
              $('.LookSelectorTool__selectorWrap6').removeClass('.LookSelectorTool__tapToSkipPast');
            }

        },
        onLeaveBottom: function(element, position) {
          if($('.LookSelectorTool__selectorWrap6').parent().hasClass('activeStep')) {
            $('.LookSelectorTool__selectorWrap6').addClass('.LookSelectorTool__tapToSkipPast');
            var clickedSelector = $('.LookSelectorTool__tapToSkip');
            handleSelectors(clickedSelector);
          }
        }
    });

  }

  function lookSelectorValidation() {
    var numOfClicks = 0;
    $('.LookSelectorTool__getYourMatch').on('click', function(e) {
      e.preventDefault();
          numOfClicks++;

      var numSelected = $('.LookSelectorTool__selectorVector.selected, .LookSelectorTool__selectorRaster.selected, .LookSelectorTool__selectorRasterTall.selected, .LookSelectorTool__selectorText.selected').length;

      var step6 = $('.LookSelectorTool__selectorWrap6').find('.selected').length;

      if (step6 == 2) {
        step6 = 1;
        numSelected = numSelected - step6;
      }

      if (numSelected <= 8 && numOfClicks == 1) {
        var errorMessage = '<span>Please complete all questions above to get your Style Match</span>';
        $('.LookSelectorTool__errors').addClass('message-errors-visible').append(errorMessage);
      } else if (numSelected == 9) {
        $('.LookSelectorTool__errors').removeClass('message-errors-visible');
        $('.LookSelectorTool__errors span').remove();
      }

    });

  }
  
    function yourLookLandingValidation() {
	  
	var customValidate = $('.LookSelectorTool__selectorWrap');
	var errorStatus = false;
	$.each(customValidate, function( index, value ) {
	  var currentCount = $(this).find('label.selected').length;
	  if (currentCount == 0) {
		errorStatus = true;
		/*
		$(this).addClass('js-error');
		$(this).next('div.js-error-msg').remove();
		$(this).after('<div class="js-error-msg">Please select the option</div>');
		*/
	  } else {
		/*
		$(this).removeClass('js-error');
		$(this).next('div.js-error-msg').remove();
		*/
	  }
	});
	return errorStatus;
  }
  
  
	function setCookie(cookieName, cookieValue, expireDays) {
		var cookieDate = new Date();
		cookieDate.setTime(cookieDate.getTime() + (expireDays*24*60*60*1000));
		var expires = "expires=" + cookieDate.toGMTString();
		document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
	}

	function getCookie(cookieName) {
		var name = cookieName + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var cookieArray = decodedCookie.split(';');
		for(var i = 0; i < cookieArray.length; i++) {
			var cookieValue = cookieArray[i];
			while (cookieValue.charAt(0) == ' ') {
				cookieValue = cookieValue.substring(1);
			}
			if (cookieValue.indexOf(name) == 0) {
				return cookieValue.substring(name.length, cookieValue.length);
			}
		}
		return "";
	}
  
  function getSelectionValues() {
	  
	
  var stylesQuestionNine = {
							  "Casual chic": "Natural Beauty",
							  "Classic prep": "Modern Prep",
							  "Glam sophisticate": "Style Sophisticate",
							  "With an edge": "Edgy Maven",
							  "Bohemian chic": "Laid-Back Bohemian",
							  "On top of the trends": "Bold Bombshell",
							  "trendy": "Bold Bombshell" // testing purpose added
							};
/*							
  var secondEssentials = {
						  "Straight": {
							"I want to embrace it": {
							  "Any": "Straight for Straight"
							},
							"I want to wear it differently": {
							  "Straighter": "Straight for Straight",
							  "Wavier": "Wavy for Straight",
							  "Curlier": "Curly for Straight"
							}
						  },
						  "Wavy": {
							"I want to embrace it": {
							  "Any": "Wavy for Wavy"
							},
							"I want to wear it differently": {
							  "Wavier": "Wavy for Wavy",
							  "Straighter": "Straight for Wavy",
							  "Curlier": "Curly for Wavy"
							}
						  },
						  "Curly": {
							"I want to embrace it": {
							  "Any": "Curly for Curly"
							},
							"I want to wear it differently": {
							  "Curlier": "Curly for Curly",
							  "Straighter": "Straight for Curly",
							  "Wavier": "Wavy for Curly"
							}
						  }
						};
*/						

var secondEssentials = {
						  "Straight": {
							"Want to embrace it": {
							  "straighter": "Straight for Straight",
							  "wavier": "Straight for Straight",
							  "curlier": "Straight for Straight"
							},
							"Want to wear it differently": {
							  "straighter": "Straight for Straight",
							  "wavier": "Wavy for Straight",
							  "curlier": "Curly for Straight"
							}
						  },
						  "Wavy": {
							"Want to embrace it": {
							  "straighter": "Wavy for Wavy",
							  "wavier": "Wavy for Wavy",
							  "curlier": "Wavy for Wavy"
							},
							"Want to wear it differently": {
							  "wavier": "Wavy for Wavy",
							  "straighter": "Straight for Wavy",
							  "curlier": "Curly for Wavy"
							}
						  },
						  "Curly": {
							"Want to embrace it": {
							  "straighter": "Curly for Curly",
							  "wavier": "Curly for Curly",
							  "curlier": "Curly for Curly"
							},
							"Want to wear it differently": {
							  "curlier": "Curly for Curly",
							  "straighter": "Straight for Curly",
							  "wavier": "Wavy for Curly"
							}
						  }
						};

  var userType = {
				  "Straight": {
					"Want to embrace it": {
					  "fine": "A",
					  "medium": "A",
					  "thick": "B"
					},
					"Want to wear it differently": {
					  "fine": "A",
					  "medium": "A",
					  "thick": "B"
					}
				  },
				  "Wavy": {
					"Want to embrace it": {
					  "fine": "A",
					  "medium": "A",
					  "thick": "B"
					},
					"Want to wear it differently": {
					  "fine": "A",
					  "medium": "B",
					  "thick": "B"
					}
				  },
				  "Curly": {
					"Want to embrace it": {
					  "fine": "A",
					  "medium": "B",
					  "thick": "B"
					},
					"Want to wear it differently": {
					  "fine": "A",
					  "medium": "B",
					  "thick": "B"
					}
				  }
				};

/*	
  var essentialProducts = { 
							"Straight for Straight" : [23,45,26,24,27,25,48,49,20,37,38,50,31,18,47,40,44,32,52,17,16,55,41,42,28,43,51,29,30,33,34],
							"Wavy for Straight" : [23,45,26,24,27,25,48,49,20,37,38,50,31,18,47,40,44,32,52,17,16,55,41,42,28,43,51,29,30,33,34,46],
							"Curly for Straight" : [23,45,26,24,27,25,48,49,20,37,38,50,31,18,47,40,44,32,52,17,16,55,41,42,28,43,51,29,30,33,34,46],
							"Wavy for Wavy" : [23,45,26,24,27,25,48,49,20,21,22,19,36,50,31,47,35,39,40,44,32,17,16,55,41,42,28,43,51,29,30,33,34],
							"Straight for Wavy" : [23,45,26,24,27,25,48,49,20,21,22,19,36,50,31,47,35,39,40,44,32,17,16,55,41,42,28,43,51,29,30,33,34,4],
							"Curly for Wavy" : [23,45,26,24,27,25,48,49,20,21,22,19,36,50,31,47,35,39,40,44,32,17,16,55,41,42,28,43,51,29,30,33,34,46,4],
							"Curly for Curly" : [23,45,26,24,27,25,48,49,20,21,22,19,36,50,31,47,35,39,40,44,32,17,16,55,41,42,28,43,51,29,30,33,34,46],
							"Straight for Curly" : [23,45,26,24,27,25,48,49,20,21,22,19,36,50,31,47,35,39,40,44,32,17,16,55,41,42,28,43,51,29,30,33,34],
							"Wavy for Curly" : [23,45,26,24,27,25,48,49,20,21,22,19,36,50,31,47,35,39,40,44,32,17,16,55,41,42,28,43,51,29,30,33,34],
							"Fine hair products" : [58,56,57,66,67,68,75,74,73,83,77,85,76,84,78,72,79,80,81,82],
							"Medium hair products" : [58,56,57,66,67,68,75,74,73,83,77,85,76,84,78,72,79,80,81,82],
							"Thick hair products" : [58,56,57,66,67,68,75,74,73,83,77,85,76,84,78,72,79,80,81,82],
							"Voluminous hair" : [58,56,57,66,67,68,75,74,73,83,77,85,76,84,78,72,79,80,81,82],
							"Hair with more texture" : [58,56,57,66,67,68,75,74,73,83,77,85,76,84,78,72,79,80,81,82,21,22,19,36,50,47,35,39,32,46,17,51,29,30],
							"Nourished hair" : [3,2,1,8,9,6,7,23,45,48,49,20,31,40,44,32,17,55,41,42,28,43,58,56,57,124,126,125,149],
							"Smoother hair" : [3,2,1,23,45,26,24,27,25,48,49,20,37,38,31,18,40,44,32,52,46,17,16,55,41,42,28,43,51,29,30,33,34,71,58,56,57],
							"Stronger Hair" : [75,74,73,41,42,28,43,40,44,48,49,20,23,45],
							"Shinier more vibrant hair" : [3,2,1,8,9,6,7,23,45,48,49,20,31,40,44,32,17,55,41,42,28,43,58,56,57,124,126,125,149],
							"Light Blonde Treated Products" : [3,2,1,4,5,60,71,114,121,122,120,131,132,138,139,135,136,134,123,146,124,126,125,149,141,127,129,143,128,130,118,133,119,137,147,152],
							"Light Blonde Products" : [3,2,1,4,5,60,71,114,121,122,120,131,132,138,139,135,136,134,123,146,124,126,125,149,141,127,129,143,128,130,118,133,119,137,147,152],
							"Dark Blonde Treated Products" : [3,2,1,4,5,63,71,117,121,122,120,131,132,138,139,135,136,134,123,146,124,126,125,149,140,127,129,142,128,130,118,133,119,137,147,152],
							"Light Brown Treated Products" : [6,7,8,9,11,12,10,61,64,70,71,115],
							"Light Brown Products" : [6,7,8,9,11,12,10,61,64,70,71,115],
							"Dark Brown Treated Products" : [6,7,8,9,13,14,15,61,64,70,71,113,116],
							"Dark Brown Products" : [6,7,8,9,13,14,15,61,64,70,71,113,116],
							"Thinning Treated Products" : [58,56,57,66,67,68,75,74,73,83,77,85,76,84,78,72,79,80,81,82],
							"Thinning Products" : [58,56,57,66,67,68,75,74,73,83,77,85,76,84,78,72,79,80,81,82],
							"Red Treated Products" : [62,65,111,112],
							"Red Products" : [62,65,111,112],
							"Black Treated Products" : [6,7,8,9,13,14,15,61,64,70,71,113,116,59],
							"Black Products" : [6,7,8,9,13,14,15,61,64,70,71,113,116,59],
							"Grey_White Treated Products" : [3,2,1,4,5,60,71,114,121,122,120,131,132,138,139,135,136,134,123,146,124,126,125,149,141,127,129,143,128,130,118,133,119,137,147,152],
							"Grey_White Products" : [3,2,1,4,5,60,71,114,121,122,120,131,132,138,139,135,136,134,123,146,124,126,125,149,141,127,129,143,128,130,118,133,119,137,147,152],
							"Hide My Grey" : [14,15,59,60,61,62,63,64,65,110,92,93,94,95,96,97,98,99,90,100,101,102,105,108,109,91,88,158,157,161,162,163,160,159,103,104,107,113,115,116,117,114],
							"More nourished hair" : [3,2,8,11,13,23,45,26,27,48,49,20,21,22,37,38,31,40,44,32,16,55,41,42,28,43,38,34,58,56,57,75,74,73,83,79,80,81,82,110,111,112,121,122,131,132,138,139,135,136,124,126,125,149,140,141,127,129,142,143,128,130,118,147,152],
							"Deeper Color" : [58,56,57,66,67,68,75,74,73,83,77,85,76,84,78,72,79,80,81,82], // Voluminous hair
							"Lighter Color" : [3,2,1,23,45,26,24,27,25,48,49,20,37,38,31,18,40,44,32,52,46,17,16,55,41,42,28,43,51,29,30,33,34,71,58,56,57] // Smoother hair
							// "Hide My Grey" : [58,56,57,66,67,68,75,74,73,83,77,85,76,84,78,72,79,80,81,82,21,22,19,36,50,47,35,39,32,46,17,51,29,30]  // Hair with more texture

						};   */
  
  var userLooks = {
				  "Natural Beauty": {
					"A": {
					  "Look 1": "Second Day Waves",
					  "Look 2": "Effortless Blowout"
					},
					"B": {
					  "Look 1": "Carefree Curls",
					  "Look 2": "Tousled Texture"
					}
				  },
				  "Modern Prep": {
					"A": {
					  "Look 1": "Polished Pullback",
					  "Look 2": "Sleek Chic"
					},
					"B": {
					  "Look 1": "Polished Pullback",
					  "Look 2": "Tousled Texture"
					}
				  },
				  "Style Sophisticate": {
					"A": {
					  "Look 1": "Startlet Waves",
					  "Look 2": "The Master Blowout"
					},
					"B": {
					  "Look 1": "Startlet Waves",
					  "Look 2": "The Master Blowout"
					}
				  },
				  "Edgy Maven": {
					"A": {
					  "Look 1": "Coiffed Crop",
					  "Look 2": "Mod Straight"
					},
					"B": {
					  "Look 1": "Carefree Curls",
					  "Look 2": "Mod Straight"
					}
				  },
				  "Laid-Back Bohemian": {
					"A": {
					  "Look 1": "Half and Half",
					  "Look 2": "Second Day Waves"
					},
					"B": {
					  "Look 1": "Half and Half",
					  "Look 2": "Tousled Texture"
					}
				  },
				  "Bold Bombshell": {
					"A": {
					  "Look 1": "Showstopping Curls",
					  "Look 2": "Full Retro"
					},
					"B": {
					  "Look 1": "Showstopping Curls",
					  "Look 2": "Tousled Texture"
					}
				  }
				};
				
	var essentialsThirdProductThreeOptions = {
						  "Light Blonde": {
							"Yes": {
							  "Deeper color": "Dark Blonde Treated Products"
							},
							"No": {
							  "Deeper color": "Dark Blonde Treated Products"
							}
						  },
						  "Dark Blonde": {
							"Yes": {
							  "Lighter color": "Light Blonde Treated Products"
							},
							"No": {
							  "Lighter color": "Light Blonde Treated Products"
							}
						  },
						  "Light Brown": {
							"Yes": {
							  "Deeper color": "Dark Brown Treated Products"
							},
							"No": {
							  "Deeper color": "Dark Brown Treated Products"
							}
						  },
						  "Dark Brown": {
							"Yes": {
							  "Lighter color": "Light Brown Products"
							},
							"No": {
							  "Lighter color": "Light Brown Products"
							}
						  },
						  "Grey_White": {
							"Yes": {
							  "Hide my grey": "Hide my grey"
							},
							"No": {
							  "Hide my grey": "Hide my grey"
							}
						  }
						};
						
						
	var essentialsThirdProductTwoOptions = {
						  "Light Blonde": {
							"Yes": "Light Blonde Treated Products",
							"No": "Light Blonde Products"
						  },
						  "Dark Blonde": {
							"Yes": "Dark Blonde Treated Products",
							"No": "Dark Blonde Treated Products"
						  },
						  "Light Brown": {
							"Yes": "Light Brown Treated Products",
							"No": "Light Brown Products"
						  },
						  "Dark Brown": {
							"Yes": "Dark Brown Treated Products",
							"No": "Dark Brown Products"
						  },
						  "Thinning": {
							"Yes": "Thinning Treated Products",
							"No": "Thinning Products"
						  },
						  "Red": {
							"Yes": "Red Treated Products",
							"No": "Red Products"
						  },
						  "Black": {
							"Yes": "Black Treated Products",
							"No": "Black Products"
						  },
						  "Grey_White": {
							"Yes": "Grey_White Treated Products",
							"No": "Grey_White Products"
						  }
						};

	var essentialsSecondProductTwoOptions = {
						  "Voluminous hair": {
							"Deeper Color": "Voluminous hair"
						  },
						  "Smoother hair": {
							"Lighter Color": "Smoother hair"
						  },
						  "Hair with more texture": {
							"Hide My Grey": "Hair with more texture"
						  }
						};
	
	var essentialsSecondProduct = {
						  "Voluminous hair": "Voluminous hair",
						  "Smoother hair": "Smoother hair",
						  "Hair with more texture": "Hair with more texture",
						  "Stronger Hair": "Stronger Hair",
						  "More nourished hair": "More nourished hair",
						  "Shinier more vibrant hair": "Shinier more vibrant hair"
						};	

	$.rand = function(arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg == "number") {
            return Math.floor(Math.random() * arg);
        }
    }
	
	Array.prototype.remove = function(removelist) {
		var args = removelist;
		var indices = [];
		for(var i = 0; i < args.length; i++){
			var arg = args[i];
			var index = this.indexOf(arg);
			while(index > -1){
				indices.push(index);
				index = this.indexOf(arg, index + 1);
			}
		}
		indices.sort();
		for(var i = 0; i < indices.length; i++){
			var index = indices[i] - i;
			this.splice(index, 1);
		}    
	}
	
	function randomSelectionProduct(essentialProductArray, removeDuplicateList, logText) {
		var essentialProductSelectionArray = [];
		essentialProductSelectionArray = essentialProductArray;
		essentialProductSelectionArray.remove(removeDuplicateList);
		var selectedProdut = $.rand(essentialProductSelectionArray);
		if (logText == undefined) {
			logText = 'Selected Essential Product';
		}
		console.log(logText + ' : ' + selectedProdut);
		return selectedProdut;
	}
	
	function essentialSecondProduct(selectedOption, removeDuplicateList) {
		
		if (selectedOption == "Deeper Color") {
			var storeEssentialProduct2String = essentialProducts["Voluminous hair"];
			console.log('Essential Product2 array name : Voluminous hair'); 
		} else if (selectedOption == "Lighter Color") {
			var storeEssentialProduct2String = essentialProducts["Smoother hair"];
			console.log('Essential Product2 array name : Smoother hair');
		} else if (selectedOption == "Hide My Grey") {
			var storeEssentialProduct2String = essentialProducts["Hair with more texture"];
			console.log('Essential Product2 array name : Hair with more texture');
		} else {
			var storeEssentialProduct2String = essentialProducts[selectedOption];
			console.log('Essential Product2 array name : ' + selectedOption);
		}
		// storeEssentialProduct2 = randomSelectionProduct(storeEssentialProduct2String, removeDuplicateList, 'Essential Product2');
		storeEssentialProduct2 = shampooConditionerOther(storeEssentialProduct2String, "Conditioners");
	}
    
    function intersectionArrayList(firstArray, secondArray) {
        var commonList = firstArray.filter(function(value) {
                            return secondArray.indexOf(value) != -1
                         });
        return commonList;
    }

    var selectedList = []
    function shampooConditionerOther(categoryArray, categoryName) {
        if ($.inArray(categoryName, selectedList) == -1) {
            var commonProductList = intersectionArrayList(categoryArray, essentialProducts[categoryName]);
            commonProductList.remove(removelist);
            console.log("Final selected category : "+categoryName);
            console.log("Final selected category array : "+commonProductList);
            var selectedProduct = $.rand(commonProductList);
            if (selectedProduct != undefined) {
                setCookie(categoryName, selectedProduct, 30);
                removelist.push(selectedProduct);
                selectedList.push(categoryName);
            }
            return selectedProduct;
        } else {
            var categoryList = ["Shampoos", "Conditioners", "Other"];
            for(var index = 0; index < categoryList.length; index++) {
                var productArrayName = categoryList[index];
                if ($.inArray(productArrayName, selectedList) == -1) {
                    var commonProductList = intersectionArrayList(categoryArray, essentialProducts[productArrayName]);
                    commonProductList.remove(removelist);
                    console.log("Final selected category : "+productArrayName);
                    console.log("Final selected category array : "+commonProductList);
                    var selectedProduct = $.rand(commonProductList);
                    if (selectedProduct != undefined) {
                        setCookie(productArrayName, selectedProduct, 30);
                        removelist.push(selectedProduct);
                        selectedList.push(productArrayName);
                    }
                    return selectedProduct;
                }
            }
        }
    }
    
	
	var question = [];
	var answer = [];
	selectedQuestionAnswer = [];
	var selectedArray = $('.selected');
	$.each(selectedArray, function( index, value ) {
	  var forAttr = $(this).attr("for");
	  // console.log(forAttr);
	  var extractQuestion = forAttr.split("-");
	  question.push(extractQuestion[0]);
	  
	  //var myvalue = $(this).children('span').text();
	  var selectedAnswer = $(this).attr("data-selected");
	  console.log('\n'+selectedAnswer);
	  answer.push(selectedAnswer);
	  
	  var keyQuestion = extractQuestion[0];
	  
	  if (keyQuestion in selectedQuestionAnswer) {
		  selectedQuestionAnswer[keyQuestion] = selectedQuestionAnswer[keyQuestion] + ','+ selectedAnswer;
	  } else {
		selectedQuestionAnswer[keyQuestion] = selectedAnswer;
	  }
	  
	  console.log(selectedQuestionAnswer);
	});
	
	selectedLookQuestion = question;
	selectedLookAnswer = answer;
	// console.log(selectedLookQuestion);
	// console.log(selectedLookAnswer);
	
	var ninthQuestion = selectedQuestionAnswer['q9'];
	var storeStyle = stylesQuestionNine[ninthQuestion];
	console.log('Style : ' + storeStyle);
    
    // Product Filter - 2
    var counter = 0;
    var selectedAnswers = '';
    $('.LookSelectorTool__selector.selected').each(function (index, value) {
        var selectedQuestionString = $(this).find('input').attr('id');
        var selectedQuestionArray = selectedQuestionString.split("-");
        var selectedQuestion = selectedQuestionArray[0].replace("q", "");
        var selectedAnswer = $(this).find('span > div > p > span').text().trim();
        if (selectedQuestion == 6) {
            ++counter;
            if (counter == 1) {
                selectedAnswers = selectedAnswers + selectedQuestion + selectedAnswer;
            } else {
                selectedAnswers = selectedAnswers + '-' + selectedAnswer+':';
            }
        } else {
            var stringLength = selectedAnswers.length;
            var lastString = selectedAnswers.substring(stringLength-1, stringLength);
            if (lastString == ':') {
                selectedAnswers = selectedAnswers + selectedQuestion + selectedAnswer + ':';
            } else {
                selectedAnswers = selectedAnswers + ':' + selectedQuestion + selectedAnswer + ':';
            }
            
        }
    });

    var resultLength = selectedAnswers.length;
    var resultString = selectedAnswers.substring(1, resultLength-1);
    
    if( typeof s !== "undefined" ) {  
      s.linkTrackVars="prop16,eVar16,events";
      s.linkTrackEvents="event39";
      s.prop16=resultString;
      s.eVar16="D=c16";
      s.events="event39";
      s.tl(this,'o','Submit_Product Filter');
    }
    // Product Filter - 2
    
	var question1 = selectedQuestionAnswer['q1'];
    var question2 = selectedQuestionAnswer['q2'];
    var question4 = selectedQuestionAnswer['q4'];
    var question9 = selectedQuestionAnswer['q9'];

    var pageRedirectionURL = redirectLookResultPage[question1][question2][question4][question9];
    
    var htmlTextPostion = window.location.href.lastIndexOf(".html");
    if (htmlTextPostion > -1) {
    	pageRedirectionURL = window.location.href.substring(0, htmlTextPostion) + '/' + pageRedirectionURL + '.html';
    } else {
        pageRedirectionURL = window.location.href.replace(".html", "") + '/' + pageRedirectionURL + '.html';
    }
    
    if(window.location.hostname == 'www.johnfrieda.com' && htmlTextPostion == -1) {
        htmlTextPostion = window.location.href.length;
        if (window.location.href.slice(-1) == "/") {
            htmlTextPostion = htmlTextPostion -1; 
        }
        var livePageRedirectionURL = redirectLookResultPage[question1][question2][question4][question9];
        pageRedirectionURL = window.location.href.substring(0, htmlTextPostion) + '/' + livePageRedirectionURL + '.html';
    }
    
	window.location = pageRedirectionURL;
  }

  $(document).ready(function(){

    // add fastclick for mobile tap handling
    $(function() {
      FastClick.attach(document.body);
    });

    // Add validation for look selector tool
    lookSelectorValidation();

    // set tocca tap detection variables
    var SWIPE_THRESHOLD = 100, // default value
    DBL_TAP_THRESHOLD = 200, // range of time in which a dbltap event could be detected,
    LONG_TAP_THRESHOLD = 1000, // range of time after which a longtap event could be detected
    TAP_THRESHOLD = 150, // range of time in which a tap event could be detected
    TAP_PRECISION = 60 / 2, // default value (touch events boundaries)
    JUST_ON_TOUCH_DEVICES = false, // default value ( decide whether you want to use the Tocca.js events only on the touch devices )
    IGNORE_JQUERY = true; // default value ( will not use jQuery events, even if jQuery is detected )

    // set the initial max heights of each step
    $('.LookSelectorTool__toolWrap .LookSelectorTool__step:not(:first)').each(function(){
      var initialMax = $(this).children('h2').outerHeight() + 70;
      $(this).css('max-height', initialMax);
    });

    // expand questions on title click
    // $('.LookSelectorTool__toolWrap').on('click', '.LookSelectorTool__step:not(.activeStep) .LookSelectorTool__stepHeading', function(){
    //   var clickedHeading = $(this);
    //   expandClickedPanel(clickedHeading);
    // });

    // collapse expanded questions on title click
    // $('.LookSelectorTool__toolWrap').on('click', '.LookSelectorTool__step.activeStep .LookSelectorTool__stepHeading', function(){
    //   var collapsedHeight = $(this).outerHeight(true) + 70;
    //   $(this).parent().removeClass('activeStep').css('max-height', collapsedHeight);
    // });

    // add selected class and data attribute on button click and move to next step when positive selection is made
    // note: this is the handler for all except the last step which needs to be treated differently
    $('.LookSelectorTool__step:not(:last-of-type)').on('click', '.LookSelectorTool__selector', function(e){
	  e.preventDefault();
      var clickedSelector = $(this);
      handleSelectors(clickedSelector);
    });


    // handle selection on the final step
    $('.LookSelectorTool__step:last-of-type').on('click', '.LookSelectorTool__selector', function(e){
      e.preventDefault();
      var clickedSelector = $(this);
      selectFinal(clickedSelector);
    });

    // handle tap to skip button on question 6
    $('.LookSelectorTool__step:not(:last-of-type)').on('click', '.LookSelectorTool__tapToSkip', function(e){
      e.preventDefault();
      var clickedSelector = $(this);
      handleSelectors(clickedSelector);
    });

  });

  $(window).on('load', function(){
	
	if (window.kaoAPI.isAuthorring) {
		$('.LookSelectorTool__step').addClass('js-LookSelectorTool__step');
		$('.LookSelectorTool__step').css({'max-height' : '4000px'});
		$('.LookSelectorTool__step:nth-child(5)>div').css({'height' : '400px'});
		$('.LookSelectorTool__step:nth-child(7)>div').css({'height' : '1000px'});
		$('.LookSelectorTool__step:nth-child(5)>div>label, .LookSelectorTool__step:nth-child(7)>div>label, .LookSelectorTool__step:nth-child(9)>div>label').addClass('js-LookSelectorTool__selectorRaster');
	}
	
    loadFunctions();
	
	if (window.kaoAPI.isAuthorring) {
		$('.LookSelectorTool__step:nth-child(5)>div>label, .LookSelectorTool__step:nth-child(7)>div>label').each(function(i){
			$(this).css('height', '1000px');
		});
		/*
		$('.LookSelectorTool__step:nth-child(5)>div>label, .LookSelectorTool__step:nth-child(7)>div>label').each(function(i){
			$(this).find('span').css('height', '100px');
		});
		*/
		$('.LookSelectorTool__step:nth-child(5)>div>label:nth-child(1)').find('span').css('height', '900px');
	}

  });

  var resizeTimer;

  //run resize events only after window has finished resizing
  $(window).on('resize', function(e) {

    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {

      // prevent resize-based fuction from triggering on iOS scroll
      if($(window).width() !== baselineWidth) {

        // set our new baseline width
        baselineWidth = $(window).width();

        // make look selectors square
        $('.LookSelectorTool__selectorText, .LookSelectorTool__selectorVector').each(function(){
          $(this).css('height', Math.round($(this).width()));
        });

        $('.LookSelectorTool__selectorRaster').each(function(){
          $(this).css('height', Math.round($(this).width()));
          $(this).children('img').css('height', Math.round($(this).width()));
        });

        // set heights of panels
        $('.LookSelectorTool__step').each(function(){
          if($(this).hasClass('activeStep') || $(this).hasClass('expandedStep')) {
            fullHeight = 0;
            $(this).children().each(function(){
              fullHeight = fullHeight + $(this).outerHeight(true);
            });
            fullHeight = fullHeight + 70;
            $(this).css('max-height', fullHeight);
          }
          else {
            var collapsedHeight = $(this).children('h2').outerHeight(true) + 70;
            $(this).css('max-height', collapsedHeight);
          }
        });

        // reset the scrollspy positions for q6
        if ($('.LookSelectorTool__selectorWrap6').length ) {
            var q6PositionTop = $('.LookSelectorTool__selectorWrap6').offset().top;
            var q6PosiitionBottom = $('.LookSelectorTool__selectorWrap6').offset().top + $('.LookSelectorTool__selectorWrap6').height();
            resetQ6ScrollSpy(q6PositionTop, q6PosiitionBottom);
        }

      }

    }, 250);

  });

  $('#yourLookSubmitButton').click(function(e){
    var errorStatus = yourLookLandingValidation();
	if (errorStatus) {
		$('#divYourLookError').show();
	} else {
		$('#divYourLookError').hide();
		
		$.getJSON(lookResultsPagesJSONPath, function(result){
			redirectionURL = result;
			getSelectionValues();
		});
	}
  });

  
  if (window.kaoAPI.isAuthorring) {
	expandAllAnswers();
	}
});


	
function expandAllAnswers() {
    $(".LookSelectorTool__step").each(function() {
        fullHeight = 0, $(this).children().each(function() {
            fullHeight += $(this).outerHeight(!0)
        }), fullHeight += 70, $(this).css("max-height", fullHeight)
    }), $(".LookSelectorTool__step").addClass("expandedStep")
}

function collapseAllAnswers() {
    $(".LookSelectorTool__step").each(function() {
        var a = $(this).children("h2").outerHeight(!0) + 70;
        $(this).css("max-height", a)
    }), $(".LookSelectorTool__step:nth-child(1n+2)").removeClass("expandedStep")
}


