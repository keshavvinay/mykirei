(function(BaVo) {
  'use strict';

  var $medium = 641;
  var $win = $(window);
  var $wrapper = $('.YourLookQuestionResponse__carousel');
  var yourEssential = [];
  var products = [];
  var filterProducts = [];
  var sortedProducts = [];
  var essentialArray = [];
  
  function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for(var i = 0; i < cookieArray.length; i++) {
        var cookieValue = cookieArray[i];
        while (cookieValue.charAt(0) == ' ') {
            cookieValue = cookieValue.substring(1);
        }
        if (cookieValue.indexOf(name) == 0) {
            return cookieValue.substring(name.length, cookieValue.length);
        }
    }
    return "";
  }
  
  var productsNode = getCookie('productsNode'); 
  
  /*function triggerBVScript(productIds) {
       $BV.ui('rr', 'inline_ratings', {
            productIds : productIds ,
            containerPrefix : 'BVRRInlineRating'
        });
  } */
  
  function filterEssentialProducts() {
      // get JSON data from our data source
	  
	  var productPagesJSONPath = getCookie('productPagesJSONPath');
	  //alert("productPagesJSONPath==11==="+productPagesJSONPath);
	  if(productPagesJSONPath == "" || productPagesJSONPath == null){
		 productPagesJSONPath= "/content/dam/sites/kaousa/www-johnfrieda-com/master/freehtml/json/productdetail.json";
	  } 
	 // alert("productPagesJSONPath===22=="+productPagesJSONPath);
      $.getJSON(
        productPagesJSONPath,
        function(data) {
        
            // create an array of products			
            $.each(data.products, function(i, product) {
              var tempStyleVision = product.styleVision;
              delete product.styleVision;
              products.push(product);
              var productFound = $.inArray(product.productID, yourEssential);
              if (productFound > -1) {
                filterProducts.push(product);
              }
            });

            for(var index = 1 ; index < 4; index++) {
                var dynamicVariable = 'essentialProduct'+index;
                $.each(filterProducts, function (i, filterData) {
                    if (filterData.productID == essentialArray[dynamicVariable]) {
                        sortedProducts.push(filterData);
                    }
                });
            }

            var BVProductIds = [];
            var filterCount = 0;

            // add the product blocks
            $.each(sortedProducts, function (i, data) {
                
                filterCount++;
                
                var currentPath = window.location.href;
                /*
                var locationEndPoint = currentPath.indexOf(".html");
                var extractedLocation = '';
                
                if (locationEndPoint > -1) {
                    extractedLocation = currentPath.substring(0, locationEndPoint);
                    var essentialProductPath = extractedLocation + data.productPagePath;
                } else {
                    var essentialProductPath = data.productPagePath;
                }
                */
                
                var locationEndPoint = currentPath.lastIndexOf("/");
                var locationEndPoint = currentPath.substring(0, locationEndPoint).lastIndexOf("/");
                var extractedLocation = '';

                if (locationEndPoint > -1) {
                    extractedLocation = currentPath.substring(0, locationEndPoint);
                    var essentialProductPath = extractedLocation + productsNode + data.productPagePath;
                } else {
                    var essentialProductPath = data.productPagePath;
                }
                
                
                var essentialProduct = $('<div class="YourLookQuestionResponse__carouselProduct"  data-style-vision="'+data.styleVision+'" data-product-line="'+data.productLine+'" data-product-type="'+data.productType+'"><a class="YourLookQuestionResponse__carouselProductInside" href="'+essentialProductPath+'"><img data-sizes="auto" class="lazyload" src="'+data.ImagePath+'" alt="'+data.productLine+'"><div class="YourLookQuestionResponse__productInfo"><h3>'+data.productLine+'</h3><p>'+data.productName+'</p><span class="YourLookQuestionResponse__stars"><div class="center" id="BVRRInlineRating-'+data.productID+'"></div></span></div></a></div>');

                // $(essentialProduct).insertAfter('.YourLookQuestionResponse__carousel');
                $('.YourLookQuestionResponse__carousel').slick('slickAdd',essentialProduct);
                BVProductIds.push(data.productID);
                
                if (filterCount == 3) {
                    return false;
                }
                
            });

            if (filterCount < 2) {
                if (!window.kaoAPI.isAuthorring) {
                    $('.JFComponent.YourLookQuestionResponse').hide();
                }
            }
            
            //wind.triggerBVScript(BVProductIds);
            //$win.triggerBVScript(BVProductIds);
			setTimeout(function(){ 
				BaVo.ui('rr', 'inline_ratings', {
					productIds : BVProductIds ,
					containerPrefix : 'BVRRInlineRating'
				}); }, 10000);
			//window.triggerBVScript(BVProductIds);
            
        }); //.getJSON
  }
  
  function init() {
    $('.YourLookQuestionResponse__carousel').slick({
      mobileFirst: true,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"></button>',
      nextArrow: '<button type="button" class="slick-next"></button>',
      dots: true,
      adaptiveHeight: false,
      // autoplay: true,
      fade: true,
      centerMode: true,
      responsive: [
        {
          breakpoint: $medium,
          settings: "unslick"
        }
      ]
    });
  }

  function onWindowResize() {
    if($win.outerWidth() < $medium + 1) {
      // Re-initialize Slick and turn off the window size listener
      $('.YourLookQuestionResponse__carousel').slick('unslick');
      init();
      $win.off('resize', onWindowResize);
    }
  }  

  if ($wrapper.length) {
    // Listen for resize when the unslick breakpoint is hit
    $wrapper.on('breakpoint', function(e, s, bp) {
      $win.on('resize', onWindowResize);
    });
  }

  // Check once at page load if we're already at the large screen size
  if($win.outerWidth() > $medium) {
    $win.on('resize', onWindowResize);
  }


  $('.YourLookQuestionResponse__carouselProductInside').click(function(e) {
    e.preventDefault();
  });

  $(document).ready(function(){
    init();
    /*
    var essentialProduct1 = getCookie('essentialProduct1');
    var essentialProduct2 = getCookie('essentialProduct2');
    var essentialProduct3 = getCookie('essentialProduct3');
    */

	var essentialProduct1 = getCookie('Shampoos');
    var essentialProduct2 = getCookie('Conditioners');
    var essentialProduct3 = getCookie('Other');

    essentialArray["essentialProduct1"] = essentialProduct1;
    essentialArray["essentialProduct2"] = essentialProduct2;
    essentialArray["essentialProduct3"] = essentialProduct3;

	if (essentialProduct1 != '') {
    	yourEssential.push(essentialProduct1);
    }
    if (essentialProduct2 != '') {
    	yourEssential.push(essentialProduct2);
    }
    if (essentialProduct3 != '') {
    	yourEssential.push(essentialProduct3);
    }
  
    filterEssentialProducts();

  });

})($BV);
