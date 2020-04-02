/*jergens unsubscription js*/
$(document).ready(function() {
 $('.loader').show();




    window.onload = function() {
        var key = "sap-outbound-id";
        var customerOutboundId = getQueryVariable(key);
        var apiUrl = "https://userservices.kaobrands.com/api/customer/subscription-preferences?outbound-id=" + customerOutboundId;
       
        verify_user(customerOutboundId, apiUrl);
    }

    $('a').click(function() {

        if (this.id == 'unsubscribe_yes') {
            unsubscribe();
        } else if (this.id == 'unsubscribe_no') {
            window.location.href = "";
        }

    });

});


function verify_user(customerOutboundId, apiUrl) {

    var contentPageKeyHash = $("#new_form_contentPageKeyHash").val();
    var emailIdKeyHash = $("#new_form_emailIdKeyHash").val();

    var requestData = {
        "resultEvent": "OPEN",
        "contentPageKeyHash": contentPageKeyHash,
        "url": window.location.href,
        "outboundId": customerOutboundId
    };
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: apiUrl,
        data: JSON.stringify(requestData),
        dataType: 'json',
        cache: false,
        timeout: 60000,
        success: function(data) {
            var emailId;
            data.response.contactPersonalizationData.forEach(function(responseData) {
                if (responseData.widgetKeyHash == emailIdKeyHash) {
                    emailId = responseData.value;
                }
            });
            $('#user_email').html(emailId);
            $('.loader').hide();

        },
        error: function(xhr, textStatus) {
            
           $('.unsubscription_content').hide();
	   $('.unsubscription_button_pack').hide();
           $('.is-authorring .unsubscription_content').show();
          $('.is-authorring .unsubscription_button_pack').show();
           $('.error_msg').show();
	   $('.loader').hide();
        }
    });
}

function unsubscribe() {

    var contentPageKeyHash = $("#new_form_contentPageKeyHash").val();
    var emailIdKeyHash = $("#new_form_emailIdKeyHash").val();
    var optInKeyHash = $("#new_form_optInKeyHash").val();

    var key = "sap-outbound-id";
    customerOutboundId = getQueryVariable(key);
    var apiUrl = "https://userservices.kaobrands.com/api/customer/subscription-preferences?outbound-id=" + customerOutboundId;




    $('.loader').show();
    var requestData = {
        "resultEvent": "SUBMIT",
        "contentPageKeyHash": contentPageKeyHash,
        "url": window.location.href,
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
        dataType: 'json',
        cache: false,
        timeout: 60000,
        success: function(data) {
            window.location.href = "unsubscription/sorry.html?wcmmode=disabled";

            console.log("SUCCESS : ", data);
        },
        error: function(xhr, textStatus) {
			
			if (xhr.status == 400 || xhr.status == 500) {
                alert(xhr.responseText);
            }

		   
        }
    });
}


function getQueryVariable(key) {

    var query = window.location.search.substring(1);


    var values = query.split('&');


    for (var i = 0; i < values.length; i++) {
        var pair = values[i].split("=");

        if (pair[0] == key) {
            return pair[1];
        }

    }




}