/**
 * Define console warn method.
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

$('.shariff').attr('data-button-style', 'icon');
var locale = {
  'en-ca': '[]',
  'fr-ca': '[]',
  'fr-fr': '[]',
  'es-mx': '[]',
  'de-de': '[]',
  'en-au': '[]',
  'en-gb': '[]',
  'en-us': "['pinterest']",
  'nl-nl': "['pinterest']",
  'en-sa': "['pinterest']",
  'ar-sa': "['pinterest']"
};
for (var i in locale) {
  var country = locale[i];
  var language = $('html').attr('lang');
  if (i == language) {
    $('.shariff').attr('data-services', locale[i]);
  }
}

$(window).on('load', function () {
  if (!$('body').hasClass('is-authorring')) {
    var height = $('.g-ProductTitle')
      .closest('.g-ProductDetailUnit__inner')
      .height();
    var height1 = $('.g-ProductTitle')
      .closest('.g-ProductDetailUnit')
      .height();
    var margintop = -(height1 - height) + 20;
    var length = $('.g-ProductDetailUnit__inner').children('.g-WhereToBuy')
      .length;
    if (
      $('.g-ProductDetailTemplate .g-TileLinkVP').hasClass('related-products')
    ) {
      $('.related-products').css('margin-top', margintop);
      $('.related-products').css('margin-bottom', 50);
    } else if (
      $('.g-ProductDetailUnit__inner').children('.g-WhereToBuy').length > 0
    ) {
      margintop = -(height1 - height) + 90;
      $('.product-detail-info .g-AccordionMenu').css('margin-top', margintop);
    } else {
      $('.product-detail-info .g-AccordionMenu').css('margin-top', margintop);
    }
  }
});
(function () {
  $('.g-ProductListingList--inner').addClass('js-uniformHeight');
  $('.g-ProductListingList--inner').attr(
    'data-uniform-target',
    'g-ProductOverview__h2'
  );
})();

(function () {
  // Biore webiste JS
  'use strict';
  var bioreObject = {
    activeURL: function (pathName, target) {
      target.each(function (num, ele) {
        var targetURL = $(ele).attr('href');
        if (targetURL != undefined) {
          if (targetURL.indexOf('.html') != -1) {
            targetURL = targetURL.split('.')[0];
          }
          if (pathName.indexOf(targetURL) != -1) {
            $(ele).addClass('on');
            return;
          }
        }
      });
    },
    breakpoints: {
      header_sm: 991,
      header_md: 992,
      sm: 640,
      md: 1024
    },
    headerChangedFor: '',
    headerChanger: function (screenWidth) {
      if (
        this.headerChangedFor !== 'mob' &&
        screenWidth < this.breakpoints.header_md
      ) {
        $('.header-dropdown-wrapper').insertAfter('.ul-wrapper .main-nav-ul');
        this.headerChangedFor = 'mob';
        return;
      } else if (
        this.headerChangedFor !== 'desk' &&
        screenWidth >= this.breakpoints.header_md
      ) {
        $('.header-dropdown-wrapper').appendTo('#products');
        this.headerChangedFor = 'desk';
        return;
      }
    }
  };

  var dom = $(this);
  var $window = $(window);
  var pathName = window.location.href;

  $(document).ready(function () {
    // Add title to the where to buy icons
    // $('.whereToBuy .g-ListP__ul__item').each(function () {
    //     $(this).find('.is-background').prop('title', $(this).find('.cmn-richtext > span').text());
    // });

    $('.whereToBuy .g-ListP__ul .g-ListP__ul__item').each(function () {
      $(this)
        .find('.is-background')
        .prop(
          'title',
          $(this)
            .find('.cmn-richtext > span')
            .eq(0)
            .text()
        );
    });

    bioreObject.headerChanger($window.width());
    $('#bioreSignUp_signup_email').attr(
      'placeholder',
      $(".biore-footer-wrapper label[for='bioreSignUp_signup_email']").text()
    );

    bioreObject.activeURL(
      pathName,
      $('.main-nav-ul > li > .g-TextLinkP .g-TextLinkUnit__link')
    );

    // Menu JS
    /* if ($(window).width() < 712) {
            $('.menu-sm').click(function () {
                $(this).toggleClass('is-open');
                $('.biore-header').toggleClass('menu-open');
                $('.categoryContainer').removeClass('active').find(".g-ListP").slideUp(500);
                $('.main-nav-ul .relative > .g-TextLinkP').parent().removeClass('list-open');
                $('.biore-header-dropdown-wrapper').slideUp(500);
                $('.biore-header').slideToggle(500);
            });

            $('.main-nav-ul .relative > .g-TextLinkP').click(function (e) {
                if (!$(this).closest('.relative').hasClass('list-open')) {
                    $('.main-nav-ul .relative').removeClass('list-open').closest('.relative').find('.biore-header-dropdown-wrapper').slideUp(500);
                    $(this).closest('.relative').addClass('list-open').closest('.relative').find('.biore-header-dropdown-wrapper').slideDown(500);
                } else {
                    $('.main-nav-ul .relative').closest('.relative').removeClass('list-open').closest('.relative').find('.biore-header-dropdown-wrapper').slideUp(500);
                }
            });

            $('.biore-header-dropdown-wrapper .categoryContainer').click(function () {
                var _this = $(this);

                if (!$(this).hasClass('active')) {
                    $('.categoryContainer').removeClass('active').find(".g-ListP").slideUp(300);
                    $(this).addClass('active').find(".g-ListP").slideDown(500);
                } else {
                    $(this).removeClass('active').find(".g-ListP").slideUp(500);
                }
            });
        } else {
            bioreObject.activeURL(pathName, $(".main-nav-ul > li > .g-TextLinkP .g-TextLinkUnit__link"));
        } */
    // Menu JS

    // Products Details toggle

    if ($(window).width() <= 768) {
      var accordionHead = $('.product-overview-wrapper .g-HeadingTitle');
      accordionHead.click(function () {
        var _this = $(this);
        if (!$(this).hasClass('active')) {
          $('.g-HeadingTitle.active')
            .removeClass('active')
            .siblings('.g-TileLinkVP')
            .slideUp(500);
          $(this)
            .addClass('active')
            .siblings('.g-TileLinkVP')
            .slideDown(500, function () {
              $('html, body').animate(
                {
                  scrollTop: $(this).offset().top - 160
                },
                500
              );
            });
        } else {
          $(this)
            .removeClass('active')
            .siblings('.g-TileLinkVP')
            .slideUp(500, function () {
              $('html, body').animate(
                {
                  scrollTop: $(this).offset().top - 160
                },
                500
              );
            });
        }
      });
    }

    // PRODUCT-DETAIL CAROUSEL
    if (!$.fn.isAuthorring()) {
      if ($(window).width() <= 640) {
        $('.product-detail-info .g-RelatedContent__wrapper--inner').slick({
          arrows: true,
          slidesToShow: 1
        });
      }
    }
    if (!$('body').hasClass('is-authorring')) {
      $('.g-ProductDetailUnit .g-ProductSocial').insertAfter('.g-WhereToBuy');
    }

    // Products Details toggle
    // Where to buy noLink
    $('.where-to-buy-wrapper-sa .g-TextLinkUnit a').each(function () {
      if ($(this).attr('href') == undefined) {
        $(this)
          .parent()
          .addClass('noLinks');
      }
    });

    $('.biore-blog-wrapper .g-GroupBox').wrap(
      '<div class="g-GroupBoxWrapper"></div>'
    );
    var height = $('.blogSideNavigation').height();
    height = height * -1;
    $('.blogSideNavigation').css('margin-bottom', height);

    $('.biore-blog .g-GroupBox').wrap('<div class="g-GroupBoxWrapper"></div>');
    var blogheight = $('.blogSideNavigation').height();
    blogheight = blogheight * -1;
    $('.blogSideNavigation').css('margin-bottom', blogheight);

    /* // Sticky Header
        var headerTrg = $('#area-BrHeader');
        headerTrg.addClass('sticky-header');
        $(window).scroll(function () {
            var headerTop = $(this).scrollTop();
            if (headerTop > 10) {
                headerTrg.addClass('stick-top');
            } else {
                headerTrg.removeClass('stick-top');
            }
        }) */

    // BV PIXEL integration for where to buy header link

    $('.bv-where-to-buy').on('click', function (evt) {
      evt.returnValue = false;
      if (typeof BV !== 'undefined') {
        BV.pixel.trackConversion({
          type: 'WhereToBuy',
          label: 'WhereToBuy_Header'
        });
      }
      evt.returnValue = true;
    });

    // Where to buy pop up for touch devices
    $('.whereToBuy > .g-ListP__ul > li.g-ListP__ul__item').click(function () {
      //             $(".g-ListP").removeClass("active");
      $('.g-ListP')
        .find('span.is-background')
        .removeClass('active');
      var innerListPack = $(this).find('.g-ListP');
      innerListPack.closest('span.is-background').toggleClass('active');
      //             innerListPack.toggleClass("active");
    });

    $('#mobile-menu').click(function () {
      if ($window.width() <= bioreObject.breakpoints.sm) {
        $(this).toggleClass('open');
        $('.logo-wrapper').toggleClass('hidden');
      }
      $('.ul-wrapper').toggleClass('open');
    });

    var productsLi = $('#products');
    var productsDropdown = $('.header-dropdown-wrapper');
    var allHeaderLinks = $('.main-nav-ul > li');
    var otherHeaderLinks = $('.main-nav-ul > li:not(#products)');
    var productCategories = $('.header-dropdown-wrapper .g-TextLinkP');
    var arrowMd = $('.ul-wrapper .arrow-down-md');
    var level = 0;
    var allProductsPack = $('.header-dropdown-wrapper .g-ListP');
    var arrowNext = $('.ul-wrapper .arrow-next');
    var dynamicArrow = "<span class='arrow category-arrow-prev'></span>";

    var mobileMenuLevel = function (currentThis) {
      /* if(level == 1){
                currentThis.removeClass("prev");
                otherHeaderLinks.show();
                arrowNext.show();
                productsDropdown.hide();
            }
            else if(level == 2){
                productCategories.find(".category-arrow-prev").removeClass("prev");
                allProductsPack.hide();
                productCategories.show();
                productsLi.show();
            }
            level -= 1;
            return; */

      switch (level) {
        case 0:
          otherHeaderLinks.hide();
          $(currentThis).hide();
          productsDropdown.show();
          productCategories.show();
          $('#products .arrow-prev').addClass('prev');
          level += 1;
          break;
        case 1:
          productCategories.not(currentThis).hide();
          allHeaderLinks.hide();
          $(currentThis)
            .find('.category-arrow-prev')
            .addClass('prev');
          $(currentThis)
            .next()
            .show();
          level = 2; // final level
          break;
        case 2:
          allProductsPack.hide();
          $(currentThis)
            .find('.category-arrow-prev')
            .removeClass('prev');
          productCategories.show();
          productsLi.show();
          level -= 1;
          break;
        default:
          productCategories.hide();
          $(currentThis).removeClass('prev');
          arrowNext.show();
          otherHeaderLinks.show();
          level = 0;
          break;
      }
    };

    $('.icon-search').click(function () {
      $(this)
        .siblings('input')
        .toggleClass('on')
        .focus();
    });

    // SEARCH BAR

    $('.bioreHeaderSearchBlock .mf_finder_searchBox_submit').click(function (
      event
    ) {
      $('.bioreHeaderSearchBlock .mf_finder_searchBox_query_wrap')
        .toggleClass('on')
        .focus();
      if (
        $('.bioreHeaderSearchBlock .mf_finder_searchBox_query_wrap')
          .css('display')
          .toLowerCase() == 'block'
      ) {
        event.preventDefault();
      } else {
        var x = $('.mf_finder_searchBox_query_input').val();
        if (x.length >= 1) {
          return true;
        } else {
          event.preventDefault();
        }
      }
    });

    arrowMd.click(function () {
      $('.header-dropdown-wrapper').toggleClass('on');
      $(
        '.main-nav-ul > li#products > .g-TextLinkP a.g-TextLinkUnit__link'
      ).toggleClass('on');
    });

    arrowNext.click(function () {
      mobileMenuLevel(this);
    });

    $('.ul-wrapper').on('click', '.arrow-prev', function () {
      level = -1;
      mobileMenuLevel($(this));
    });

    if ($window.width() < bioreObject.breakpoints.header_md) {
      productCategories.each(function (num, ele) {
        $(ele).prepend(dynamicArrow);
      });
      productCategories.click(function () {
        mobileMenuLevel(this);
      });
    }

    // RESIZE EVENT
    $window.resize(function () {
      bioreObject.headerChanger($window.width());
    });

    // COUNTRY SELECTOR

    var $map = $('#map');
    var $links = $('.link');

    // --- onActiveCountry ---
    var onActiveCountry = function ($target) {
      var target = $target.attr('class');
      var country = $target
        .first()
        .children()
        .attr('class');
      country = '.' + country.match(/\b[a-z]{3}\b/g).join('.');
      var $mapCountryItem = $map.find(country);
      var $linksCountryItem = $links.find(country);
      $mapCountryItem.children('a').addClass('test');
      var $attention = $('<p></p>').addClass('attention');
      $('.marker')
        .find('.test')
        .append($attention);
      $linksCountryItem.parent().addClass('test');
    };

    // --- onDeactiveCountry ---
    var onDeactiveCountry = function ($target) {
      var country = $target
        .first()
        .children()
        .attr('class');
      country = '.' + country.match(/\b[a-z]{3}\b/g).join('.');
      var $mapCountryItem = $map.find(country);
      var $linksCountryItem = $links.find(country);
      $mapCountryItem.find('a').removeClass('test');
      $mapCountryItem.find('p').remove();
      $linksCountryItem.parent().removeClass('test');
      // $mapCountryItem.find(".attention").hide();
    };

    // --- Mouse hover event ---
    $('.link li, #map li ').hover(
      function () {
        onActiveCountry($(this));
      },
      function () {
        onDeactiveCountry($(this));
      }
    );

    if (typeof $BV !== 'undefined') {
      $BV.configure('global', {
        events: {
          submissionSubmitted: function (data) {
            if (typeof s !== 'undefined') {
              s.linkTrackVars = 'events';
              s.linkTrackEvents = 'event6';
              s.events = 'event6';
              s.tl(this, 'o', 'Post_Product Review');
            }
          }
        }
      });
    }
  });

  // PRODUCT DETAILS ACCORDION

  $('.js-accordion').click(function () {
    var otherElements = $('.js-accordion').not(this);
    $(otherElements).each(function (num, ele) {
      $(ele)
        .removeClass('is-radius--open')
        .addClass('is-radius--close');
      $(ele)
        .find('.is-open')
        .removeClass('is-open')
        .addClass('is-close');
    });
  });

  // PRODUCT LISTING ACCORDIAN
  if ($(window).width() <= 640) {
    $('.g-ProductListingCategoryTitle').on('click', function () {
      $('.g-ProductListingCategoryTitle')
        .not(this)
        .removeClass('active');
      $(this).toggleClass('active');
    });
  }

  $('body').on('click', function (e) {
    var x = e.target;
    if ($(e.target).hasClass('g-ProductListingButtonP')) {
      var y = $(x)
        .children('.g-ProductListingButtonP__item')
        .children('a');

      window.location.href = y.attr('href');
    }
  });
})();

// SIGN-UP//

$(document).ready(function () {
  var form = $('form[name="bioreSignUp"]');
  var country = $('input[name="countryPreference"]').val();
  var language = $('input[name="languagePreference"]').val();

  $('input[name="signup_email"]').attr('maxlength', '255');

  $.validator.addMethod('validationEmail', function (value, element) {
    var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
    return this.optional(element) || regex.test(value);
  });

  form.validate({
    rules: {
      signup_email: {
        required: true,
        validationEmail: true,
        maxlength: 255
      }
    },
    messages: {
      signup_email: {
        required: $('#signup_email_msg1').text(),
        validationEmail: $('#signup_email_msg1').text(),
        maxlength: $('#signup_email_msg2').text()
      }
    },
    errorElement: 'label',
    errorPlacement: function (error, element) {
      error.addClass('help-block');
      error.insertAfter(element);
    },
    success: function (label, element) {
      return;
    },
    submitHandler: function (form) {
      var requestData = {
        email: $('input[name="signup_email"]').val(),
        countryPreference: $('input[name="countryPreference"]').val(),
        languagePreference: $("input[name='languagePreference']").val(),
        brandId: $('input[name="brandId"]').val(),
        newsletterSubscribed: $('input[name="newsletterSubscribed"]').val(),
        signupType: $('input[name="signupType"]').val()
      };
      var domain = $('input[name="apiDomain"]').val();
      $('.biore-footer-wrapper-loader .loader-img').addClass('active-loader');
      $.ajax({
        type: 'POST',
        url: domain + 'api/customer/newsletter',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(requestData),
        dataType: 'json',
        cache: false,
        timeout: 60000,
        success: function (data) {
          $('.biore-footer-wrapper-loader .loader-img').removeClass(
            'active-loader'
          );
          if (typeof BV !== 'undefined') {
            BV.pixel.trackConversion({
              type: 'NewsletterSignup',
              label: 'NewsletterSignup'
            });
          }
          if (typeof s !== 'undefined') {
            s.linkTrackVars = 'events';
            s.linkTrackEvents = 'event2';
            s.events = 'event2';
            s.tl(this, 'o', 'Sign-up_Newsletter_Subscription');
          }
          $('#thankYou').addClass('show');

          setTimeout(function () {
            $('#thankYou').removeClass('show');
          }, 3000);
        }
      });
    }
  });
});

// GOOGLE ANALYTICS OPT OUT
function gaOptout(data) {
  $('.fancybox').addClass('open');
  setTimeout(function () {
    $('.fancybox').removeClass('open');
  }, 3000);
  for (i = 0; i < data.length; i++) {
    document.cookie =
      data[i] + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
    disableStr1 = data[i];
    window[disableStr1] = true;
  }
}

// WHERE-TO-BUY TRACKER

function wtbBioreCallback(skuId) {
  if (typeof BV !== 'undefined') {
    BV.pixel.trackConversion({
      type: 'WhereToBuy',
      label: 'WhereToBuy_Button',
      value: skuId
    });
  }

  if (typeof s !== 'undefined') {
    s.linkTrackVars = 'events';
    s.linkTrackEvents = 'event3';
    s.events = 'event3';
    s.tl(this, 'o', 'Where_to_buy_on_Products_page');
  }
}

$('.whereToBuy ul.g-ListP__ul .g-ListP__ul__item a').click(function () {
  var keyword = $(this)
    .find('.cmn-richtext > span')
    .eq(0)
    .text();
  var text = keyword.replace(/[^a-zA-Z ]/g, '');
  if (text == 'Store Locator') {
    if (typeof s !== 'undefined') {
      s.linkTrackVars = 'events';
      s.linkTrackEvents = 'event5';
      s.events = 'event5';
      s.tl(this, 'o', 'Where_to_buy_Store_Locator');
    }
  } else if (typeof s !== 'undefined') {
    s.linkTrackVars = 'events';
    s.linkTrackEvents = 'event4';
    s.events = 'event4';
    s.tl(this, 'o', 'Where_to_buy_Online_Store');
  }
});


// ****************Article*********************
$(document).ready(function () {
  if (!$.fn.isAuthorring()) {
    if ($(window).width() >= 640) {
      $('.tableOfContents').addClass('articleTable');

      var tableHeight = $('.articleTable').height();
      tableHeight = -tableHeight;
      $('.contentArticle').css('marginTop', tableHeight);
    } else {
      $('.tableOfContents').removeClass('articleTable');
    }


    // **************** Load More *********************
    // Blog

    // if ($(window).width() < 640) {
    //   $('.blog .g-Column').addClass('hide');
    //   $('.blog .g-Column').last().removeClass('hide');
    //   $('.loadMoreButton').removeClass('hide');
    //   $('.blog .g-Column').slice(0, 2).removeClass('hide');
    //   $('#loadMore .g-ButtonUnit').on('click', function (e) {
    //     e.preventDefault();
    //     $('.blog  .g-Column.hide').slice(0, 1).removeClass('hide');
    //   });
    // } else {
    //   $('.loadMoreButton ').last().addClass('hide');
    // }

    // // Category

    // if ($(window).width() < 640) {
    //   $('.category .g-Column').removeClass('hide');
    //   $('.category .g-NewsIndexP--v3__card__item').addClass('hide');
    //   $('.category .loadMoreButton').removeClass('hide');
    //   $('.category .g-NewsIndexP--v3__card__item').slice(0, 2).removeClass('hide');
    //   $('.category #loadMore').on('click', function (e) {
    //     e.preventDefault();
    //     $('.category .g-NewsIndexP--v3__card__item.hide').slice(0, 2).removeClass('hide');
    //   });

    //   //**************** Table of contents*********************
    // } else {
    //   $('.category .loadMoreButton ').last().addClass('hide');
    //   $('.category .g-HeadingTitle').removeClass('hide');
    //   $('.category .slider-0').addClass('hide');
    // }
  }
});
