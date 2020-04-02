/*$('.shade-selector-section .g-ImageCarouselPUnit .g-GroupBox').hide();
    $('.shade-selector-section .g-ImageCarouselPUnit__inner').hover(function () {
        $('.shade-selector-section .g-ImageCarouselPUnit .g-GroupBox').show();
    });*/

$(document).ready(function () {
    var isAuthMode = window.kaoAPI.isAuthorring;
    var section = '.shade-selector-section';
    var stepOneImages = '.step-one-images .g-Image';
    var stepTwoLooks = '.looks-carousel .g-ImageCarouselPUnit';
    var stepOneId = '#shadeSelectorStep1';
    var stepTwoId = '#shadeSelectorStep2';
    var resultId = '#shadeSelectorResult';
    var resetId = '#shadeSelectorReset';
    var resultOnePlaceholder = '.result-one-placeholder .placeholder-row';
    var resultOneAll = '.result-products-shades';
    var selectedShade = ''; //this is an id
    var selectedLook = ''; //this is an id
    var selectedSlider = ''; //this is a class
    var resultSliders = 'body:not(.is-authorring) .result-two';
    var ifStepOneSelected = false;


    /*DOMCheck('body:not(.is-authorring) .shade-selector-result-section .g-Section__inner .g-Column__cols .g-ColumnUnit .slick-list .slick-track .g-GroupBox .g-Image p > img', hideResultSliders(resultSliders));*/

    if (window.innerWidth > 640) {
        if($('.shade-selector-result-section').length > 0)
        resizeStepTwoLooks();
    }
    if(!isAuthMode) {
        $('.shade-selector-result').hide();
        $(stepTwoId).hide();
        $('#styleStep2').hide();
        $('#styleRange').hide();
    }
    $(stepOneImages).click(function (e) {
        ifStepOneSelected = true;
        var currentImg = $(this);
        $(stepTwoId).show();
        $('#styleStep2').show();
        $('#styleRange').show();
        removeActiveClass(stepOneImages);
        currentImg.addClass('active');
        selectedShade = currentImg.attr('id');
        resetResultProducts(resultOnePlaceholder, resultOneAll);
        hideResultSliders(resultSliders);
        callShadeSelectorAnalytics('event30', selectedShade);
        if($('.shade-selector-result .result-one .result-one-placeholder .placeholder-row').children().length == 0) {
			$('.shade-selector-result').hide();
			$('.shade-selector-section .looks-carousel .g-ImageCarouselPUnit.active').removeClass('active');
		}
        goToThisId(stepTwoId);
    });

    $(stepTwoLooks).click(function (e) {
        if(ifStepOneSelected == false) {
			goToThisId(stepOneId);
		} else {
			var currentLook = $(this);
            removeActiveClass(stepTwoLooks);
            currentLook.addClass('active');
			selectedLook = currentLook.attr('id');
			$('.shade-selector-result').show();
			resetResultProducts(resultOnePlaceholder, resultOneAll);
			hideResultSliders(resultSliders);
			callShadeSelectorAnalytics('event31', selectedLook);
			populateResults(selectedShade, selectedLook, resultOnePlaceholder);
			goToThisId(resultId);
		}
    });

    $(resetId).click(function (e) {
        e.preventDefault();

        if ($('#' + selectedLook).length != 0) {
            removeActiveClass('#' + selectedLook);
        }

        if ($('#' + selectedShade).length != 0) {
            removeActiveClass('#' + selectedShade);
        }

        goToThisId(stepOneId);

        if ($('#' + selectedSlider).length != 0) {
            $('#' + selectedSlider).hide();
        }

        resetResultProducts(resultOnePlaceholder, resultOneAll);
        hideResultSliders(resultSliders);
        $('.shade-selector-result').hide();
        $('#styleStep2').hide();
        $('#styleRange').hide();
		$(stepTwoId).hide();
        ifStepOneSelected = false;
        selectedShade = '';
        selectedLook = '';
        selectedSlider = '';
        //reset all values

    });

}); //document ready ends here

function removeActiveClass(selector) {
    var images = $(selector);
    for (var i = 0; i < images.length; i++) {
        if ($(images[i]).hasClass('active')) {
            $(images[i]).removeClass('active');
        }
    }
}

function goToThisId(id) {
    $('html, body').animate({
        scrollTop: $(id).offset().top
    }, 800, 'linear');
}

function populateResults(selectedShade, selectedLook, resultOnePlaceholder) {
    generateResultSlider(selectedLook);
    generateResultShade(selectedShade, selectedLook, resultOnePlaceholder);
}

function generateResultSlider(selectedLook) {
    var sliderClass = '.slider-' + selectedLook;
	if($('body:not(.is-authorring) .shade-selector-result-section '+sliderClass+' img').length > 3) {
        $('body:not(.is-authorring) .shade-selector-result-section '+sliderClass+' img').closest('div').parent().parent().parent().parent().addClass('carousel-active');
    } else {
		$('body:not(.is-authorring) .shade-selector-result-section '+sliderClass+' img').closest('div').parent().parent().parent().parent().parent().addClass('carousel-inactive');
	}
    $(sliderClass).css('display', 'block');
}

function generateResultShade(selectedShade, selectedLook, resultOnePlaceholder) {
    var productClass = 'result-' + selectedLook;
    if(selectedLook == "KasiaContemporaryStonewashDenim") {
		var productList = [$('.' + productClass + '#StonewashDenim')[0], $('.' + productClass + '#SmokyLilac')[0], $('.' + productClass + '#FrostedBrown')[0]];
    } else if(selectedLook == "BoModerateFrostedBrown") {
		var productList = [$('.' + productClass + '#FrostedBrown')[0], $('.' + productClass + '#DuskyBlonde')[0]];
	} else if(selectedLook == "KasiaModerateDuskyBlonde") {
		var productList = [$('.' + productClass + '#DuskyBlonde')[0], $('.' + productClass + '#RawMocha')[0]];
	} else { 
        var productList = $('.' + productClass);
    }
    var placeholders = $(resultOnePlaceholder);
    var pids = [];
    var sClass = [];
    var currentProduct = '';
    var currentShade = '';

    for (var i = 0; i < productList.length; i++) {

        pids[i] = productList[i].getAttribute('id');
        sClass[i] = pids[i] + '-' + selectedShade;

        currentProduct = $('#' + pids[i]);
        currentShade = $('.' + sClass[i]);

        if(window.outerWidth <= 640) {
            $(placeholders[i]).append(currentProduct);
			$(placeholders[i]).append(currentShade);
		} else {
			if (i % 2 == 0) {
				$(placeholders[i]).append(currentProduct);
				$(placeholders[i]).append(currentShade);
			} else {
				$(placeholders[i]).append(currentShade);
				$(placeholders[i]).append(currentProduct);
			}
		}
        //set width height of copied element
        /*var w = $(placeholders[i] + '.g-Image').width();

        $(placeholders[i] + ' #' + pids[i]).width();
        $(placeholders[i] + ' #' + pids[i]).height();*/

    }
}


function hideResultSliders(resultSliders) {
    $(resultSliders).hide();
}

function resetResultProducts(resultOnePlaceholder, resultOneAll) {
    var shades = $(resultOnePlaceholder + ' > .g-Image');
    if (shades.length != 0) {
        $(resultOneAll).append(shades);
    }

    var products = $(resultOnePlaceholder + ' > .g-ImageTextVP');
    if (products.length != 0) {
        $(resultOneAll).append(products);
    }

    $(resultOnePlaceholder).empty();
}

function callShadeSelectorAnalytics(eventId, value) {
    if (typeof s != 'undefined' && s != null) {
        s.linkTrackVars = "events";
        s.linkTrackEvents = eventId;
        s.events = eventId;
        if(eventId == "event30") {
            s.tl(this, 'o', 'ShadeSelector-Q1-' + value);
        } else if(eventId == "event31") {
            s.tl(this, 'o', 'ShadeSelector-Q2-' + value);
        }
    }
}

function resizeStepTwoLooks() {
    if($('#KieranContemporaryIcedConcrete').length && $('#KieranModerateBrushedGold').length) {
        var ht = $('#KieranContemporaryIcedConcrete').offset().top + $('#KieranContemporaryIcedConcrete').width();
        ht = ht - $('#KieranModerateBrushedGold').top;
        $('body:not(.is-authorring) .looks-carousel .slick-list').height(ht + 'px !important');
    }
}

/*function DOMCheck(DOM, callbackFunc) {
    try {
        if (DOM) {
            var intFlag;
            if ($(DOM).length <= 0) {
                intFlag = setInterval(function () {
                    setTimeout(function () {
                        clearInterval(intFlag);
                    }, 10000);

                    if ($(DOM).length > 0) {
                        clearInterval(intFlag);
                        callbackFunc();
                    }
                }, 100);

            } else {
                callbackFunc();
            }
        }
    } catch (e) {
        console.log('Error in DOMCheck function' + e);
    }
}*/
