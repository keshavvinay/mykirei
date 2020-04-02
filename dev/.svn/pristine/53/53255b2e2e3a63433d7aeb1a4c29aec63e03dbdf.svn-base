/**
 * Videojs
 */
(function(window, kaoAPI) {
  /*-----------------------*/
  // ready
  /*-----------------------*/
  $(document).ready(function() {
    initVideo();
  });


  /**
   * initialize video
   *
   */
  function initVideo() {
    var $target = $('video');
    if($target[0]) {
      $target.each(function(){
        var $me = $(this);

        $me.addClass('video-js vjs-default-skin vjs-big-play-centered');
        videojs($me.get(0), {'fluid': true}, function() {});
      });
    }
  }

  kaoAPI.initAddedVideo = function() {
    initVideo();
  };


})(window, window.kaoAPI || (window.kaoAPI = {}));
