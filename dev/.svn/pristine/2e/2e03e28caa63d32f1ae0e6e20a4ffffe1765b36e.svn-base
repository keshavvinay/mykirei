
$(document).ready(function () {
  if (!$('body').hasClass('is-authorring')) {
    // ************ News Index Carousel **************

    if ($(window).width() >= 640) {
      $('.news-index-carousel ul').slick({
        arrows: true,
        slidesToShow: 2,
        autoplay: false,
        dots: false
      });
    }

    // Universal Cat Slider
    $('.slider-0 .catSlider ul').slick({
      arrows: true,
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: 780,
          settings: {
            arrows: true,
            slidesToShow: 3
          }
        },
        {
          breakpoint: 640,
          settings: {
            arrows: true,
            slidesToShow: 2
          }
        }
      ]
    });


    // Padding adjustment for blog Home and category

    if ($(window).width() < 640) {
      $('.category.biore .slider-0, .category.biore .loadMoreButton, .blog.biore .loadMoreButton').removeClass('hide');
    }

    $('.g-NewsIndexP--v3__card__item').slice(3).addClass('hide');
    $('#loadMore').on('click', function (e) {
      e.preventDefault();
      $('.g-NewsIndexP--v3__card__item.hide').slice(0, 3).removeClass('hide');

      if ($(".g-NewsIndexP--v3__card__item.hide").length === 0) {
        $('#loadMore').addClass('hide');
      }


    });

    if ($(window).width() > 640) {
      $('.category.biore .g-NewsIndexP--v3__card__item, .blog.blog-video .g-NewsIndexP--v3__card__item, .blog.biore .g-NewsIndexP--v3__card__item').removeClass('hide');
    }
   
  }

  var maxHeight = 0;
  var topPad = parseInt($(' .g-NewsIndexP--v3__card__item a.g-NewsIndexUnit--v3').css('padding-top'));
  var botPad = parseInt($(' .g-NewsIndexP--v3__card__item a.g-NewsIndexUnit--v3').css('padding-bottom'));
  var maxPad = topPad + botPad;

if ($(window).width() > 1050) {
  $(".g-NewsIndexP--v3__card__item").each(function () {
    if ($(this).height() > maxHeight) { maxHeight = $(this).height() + maxPad + 10; }
  });

  $(".g-NewsIndexP--v3__card__item").height(maxHeight);
}

});