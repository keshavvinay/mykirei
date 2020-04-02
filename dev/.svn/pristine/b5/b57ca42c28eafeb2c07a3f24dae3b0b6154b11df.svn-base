var currentSection = '';
var ul = '.ProductOverViewModuleEditable .subnav_section .subnav_wrap ul';
$(document).ready(function () {


    var c = 0;

    if ($(ul).length != 0) {
        addSpanArrows();
        //done
        showHideArrows(ul);
        //works already
        showAllLiElements(ul);
        autoHidePartialLiElements(ul);
    }

    $('.ProductOverViewModuleEditable .navigation_section .subnav_section .action-left').on('click', function (e) {

        showAllLiElements(ul);

        var scrollable = canScroll($(ul), $(ul).find('li'));

        if (scrollable.allowLeft) {
            if (c > 0) {
                c = c - 200;
            } else {
                c = 0;
            }

            $(ul).animate({
                scrollLeft: (c)
            }, 200, 'swing', function () {

            });


        }
        setTimeout(function () {
            var scrollAfterCheck = canScroll($(ul), $(ul).find('li'));
            if (!scrollAfterCheck.allowLeft) {
                hideLeftArrow();
            } else showLeftArrow();

            if (scrollAfterCheck.allowRight) {
                showRightArrow();
            } else hideRightArrow();

            autoHidePartialLiElements(ul);
        }, 201);

        //showHideSubbavArrows();

    });


    $('.ProductOverViewModuleEditable .navigation_section .subnav_section .action-right').click(function (e) {

        showAllLiElements(ul);

        var scrollable = canScroll($(ul), $(ul).find('li'));

        if (scrollable.allowRight) {

            c = c + 200;
            $(ul).animate({
                scrollLeft: (c)
            }, 200, 'swing', function () { });

        }
        setTimeout(function () {
            var scrollAfterCheck = canScroll($(ul), $(ul).find('li'));
            if (!scrollAfterCheck.allowLeft) {
                hideLeftArrow();
            } else showLeftArrow();

            if (scrollAfterCheck.allowRight) {
                showRightArrow();
            } else hideRightArrow();

            autoHidePartialLiElements(ul);
        }, 201);
        //showHideSubbavArrows();
    });
    if ($('.ProductOverViewModuleEditable').length === 1) {
        var elementPosition = $('.ProductOverViewModuleEditable').offset();
        var overviewModuleHeight = $('.ProductOverViewModuleEditable').outerHeight();

        $(window).scroll(function () {
			var headerHeight = $('.jf-Header').outerHeight();
            if ($(window).scrollTop() > elementPosition.top - headerHeight) {
                $('.ProductOverViewModuleEditable').css('position', 'fixed').css('top', headerHeight);
                $(".style-vision-section, .product-line-section, .product-type-section")
                    .css('padding-top', headerHeight + overviewModuleHeight);
            } else {
                $('.ProductOverViewModuleEditable').css('position', 'static');
                $(".style-vision-section, .product-line-section, .product-type-section")
                    .css('padding-top', 0);
            }
        });
    }

    //for subcategory clicks
    $('.subnav_wrap ul li').on('click', 'a', function (e) {
        //e.preventDefault();

        showAllLiElements(ul);
        var href = $(this).attr('href');

        window.location.hash = href;

        //$('html, body').animate({
        //    scrollTop: ($(href).offset().top - 130)
        //}, 0);  


        autoShiftNav($(this));


        //e.stopPropagation();
    });

    removeImageError();

    bazaarVoiceCustom();

    $('.style-vision-section .g-ColumnUnit, .product-line-section .g-ColumnUnit, .product-type-section .g-ColumnUnit').hover(function () {
        var scId = '#' + $(this).attr('id');
        history.replaceState(null, null, scId);
    });

}); //document.ready ends

function removeImageError() {
    $('img').each(function () {
        var src = $(this).attr('src');
		if (src && src != undefined){
			if (isValidEndsWith(src, 'hide=1')) {
				src = src.substring(0, src.length - 1) + '0';
				$(this).attr('src', src);
			}
		}	
    });
}

function isValidEndsWith(string1, string2) {
    var isValid = (string1.lastIndexOf(string2) == (string1.length - string2.length));
    return isValid;
}

function showStyleVision() {
    $('.styleVisionNav span.arrow').css('display', 'block');
    $('.productLineNav span.arrow').css('display', 'none');
    $('.productTypeNav span.arrow').css('display', 'none');

    $(".style-vision-section").show();
    $(".product-line-section").hide();
    $(".product-type-section").hide();

    $(".style-vision-nav").show();
    $(".product-line-nav").hide();
    $(".product-type-nav").hide();

    $(".style-vision-nav").removeClass('isCurrent');
    $(".product-line-nav").removeClass('isCurrent');
    $(".product-type-nav").removeClass('isCurrent');
    $(".style-vision-nav").addClass('isCurrent');
}

function showProductLine() {
    $('.productLineNav span.arrow').css('display', 'block');
    $('.styleVisionNav span.arrow').css('display', 'none');
    $('.productTypeNav span.arrow').css('display', 'none');

    $(".product-line-section").show();
    $(".style-vision-section").hide();
    $(".product-type-section").hide();

    $(".product-line-nav").show();
    $(".style-vision-nav").hide();
    $(".product-type-nav").hide();

    $(".product-line-nav").removeClass('isCurrent');
    $(".style-vision-nav").removeClass('isCurrent');
    $(".product-type-nav").removeClass('isCurrent');
    $(".product-line-nav").addClass('isCurrent');
}

function showProductType() {
    $('.productTypeNav span.arrow').css('display', 'block');
    $('.styleVisionNav span.arrow').css('display', 'none');
    $('.productLineNav span.arrow').css('display', 'none');

    $(".product-type-section").show();
    $(".style-vision-section").hide();
    $(".product-line-section").hide();

    $(".product-type-nav").show();
    $(".style-vision-nav").hide();
    $(".product-line-nav").hide();

    $(".product-type-nav").removeClass('isCurrent');
    $(".style-vision-nav").removeClass('isCurrent');
    $(".product-line-nav").removeClass('isCurrent');
    $(".product-type-nav").addClass('isCurrent');
}

function addSpanArrows() {
    var spanArrow = "<span class='arrow'></span>";

    if ($('.style-vision-section').length != 0) {
        $('.styleVisionNav > span > span').append(spanArrow);
        $('.styleVisionNav span.arrow').css('display', 'block');
        $(".style-vision-nav").addClass('isCurrent');
    }

    if ($('.product-type-section').length != 0) {
        $('.productTypeNav > span > span').append(spanArrow);
        $('.productTypeNav span.arrow').css('display', 'block');
        $(".product-type-nav").addClass('isCurrent');
    }

    if ($('.product-line-section').length != 0) {
        $('.productLineNav > span > span').append(spanArrow);
        $('.productLineNav span.arrow').css('display', 'block');
        $(".product-line-nav").addClass('isCurrent');
    }


    /* $('.styleVisionNav > span > span').append(spanArrow);
     $('.productTypeNav > span > span').append(spanArrow);
     $('.productLineNav > span > span').append(spanArrow);
     $('.styleVisionNav span.arrow').css('display','block');
     $(".style-vision-nav").addClass('isCurrent');*/
}


function canScroll(ul, li) {


    var ulLeft = ul.offset().left;
    var firstElementLeft = $(li[0]).offset().left;
    var lastElementLeft = $(li[li.length - 1]).offset().left;

    var ulWidth = ul.width();
    var lastElementWidth = $(li[li.length - 1]).width() - 1;

    var totalUl = ulLeft + ulWidth;
    var totalLastElement = lastElementLeft + lastElementWidth;

    var canScrollRight = false;
    var canScrollLeft = false;

    if (firstElementLeft < ulLeft) {
        canScrollLeft = true;
    }
    if (totalLastElement > totalUl) {
        canScrollRight = true;
    }

    var obj = {
        allowLeft: canScrollLeft,
        allowRight: canScrollRight
    };
    return obj;
}

function showRightArrow() {
    $('.ProductOverViewModuleEditable .navigation_section .subnav_section .action-right').removeClass('nope');
}

function hideRightArrow() {
    $('.ProductOverViewModuleEditable .navigation_section .subnav_section .action-right').addClass('nope');
}

function showLeftArrow() {
    $('.ProductOverViewModuleEditable .navigation_section .subnav_section .action-left').removeClass('nope');
}

function hideLeftArrow() {
    $('.ProductOverViewModuleEditable .navigation_section .subnav_section .action-left').addClass('nope');
}

function showHideArrows(ul) {

    if ($(ul).length == 0) {
        return;
    }
    var scrollable = canScroll($(ul), $(ul).find('li'));

    if (scrollable.allowLeft) {
        showLeftArrow();
    } else hideLeftArrow();

    if (scrollable.allowRight) {
        showRightArrow();
    } else hideRightArrow();
}

function autoShiftNav(thisElement) {
    var current = thisElement.parent();
    var currentLi = $(ul).find(thisElement.parent());
    var nextLi = $(ul).find(thisElement.parent().next());
    var prevLi = $(ul).find(thisElement.parent().prev());

    var ulDistance = $(ul).width() + $(ul).offset().left;
    var currentLiDistance = currentLi.width() + currentLi.offset().left;
    var nextLiDistance = nextLi.width() + nextLi.offset().left;

    var totalLiWidth = findTotalLiWidth(ul);

    if (currentLiDistance > ulDistance) {
        $(ul).animate({
            scrollLeft: (prevLi.offset().left)
        }, 1000, 'swing', function () { });
    } else if (currentLiDistance < ulDistance && nextLiDistance > ulDistance) {
        $(ul).animate({
            scrollLeft: (currentLi.offset().left)
        }, 1000, 'swing', function () { });
    }


    setTimeout(function () {
        autoHidePartialLiElements(ul);
        showHideArrows(ul);
    }, 1001);

}

function findTotalLiWidth(ul) {


    var w = 0;
    $(ul).find('li').each(function () {
        w += $(this).outerWidth();
    });
    return w;
}
function getLocale() {
    var pageUrl = window.location.href.toLowerCase();
    var pattern = new RegExp(/^https?:\/\/www.johnfrieda\.[^\/]+(|\/[a-z]{2}-[A-Z]{2}\/.*|\?.*)$/);
    if (pattern.test(pageUrl)) {
        var pageUrlArr = pageUrl.split('/');
        var codes = pageUrlArr[3].split('-');
        var countryCode = codes[1].toLowerCase();
        var languageCode = codes[0].toLowerCase();
        if (countryCode === "uk") {
            countryCode = "gb";
        }
        return {
            "language": languageCode,
            "country": countryCode
        };
    }
    else {
        var langCountryCode = $('html').attr('lang');
        if (langCountryCode != undefined) {
            var codes = langCountryCode.split('-');
            if (codes.length == 2) {
                var countryCode = codes[1].toLowerCase();
                var languageCode = codes[0].toLowerCase();
                if (countryCode === "uk") {
                    countryCode = "gb";
                }
                return {
                    "language": languageCode,
                    "country": countryCode
                };
            }
            return null;
        }
        return null;
    }
    return null;
}

function distinct(anArray) {
    var result = [];
    $.each(anArray, function (i, v) {
        if ($.inArray(v, result) == -1) result.push(v);
    });
    return result;
}

function bazaarVoiceCustom() {
    var bvDivList = $('a[class*="bv-custom-ratings-"]');
    if (bvDivList.length > 0) {
        var skuIdList = [];
        for (var i = 0; i < bvDivList.length; i++) {
            var bvDiv = bvDivList[i];
            var bvDivClass = bvDiv.className.split(' ');
            for (var j = 0; j < bvDivClass.length; j += 1) {
                if (bvDivClass[j].indexOf('bv-custom-ratings-') >= 0) {
                    var skuId = bvDivClass[j].replace("bv-custom-ratings-", "");
					if (skuId)
					{
						skuIdList.push(skuId);
					}
                }
            }
        }
        var pidList = distinct(skuIdList);
        var pidUrl = pidList.toString();
        var localeObj = getLocale();
        if (localeObj != null && localeObj != undefined) {
            var getUrlValue = "https://userservices.kaobrands.com/api/product/review-statistics?product-id=" + pidUrl + "&brand-id=jf&language=" + localeObj.language + "&country=" + localeObj.country;
        } else {
            var getUrlValue = "https://userservices.kaobrands.com/api/product/review-statistics?product-id=" + pidUrl + "&brand-id=jf";
        }
        $.ajax({
            type: "GET",
            url: getUrlValue,
            cache: false,
            success: function (response) {
                for (i = 0; i < pidList.length; i++) {
                    var pid = pidList[i];
                    var bvElement = '.bv-custom-ratings-' + pid;
                    if (response.response[pid] == undefined) {
                        continue;
                    }
                    var avg = response.response[pid].averageRating;
                    var revCount = response.response[pid].reviewcount;
                    var range = response.response[pid].ratingRange;
                    if (avg && revCount && range) {
                        var starWidth = avg / range * 100.0;
                        $(bvElement).append(getHtmlForBazaarVoice(pid, starWidth, revCount));
                    }
                }
            },
            error: function (error) {

            }
        });
    }
}

function getHtmlForBazaarVoice(pid, starWidth, revCount) {


    var htmldata = '<div class="bv-custom-ratings-' + pid + '" style="text-align: center;"><div class="ratings-container"><div class="ratings-star-container"><span class="ratings-star-invalid">★★★★★</span><span class="ratings-star-valid" style="width:' + starWidth + '%;">★★★★★  </span></div><div class="ratings-value"><span>(' + revCount + ')</span></div></div></div>';

    return htmldata;
}

function autoHidePartialLiElements(ul) {

    var windowWidth = $(window).width();
    var leftLimit = $(ul).offset().left;
    var rightLimit = leftLimit + $(ul).width();

    var listElements = $(ul).find('li');

    for (var i = 0; i < listElements.length; i++) {

        var currentLi = $(listElements[i]);

        var elementLeft = currentLi.offset().left;
        var elementRight = elementLeft + currentLi.width();

        //for left side
        if (elementLeft < leftLimit && elementRight >= leftLimit) {
            if (Math.abs(elementLeft - leftLimit) < 5) {
                //show element
                currentLi.css('visibility', 'visible');
            }
            else {
                //hide element

                currentLi.css('visibility', 'hidden');
            }
        }

        //for right side
        if (elementLeft <= rightLimit && elementRight > rightLimit) {
            if (Math.abs(elementRight - rightLimit) < 5) {
                //show element
                currentLi.css('visibility', 'visible');
            }
            else {
                //hide element

                currentLi.css('visibility', 'hidden');
            }
        }
    }
}

function showAllLiElements(ul) {
    var li = $(ul).find('li');

    for (var i = 0; i < li.length; i++) {

        var currentLi = $(li[i]);
        currentLi.css('visibility', 'visible');
    }
}
