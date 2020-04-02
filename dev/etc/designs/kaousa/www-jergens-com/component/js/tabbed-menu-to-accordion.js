$(document).ready(function(){
	var pageURL=window.location.href;
	var isAuthorringMode=$('body').hasClass('is-authorring');
	if(((pageURL.indexOf('products')>-1) || (pageURL.indexOf('produits')>-1) || (pageURL.indexOf('productos')>-1)) && !isAuthorringMode){ 

		function accordionStyle(){
			var i, tabbedItems;
			tabbedItems = $("a.g-TabMenu__nav__link").length;
			if($(".product-details-tab-menu.one-tab").length>0){
				tabbedItems = 1;
			}
			for(i=0; i<tabbedItems; i++){
				var valueHead = $("a.g-TabMenu__nav__link")[i].innerText;
				var node = document.createElement("DIV");                 
				var textnode = document.createTextNode(valueHead);
				node.classList.add("accordion-style");
				node.appendChild(textnode);
				document.getElementsByClassName("g-TabMenu__item")[i].insertBefore(node,document.getElementsByClassName("g-TabMenuUnit")[i]);
			}
			$('.g-TabMenu__item>div.accordion-style').click(function() {
				if($( this ).parent().hasClass("is-active")){
					$( this ).parent().removeClass("is-active");
				}
				else{
					$('.g-TabMenu__item').removeClass("is-active");
					$( this ).parent().addClass("is-active");
						$('html, body').animate({
							   scrollTop: $('.g-TabMenu').offset().top - 10
						 }, 300);
					}
			});
		}
		function activateFirstTab(target){
			if($(target).length >= 0){
					for(var i=0; i<$(target).length; i++){
						if($(target).eq(i).hasClass('is-active')){
							$(target).eq(i).removeClass('is-active')
						}
					}
					$(target).eq(0).addClass('is-active');
				}
		}
		var flagToChangeToAccordion = true;
		accordionStyle();

		window.addEventListener('resize', function(event){
			if ($(window).width() < 641 && flagToChangeToAccordion == true) {
				targettedElement = '.g-TabMenu__item';
				activateFirstTab(targettedElement);
				flagToChangeToAccordion = false;
			}

			if ($(window).width() > 640 && flagToChangeToAccordion == false) {
				targettedElement1 = '.g-TabMenu__item';
				targettedElement2 = 'a.g-TabMenu__nav__link';
				activateFirstTab(targettedElement1);
				activateFirstTab(targettedElement2);
				flagToChangeToAccordion = true;
			}
		});
	}
});
