$(document).ready(function() {
	shariffShare();

	init();

	$(window).on('orientationchange', function(event) {
		setTimeout(function() {
			var t = $('.ArticleCall .JFComponent').height();

			$('.ArticleCall .g-NewsIndexP--v3 .g-NewsIndexP--v3__card .g-NewsIndexP--v3__card__item').height(t);
		}, 500);
	});

	articleText();
});

function articleText() {
	setTimeout(function() {
		if ($(window).width() < 640) {
			var s = $('.ArticleCall .ArticleCallout__text').height();
			$('.JFComponent.ArticleCall .g-NewsIndexP--v3 .g-NewsIndexP--v3__card .g-NewsIndexUnit--v3__innerBlock').height(s);
		}
	}, 5000);
}

function init() {
	$('.JFComponent.ArticleCall .g-NewsIndexP--v3 .g-NewsIndexP--v3__card .g-NewsIndexP--v3__card__item .g-NewsIndexUnit--v3__innerBlock .g-NewsIndexUnit--v3__contentsBlock__text').text(function(index, currentText) {
    return currentText.toLowerCase()
  }).css('text-transform', 'capitalize');

	$('.ArticleCall .g-NewsIndexP--v3 .g-NewsIndexP--v3__card .g-NewsIndexP--v3__card__item')
		.slice(2)
		.addClass('hide');

	var t = $('.ArticleCall .JFComponent').height();

	$('.ArticleCall .g-NewsIndexP--v3 .g-NewsIndexP--v3__card .g-NewsIndexP--v3__card__item').height(t);
}

function shariffShare() {
	var wrapper = $('.jf-blog-share');
	if ($(wrapper).find('.shariff').length != 0) return;
	$('.jf-blog-share').each(function() {
		createButtons($(this));
	});
}

function createButtons($blogarticle) {
	if ($blogarticle.find('.shariff').length != 0) return;

	var services = '[&quot;facebook&quot;,&quot;twitter&quot,&quot;pinterest&quot,&quot;print&quot,&quot;mail&quot;]';
	var lang = $('html')
		.attr('lang')
		.split('-')[0];
	var title = $blogarticle
		.siblings('.g-GroupBox')
		.find('.g-HeadingTitle__h2')
		.text();
	var url = $blogarticle
		.siblings('.g-GroupBox')
		.find('.g-HeadingTitle')
		.attr('href');
	var mediaUrl = $blogarticle.find('img').attr('src');
	var dataMailSub = 'Found for you at John Frieda';
	var dataMailBody = 'I discovered this post on JohnFrieda.com and would like to share it with you:';
	var dataMailUrl = 'mailto:';
	var dataOrientation = 'vertical';
	var dataButtonStyle = 'icon';

	if ($('.g-Section').hasClass('category')) {
		title = $blogarticle
			.parent()
			.siblings('.g-ImageTextHP__contentsBlock__text')
			.find('.g-HeadingTitle')
			.text()
			.trim();
		url = $blogarticle.attr('href');
	}
	if ($('.g-Section').hasClass('article')) {
		title = $blogarticle
			.siblings('.g-PageTitle')
			.find('.g-PageTitle__h1')
			.text()
			.trim();
		url = window.location.href;
	}

	if (mediaUrl === undefined) {
		mediaUrl = '';
	}

	var $shariff = $(
		'<div class="shariff-wrapper"><div class="shariff"' +
			' data-services="' +
			services +
			'"' +
			' data-title="' +
			title +
			'"' +
			' data-url="' +
			url +
			'"' +
			' data-media-url="' +
			mediaUrl +
			'"' +
			' data-orientation="' +
			dataOrientation +
			'"' +
			' data-button-style="' +
			dataButtonStyle +
			'"' +
			' data-lang="' +
			lang +
			'"' +
			' data-mail-subject="' +
			dataMailSub +
			'"' +
			' data-mail-body="' +
			dataMailBody +
			' ' +
			url +
			'"' +
			' data-mail-url="' +
			dataMailUrl +
			'"' +
			'></div></div>'
	);

	$blogarticle.append($shariff);
	var shariffIcons = new Shariff($('.jf-blog-share').find('.shariff'));
	var $link = $(shariffIcons)
		.find('.shariff-button.mail')
		.children('a');
	$link.attr('href', 'mailto:?body=' + url).removeAttr('target');
}

articleText();
