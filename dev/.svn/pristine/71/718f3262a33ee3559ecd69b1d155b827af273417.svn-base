$('.unsubscribe-wrapper').parent('#area-Contents').siblings('#area-BrFooter').addClass('clr-opaque');
$(document).ready(function () {
    $('.curel-footer-wrapper .loader-img').addClass('active-loader');
    var domain = $('input[name="apiDomain"]').val();
    var pageUrl = window.location.href;
    var finalPageUrl = pageUrl.replace("wcmmode=disabled&", "");
    if (pageUrl.includes("sap-outbound-id=")) {
        var customerOutboundId = pageUrl.split('sap-outbound-id=')[1].split('&')[0];
        var apiUrl = domain + "api/customer/subscription-preferences?outbound-id=" + customerOutboundId;
        var contentPageKeyHash = $("#new_form_contentPageKeyHash").val();
        var emailIdKeyHash = $("#new_form_emailIdKeyHash").val();
        var optInKeyHash = $("#new_form_optInKeyHash").val();
        var unsubscribeEmail = $('.unsubscribe-wrapper .unsubscribe-email span').text();
        var requestData = {
            "resultEvent": "OPEN",
            "contentPageKeyHash": contentPageKeyHash,
            "url": finalPageUrl,
            "outboundId": customerOutboundId
        };
        var emailId;
        setTimeout(function(){
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: apiUrl,
            data: JSON.stringify(requestData),
            async: false,
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
            error: function(xhr, textStatus) {
                $('.unsubscription_content').hide();
                $('.unsubscription_button_pack').hide();
                $('.is-authorring .unsubscription_content').show();
                $('.unsubscribe-email').hide();
                $('.is-authorring .unsubscription_button_pack').show();
                $('.uns_error_msg').hide();
//                $('.loader-section.opaque').hide();
            }
        }).done(function(data) {
            if (emailId === undefined) {
                $('.unsubscribe-message').hide();
                $('.unsubscribe-email').hide();
                $('.curel-footer-wrapper .loader-img').removeClass('active-loader');
            } else {
                var finalUnsubscribeEmail = unsubscribeEmail.replace("{EMAIL}", emailId);
                $('.unsubscribe-wrapper .unsubscribe-email span').text(finalUnsubscribeEmail);
                $('.curel-footer-wrapper .loader-img').removeClass('active-loader');
            }
        });
    },500);
    } 
    else {
        /*$('.unsubscribe-message').hide();
        $('.common_button_pack').hide();
        $('#error-500').show();
        $('.loader-section.opaque').hide();*/
        $('.unsubscription_content').hide();
        $('.unsubscription_button_pack').hide();
        $('.unsubscribe-email').hide();
        $('.is-authorring .unsubscription_content').show();
        $('.is-authorring .unsubscription_button_pack').show();
        $('.uns_error_msg').show();
        $('.curel-footer-wrapper .loader-img').removeClass('active-loader');
    }
    $("#unsubscribe_yes").click(function() {
        $('.curel-footer-wrapper .loader-img').addClass('active-loader');
           var requestData = {
                "resultEvent": "SUBMIT",
                "contentPageKeyHash": contentPageKeyHash,
                "url": finalPageUrl,
                "outboundId": customerOutboundId,
                "answers": [{
                    "widgetKeyHash": optInKeyHash,
                    "widgetValueKeyHash": "",
                    "value": ""
                }]
        };
        
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: apiUrl,
            data: JSON.stringify(requestData),
            async: false,
            dataType: 'json',
            cache: false,
            timeout: 6000,
            success: function(data) {
                var relativePath = window.location.href;
                var sorryPath = relativePath.substring(0, relativePath.lastIndexOf("/"));
                if (sorryPath.charAt(sorryPath.length - 1) == "/") {
                    sorryPath = sorryPath.substring(0, sorryPath.length - 1);
                }
                if(sorryPath.indexOf("unsubscription") != -1){
                    window.location.href = sorryPath + "/sorry.html";
                }
                else{
                    window.location.href = sorryPath + "/unsubscription/sorry.html";
                }
                //window.location.href = sorryPath + "/unsubscription/sorry.html";
                console.log("SUCCESS : ", data);
            },
            error: function(xhr, textStatus) {
			
			if (xhr.status == 400 || xhr.status == 500) {
                $('.unsubscribe-message').hide();
                $('.unsubscribe-email').hide();
                $('.curel-footer-wrapper .loader-img').addClass('active-loader');
            }
		   }
        });
    });
});
