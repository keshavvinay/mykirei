$(document).ready(function () {

    var loader = '.unsubscribe-loader-section';
    var success = '.subscribe-success';
    var error = '.subscribe-error .error';
    var error400 = '.jf-unsubscribe #error-400';
    var error500 = '.jf-unsubscribe #error-500';

    $(loader).show();
    //$(success).css('visibility', 'hidden');
    //$(error).hide();


    var pageUrl = window.location.href;
    var customerOutboundId = pageUrl.split('sap-outbound-id=')[1].split('&')[0];
    var apiUrl = "https://userservices.kaobrands.com/api/customer/subscription-preferences?outbound-id=" + customerOutboundId;
    var contentPageKeyHash = document.getElementById("new_form_contentPageKeyHash").value;
    var emailIdKeyHash = document.getElementById("new_form_emailIdKeyHash").value;
    var optInKeyHash = document.getElementById("new_form_optInKeyHash").value;
    var requestData = '{' +
        '"resultEvent":"SUBMIT",' +
        '"contentPageKeyHash":"' + contentPageKeyHash + '",' +
        '"url":"' + pageUrl + '", ' +
        '"outboundId":"' + customerOutboundId + '", ' +
        '"answers": [{' +
        '"widgetKeyHash": "' + optInKeyHash + '",' +
        '"widgetValueKeyHash": "",' +
        '"value": "X"' +
        '}]}';
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: apiUrl,
        data: requestData,
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            $(loader).hide();
            $(success).css('visibility', 'visible');
        },
        error: function (e) {
            $(loader).hide();
            if (e.statusCode == 400) {
                $(error400).show();
            } else $(error500).show();
        }
    });
});
