(function() {
  'use strict';



  //===================================== document ready
  $(function() {
    var $window = $(window);
    var $document = $(document);
    var $breakPointSmall = $("#breakPoint-small");
    var $breakPointMiddle = $("#breakPoint-middle");
    var $breakPointLarge = $("#breakPoint-large");

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

      var $header = $('.BlHeader');
      if ($header.length == 0) return;
      var $menuTrigger = $header.find('.sofina-HeaderMenu');
      var $globalNav = $header.find('.sofina-HeaderGlobalNav');
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

      var $header = $('.BlHeader');
      if ($header.length == 0) return;
      var $headerPlaceholderElm = $('<div class="BlHeaderPlaceHolder" />');
      var fixedClass = 'is-fixed';
      var slideDuration = 400;
      var smHeaderHeight;
      var mdHeaderHeight;
      var lgHeaderHeight;
      var $headerPlaceholder;
      var viewMode;

      $header.wrap($headerPlaceholderElm);
      $headerPlaceholder = $header.closest('.BlHeaderPlaceHolder');

      setHeaderHeight();


      $window.on('resize', function() {
        console.log('viewMode: ' + viewMode);
        console.log('checkViewMode: ' + checkViewMode());
        if (viewMode !== checkViewMode()){
          setHeaderHeight();
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
                $header.hide().addClass(fixedClass).slideDown(slideDuration, function(){
                  $(this).css('display', '');
                });
              }
            } else {
              // normal
              $header.removeClass(fixedClass);
            }
          }
          if (scrollX === 0) {
            $header.removeClass(fixedClass);
          }
        }
      });

      function setHeaderHeight() {
        var height = getHeaderHeight();
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

    }

    initFixedHeader();

    //initialize fixedHeader ------------------------------


    /**
     *  initialize Footer Accordion
     */

    function initFooterAccordion() {

      var $footer = $('.sofina-footerSitemap'),
        $footerLinks = $footer.find('.sofina-footerSitemapLinks'),
        $footerAccordionLabel = $footerLinks.find('.sofina-footerSitemapLinks__PseudoLabel'),
        slideDuration = 400,
        accordionOpenClassName = 'is-open';

      $footerAccordionLabel.each(function() {
        var $this = $(this),
          $accordionTarget = $this.siblings('ul');
        $this.on('click', function() {
          if ($breakPointSmall.css('display') == 'block') {
            if ($accordionTarget.is(':animated')) {
              return false;
            }
            if ($this.hasClass(accordionOpenClassName)) {
              $this.removeClass(accordionOpenClassName);
            } else {
              $this.addClass(accordionOpenClassName);
            }
            //animate
            $accordionTarget.slideToggle(slideDuration, function() {
              if ($this.hasClass(accordionOpenClassName)) {
                $accordionTarget.addClass(accordionOpenClassName);
              } else {
                $accordionTarget.removeClass(accordionOpenClassName);
              }
            });
          }
        });
      });

    }

    initFooterAccordion();

    //initialize Footer Accordion --------------------------------------


    /**
     *  initialize SmoothScroll
     */

    function initSmoothScroll() {
      $('a[href^=#wrapper]').on('click', function(){
        var speed = 500;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
      });
    }
    initSmoothScroll();

    //initialize SmoothScroll --------------------------------------
  });

})();
