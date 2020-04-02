/**
 * Define console log methods as empty methods (to avoid JS error as KAO common files have removed them.
 */

if (typeof console.warn === 'undefined') {
    console.warn = function () {};
}
if (typeof console.log === 'undefined') {
    console.log = function () {};
}
if (typeof console.info === 'undefined') {
    console.info = function () {};
}
if (typeof console.error === 'undefined') {
    console.error = function () {};
}
var headerAuthCheck = $('.is-authorring #wrapper').length;
if (headerAuthCheck == 0) {
    $('#area-BrHeader').addClass('hide');
} else {
    $('#area-BrHeader').removeClass('hide');
}

(function () {
    //Goldwell webiste JS
    "use strict";
    var goldwellObject = {};
    var imageTextSwiper = $(".js-ImageTextCarouselP");

    //MailTO in social share
    $(".sharrif-wrapper .shariff").attr("data-mail-url","mailto:?body="+window.location.href); 

    //ACCORDION MENU CLOSE WHEN OTHER IS OPEN    
    $(".js-accordion").click(function () {
        var parent = $(this).closest(".g-AccordionMenu");
        var otherElements = parent.find(".js-accordion").not(this);
        $(otherElements).each(function (num, ele) {
            $(ele).removeClass("is-radius--open").addClass("is-radius--close");
            $(ele).find(".g-AccordionUnit__titleBlock__icon").removeClass("cmn-icon--up").addClass("cmn-icon--down")
            $(ele).find(".is-open").removeClass("is-open").addClass("is-close");
        });
    });

    var initializeSlider = function (ele) {
        var stopCarouselEvent = false;
        var imageTextSwiperList = ele.find(".g-ImageTextCarouselP__list");
        var slideTrackNav = ele.parent().find(".js-slide-track-nav");
        var slideTrack = ele.parent().find(".js-slide-track-nav input");
        var ticksarray = new Array(ele.find(".g-ImageTextIconItem").length);

        for (var i = 0; i < ticksarray.length; i++) {
            ticksarray[i] = i + 1;
        }

        imageTextSwiperList.on("afterChange", function () {
            slideTrack.slider("setValue", imageTextSwiperList.slick("slickCurrentSlide") + 1);
            stopCarouselEvent = false;
        });

        slideTrackNav.prepend("<span class='slick-less'>-</span>").append("<span class='slick-more'>+</span>");

        slideTrackNav.on("click", ".slick-less", function () {
            if (imageTextSwiperList.slick("slickCurrentSlide") != 0 && !stopCarouselEvent) {
                stopCarouselEvent = true;
                slideTrack.slider('setValue', slideTrack.slider('getValue') - 1);
                imageTextSwiperList.slick("slickGoTo", imageTextSwiperList.slick("slickCurrentSlide") - 1);
            };
        });

        slideTrackNav.on("click", ".slick-more", function () {
            if (imageTextSwiperList.slick("slickCurrentSlide") != ticksarray.length - 1 && !stopCarouselEvent) {
                stopCarouselEvent = true;
                slideTrack.slider('setValue', slideTrack.slider('getValue') + 1);
                imageTextSwiperList.slick("slickGoTo", imageTextSwiperList.slick("slickCurrentSlide") + 1);
            }
        });

        slideTrack.slider({
            handle: 'square',
            ticks: ticksarray,
            ticks_snap_bounds: 30,
            ticks_tooltip: false,
            tooltip: "hide"
        });
        slideTrack.on("slideStop", function () {
            var currentSlide = imageTextSwiperList.slick("slickCurrentSlide");
            if (currentSlide != $(this).val() - 1) {
                imageTextSwiperList.slick("slickGoTo", $(this).val() - 1);
            }
        });
    }

    //SLIDER FOR GOLDWELL IMAGE SWIPER
    imageTextSwiper.each(function (num, ele) {
        if ($(ele).parent().find(".js-slide-track-nav").length != 0) {
            initializeSlider($(ele));
        }
    });

    $(document).ready(function () {
        $('.search-button').click(function () {
            $('.search-from').toggleClass('active');
        });

        $('.search-container #searchLabel, .search-container .mf_finder_searchBox_submit').click(function (e) {

            if($(".mf_finder_searchBox_query_input").val() == ""){
                e.preventDefault();
            }

            $('.mf_finder_searchBox_query_wrap').toggleClass("search-open");
        });

        // Search Language
        $('.country-selector-container').find('li:nth-child(n+2)').addClass('country-options');
        $('.country-selector-container').click(function () {
            $(this).toggleClass('active');
            $(this).find('.country-options').slideToggle();
        });

        //POLYV VIDEO
        if (window.polyvObject != undefined) {
            $(".polyv_video").each(function (num, ele) {
                var player = new polyvObject($(ele));
                player.videoPlayer({
                    'width': '100%',
                    'vid': $(ele).data("video-id"),
                    'forceH5': true
                });
            });
        }

        //IMAGE ITEM CAPTION
        $(".g-Image").each(function (num, ele) {
            if ($(ele).find(".g-Image__caption").length > 0) {
                $(ele).addClass("hasCaption");
            }
        });

        //HEADER SCROLL

        (function () {

            var homepageCarousel = $("body #master-home-page-top-banner-carousel");
            var $window = $(window);
            var homeHeaderModifier = function (targetHeader, targetCarouselBottom) {

                if (($window.scrollTop() + $window.height()) < targetCarouselBottom) {
                    targetHeader.removeClass("below-carousel not-fixed").addClass("header-home");
                } else if ($window.scrollTop() > targetCarouselBottom) {
                    targetHeader.removeClass("not-fixed").addClass("header-home below-carousel");
                } else if (header.offset().top > (targetCarouselBottom - 30)) {
                    targetHeader.removeClass("header-home").addClass("not-fixed");
                }
            }

            var header = $("#area-BrHeader .header-container");

            if (homepageCarousel.length > 0 && $(window).width() > 769 && header.length > 0) {
                var homepageCarouselBottom = homepageCarousel.offset().top + homepageCarousel.height();
                header.addClass("header-home");
                var headerBottom = header.offset().top + header.height();

                $window.scroll(function () {
                    homeHeaderModifier(header, homepageCarouselBottom);
                });
                homeHeaderModifier(header, homepageCarouselBottom);
            } else if (homepageCarousel.length > 0 && $(window).width() < 770) {
                $("#wrapper").addClass("mobile");
            }
        })();

        // Header mobile wrapper
        if ($(window).width() >= 770) {
            var countryWidth = $('.country-selector-container').width();
            var searchWidth = $('.header-searchContainer').width();
            $(".country-selector-container").css("width", (countryWidth - searchWidth))
        }

        // Header Search bar resize
        $(window).resize(function () {
            var windowWidth = $(window).width();
            if (windowWidth < 770) {
                $(".search-from input").css("width", windowWidth);
            }
        });
        // Country slector
        var countryStatusFlag = $('.country-selector-container').text().trim(' ').length;
        if (countryStatusFlag === 0) {
            $('.country-selector-container').addClass('no-value');
        }
        if ($(window).width() < 770) {


            // Header navigation control
            //            $('.mobile-toggle').click(function () {
            //                $(this).siblings('.header-mobile-wrapper').toggleClass('is-open');
            //                $('#wrapper').toggleClass('is-open');
            //                window.scrollTo(0, 0);
            //            });

            var lvl = 0;
            var countrySelectorContainer = $(".header-mobile-wrapper .country-selector-container");
            var userIcons = $(".header-socialMediaContainer .user-icons");
            //
            var menuNavigator = function (wrappingLiElement, level) {
                var dropdown = wrappingLiElement.children(".dropdownWrapper");
                level += 1;
                countrySelectorContainer.hide();
                userIcons.hide();

                if (wrappingLiElement.hasClass("is-level-open")) {
                    return;
                } else {
                    wrappingLiElement.closest(".is-level-open").children(".g-TextLinkP").hide();
                    wrappingLiElement.addClass("is-level-open");
                }

                if (wrappingLiElement.children(".prev-level").length == 0) {
                    var button = "<button class='prev-level' data-id=" + level + "></button>";
                    wrappingLiElement.append(button);
                } else {
                    wrappingLiElement.children(".prev-level").show();
                }

                wrappingLiElement.siblings().hide();
                if (wrappingLiElement.find(".is-level-open").length != 0) {
                    wrappingLiElement.children(".g-TextLinkP").hide();
                }


                if (dropdown.length != 0) {
                    dropdown.show();
                } else {
                    wrappingLiElement.children(".g-ListP").show();
                }
                return level;
            }

            var goBack = function ($btn, level) {
                var $btnId = $btn.data("id");
                var closestOpenLevel = $btn.closest(".is-level-open");
                if ($btn.siblings(".dropdownWrapper").length > 0) {
                    $btn.siblings(".dropdownWrapper").hide();
                } else {
                    $btn.siblings(".g-ListP").hide();
                }
                closestOpenLevel.children(".g-TextLinkP").show();
                closestOpenLevel.siblings().show();
                closestOpenLevel.removeClass("is-level-open");
                $btn.hide();
                $btn.closest(".is-level-open").children(".g-TextLinkP").show();
            }

            $(document).on("click", ".prev-level", function () {
                goBack($(this), lvl);
            });

            $(".hasLevel > a.g-TextLinkUnit__link").click(function (e) {
                e.preventDefault();
                var $this = $(this);
                lvl = menuNavigator($this.closest(".wrappingLi"), lvl);
            });
        }
        // Heading with image tags
        $('.g-HeadingTitle').children('.g-Image').closest('.g-HeadingTitle').addClass('is-headingProductImage');

        // Form JS
        $('form input[type="submit"]').closest('.form_row').addClass('form-button-wrapper');
        $('form .g-GroupBox .g-ListP').closest('.g-GroupBox ').addClass('custom-dropdown-wrapper');
        $('form input[type="checkbox"]').closest('.g-GroupBox ').addClass('checkbox');
        $('.checkbox input[type="checkbox"]').click(function () {
            if ($(this).prop('checked') == true) {
                $(this).closest('.form_row').addClass('active');
            } else {
                $(this).closest('.form_row').removeClass('active');
            }
        })
        $('form .form_row textarea[name="message"]').closest('.form_row ').addClass('textarea-wrapper');
        $('form .form_row input[type="checkbox"]').closest('.g-GroupBox ').addClass('checkbox-wrapper');
        var valCheckDropDown = $('form .custom-dropdown-wrapper .form_row .form_rightcol_wrapper input');
        $('form .custom-dropdown-wrapper').click(function () {
            if ($(this).hasClass('active')) {
                $(this).find('.g-ListP').slideUp(500);
                $(this).removeClass('active');
            } else {
                $(this).find('.g-ListP').slideDown(500);
                $(this).addClass('active');
            }
        })
        var dropdownUpdartor = function (ele, bool, option) {
            if (bool) {
                valCheckDropDown.val(option);
                var eleNotSel = $('form .custom-dropdown-wrapper .g-ListP .g-ListP__ul__item');
                eleNotSel.removeClass('active');
                if (ele.hasClass('active')) {
                    ele.removeClass('active');
                } else {
                    ele.addClass('active');
                }
                ele.closest('.g-ListP').siblings('.form_row').find('label').text(option);
                if (ele.closest('.g-ListP').siblings('.form_row').find('input').val() != "") {
                    ele.closest('.g-ListP').siblings('.form_row').find('em').text('');
                }
            } else {
                ele.closest('.g-ListP').siblings('.form_row').find('label').text('');
                ele.removeClass('active');
                ele.closest('.custom-dropdown-wrapper').removeClass('active');
                ele.closest('.g-ListP').slideUp(500);
            }
        }
        $('form .custom-dropdown-wrapper .form_row label').text('');
        $('form .custom-dropdown-wrapper .g-ListP .g-ListP__ul__item').click(function () {
            var selOption = $(this).find('.cmn-richtext span').text();
            dropdownUpdartor($(this), true, selOption);
        })
        $(document).on('click', function (e) {
            if ($('form .custom-dropdown-wrapper').hasClass('active')) {
                if ($(e.target).closest("form .custom-dropdown-wrapper").length === 0) {
                    $("form .custom-dropdown-wrapper").removeClass("active");
                    $("form .custom-dropdown-wrapper .g-ListP").slideUp(500);
                }
            }
        });
        $('form input[type="reset"]').click(function () {
            var dropdownItem = $('form .custom-dropdown-wrapper .g-ListP .g-ListP__ul__item');
            dropdownUpdartor(dropdownItem, false, "");
        })

        // Floatingn shariff icons
        var $trigger = $('.sharrif-icon-toggle'); 
        if ($trigger[0]) {
            $trigger.on('click touchend', function () {
                var $me = $(this);
                var $target = $me.next();
                var isHidden = false;

                if ($target.is(':hidden')) {
                    $target.show();
                    isHidden = true;
                }
                var $targetItem = $target.find('.shariff-button').eq(0);
                var targetWidth = $target.find('.shariff-button').length * $targetItem.width();
                if ($.fn.isBreakpointSm() && $(window).height() > $(window).width()) {
                    targetWidth = $targetItem.width();
                }
                if (isHidden) {
                    $target.hide();
                }

                if (!$target.is(':animated')) {
                    $me.toggleClass('is-open');
                    if ($me.hasClass('is-open')) {
                        $target.show();
                        $target.animate({
                            'width': targetWidth
                        }, 500);
                    } else {
                        $target.animate({
                            'width': 0
                        }, 500, function () {
                            $target.hide();
                        });
                    }
                }
            });
        }

        // Country selector

        $('.country-selector-listPack ul li a').addClass('country');

        //LANGUAGE SELECTOR

        $(".select-language li.g-ListP__ul__item").click(function(){
            var firstLi = $(this);
            firstLi.siblings(".g-ListP__ul__item").toggle();
            firstLi.closest(".g-ListP__ul").toggleClass("active");
        });


        //HEADER TEST 
        if($(window).width()<=769){

            //MOBILE MENU LANGUAGE SELECTOR
            if(!$.fn.isAuthorring()){
                $(".select-language").insertBefore(".main-nav");
            }

            $(".goldwell-header .social-share-container").appendTo(".header-nav");
            $('.goldwell-header .mobile-toggle').click(function () {
                $('.goldwell-header .header-nav').toggleClass('is-open');
                $('#wrapper').toggleClass('is-open');
                window.scrollTo(0, 0);
            });

            var mobileHeaderNavigator = function(ele){
                ele.siblings().hide();
                $(".js-nav-back").show();
                ele.addClass("active");
                ele.closest(".js-level").siblings(".cmn-richtext").hide();
                var currentHeading = ele.find(".cmn-richtext")[0];
                var currentLevel = ele.find(".js-level")[0];
                $(currentLevel).addClass("is-open").show();
            }

            var mobileHeaderNavigator_back = function(lastLevel){
                $(lastLevel.find(".js-level")[0]).hide();
                lastLevel.siblings().show();
                lastLevel.removeClass("active");
                lastLevel.closest(".js-level").siblings(".cmn-richtext").show();
            }

            var salonFinder = $(".g-TextLinkUnit.salon-finder").parent();

            salonFinder.prependTo(".main-nav > ul.g-ListP__ul");

            $(".main-nav li.g-ListP__ul__item").click(function(e){
                if(!$(this).hasClass("active") && $(this).find(".js-level").length > 0){
                    e.preventDefault();
                    $(".main-nav").addClass("opened");
                    $(".select-language").hide();
                    mobileHeaderNavigator($(this));
                }
            });

            $(".js-nav-back").click(function(){
                var activeLevels = $(".g-ListP__ul__item.active");
                var lastActiveLevel = $(".g-ListP__ul__item.active")[activeLevels.length - 1]
                mobileHeaderNavigator_back($(lastActiveLevel));
                if(activeLevels.length == 1){
                    $(".main-nav").removeClass("opened");
                    $(this).hide();
                    $(".select-language").show();
                }
            });
        }

    });

    //ANALYTICS
    $(document).on("click",".shariff-button",function(){
        var shariffButton = $(this);

        if(shariffButton.hasClass("mail")){
            return;
        }

        if(typeof s != "undefined"){
            s.linkTrackVars= "prop3,events";
            s.linkTrackEvents= "event5";
            s.events= "event5";

            if(shariffButton.hasClass("facebook")){

                s.prop3= "facebook";
                s.tl(this,'o','Social_Media_Share');
            }
            else if(shariffButton.hasClass("twitter")){

                s.prop3= "twitter";
                s.tl(this,'o','Social_Media_Share');
            }
            else if(shariffButton.hasClass("whatsapp")){

                s.prop3= "whatsapp";
                s.tl(this,'o','Social_Media_Share');
            }
            else if(shariffButton.hasClass("pinterest")){
                s.prop3= "pinterest";
                s.tl(this,'o','Social_Media_Share');
            }

            return;
        }
    });

    $(".g-FilterCategoryList__item input").change(function(e){
        var checkBox = $(this);
        if(checkBox.is(":checked")){
            if(typeof s != "undefined"){
                s.linkTrackVars ="prop2,eVar2,events";
                s.linkTrackEvents ="event2";
                s.prop2 = checkBox.siblings("span").text();
                s.eVar2 = "D=c2";
                s.events = "event2";
                s.tl(this,'o','Select_Product_finder');
            }
        }
    });
})();