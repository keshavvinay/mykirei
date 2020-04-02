(function() {
  'use strict';



  //===================================== document ready
  $(function() {
    var $window = $(window);
    var $document = $(document);
    var $breakPointSmall = $("#js-breakpoint--sm");
    var $breakPointMiddle = $("#js-breakpoint--md");
    var $breakPointLarge = $("#js-breakpoint--lg");

    function checkViewMode() {
      var mode;
      if ($breakPointLarge.css('display') == 'block') {
        mode = 'lg';
      } else if ($breakPointMiddle.css('display') == 'block') {
        mode = 'md';
      } else if ($breakPointSmall.css('display') == 'block') {
        mode = 'sm';
      }
      return mode;
    }


    /**
     *  initialize HeaderMenu
     */
    function initHeaderMenu() {

      var $header = $('.brands-BlHeader');
      if ($header.length == 0) return;
      var $menuTrigger = $header.find('.sofina-brands-HeaderMenu');
      var $globalNav = $header.find('.sofina-brands-HeaderGlobalNav');
      var menuOpenClassName = 'is-open';
      var slideDuration = 400;
      var globalNavHeight;
      var headerHeight;
      var windowHeight;
      var adjustHeight;
      var viewMode;

      // set globalNav Height
      $window.on('load resize', function(e) {
        viewMode = checkViewMode();
        if (viewMode==='sm' || viewMode==='md') {
          globalNavHeight = $globalNav.css('height', 'auto').outerHeight();
          headerHeight = $header.outerHeight();
          windowHeight = $window.height();
          adjustHeight = windowHeight > headerHeight + globalNavHeight? globalNavHeight: windowHeight - headerHeight;
          $globalNav.css('height', adjustHeight);
        } else {
          $globalNav.css('height', '');
        }
      });

      // menu button action
      $menuTrigger.on('click', function(e) {
        if ($breakPointLarge.css('display') != 'block') {
          var $this = $(this);
          if ($globalNav.is(':animated')) {
            return false;
          }
          if ($this.hasClass(menuOpenClassName)) {
            $this.removeClass(menuOpenClassName);
          } else {
            $this.addClass(menuOpenClassName);
          }
          //animate
          $globalNav.slideToggle(slideDuration, function() {
            if ($this.hasClass(menuOpenClassName)) {
              $globalNav.addClass(menuOpenClassName).css('display', '');
            } else {
              $globalNav.removeClass(menuOpenClassName).css('display', '');
            }
          });
          e.preventDefault();
          return false;
        }
      });

    }

    initHeaderMenu();

    //initialize HeaderMenu --------------------------------------


    /**
     *  initialize fixedHeader
     */

    function initFixedHeader() {

      var $header = $('.brands-BlHeader');
      if ($header.length == 0) return;
      var $headerPlaceholderElm = $('<div class="sofina-brands-BlHeaderPlaceHolder" />');
      var fixedClass = 'is-fixed';
      var slideDuration = 400;
      var smHeaderHeight;
      var mdHeaderHeight;
      var lgHeaderHeight;
      var smFixedHeaderHeight;
      var mdFixedHeaderHeight;
      var lgFixedHeaderHeight;
      var $headerPlaceholder;
      var viewMode;

      var $headerImg = $header.find('.sofina-brands-HeaderLogo__img--fixed img');

      $header.wrap($headerPlaceholderElm);
      $headerPlaceholder = $header.closest('.sofina-brands-BlHeaderPlaceHolder');

      setHeaderHeight();
      setFixedHeaderHeight();

      $window.on('resize', function() {
        if (viewMode !== checkViewMode()){
          setHeaderHeight();
          setFixedHeaderHeight();
        }
      });

      $window.on('load resize scroll', function() {
        if (viewMode === 'lg') {
          var $this = $(this);
          var scrollX = $this.scrollTop();
          if( !$header.is(':animated') ) {
            // vertical position
            if (lgHeaderHeight <= scrollX) {
              // fixed
              if (!$header.hasClass(fixedClass)) {
                $header.hide().addClass(fixedClass);
                $headerImg.css('opacity',0);
                $header.slideDown(500, function(){
                  $(this).css('display', '');
                });
                fixedImage();
              }
            } else {
              // normal
              $header.removeClass(fixedClass);
            }

          }
          if (scrollX === 0) {
            $header.stop(true, true).removeClass(fixedClass);
            $headerImg.css('opacity','');
            clearTimeout(timerId);
          }
        }
        if (viewMode === 'sp' || viewMode === 'md' ) {
          $header.removeClass(fixedClass);
        }
      });

      var timerId;
      var fixedImage = function(){
        timerId = setTimeout(function(){
          $headerImg.css('height','').animate({opacity:1},300);
        } , 600);
      }

      function setHeaderHeight() {
        var height = getHeaderHeight();
        console.log(height);
        $headerPlaceholder.css('height', height);
      }

      function setModeHeaderHeight() {
        viewMode = checkViewMode();
        if (viewMode === 'lg') {
          if (lgHeaderHeight == null) {
            lgHeaderHeight = $header.outerHeight();
            // console.log('set lgHeaderHeight: ' + lgHeaderHeight);
          }
        } else if (viewMode === 'md') {
          if (mdHeaderHeight == null) {
            mdHeaderHeight = $header.outerHeight();
            // console.log('set mdHeaderHeight: ' + mdHeaderHeight);
          }
        } else if (viewMode === 'sm') {
          if (smHeaderHeight == null) {
            smHeaderHeight = $header.outerHeight();
            // console.log('set smHeaderHeight: ' + smHeaderHeight);
          }
        }
      }

      function getHeaderHeight() {
        var foo;
        setModeHeaderHeight();
        if (viewMode === 'lg') {
            foo = lgHeaderHeight;
        } else if (viewMode === 'md') {
            foo = mdHeaderHeight;
        } else if (viewMode === 'sm') {
            foo = smHeaderHeight;
        }
        return foo;
      }

      function setFixedHeaderHeight() {
        viewMode = checkViewMode();
        if (viewMode === 'lg') {
          if (lgFixedHeaderHeight == null) {
            lgFixedHeaderHeight = $header.css('visibility','hidden').addClass(fixedClass).outerHeight();
            $header.removeClass(fixedClass).css('visibility','');
            $header.attr('data-fixedheight-lg', lgFixedHeaderHeight);
          }
        } else if (viewMode === 'md') {
          if (mdFixedHeaderHeight == null) {
            mdFixedHeaderHeight = $header.outerHeight();
            $header.attr('data-fixedheight-md', mdFixedHeaderHeight);
          }
        } else if (viewMode === 'sm') {
          if (smFixedHeaderHeight == null) {
            smFixedHeaderHeight = $header.outerHeight();
            $header.attr('data-fixedheight-sm', smFixedHeaderHeight);
          }
        }
      }

    }

    initFixedHeader();

    //initialize fixedHeader ------------------------------
  });

})();
