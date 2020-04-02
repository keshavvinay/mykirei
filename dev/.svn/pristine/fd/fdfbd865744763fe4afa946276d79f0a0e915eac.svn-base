(function() {
  'use strict';

  var innovationParent;
  var innovationHeight;
  var innovationHeightExpanded = 0;
  var heightAllowance;

  // function to remove specific inline styles
  (function($)
    {
      $.fn.removeStyle = function(style)
      {
          var search = new RegExp(style + '[^;]+;?', 'g');

          return this.each(function()
          {
              $(this).attr('style', function(i, style)
              {
                  return style.replace(search, '');
              });
          });
      };
  }(jQuery));

  $('.OurStory__intro').on('click', function(){

    heightAllowance = 2000;
    innovationHeightExpanded = 0;
    innovationParent = $(this).parent();

    if(!innovationParent.hasClass('OurStory__innovationExpanded')) {

      innovationHeight = innovationParent.outerHeight();
      $(innovationParent).children().each(function(){
        innovationHeightExpanded = innovationHeightExpanded + $(this).outerHeight(true);
        console.log($(this).outerHeight());
      });

      // innovationParent.addClass('OurStory__innovationExpanded').css('max-height', 5000 + 'px');
	  
	  $('.OurStory__innovation.OurStory__innovationExpanded').children('img.innovation-image').show();
      innovationParent.addClass('OurStory__innovationExpanded').css('max-height', innovationHeightExpanded);
    }

    else {

      innovationParent.removeClass('OurStory__innovationExpanded').removeStyle('max-height');
	  $('.OurStory__innovation').not('.OurStory__innovationExpanded').children('img.innovation-image').hide();
    }

    $(window).resize(function(){
      $('.OurStory__innovationExpanded').css('max-height', $(this).outerHeight() + heightAllowance);
    });

  });
  
  $(document).ready(function(){
	var elementObject = $('.OurStory__innovation');
	$.each( elementObject, function( key, value ) {
	  var imgSrc = $(this).children('.innovation-image').attr('src');
	  $(this).css( "background-image", "url("+imgSrc+")" );
	});
	$('.OurStory__innovation').not('.OurStory__innovationExpanded').children('img.innovation-image').hide();
	
	if (window.kaoAPI.isAuthorring) {
		$('.OurStory__innovation').addClass('OurStory__innovationExpanded');
	}
  });

})();