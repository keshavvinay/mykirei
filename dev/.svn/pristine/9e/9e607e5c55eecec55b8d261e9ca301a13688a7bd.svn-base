$(document).ready(function() {
  'use strict';

  /*
    Initialize the Slick carousel.
    Since this module is not a carousel at all breakpoints, we need to utilize
    Slick's "unslick" feature to turn it off. However, reversing this action
    is not built in to the plugin, so re-enabling the carousel must be done by
    listening to browser window events.
  */

  var UNSLICK_AT = 1024;

  var $win = $(window);
  var $wrapper = $('.AssociatedProducts__tileWrapper');

  if ($wrapper.length) {
    // Listen for resize when the unslick breakpoint is hit
    $wrapper.on('breakpoint', function(e, s, bp) {
      $win.on('resize', onWindowResize);
    });

    // Check once at page load if we're already at the large screen size
    if($win.outerWidth() > UNSLICK_AT) {
      $win.on('resize', onWindowResize);
    }

    init();
  }

  function init() {
    $wrapper.slick({
      adaptiveHeight: true,
      dots: true,
      mobileFirst: true,
      speed: 500,
      variableWidth: true,
      responsive: [
        {
          breakpoint: UNSLICK_AT,
          settings: "unslick"
        }
      ]
    });
  }

  function onWindowResize() {
    if($win.outerWidth() < UNSLICK_AT + 1) {
      // Re-initialize Slick and turn off the window size listener
      init();
      $win.off('resize', onWindowResize);
    }
  }

});