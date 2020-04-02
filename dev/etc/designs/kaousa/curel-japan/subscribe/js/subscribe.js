$(document).ready(function() {
	$('.loader-img').show();
    $('.thank-you-section-wrapper').hide();
    $('#error-400').hide();
    var pageUrl = window.location.href;
    if (pageUrl.includes("sap-outbound-id=")) {
        var customerOutboundId = pageUrl.split('sap-outbound-id=')[1].split('&')[0];
		var apiDomain = $('input[name="apiDomain"]').val();
        var apiUrl = apiDomain + "api/customer/subscription-preferences?outbound-id=" + customerOutboundId;
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
            success: function(data) {
                $('.loader-img').hide();
                $('.thank-you-section-wrapper').show();
                $('#error-400').hide();
            },
            error: function(request, status, errorThrown) {
                $('.loader-img').hide();
				$('#error-400').show();
                $('.thank-you-section-wrapper').hide();
            }
        });
    } else {
        $('.loader-img').hide();
        $('#error-400').hide();
    }
});