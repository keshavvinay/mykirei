$(document).ready(function(){

    var loader = '.unsubscribe-loader-section';

    $(loader).show();

    var pageUrl = window.location.href;
    var customerOutboundId = pageUrl.split('sap-outbound-id=')[1].split('&')[0];
    var apiUrl = "https://userservices.kaobrands.com/api/customer/subscription-preferences?outbound-id="+customerOutboundId;
    var contentPageKeyHash = document.getElementById("new_form_contentPageKeyHash").value;
    var emailIdKeyHash = document.getElementById("new_form_emailIdKeyHash").value;
    var optInKeyHash = document.getElementById("new_form_optInKeyHash").value;
    var unsubscribeMessage = '.jf-unsubscribe .unsubscribe-message';
    var unsubscribeEmail = '.jf-unsubscribe .unsubscribe-email';
    var buttonPack = '.unsubscribe-button-pack';
    var yesButton = '#unsubscribe-yes';
    var noButton = '#unsubscribe-no';

    var unsubscribeEmailText = $('.jf-unsubscribe .unsubscribe-email span').text();


    var error400 = '#error-400';   //Sorry. We could not recognize you.
    var error500 = '#error-500';  //We are unable to process your request at the moment. Please try after some time.


    var requestData = {
        resultEvent         :   'OPEN',
        contentPageKeyHash  :   contentPageKeyHash,
        url                 :   pageUrl,
        outboundId          :   customerOutboundId
    };
    $(loader).show();

    var emailId;

    $.ajax({
        type            :   "POST",
        contentType     :   "application/json",
        url             :   apiUrl,
        data            :   JSON.stringify(requestData),
        dataType        :   'json',
        cache           :   false,
        timeout         :   600000,
        success         :   function(data){

            data.response.contactPersonalizationData.forEach(function(responseData){
                if(responseData.widgetKeyHash == emailIdKeyHash){
                    emailId = responseData.value;
                }
            });
        },
        error           :   function(response){
            $(loader).hide(3000);
            $(unsubscribeMessage).hide();
            $(unsubscribeEmail).hide();
            $(buttonPack).hide();
            if(response.statusCode == 500){
                $(error500).show();
            }
            else {
                $(error400).show();
            }
        }
    }).done(function(){

        if(emailId == undefined || emailId == ''){

            $(unsubscribeMessage).hide();
            $(unsubscribeEmail).hide();
            $(buttonPack).hide();
            $(error400).show();
            $(loader).hide();
        }
        else{
            /*replace email id */
            var finalUnsubscribeEmail = unsubscribeEmailText.replace("{EMAIL}",emailId);
            $(unsubscribeEmail).show();
            $('.jf-unsubscribe .unsubscribe-email span').text(finalUnsubscribeEmail);
            $(loader).hide();
        }
    });

    $(yesButton).click(function(){

        var answerData = [
            {
                widgetKeyHash       :   optInKeyHash,
                widgetValueKeyHash  :   '',
                value               :   ''
            }];

        var rData = {
            resultEvent         :   'SUBMIT',
            contentPageKeyHash  :   contentPageKeyHash,
            url                 :   pageUrl,
            outboundId          :   customerOutboundId,
            answers             :   answerData
        };

        $(loader).show();

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: apiUrl,
            data: JSON.stringify(rData),
            dataType: 'json',
            cache: false,
            timeout: 600000,
            success: function(data) {
                $('.jf-unsubscribe').hide();
				
                window.location.href = window.location.pathname.substring(0, 6) + "/newsletter/sorry.html";
				
                $(loader).hide();
            },
            error: function(response) {

                $(loader).hide(3000);
                if(response.statusCode == 500){
                    $(error500).show();
                }
                else{
                    $(error400).show();
                }
            }
        });        

    });

});