
//Header hamburger menu function
function openNav() {
    var z = document.body;
	document.body.classList.add('menu-open');

}
function closeNav() {
	var z = document.body;
	document.body.classList.remove('menu-open');
}

// header on page scroll 
$(function() {
    var header = $(".guhl-header");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 10) {
            header.addClass("is-scrolled");
        } else {
            header.removeClass("is-scrolled");
        }
    });
    if ($.fn.isAuthorring()) {
        $("#mySidenav").css("width", "100%");
		$("#mySidenav").css("position", "relative");
        $("#mySidenav").css("top", "0px");
	}
});
// releven content badge icons
$(window).on('load', function() {
    var badgeicon = document.createElement("ul");
    badgeicon.className = 'badge-img-list';
    badgeicon.innerHTML = "<li></li><li></li>";
	$(".g-NewsIndexUnit--v3__image").after(badgeicon);     
})
// social sharif analytics events
  $(function() {
    $('.theme-standard li.facebook a').click(function(){
        if(typeof s != "undefined"){
            debugger;
            s.linkTrackVars = "events";
            s.linkTrackEvents = "event11";
            s.events = "event11";
            s.tl(this, 'o', 'fb_share');
          }
    });
    $('.theme-standard li.pinterest a').click(function(){
        if(typeof s != "undefined"){
            s.linkTrackVars = "events";
            s.linkTrackEvents = "event17";
            s.events = "event17";
            s.tl(this, 'o',  'Pinterest');
          }
    });
    $('.theme-standard li.mail a').click(function(){
        if(typeof s != "undefined"){
            s.linkTrackVars = "events";
            s.linkTrackEvents = "event15";
            s.events = "event15";
            s.tl(this, 'o', 'Mail_Click');
          }
    });

  });
