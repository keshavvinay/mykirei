(function() {
  'use strict';
  
    function getLocalization() {
        var PTN_CONTENT_PATH = new RegExp("(?:(?:https?://[^/]+)?(?:/editor.html)?/content/wcm_kao/sites/kaousa/www-johnfrieda-com/)([^/]+)/([^/]+)(?:/.*)?");
        var matchRes = new Array();
        // matchRes = location.pathname.match(PTN_CONTENT_PATH);
        matchRes = $("body").attr("data-content-path").match(PTN_CONTENT_PATH);
        
        var countryCode = 1;
        var languageCode = 2;
        var countryCodeString = '';
        var languageCodeString = '';
        if (matchRes != null &&  matchRes.length > 0) {
            countryCodeString = matchRes[countryCode];
            languageCodeString = matchRes[languageCode];
        }
        
        return {'countryCode' : countryCodeString, 'languageCode' : languageCodeString};
    }
    
    function loadArticlesCalloutTopThree() {
        // get JSON data from data source
        $.getJSON(jsonPath, function(data) {
        //$.getJSON("./data/article_details.json", function(data) {
            
            var articleCounter = 0;
            
            var localizationObject = getLocalization();

            $.each(data.ArticlesArray, function(i, article) {
                
                if (window.location.hostname == 'www.johnfrieda.com') {
                    var articlePagePathUrl = (window.location.hostname == 'www.johnfrieda.com' ? article.articlePagePath.replace(/\/content\/wcm_kao\/sites\/kaousa\/www-johnfrieda-com\/..\/../g, '/' + localizationObject['languageCode'] + '-' + localizationObject['countryCode'].toUpperCase()) : article.articlePagePath);
                
                    var articlePath = window.location.protocol + '//' + window.location.hostname + (location.port ? ':'+location.port : '') + articlePagePathUrl +'.html';
                } else {
                    var articlePath = article.articlePagePath + ".html";
                }
            
                if (articleCounter == 0) {

                    var largeArticleCallout = $('<article class="ArticleCallout-large"><a class="ArticleCallout__link" href="'+ articlePath +'"><span class="articleLinkBackgroundOverlay"></span><img data-sizes="auto" class="ArticleCallout__image articleLinkImage lazyload" src="'+ article.imageUrl +'" alt=""><div class="ArticleCallout__text"><p class="ArticleCallout__tag">'+ article.tag + '</p><h2 class="ArticleCallout__title u-ctaArrow">'+ article.title + '</h2><p class="ArticleCallout__preview">'+ article.shortDescription + '</p></div></a></article>');

                    $('.ArticleCalloutGroup').append(largeArticleCallout);

                } else if (articleCounter <= 2) {
                    
                    var smallArticleCallout = $('<article class="ArticleCallout-small"><a class="ArticleCallout__link" href="'+ articlePath +' "><div class="ArticleCallout__imageWrapper"><span class="articleLinkBackgroundOverlay"></span><img data-sizes="auto" class="ArticleCallout__image articleLinkImage lazyload" src="'+ article.imageUrl +'" alt=""></div><div class="ArticleCallout__text"><h2 class="ArticleCallout__title u-ctaArrow">'+ article.title + '</h2><p class="ArticleCallout__tag">'+ article.tag + '</p></div></a></article>');
                    
                    $('.ArticleCalloutGroup').append(smallArticleCallout);
                }
                
                articleCounter++;
                
                if (articleCounter > 2) {
                    return false;
                }

            });


        });
        
        return true;

    }
    
    $(document).ready(function() {
        loadArticlesCalloutTopThree();
    });
  
  
  
})();