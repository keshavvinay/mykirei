$(document).ready(function(){

    $.fn.goldwellModal = function(){
        var $eles = $(this);
        $eles.click(function(e){

            e.preventDefault();

            var $element = $(this);
            var videoId = '';
            var videoClasses = ["video_youtube_","video_vimeo_","video_flixel_","video_polyv_"];

            $("#goldwellModal").remove();
            $("body").append("<div id='goldwellModal'></div>");

            var classList = $element.attr('class').split(/\s+/);
            for(var j=0; j<videoClasses.length; j++){
                var isClassMatchFound = false;
                for(var i=0; i<classList.length; i++){
                    if(classList[i].indexOf(videoClasses[j]) != -1){
                        isClassMatchFound = true;
                        videoId = classList[i].split(videoClasses[j])[1];
                        modalForIframe(videoClasses[j],videoId,$element);
                        break;
                    }
                } 
                if(isClassMatchFound){
                    break; 
                }
            }
            if(!isClassMatchFound){
                var url = "";
                this.tagName == "A" ? url = $element.attr("href") : url = $element.children("a").attr("href");

                if(url[url.length-1] == "/"){
                    url = url.substring(0,url.length-1);
                }

                if(url.indexOf(".html") != -1){
                    url = url.slice(0,url.lastIndexOf("."));
                    url = url + ".popup.html?wcmmode=disabled";
                }
                else{
                    url = url + ".popup.html";
                }

                $("#goldwellModal").load(url, function(){
                    var data = $(this).html();
                    var isImageGallery = $(this).find(".image-gallery").length>0;

                    if(isImageGallery){
                        $.fancybox(data,{
                            width :  '100%',
                            padding: '0',
                            topRatio: 0.5,
                            wrapCSS: "image-gallery",
                            showCloseButton: true,
                            afterShow:function(){ 
                                $(".s7responsiveContainer img").each(function(index) {
                                    s7responsiveImage(this);
                                });
                                if($("#goldwellModal .js-ImageCarouselP").length > 0){
                                    $(".js-ImageCarouselP .g-ImageCarouselP__list").slick({variableWidth: true,slidesToShow: 1});
                                }
                                $("body").addClass("noScroll");
                            },
                            beforeClose: function(){
                                $(".image-gallery .js-ImageCarouselP").hide();
                            },
                            afterClose: function(){
                                $("body").removeClass("noScroll");
                            }
                        });
                    }

                    else if($("#goldwellModal .polyv_container .polyv_video").length > 0){
                        var player = new polyvObject($("#goldwellModal .polyv_container"));

                        $("#goldwellModal .polyv_container .polyv_video").each(function(num,ele){
                            player.videoPlayer({
                                'width':'100%',
                                'vid':$(ele).attr("data-video-id"),
                                'forceH5': true
                            });
                        });
                        window.s2j_onPlayerInitOver = function(){
                            return callFancyBox(false,null);
                        }
                    }
                    else{
                        $.fancybox(data,{
                            autoSize  : false,
                            height : 'auto',
                            width :  '100%',
                            padding: '0',
                            maxWidth: '1146',
                            topRatio: 0.5,
                            wrapCSS: false,
                            showCloseButton: true,
                            afterShow:function(){
//                                if($("#goldwellModal .polyv_container .polyv_video").length > 0){
//                                    var player = new polyvObject($("#goldwellModal .polyv_container"));
//
//                                    $("#goldwellModal .polyv_container .polyv_video").each(function(num,ele){
//                                        player.videoPlayer({
//                                            'width':'100%',
//                                            'vid':$(ele).attr("data-video-id"),
//                                            'forceH5': true
//                                        });
//                                    });
//                                    window.s2j_onPlayerInitOver = function(){
//                                        return callFancyBox(false,null);
//                                    } 
//                                } 
                                $(".s7responsiveContainer img").each(function(index) {
                                    s7responsiveImage(this);
                                });
                                if($("#goldwellModal .js-ImageTextCarouselP").length > 0){ 
                                    $(".js-ImageTextCarouselP .g-ImageTextCarouselP__list").slick();
                                }
                                else if($("#goldwellModal .js-ImageCarouselP").length > 0){
                                    $(".js-ImageCarouselP .g-ImageCarouselP__list").slick();
                                }
                                $("body").addClass("noScroll");
                            },
                            afterClose: function(){
                                $("body").removeClass("noScroll");
                            }
                        });
                    }

                    //                    $.colorbox({
                    //                        html : data,
                    //                        maxWidth : "90%",
                    //                        maxHeight: "90%",
                    //                        closeButton : true,
                    //                        reposition: true,
                    //                        opacity: 1,
                    //                        className: isImageGallery ? "image-gallery" : false,
                    //                        onComplete: function(){
                    //                            $("body").addClass("noScroll");
                    //                            $(".s7responsiveContainer img").each(function(index) {
                    //                                s7responsiveImage(this);
                    //                            });
                    //
                    //                            if($("#colorbox").hasClass("image-gallery")){
                    //                                $(".js-ImageTextCarouselP .g-ImageTextCarouselP__list").slick();
                    //                                $(".js-ImageCarouselP .g-ImageCarouselP__list").slick();
                    //                                $.colorbox.resize({});
                    //                                return;
                    //                            }
                    //                            if($(window).width() < 1024){
                    //                                $.colorbox.resize({
                    //                                    width: "95%",
                    //                                    maxHeight:"95%"
                    //                                });
                    //                            }
                    //                            else{
                    //                                $.colorbox.resize({width:"1146", maxHeight:"95%"});
                    //                            }
                    //                        },
                    //                        onClosed: function(){
                    //                            $("body").removeClass("noScroll");
                    //                        }
                    //                    }); 
                });
                return;
            }
        });

        var modalForIframe = function(videoType,videoId,element){
            var iframeToAdd = "";

            if(videoType.indexOf("youtube")!=-1){
                iframeToAdd = '<div class="video-container"><iframe class="tx_gldwvideo" src="//www.youtube.com/embed/'+videoId+'?rel=0&amp;enablejsapi=1&amp;width="800" height="600"></iframe></div>';
                return callFancyBox(true,iframeToAdd);
            }
            else if(videoType.indexOf("vimeo")!=-1){
                iframeToAdd = '<div class="video-container"><iframe class="tx_gldwvideo" src="//player.vimeo.com/video/'+videoId+'?rel=0&amp;enablejsapi=1&amp;" width height frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen ></iframe></div>';
                return callFancyBox(true,iframeToAdd);
            }
            else if(videoType.indexOf("flixel")!=-1){
                iframeToAdd = '<div class="video-container"><iframe class="tx_gldwvideo" src="//media.flixel.com/cinemagraph/'+videoId+'?rel=0&amp;enablejsapi=1&amp;origin=https://master.goldwell-stage.com/" width="800" height="600"></iframe></div>';
                return callFancyBox(true,iframeToAdd);
            }
            else if(videoType.indexOf("polyv")!=-1){
                var player = new polyvObject($("#goldwellModal"));
                player.videoPlayer({
                    'width':'100%',
                    'vid':videoId,
                    'forceH5': true
                });
                window.s2j_onPlayerInitOver = function(){
                    return callFancyBox(false,null);
                }
            }
        }
        }

    var popUpLinks = $(".goldwell-pop-up");
    popUpLinks.goldwellModal();

    var callFancyBox = function(isIframe,iframe){
        if(!isIframe){

            $.fancybox({
                href:"#goldwellModal",
                inline:true,
                autoSize  : false,
                height : 'auto',
                width :  '100%',
                padding: '0',
                maxWidth:'1146',
                topRatio: 0.5, 
                showCloseButton: true,
                afterShow:function(){
                    $("body").addClass("noScroll");
                    $(".s7responsiveContainer img").each(function(index) {
                        s7responsiveImage(this);
                    });
                },
                afterClose: function(){
                    $("body").removeClass("noScroll");
                }
            });

            //            $.colorbox({
            //                href : "#goldwellModal",
            //                inline: true,
            //                maxHeight : "600px",
            //                width : "90%",
            //                closeButton : true,
            //                reposition: true,
            //                opacity: 1,
            //                onComplete: function(){
            //                    $("body").addClass("noScroll");
            //                    $(".s7responsiveContainer img").each(function(index) {
            //                        s7responsiveImage(this);
            //                    });
            //
            //                    if($(window).width() < 1024){
            //                        $.colorbox.resize({
            //                            width: "95%"
            //                        });
            //                    }
            //                    else{
            //                        $.colorbox.resize({width:"90%", height: "98%"});
            //                    }
            //                },
            //                onClosed: function(){
            //                    $("body").removeClass("noScroll");
            //                }
            //            });
        }
        else if(isIframe){

            $.fancybox(iframe, {
                autoSize  : false,
                height : 'auto',
                width :  '100%',
                padding: '0',
                maxWidth:'1146',
                topRatio: 0.5, 
                showCloseButton: true,
                afterShow:function(){
                    $("body").addClass("noScroll");
                    $(".s7responsiveContainer img").each(function(index) {
                        s7responsiveImage(this);
                    });
                },
                afterClose: function(){
                    $("body").removeClass("noScroll");
                }
            });


            //            $.colorbox({
            //                html : iframe,
            //                closeButton : true,
            //                width:"1146",
            //                maxWidth: "90%",
            //                maxHeight: "95%",
            //                reposition: true,
            //                opacity: 1,
            //                onComplete: function(){
            //                    $("body").addClass("noScroll");
            //                    $(".s7responsiveContainer img").each(function(index) {
            //                        s7responsiveImage(this);
            //                    });
            //
            //                    if($(window).width() < 1024){
            //                        $.colorbox.resize({
            //                            width: "80%",
            //                            maxHeight:"95%"
            //                        });
            //                    }
            //                    else{
            //                        //                        $.colorbox.resize({width:"1146", height:"90%", maxHeight: "600"});
            //                    }
            //                },
            //                onClosed: function(){
            //                    $("body").removeClass("noScroll");
            //                }
            //            });
        }
        return;
    }
    $(window).resize(function(){
        $.fancybox.update();
        $.colorbox.resize({
            width: "80%",
            height: "80%",
            maxHeight: "600"
        });
    });
});