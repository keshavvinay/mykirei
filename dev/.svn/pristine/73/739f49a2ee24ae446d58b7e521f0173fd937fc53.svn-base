$(document).ready(function() {
    $('.loader-section.opaque').show();
    var pageUrl = window.location.href;
    if (pageUrl.includes("sap-outbound-id=")) {
        var customerOutboundId = pageUrl.split('sap-outbound-id=')[1].split('&')[0];
		var apiDomain = $('input[name="apiDomain"]').val();
        var apiUrl = apiDomain + "api/customer/subscription-preferences?outbound-id=" + customerOutboundId;
        var contentPageKeyHash = document.getElementById("new_form_contentPageKeyHash").value;
        var emailIdKeyHash = document.getElementById("new_form_emailIdKeyHash").value;
        var optInKeyHash = document.getElementById("new_form_optInKeyHash").value;
        var unsubscribeEmail = $('.unsubscribe-column-unit .unsubscribe-email p span').text();
        var requestData = '{' +
            '"resultEvent":"OPEN",' +
            '"contentPageKeyHash":"' + contentPageKeyHash + '",' +
            '"url":"' + pageUrl + '", ' +
            '"outboundId":"' + customerOutboundId + '"}';
        var emailId;
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: apiUrl,
            data: requestData,
            dataType: 'json',
            cache: false,
            timeout: 600000,
            success: function(data) {
                data.response.contactPersonalizationData.forEach(function(responseData) {
                    if (responseData.widgetKeyHash == emailIdKeyHash) {
                        emailId = responseData.value;
                    }
                });
            },
            error: function(request, status, errorThrown) {
                if (status == 500) {
                    $('.unsubscribe-message').hide();
                    $('.unsubscribe-email').hide();
                    $('.common_button_pack').hide();
                    $('#error-500').show();
                    $('.loader-section.opaque').hide();
                } else {
                    $('.unsubscribe-message').hide();
                    $('.unsubscribe-email').hide();
                    $('.common_button_pack').hide();
                    $('#error-400').show();
                    $('.loader-section.opaque').hide();
                }
            }
        }).done(function(data) {
            if (emailId === undefined) {
                $('.unsubscribe-message').hide();
                $('.unsubscribe-email').hide();
                $('.common_button_pack').hide();
                $('#error-400').show();
                $('.loader-section.opaque').hide();
            } else {
                var finalUnsubscribeEmail = unsubscribeEmail.replace("{EMAIL}", emailId);
                $('.unsubscribe-column-unit .unsubscribe-email p span').text(finalUnsubscribeEmail);
                $('.loader-section.opaque').hide();
            }
        });
    } else {
        $('.unsubscribe-message').hide();
        $('.unsubscribe-email').hide();
        $('.common_button_pack').hide();
        $('#error-500').show();
        $('.loader-section.opaque').hide();
    }
    $(".unsubscribe-yes").click(function() {
        var requestData = '{' +
            '"resultEvent":"SUBMIT",' +
            '"contentPageKeyHash":"' + contentPageKeyHash + '",' +
            '"url":"' + pageUrl + '", ' +
            '"outboundId":"' + customerOutboundId + '", ' +
            '"answers": [{' +
            '"widgetKeyHash": "' + optInKeyHash + '",' +
            '"widgetValueKeyHash": "",' +
            '"value": ""' +
            '}]}';
        $('.loader-section.transparent').show();
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: apiUrl,
            data: requestData,
            dataType: 'json',
            cache: false,
            timeout: 600000,
            success: function(data) {
                window.location.href = "unsubscribe/sorry.html";
            },
            error: function(request, status, errorThrown) {
                if (status == 500) {
                    $('.unsubscribe-message').hide();
                    $('.unsubscribe-email').hide();
                    $('.common_button_pack').hide();
                    $('#error-500').show();
                    $('.loader-section.transparent').hide();
                } else {
                    $('.unsubscribe-message').hide();
                    $('.unsubscribe-email').hide();
                    $('.common_button_pack').hide();
                    $('#error-400').show();
                    $('.loader-section.transparent').hide();
                }
            }
        });
    });

});