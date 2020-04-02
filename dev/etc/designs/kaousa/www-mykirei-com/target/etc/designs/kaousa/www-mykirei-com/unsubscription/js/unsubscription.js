$(document).ready(function() {
    var domain = $('input[name="apiDomain"]').val();
    var pageUrl = window.location.href;
    var finalPageUrl = pageUrl.replace("wcmmode=disabled&", "");
    if (pageUrl.includes("sap-outbound-id=")) {
        var customerOutboundId = pageUrl.split('sap-outbound-id=')[1].split('&')[0];
        var apiUrl = domain + "api/customer/subscription-preferences?outbound-id=" + customerOutboundId;
        var contentPageKeyHash = $("#new_form_contentPageKeyHash").val();
        var emailIdKeyHash = $("#new_form_emailIdKeyHash").val();
        var optInKeyHash = $("#new_form_optInKeyHash").val();
        var requestData = {
            "resultEvent": "OPEN",
            "contentPageKeyHash": contentPageKeyHash,
            "url": finalPageUrl,
            "outboundId": customerOutboundId
        };
        var emailId;
        var redirectSorrypage = $("#new_form_redirectSorrypage").val();
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
                window.location.href = redirectSorrypage;

            }
        }).done(function(data) {
            if (emailId === undefined) {
                window.location.href = redirectSorrypage;
            } else {

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
                        console.log("SUCCESS : ", data);
                    },
                    error: function(xhr, textStatus) {
                        if (xhr.status == 400 || xhr.status == 500) {
                            window.location.href = redirectSorrypage;
                        }
                    }
                });


            }
        });
    }   
});