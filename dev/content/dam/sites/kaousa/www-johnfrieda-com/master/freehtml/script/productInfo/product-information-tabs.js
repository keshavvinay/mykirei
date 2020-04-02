(function () {
    'use strict';

    var medium = 641;
    var currentWidth;

    function setTabBoxHeight() {
        var checkedTab = '.' + $('.ProductInformationTabs__tabbedWrap input:checked').attr('id');
        $('.ProductInformationTabs__sizerSpan').height($(checkedTab).height());
    }

    function setIconMargin() {
        $('.ProductInformationTabs__icon').each(function () {

            var contentHeight = $(this).next('.ProductInformationTabs__subHead').outerHeight() + $(this).siblings('.ProductInformationTabs__iconParagraph').height() - 40;

            $(this).css('margin-bottom', contentHeight);

        });
    }

    function checkLoad() {
        var hiwVideo = document.getElementById("hiwVideo");
        if (hiwVideo !== null) {
            hiwVideo.onloadeddata = function () {
                setTabBoxHeight();
            };
        }
    }

    function makeTabsIntoHeaders() {
        $('.ProductInformationTabs__tabbedWrap label').each(function () {
            var labelFor = $(this).attr('for');

            $('.ProductInformationTabs__tab.' + labelFor).prepend('<h2 class="ProductInformationTabs__tabHeading">' + $(this).text() + '</h2>');

            setTabBoxHeight();
            currentWidth = $(window).width();

        });
    }

    function makeHeadersIntoTabs() {
        $('.ProductInformationTabs__tab').each(function () {
            var labelFor = $(this).attr('class').replace('ProductInformationTabs__tab ', '');
            labelFor = labelFor.replace(' expanded', '');
            var labelHeader = $(this).children('h2');

            labelHeader.remove();

            setTabBoxHeight();
            currentWidth = $(window).width();

        });
    }

    function addProductSearchAnalytics(q) {
        if (typeof (s) != "undefined") {
            s.linkTrackVars = "prop17,eVar17,events";
            s.linkTrackEvents = "event22";
            s.prop17 = q;
            s.eVar17 = "D=c17";
            s.events = "event22";
            s.tl(this, 'o', 'On site search');
        }
    }

    $(document).ready(function () {
        // set the height of the tab box on document ready
        setTabBoxHeight();

        // set the bottom margin of subhead icon based upon the height of the content next to it on document ready
        setIconMargin();

        // set the height of the tab box when a new tab is clicked
        $('.ProductInformationTabs__tabbedWrap').on('click', $('input:not(:checked)'), function (e) {
            // input:not(:checked) + label
            // event.preventDefault();
            setTabBoxHeight();
        });

        // initiate mobile non-tabbed view of tab titles
        if ($(window).width() < medium) {
            makeTabsIntoHeaders();
        }

        // set a baseline window width for adjusting non-tabed vs tabbed view on window resize
        currentWidth = $(window).width();

        // expand and retract tab sections on mobile
        $('.ProductInformationTabs__tab').on('click', function () {
            if ($(window).width() < medium) {
                $(this).toggleClass('expanded');
                $('.ProductInformationTabs__tab.expanded').not(this).removeClass('expanded');
            }
        });

        //product information search form
        $('.ProductInformationTabs__searchForm').on('submit', function (el) {
            var q = $(this).find('input[name=q]').val();
            addProductSearchAnalytics(q);
        });

    });

    $(window).on('resize', function () {

        // first check to make sure it isn't a mobile "height" change on scroll because the mobile address bar changes height
        if ($(window).width !== currentWidth) {
            // set the height of the tab box on window rezize
            setTabBoxHeight();
            // set the bottom margin of subhead icon based upon the height of the content next to it on window rezize
            setIconMargin();

            if (currentWidth < medium && $(window).width() >= medium) {
                makeHeadersIntoTabs();
            } else if (currentWidth >= medium && $(window).width() < medium) {
                makeTabsIntoHeaders();
            }
        }

    });

    // set the height of the tab box after a "How it Works" video loads
    window.addEventListener('load', function () {
        checkLoad();
    });

    // Updating the container class to BV div.
    $(document).ready(function () {
        $('#BVRRContainer').addClass('container');
    });

})();
