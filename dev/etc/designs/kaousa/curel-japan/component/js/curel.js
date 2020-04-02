/**
 * Define console log methods as empty methods (to avoid JS error as KAO common files have removed them.
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

(function () {
    $(document).ready(function () {
       // add placeholder for newletter form inout in home page
       $("#new_form_cjp-news-input").attr('placeholder', 'Email*');
      $("#cjp-buger-bar").click(function(e){
        e.stopImmediatePropagation();
            $(".cjp-localNav").show();
            
      });

      $("#cjp-close-btn").click(function(){
                $(".cjp-localNav").hide();
            
      });

        $('.header-item').mouseleave(function(){
            $('.cjp-items').hide();
          
            console.log("document hiver triggered");
        });

     $('#about-us .cjp-item a').mouseover(function(e){
            // $(".cjp-items").hide();
            if($(window).width() > 1024) {
                e.preventDefault();
                $('#products-menu span.arrow').closest('.header-item').find('.cjp-items').hide();
                $(this).closest('.header-item').find('.cjp-items').show();
            }
           
    }); 

   

   $('#products-menu .cjp-item a').mouseover(function(e){
       if($(window).width() > 1024) {
        e.preventDefault();
        e.stopPropagation();
        $(".cjp-sub-items").hide();
        $('#about-us a').closest('.header-item').find('.cjp-items').hide();
        $(this).closest('.header-item').find('.cjp-items').show();
       }
           
    });

    $('#community .cjp-item a').mouseover(function(e){
        if($(window).width() > 1024) {
            e.preventDefault();
            e.stopPropagation();
            $(".cjp-sub-items").hide();
            $(this).closest('.header-item').find('.cjp-items').show();
        }
           
    });

     $('#product-menu-list').click(function(e){
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('.header-item').find('.cjp-items').toggle();
    });  
    $('#about-menu-list').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).closest('.header-item').find('.cjp-items').toggle();
});  

    $('#double-moisuring').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        // $(".cjp-sub-items ").hide();
     /*    $(".cjp-sub-items").hide();  
        $(this).closest('.double-moisturising').closest('li').find('.cjp-items').show(); */    
        $(this).closest('.double-moisturising').closest('li').find(".cjp-sub-items").toggle();
    }); 

    $('#double-cleansing').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        // $(".cjp-sub-items ").hide();
       /*  $(".cjp-sub-items").hide();   
        $(this).closest('.double-cleansing').closest('li').find('.cjp-items').show();   */  
        $(this).closest('.double-cleansing').closest('li').find(".cjp-sub-items").toggle();
    }); 

    $('#curel').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        // $(".cjp-sub-items ").hide();
 /*        $(".cjp-sub-items").hide();   
        $(this).closest('.curel').closest('li').find('.cjp-items').show();  */   
        $(this).closest('.curel').closest('li').find(".cjp-sub-items").toggle();
    }); 

    $('.cjp-items li').mouseover(function(e){
        if($(window).width() > 1024) {
        $(".cjp-sub-items").hide();  
        $(this).closest('.cjp-items').show();    
        $(this).find(".cjp-sub-items").show();
        }
    }); 
    $('.cjp-items li').mouseleave(function(e){
        if($(window).width() > 1024) {
        $(this).closest('.cjp-items').show();    
        $(this).find(".cjp-sub-items").show();
        }
    }); 

/*     $('.g-ProductDetailUnit .g-WhereToBuy a').click(function(e){
        e.preventDefault();
        $('.cjp-wtb-modal-container').show();
       
    });

    $('.cjp-close-wtb-modal').click(function(){
        $('.cjp-wtb-modal-container').hide();
        
    }); */
    $('.header-search-li').click(function(){
        $('.cjp-ln').hide();
        $('.cjp-link').hide();
        $('.header-search').show();
        
    });
    $('.close-btn').click(function(){
        $('.cjp-ln').show();
		$('.cjp-link').show();
		$('.header-search').hide();
        if($(window).width() < 1200){
            $('.cjp-header-gb').show();
        }

    });
    $('.icon-search').click(function(){
        $('.cjp-header-gb').hide();
        $('.header-search').show();
    });
    // ADD Placeholders to all input feilds
        var input = $("input");
        if (input.length > 1) {           
          /*  for(var i=0;i<= input.length;i++){
               var current_input = $("input")[i];
               var form_row = current_input.closest(".form_row");
               if (form_row !== null) {
                   var label = $(form_row).find("label");
                   $(current_input).attr("placeholder", $(label).html());
               }
              
           } */
        } else {
            var label = $("input").closest(".form_row").find("label");
            $("input").attr("placeholder", $(label).html());
        }

        // Newsletter subscribe from HOME
        $('input[name="subscribe"]').click(function(e){
            e.preventDefault();
            var email = $('input[name="cjp-news-input"]').val();
            if(email != "") {
                var redirect = $('input[name="redirect"]').val();
                var newsletterSignUp = window.location.pathname;
                if (newsletterSignUp.charAt(newsletterSignUp.length - 1) == "/") {
                    newsletterSignUp = newsletterSignUp.substring(0, newsletterSignUp.length - 1);
                }
                newsletterSignUp = newsletterSignUp.substring(0, newsletterSignUp.lastIndexOf("/"));
                newsletterSignUp = newsletterSignUp + redirect + "?email=" + email;
                window.location.href = newsletterSignUp;
            }
        });
    
        $(".cjp-where-to-buy").click(function(){
            if (typeof s != "undefined") {
                s.linkTrackVars="events";
                s.linkTrackEvents="event3";
                s.events="event3";
                s.tl(this,'o','Where_to_buy_on_Products_page');
            }
        });

        $(".g-WhereToBuy____link").click(function(){
            if (typeof s != "undefined") {
                s.linkTrackVars="events";
                s.linkTrackEvents="event3";
                s.events="event3";
                s.tl(this,'o','Where_to_buy_on_Products_page');
            }
        });

        if (typeof $BV != "undefined") {
            $BV.configure('global', {
                events: {
                    submissionSubmitted: function (data) {
                        if (typeof s != "undefined") {
                            s.linkTrackVars="events";
                            s.linkTrackEvents="event6";
                            s.events="event6";
                            s.tl(this,'o','Post_Product Review');
                        }
                    }
                }
            });
        }
        
    });

    

})();