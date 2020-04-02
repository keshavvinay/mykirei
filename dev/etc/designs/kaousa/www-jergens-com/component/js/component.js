/**
 * Define console log method.
 */
if(typeof console.warn === 'undefined') {
    console.warn = function () {}
}
(function(){

    
    $(document).ready(function(){


//INCLUDING SHARIFF ADDTHIS DATA_SERVICE TO SHARIFF
var langCountryCode = $('html').attr('lang');
if (langCountryCode === "en-au") {
	$(".social-share-div .shariff").attr('data-services',"['twitter','pinterest','addthis']");
}
else
{
	$(".social-share-div .shariff").attr('data-services',"['facebook','twitter','pinterest','addthis']"); 
}
var productTitle=$(".product-title").text().trim();
if(productTitle!=''){
var productImageContainer=$("#common_column_separator_2 .g-Column__cols").last()[0];
var productImage=$(productImageContainer).find("img");
var productImageUrl=productImage[0].src.substring(0, productImage[0].src.indexOf('?'));
$(".social-share-div .shariff").attr('data-title',productTitle);
$(".social-share-div .shariff").attr('data-media-url',productImageUrl);

}

//Bazaar voice review tab open
setTimeout(function(){

var reviewTab;
var tabs=$(".g-TabMenu__item");
if(tabs.length!=0){
for(var i=0; i<tabs.length; i++){
if($(tabs[i]).find(".review-container").length>0){
reviewTab=$(tabs[i]);
break;
}
}
}

$(" .bv-rating-ratio a ,.bv-rating-label").click(function(){
        $( ".g-TabMenu__item").removeClass( "is-active" );
        $( ".g-TabMenu__nav__link" ).removeClass( "is-active" );
        reviewTab.addClass("is-active");
        $(".g-TabMenu__nav__link:last-child").addClass("is-active");
    });

$(document).on("click","button.bv-read-review",function(){
$(".g-TabMenu__item").removeClass( "is-active" );
$( ".g-TabMenu__nav__link" ).removeClass( "is-active" );
reviewTab.addClass("is-active"); 
$(".g-TabMenu__nav__link:last-child").addClass("is-active");  
 });

},3000);

/*FACEBOOK LIKE BUTTON SRC REPLACE STARTS */

var pageURL=window.location.href;
var isAuthorringMode=$('body').hasClass('is-authorring');


//GLOW ADVISOR FACEBOOK SHARE
$(".glow-advisor-section .glow-advisor-fb-share").attr('href',"http://www.facebook.com/share.php?u="+pageURL); 

//GLOW ADVISOR MAIL TO
$(".glow-advisor-section .mail-to-glow-advisor .shariff").attr("data-mail-url","mailto:?body="+pageURL);


$(".facebook-like iframe").attr('src',"https://www.facebook.com/plugins/like.php?href="+pageURL+"&width=90px&layout=button_count&action=like&size=small&show_faces=false&share=false&height=65&appId&locale=en_US");

//direction RTL for english character in the middle of Arabic
$('.direction_rtl').attr("dir","rtl");

/*POP YOUTUBE VIDEO*/
$('#secondVideo').hide();
$('#firstVideo').hide();

$('#firstVideoThumbnail').click(function(){
$('.overlay').show();
$('#firstVideo').show();
})

$('#secondVideoThumbnail').click(function(){
$('.overlay').show();
$('#secondVideo').show();
})

$('.overlay .close').click(function(){
$('.overlay').hide();
$('#firstVideo').hide();
$('#secondVideo').hide();
})



/*FACEBOOK LIKE BUTTON SRC REPLACE ENDS*/


/* KEEP HEADER OPEN IN PRODUCTS PAGE*/


$('.header .lvl1>li').hover(function(){
if((pageURL.indexOf('/products')==-1) && (pageURL.indexOf('/produits')==-1) && (pageURL.indexOf('/productos')==-1) && $(this).hasClass('hasScreen')){
if (($(window).width() > 1024)) {
$('.headerWrapper').addClass('openScreen');
$('.headerWrapper').addClass('noBorder');

}
}
    
    if((pageURL.indexOf('/products')>-1) || (pageURL.indexOf('/produits')>-1) || (pageURL.indexOf('/productos')>-1)){
    if (($(window).width() > 1024)) {
    $('.subnav').hide();
    $(this).find('.subnav').show();
    }
    }
    
    if(!$(this).hasClass('hasScreen')){
        $('.headerWrapper').removeClass('openScreen');
$('.headerWrapper').removeClass('noBorder');
    }
    
    else{
$('.headerWrapper').addClass('openScreen');
$('.headerWrapper').addClass('noBorder');
    }
    
},function(){
if((pageURL.indexOf('/products')==-1) && (pageURL.indexOf('/produits')==-1) && (pageURL.indexOf('/productos')==-1)){
$('.headerWrapper').removeClass('openScreen');
$('.headerWrapper').removeClass('noBorder');
}

if((pageURL.indexOf('/products')>-1) || (pageURL.indexOf('/produits')>-1) || (pageURL.indexOf('/productos')>-1)){
if (($(window).width() > 1024)) {
$('.subnav').hide();
$('.header .lvl1 li#ctl00_header_navProducts > .subnav').show();
$('.headerWrapper').addClass('openScreen');
$('.headerWrapper').addClass('noBorder');
}

}

})


if((pageURL.indexOf('/products')>-1) || (pageURL.indexOf('/produits')>-1) || (pageURL.indexOf('/productos')>-1)){

if (($(window).width() > 1024)) {
$('.header .lvl1 li#ctl00_header_navProducts > .subnav').show();
$('.headerWrapper').addClass('openScreen');
$('.headerWrapper').addClass('noBorder');
$('#area-BreadcrumbsTop .g-Breadcrumbs').css({"margin-top":"40px"});
$('#ctl00_header_navProducts .products-tab .header-products > a').addClass('active');

var categories=$('.productsSubNav .products-category-list .is-gutter--m a');

for(var c=0; c<categories.length; c++){
var currentCategory=$(categories[c]).attr('href');
if(currentCategory.lastIndexOf(".html")!==-1){
    currentCategory = currentCategory.substr(0, currentCategory.lastIndexOf(".html"));   
}else if(currentCategory.charAt(currentCategory.length-1) == "/"){
	currentCategory = currentCategory.substr(0, currentCategory.lastIndexOf("/"));
}
if(pageURL.lastIndexOf(".html")!==-1){
    pageURL = pageURL.substr(0, pageURL.lastIndexOf(".html"));   
}else if(pageURL.charAt(pageURL.length-1) == "/"){
	pageURL = pageURL.substr(0, pageURL.lastIndexOf("/"));
}
if(pageURL.indexOf(currentCategory)!==-1){
$(categories[c]).addClass("active");
$(categories[c]).closest('.is-gutter--m').css({"background-color":"#fff"});
}
} 
} 
}

//$('.header .lvl1 .products-tab > ul > li').hover(function(e){
///*if(!isAuthorringMode && ($(this).parents('#ctl00_header_navProducts').length==0)){
//$('.header .lvl1 li#ctl00_header_navProducts > .subnav').hide();
//}
//
//else */
//    if(($(this).parents('#ctl00_header_navProducts').length!=0)){
//$('.header .lvl1 li#ctl00_header_navProducts > .subnav').show();
//
//}
//
//},function(){
//if(!isAuthorringMode && (pageURL.indexOf('/products')>-1) || (pageURL.indexOf('/produits')>-1) || (pageURL.indexOf('/productos')>-1)){
//$('.header .lvl1 li#ctl00_header_navProducts > .subnav').show();
//}
//
//});

    $(".hamberger-jergens").click(function(e){
        e.preventDefault();
        $("#globalNav").show();
        $("body").css({"overflow":"hidden"});

    });

    $(".close-menu").click(function(e){
        e.preventDefault();
        $("#globalNav").hide();
        $("body").css({"overflow":"auto"});

    });

    $(".open-dropdown").click(function(e){
         e.preventDefault();
        if($(this).siblings(".list-of-products").hasClass('is-open')){
          $(".list-of-products").removeClass('is-open').hide();
            $(this).css({"transform":"rotate(45deg)"});
            return;
        }

        else{
           $(".list-of-products").removeClass('is-open').hide();
            $(".open-dropdown").css({"transform":"rotate(45deg)"});

        $(this).siblings(".list-of-products").show().addClass('is-open');
            $(this).css({"transform":"rotate(-135deg)"});
        }

    });

 $(".products-category-list .is-gutter--m").click(function(e){
        //e.preventDefault();
        if($(this).siblings(".list-of-products").hasClass('is-open')){
          $(".list-of-products").removeClass('is-open').hide();
            $(this).siblings('button.open-dropdown').css({"transform":"rotate(45deg)"});
            return;
        }

        else{
           $(".list-of-products").removeClass('is-open').hide();
            $(".open-dropdown").css({"transform":"rotate(45deg)"});

        $(this).siblings(".list-of-products").show().addClass('is-open');
            $(this).siblings('button.open-dropdown').css({"transform":"rotate(-135deg)"});
        }

    });





    var category_list= $('.products-category-list');
    var category_list_length=category_list.length;


    if ($(window).width() < 1025) {

    $(category_list[category_list_length-1]).hover(function(){
        $(this).find('.list-of-products').css({"left":"auto","right":"0"});
    })

    $(category_list[category_list_length-2]).hover(function(){
        $(this).find('.list-of-products').css({"left":"auto","right":"0"});
    })

    }


    //HYDRALUCENCE CAROUSAL


    var carousal_item_array=$(".carousal-item");
    var carousal=$(".product-carousal");
    var displayLimit;
    var isMedium=false;
    var isSmall=false;
    

    $(carousal_item_array[0]).find(".g-ImageTextHP__contentsBlock__text").fadeIn(200);

    //DISPLAY 3 ITEMS ON MEDIUM SCREEN

    if(!isAuthorringMode){

    if($(window).width()<641){

        displayLimit=1;
        isSmall=true;

        for(var i=0; i<carousal_item_array.length; i++){

            if(i>displayLimit-1){
            $(carousal_item_array[i]).hide();
            }
        }
    }

    else if($(window).width()<1025){

        displayLimit=3;
        isMedium=true;

        for(var i=0; i<carousal_item_array.length; i++){

            if(i>displayLimit-1){
            $(carousal_item_array[i]).hide();
            }
        }

    }
        
        else{
            
            displayLimit=4;
            
            for(var i=0; i<carousal_item_array.length; i++){

            if(i>displayLimit-1){
            $(carousal_item_array[i]).hide();
            }
        }
            
        }
}
        
        

    var next = function(){

       var old_first_item=$(carousal_item_array[0]);

        old_first_item.find(".active").removeClass("active");

        old_first_item.find(".g-ImageTextHP__contentsBlock__text").hide();

//        if(isMedium || isSmall){

           if(carousal_item_array.length!=4){
            var displayNewItem=$(carousal_item_array[displayLimit]);
            old_first_item.hide();
            displayNewItem.show();

            }
           
//        }
        carousal.append(old_first_item);

      if(carousal_item_array.length==4){
      if($(window).width()>1024){
       old_first_item.show();
       }
          
          else{
              var displayNewItem=$(carousal_item_array[displayLimit]);
              old_first_item.hide();
              displayNewItem.show();
          }

       }

        carousal_item_array=$(".carousal-item");

        $(carousal_item_array[0]).find(".product-image").addClass("active");

        $(carousal_item_array[0]).find(".g-ImageTextHP__contentsBlock__text").fadeIn(200);

    }

    var previous = function(){

        var old_first_item=$(carousal_item_array[0]);

        var last_item=$(carousal_item_array[carousal_item_array.length-1]);

        old_first_item.find(".active").removeClass("active");

        old_first_item.find(".g-ImageTextHP__contentsBlock__text").hide();

//        if(isMedium || isSmall){

            var hideItem=$(carousal_item_array[displayLimit-1]);

            hideItem.hide();
//        }

        last_item.remove();

        carousal.prepend(last_item);

        last_item.show();

        carousal_item_array=$(".carousal-item");

        setTimeout(function(){

            $(carousal_item_array[0]).find(".product-image").addClass("active");

            $(carousal_item_array[0]).find(".g-ImageTextHP__contentsBlock__text").fadeIn(200);

            },000); 

    }


    $(".product-carousal").click(function(e){

        var total_ele_width=$(this).outerWidth();

        if(e.offsetX < 0){

            previous();


        }

        else if(e.offsetX > total_ele_width){

            next();

        }



    });

    //PRODUCT DETAILS PAGE PRINT PAGE

    $('.print').click(function(){

        window.print();
    });

    //FAQ ACCORDION EXPAND AND COLLAPSE

    var faq_Questions=$('.faq-question');

    $('.expand-btn').click(function(){
        faq_Questions.removeClass('is-radius--close').addClass('is-radius--open');
        faq_Questions.find('.g-AccordionUnit__contentBlock').removeClass('is-close').addClass('is-open');
    });

     $('.collapse-btn').click(function(){
        faq_Questions.removeClass('is-radius--open').addClass('is-radius--close');
        faq_Questions.find('.g-AccordionUnit__contentBlock').removeClass('is-open').addClass('is-close');
    });


    //GOLDEN-LIFE CAROUSAL

 /* var isComplete = true;
  var toDisplay;
  var toShift=0;

  var golden_products_array = $('.product-carousal-groupbox .g-Image');
    var golden_products_groupbox = $('.product-carousal-groupbox');

    if(!isAuthorringMode){

    if($(window).width()<640){

            toDisplay=1;
            toShift=-70;
    }

    else if($(window).width()<1025){


            toDisplay=3;

            toShift=-120;

    }

        else{

            toDisplay=5;
            toShift=-180;
  }



            for(var i=0; i<golden_products_array.length; i++){
  if(i>toDisplay-1){
  $(golden_products_array[i]).hide();

  }

        }
}



 $(".product-carousal-groupbox").click(function(e){

        var total_ele_width=$(this).outerWidth();

     if(e.offsetX < 0){

      if (isComplete) {
      isComplete = false;

      var arr = $('.product-carousal-groupbox .g-Image');

      var middle = Math.floor(toDisplay / 2);


      //console.log(arr);

      var golden_product_to_append = arr[arr.length - 1];


      $(arr[middle]).removeClass("golden-product-active");


      arr.animate({
        "right": +toShift+"px",
        "left": "auto"
      }, 300, function() {

        $(golden_product_to_append).remove();

        $(golden_product_to_append).prependTo('.product-carousal-groupbox').show();

        arr.css({
          "right": "0px",
        "left": "auto"
        })
        
        $(arr[toDisplay]).hide();


        arr = $('.product-carousal-groupbox .g-Image');
        middle = Math.floor(toDisplay / 2);

        $(arr[middle]).addClass("golden-product-active");
        isComplete = true;
      })

    }


     }


     else if(e.offsetX > total_ele_width){

         if (isComplete) {

            isComplete = false;

             var arr = $('.product-carousal-groupbox .g-Image');

      var middle = Math.floor(toDisplay / 2);

             var golden_product_to_append = arr[0];

             $(arr[middle]).removeClass("golden-product-active");

           arr.animate({"left": +toShift+"px","right": "auto"}, 300, function(){

               $(golden_product_to_append).remove();

        $(arr[toDisplay-1]).show();   
        $(golden_product_to_append).appendTo('.product-carousal-groupbox').hide();

        arr.css({
          "left": "0px",
          "right": "auto"
        });


        arr = $('.product-carousal-groupbox .g-Image');
        middle = Math.floor(toDisplay / 2);

        $(arr[middle]).addClass("golden-product-active");
        isComplete = true;

      }); 

         }
     }

 });
*/

    //GOLDEN LIFE TIPS COUNT

    var tipCounter=1;

    var tipContainer = $(".tip-number .cmn-richtext");
    var totalTips=$('.live-golden-carousal div.slick-slide:not(.slick-cloned)').length;

       tipContainer.html(tipCounter+ " OF "+ totalTips);

    $(".live-golden-carousal .g-ImageCarouselP__nextArrow").click(function(){
        if(tipCounter<totalTips){
            tipCounter++;
            tipContainer.html(tipCounter+ " OF "+ totalTips);
        }

        else{
            tipCounter=1;
            tipContainer.html(tipCounter+ " OF "+ totalTips);
        }

    });

     $(".live-golden-carousal .g-ImageCarouselP__prevArrow").click(function(){

         if(tipCounter>1){
            tipCounter--;
            tipContainer.html(tipCounter+ " OF "+ totalTips);
        }

        else{
            tipCounter=totalTips;
            tipContainer.html(tipCounter+ " OF "+ totalTips);
        }

    });


    //WOMEN'S HEALTH CAMPAIGN PAGE TOOLTIP

    $('.womens-health-section .best-tanner-product img').hover(function(){
        $('.womens-health-section .best-tanner-product .g-Text').show();
    },function(){
        $('.womens-health-section .best-tanner-product .g-Text').hide();
    });


});
   
})();
