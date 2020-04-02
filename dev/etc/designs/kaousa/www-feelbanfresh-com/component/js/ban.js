/**
 * Define console log methods as empty methods (to avoid JS error as KAO common files have removed them.
 */
if (typeof console.warn === 'undefined') {
    console.warn = function () { };
}
if (typeof console.info === 'undefined') {
    console.info = function () { };
}

(function () {
    //Ban webiste JS
    "use strict";
    var banObject = {
        slideVertical: function (ele, target) {
            target.slideToggle();
        },
        activeURL: function (pathName, target) {

            target.each(function (num, ele) {
                var targetURL = $(ele).attr("href");
                if (targetURL != undefined) {
                    if (targetURL.indexOf(".") != -1) {
                        targetURL = targetURL.split(".")[0];
                    }
                    if (pathName.indexOf(targetURL) != -1) {
                        $(ele).parents("li").addClass("active");
                        return;
                    }
                }
            });
        },
        appendTitle: function (titleName, titleNumber) {
            for (var i = 0; i < titleNumber.length; i++) {
                $(titleNumber[i]).attr("title", $(titleNumber[i]).find("span").eq(2).text().trim());
            }
        }
    };

    $(document).ready(function () {

        var dom = $(this);
        var $window = $(window);
        var pathName = window.location.pathname;

        var titleName = [];
        //Make header link active

        $(".menu-sm").click(function () {
            banObject.slideVertical($(this), $(".ban-header"));
        });

        $(".accordion-btn").click(function () {
            var _this = $(this);
            _this.toggleClass("active");
            _this.siblings(".g-AccordionMenu").toggleClass("active");
        });

        banObject.activeURL(pathName, $(".ban-header .l-TextLinkUnit__link"));
        banObject.activeURL(pathName, $(".productNavigation .g-TileLinkVUnit"));

        // Set titles of where to buy
        banObject.appendTitle(titleName, $('.whereToBuy > ul > li'));

        //Scroll to shrink header 
        $window.scroll(function () {
            var headerWrapper = $(".ban-header-wrapper");
            var body = $("body");

            if (dom.scrollTop() > 70 && !headerWrapper.hasClass("shrink")) {
                body.addClass("shrink");
                headerWrapper.addClass("shrink").find(".ban-logo-wrapper").addClass("shrink");
            }

            else if (dom.scrollTop() <= 70 && headerWrapper.hasClass("shrink")) {
                body.removeClass("shrink");
                headerWrapper.removeClass("shrink").find(".ban-logo-wrapper").removeClass("shrink");
            }
        });

        if ($window.width() <= 1024) {
            $(".whereToBuy > .g-ListP__ul > li.g-ListP__ul__item").click(function () {
                $(".g-ListP").removeClass("active");
                $(".g-ListP").find("span.is-background").removeClass("active");
                var innerListPack = $(this).find(".g-ListP");
                innerListPack.closest("span.is-background").toggleClass("active");
                innerListPack.toggleClass("active");
            });
        }

    });
})();