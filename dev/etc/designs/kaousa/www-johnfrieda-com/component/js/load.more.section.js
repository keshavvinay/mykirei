$(document).ready(function() {
    $(" .textLinkColumnSeparator ").slice(0, 4).addClass('visible');
    $(" .textLinkColumnSeparator").slice(4).addClass('hidden');
    $(".visible").show();
    $(".hidden").hide();


    $("#loadMoreButton").click(function(e) {
        e.preventDefault();
        if ($(window).width() < 640) {
            $(" .hidden").slice(0, 1).addClass('visible');
            $(" .hidden").slice(0, 1).show();
            $(" .hidden").slice(0, 1).removeClass('hidden');
            if ($(".hidden").length == 0) {
                $("body:not(.is-authorring) #loadMoreButton").hide();
            }
        } else {
            $(" .hidden").slice(0, 2).addClass('visible');
            $(" .hidden").slice(0, 2).show();
            $(" .hidden").slice(0, 2).removeClass('hidden');
            if ($(" .hidden").length == 0) {
                $("#loadMoreButton").hide();
            }
        }

    });

});
var maxHeight = 0;

$(".textLinkColumnSeparator").each(function(){
   if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
});

$(".textLinkColumnSeparator").height(maxHeight);