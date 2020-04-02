/**
 * Define console log methods as empty methods (to avoid JS error as KAO common files have removed them.
 */

if (typeof console.warn === 'undefined') {
    console.warn = function () { };
}
if (typeof console.log === 'undefined') {
    console.log = function () { };
}
if (typeof console.info === 'undefined') {
    console.info = function () { };
}
if (typeof console.error === 'undefined') {
    console.error = function () { };
}

(function () {
    //Curel webiste JS
    "use strict";
    var curelObject = {};

    $(document).ready(function () {

        //Ingredient popup
        $('.g-ProductDetailTemplate .g-ProductDetailUnit .g-ProductDescription .g-TextLinkP .g-TextLinkUnit').click(function () {
            $('.g-ProductDetailTemplate .g-ProductDetailUnit .g-ProductDescription .g-Text.ingredients-popup').css("display","block");
        });

        $(body).on('click',"#ingredients-popup", function(e) {
            e.preventDefault();

            if(e.target.id === "ingredients-popup"){
              $('#ingredients-popup').fadeOut();
            }
        });

        // No carousel
        $('.curel-home-carousel .slick-slider').closest('.curel-home-carousel').addClass('yes-carousel');

        // Country Selector exception
        $('.curel-country-select').parents('#area-Contents').addClass('curel-country-select-wrapper');

        //Accordian for mobile design
            if ($(window).width() <= 640 ) {
                $(".mobile-accordion .g-HeadingTitle").click(function () {
                    if ($(this).closest('.g-GroupBox ').hasClass('active')) {
                        $(".g-GroupBox ").removeClass('active');
                        $('.g-Text').slideUp(400);    
                    } else {
                        $(".mobile-accordion .g-GroupBox ").removeClass('active');
                        $('.mobile-accordion .g-Text').slideUp();
                        $(this).closest('.g-GroupBox ').addClass("active");
                        $(this).siblings('.g-Text').slideDown(400);
                    }
                });
            }
    
            // Indredient slider 
            if ($(window).width() >= 641 ) {
                $(".desktop-accordion .g-HeadingTitle").click(function () {
                    $(".desktop-accordion").toggleClass('active');
                    $(".desktop-accordion .g-Text").slideToggle(200);
                });
            }
         // Add title to the where to buy icons

        $(".whereToBuy .g-ListP__ul .g-ListP__ul__item").each(function () {
            $(this)
                .find(".is-background")
                .prop(
                    "title",
                    $(this)
                    .find(".cmn-richtext > span")
                    .eq(0)
                    .text()
                );
        });

        //Where to buy noLink
        $(".where-to-buy-wrapper-sa .g-TextLinkUnit a").each(function () {
            if ($(this).attr("href") == undefined) {
                $(this)
                    .parent()
                    .addClass("noLinks");
            }
        });

        // Text toggle in menu

        $(".menu-toggle .g-Text").addClass("menu-close");// Example for commit and update

        // Search section
        $(".curel-search-section .open-close-toggle").click(function () {
            if($(".curel-search-section .active")){
                $(".curel-menu-wrapper").css("display", "none"); 
                $(".menu-toggle .g-Text").removeClass("menu-open").addClass("menu-close");
            }
            $(this)
                .closest(".curel-search-section")
                .toggleClass("active");
        });

        // Main menu toggle
        $(".menu-toggle .g-Text").click(function () {
            $(".curel-menu-wrapper").slideToggle(500);
            $(this).toggleClass("menu-open menu-close");
            $(".curel-search-section").removeClass("active");
        });

        // Dropdown menu Toggle
        var dropToggle = $(".menu-dropdown");
        dropToggle.click(function () {
            $(this).toggleClass("active-menu");
            $(this)
                .find(".menu-dropdown-wrapper")
                .toggleClass("active")
                .slideToggle(500);
        });

        // Top Manu Toggle
        $(".sub-menu-toggle").click(function () {
            $(this).toggleClass("active");
            $(".curel-top-nav").slideToggle(500);
        });

        // Footer placeholder
        $(".form_row").each(function () {
            var label = $(this)
                .find(".form_leftcollabel label")
                .text();
            $(this)
                .find("input")
                .attr("placeholder", label);
            $(this)
                .find("textarea")
                .attr("placeholder", label);
        });

        // Carousel JS
        $(".curel-home-carousel .g-ImageCarouselPUnit").each(function () {
            $(this)
                .find(".carousel-group-left")
                .wrapAll('<div class="carousel-group-wrapper"></div>');
        });

        // Print Article Page
        $(".sharif-print-icon-wrapper .print-wrapper").click(function () {
            window.print();
            return false;
        });
        

        // Tablet click event for where to buy
        $(window).on("resize", function () {
            if ($(window).width() > 640 && $(window).width() <= 1366) {
                $(".whereToBuy ul.g-ListP__ul li").click(function () {
                    $(this).addClass("active");
                    $(".whereToBuy ul.g-ListP__ul li").not(this).removeClass("active");
                });
            }
        });

        // Floating columns
        $('.float-right').parent('.g-Column__cols').addClass('float-right-parent');

        
        //Product classes
        // $('.g-ProductListingList--inner .g-ProductListingListUnit').each(function () {
        //     var classText = $(this).find('.g-ProductListingTitle .cmn-richtext').text().trim().replace(/\s/g,'-').toLowerCase();
        //     $(this).addClass(classText);
        // });

        // Product Details e
        $('.productDetailContainer .g-ProductSize .g-SelectedItem').text('Select Size');

        // Footer popup wrapper
        $('.newsletter-popup-container').wrapAll("<div class='newsletter-popup-wrapper'></div>")

        // Article banner remove
        $('.article-category-landing-wrapper').parents('#area-Contents').siblings('#area-BrHeader').addClass('article-banner-hide');
        $('.curel-home-carousel').parents('#area-Contents').siblings('#area-BrHeader').addClass('article-banner-hide');

        // Article Shariff
        $(".curel-body-wrapper .shariff").attr("data-button-style", "icon-count");
        $(".curel-body-wrapper .shariff").attr("data-services", "['facebook','addthis']");
        // var sharrifFURL = window.location.pathname;
        // $(".curel-body-wrapper .shariff").attr('data-url');

        // Product Page Shariff
        $(".g-ProductDetail .shariff").attr("data-button-style", "icon-count");
        $(".g-ProductDetail .shariff").attr("data-services", "['facebook','addthis']");
        // $(".g-ProductDetail .shariff").attr('data-url');

        // Article Select dropdown
        $('.article-category-body-wrapper .g-HeadingTitle .g-ListP').append('<span class="article-title">Select Category</span>');
        $('.article-category-body-wrapper .g-HeadingTitle .g-ListP').click(function(){
            if($(this).closest('.g-ListP').hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('.g-ListP__ul ').slideUp(300);
            } else {
                $(this).addClass('active');
                $(this).find('.g-ListP__ul ').slideDown(300);
            }
            
        })
        $(document).on('click', function (e) {
            if ($(e.target).closest(".article-category-body-wrapper .g-HeadingTitle .g-ListP").length === 0) {
                $('.article-category-body-wrapper .g-HeadingTitle .g-ListP').removeClass('active');
                $('.article-category-body-wrapper .g-HeadingTitle .g-ListP').find('.g-ListP__ul ').slideUp(300);
            }
        });

        // Learn more text article page
        $('.article-category-body-wrapper .g-NewsIndexP--v3 .g-NewsIndexP--v3__card .g-NewsIndexP--v3__card__item').ready(function(){
            $(this).find('.g-NewsIndexUnit--v3__innerBlock ').append("<span class='article-card-link'>Learn More</span>");
            var classCheckFlag = $('.article-category-body-wrapper');
            if(classCheckFlag.hasClass('canada-article-fr')) {
                $(this).find('.g-NewsIndexUnit--v3__innerBlock span ').text("Apprenez-en plus");
            }
        })
        //Load more button for mobile
        
        // $('.article-category-body-wrapper .g-ButtonP .g-ButtonUnit').click(function(){
        //     $(this).fadeOut(400,function(){
        //         $('.article-category-body-wrapper .g-Column__inner .g-NewsIndexP--v3 .g-NewsIndexP--v3__card .g-NewsIndexP--v3__card__item').css("display", "block");
        //         $('.article-category-body-wrapper .article-no-more ').css("display","block");
        //     });   
        // })


        $(".article-category-body-wrapper .g-NewsIndexP--v3__card__item").addClass('hidden');
        $(".article-category-body-wrapper .g-NewsIndexP--v3__card__item").slice(0, 2).removeClass('hidden');
        $("#loadMoreButton").on('click', function(e) {
            e.preventDefault();
            if ($(window).width() < 640) {
                $(".article-category-body-wrapper .g-NewsIndexP--v3__card__item.hidden").slice(0, 2).removeClass('hidden');
                if ($(".g-NewsIndexP--v3__card__item.hidden").length == 0) {
                    $("body:not(.is-authorring) #loadMoreButton").hide();
                    $('.article-category-body-wrapper .article-no-more ').css("display","block");
                }
            }
        });


        //severe dry-skin-article sectionwise Scrolling

        $(".curel-article-wrapper .severe-dry-scroll .g-Text span").on('click', function(event) {

            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
              // Prevent default anchor click behavior
              event.preventDefault();
        
              // Store hash
              var hash = this.hash;
        
              // Using jQuery's animate() method to add smooth page scroll
              // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
              $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 800, function(){
           
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
              });
            } // End if
          });

          $(".curel-article-wrapper .severe-dry-scroll li a").on('click', function(event) {

            // Make sure this.hash has a value before overriding default behavior
            if (this.hash !== "") {
              // Prevent default anchor click behavior
              event.preventDefault();
        
              // Store hash
              var hash = this.hash;
        
              // Using jQuery's animate() method to add smooth page scroll
              // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
              $('html, body').animate({
                scrollTop: $(hash).offset().top
              }, 800, function(){
           
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
              });
            } // End if
          });
    });



})();