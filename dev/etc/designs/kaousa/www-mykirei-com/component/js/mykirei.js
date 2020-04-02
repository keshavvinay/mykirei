/**
 * Define console warn method.
 */
if (typeof console.warn === 'undefined') {
    console.warn = function() {};
}
if (typeof console.log === 'undefined') {
    console.log = function() {};
}
if (typeof console.info === 'undefined') {
    console.info = function() {};
}
if (typeof console.error === 'undefined') {
    console.error = function() {};
}

var mobile = 641

//homepage specifying height of copy under animation

var heights = $(".kirei-homepage-sustainability-text-column-separator .g-Text").map(function() {
    return $(this).height();
}).get();

maxHeight = Math.max.apply(null, heights);
$(".kirei-homepage-sustainability-text-column-separator .g-Text").height(maxHeight);


//newsletter signup placeholder
$('.mykirei-footer-nl-placeholder').attr('placeholder', $('label[for=mykirei_SignUp_nl_email]').text())



$('#mobile-menu').click(function hamburgerfunc() {
    $('.kirei-header-main-nav').toggleClass('active')
    $('.mk-Header__navSearch').toggleClass('active')
    $('.kirei-header-social-icons').toggleClass('active')
    if ($(window).width() < 641) {
        $('.mykireiHeaderSearchBlock .mf_finder_searchBox_items').toggleClass('active')
    }

    $('.kirei-footer-icons').toggleClass('footer-active')
    if ($('.kirei-header-main-nav').hasClass('active')) {
        $('#mobile-menu').addClass('hamburger-close-button')
        $('#mobile-menu').attr('src', '/content/dam/sites/kaousa/www-mykirei-com/us/icons/Close%20button.svg')
    } else {
        $('#mobile-menu').removeClass('hamburger-close-button')
        $('#mobile-menu').attr('src', '/content/dam/sites/kaousa/www-mykirei-com/us/icons/Menu.svg')
    }

});
$('.mk-Header__navSearch').click(function() {
    if ($(window).width() > 1024) {
        $('.mk-Header__navSearch').addClass('search-open')
    }
})
$('.mk-Header__navSearch__close').click(function(e) {
    e.stopPropagation();
    $('.mk-Header__navSearch').removeClass('search-open')
})

//pdp page product gallery functionality 


$('.mykirei-pdp-productgallery-thumbnails .g-TileLinkVP__list li:first-child .g-TileLinkVUnit__inner img').addClass('thumbnail-selected')
$('.mykirei-pdp-productgallery-thumbnails .g-TileLinkVP__list .g-TileLinkVUnit__inner img').click(function() {
    $('.mykirei-pdp-productgallery-thumbnails .g-TileLinkVP__list .g-TileLinkVUnit__inner img').removeClass('thumbnail-selected')
    var gallerySrc = $(this).attr('src').replace('thumbnail', 'gallery').split('?')[0]
    $('.mykirei-pdp-productgallery-img img').attr('src', gallerySrc + '?wid=757')
    $(this).addClass('thumbnail-selected')
})


if ($(window).width() < mobile) {
    $('.mf_finder_searchBox_form').submit(function() { $('#mobile-menu').trigger('click') })
}

//ingrediants glossary

$(".mykirei-transparency-section2-columnsep-products ul.g-LabelTagP__list li").click(function() {
    if ($(window).width() < mobile) {
        $('.mykirei-transparency-section2-columnsep-popup').addClass('active')
    }
    $(".mykirei-transparency-section2-columnsep-popup").css('visibility', 'visible')
    $(".mykirei-transparency-section2-columnunit-right .g-ImageCarouselP").css('display', 'block')

})



$('.transparency-popup-closebutton').click(function() {
    if ($(window).width() < mobile) {
        $('.mykirei-transparency-section2-columnsep-popup').removeClass('active')

    }

    $(".mykirei-transparency-section2-columnsep-popup").css('visibility', 'hidden')
    $(".mykirei-transparency-section2-columnunit-right .g-ImageCarouselP").css('display', 'none')

})

$(".mykirei-transparency-banner3-a2z-previousbutton").click(function() {
    var leftPos = $('.mykirei-transparency-banner3-a2z ul').scrollLeft();
    $(".mykirei-transparency-banner3-a2z ul").animate({ scrollLeft: leftPos - 400 }, 800);
});

$(".mykirei-transparency-banner3-a2z-nextbutton").click(function() {
    var leftPos = $('.mykirei-transparency-banner3-a2z ul').scrollLeft();
    $(".mykirei-transparency-banner3-a2z ul").animate({ scrollLeft: leftPos + 400 }, 800);
});









//marsfinder search
$(document).ready(function() {


    $('.mykireiHeaderSearchBlock .mf_finder_searchBox_query_wrap').append('<button class="search-close"></button>')
    $('.mykireiHeaderSearchBlock .mf_finder_searchBox_submit').click(function(event) {

        if ($(window).width() > 640) {

            $('.mykireiHeaderSearchBlock .mf_finder_searchBox_query_wrap').toggleClass('on').focus();
        }

        if ($('.mykireiHeaderSearchBlock .mf_finder_searchBox_query_wrap').css('right').includes('-')) {
            event.preventDefault();
        } else {
            var x = $('.mf_finder_searchBox_query_input').val();
            if (x.length >= 1) {

                if (typeof s != "undefined") {
                    s.linkTrackVars = "prop1,eVar1,events";
                    s.linkTrackEvents = "event1";
                    s.prop1 = x;
                    s.eVar1 = "D=c1";
                    s.events = "event1";
                    s.tl(this, 'o', 'On_site_search');
                }

                return true;
            } else {
                event.preventDefault();
            }
        }
    });
    $('.search-close').click(function() { $('.mykireiHeaderSearchBlock .mf_finder_searchBox_query_wrap').removeClass('on') })

})


/*--------------------*/
//animation loop after refresh 
var gifSource;
if ($(window).width() > 1024) {
    gifSource = $('#gif-animation .g-Image__img--lg img').attr('src');
    $('#gif-animation .g-Image__img--lg img').attr('src', "");
    $('#gif-animation .g-Image__img--lg img').attr('src', gifSource + "?" + new Date().getTime());
} else if ($(window).width() > 640 && $(window).width() < 1025) {
    gifSource = $('#gif-animation .g-Image__img--md img').attr('src');
    $('#gif-animation .g-Image__img--md img').attr('src', "");
    $('#gif-animation .g-Image__img--md img').attr('src', gifSource + "?" + new Date().getTime());

} else if ($(window).width() < 641) {
    gifSource = $('#gif-animation .g-Image__img--sm img').attr('src');
    $('#gif-animation .g-Image__img--sm img').attr('src', "");
    $('#gif-animation .g-Image__img--sm img').attr('src', gifSource + "?" + new Date().getTime());

}