/**
 * SOFINAaccordion
 */

(function() {
  'use strict';

  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(function() {
    $('.js-action__toggle__target').hide();
    $('.js-action__toggle').on('click', function(){
      var $this = $(this);
      $this.toggleClass('js-is-open');
      $this.siblings('.js-action__toggle__target').slideToggle();
    });
  });

})();
