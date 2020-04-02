
var form = $('form[name="mykirei_SignUp"]');
$('input[type="submit"]').parent().append("<p class='msg-error error_submit error'></p>");
$('input[name="nl_email"]').attr('maxlength', '255');


$.validator.addMethod("validationEmail", function (value, element) {
    var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
    return this.optional(element) || regex.test(value);
    });

form.validate({
        rules: {
            nl_email: {
                required: true, 
                validationEmail: true, 
                maxlength: 254
            }   
        },
        messages: {
            nl_email: {
                required: $('#nl_email_msg').text(),
                validationEmail: $('#nl_email_msg1').text(),
                maxlength: $('#nl_maxlength_msg').text()
            }
        },
        errorElement: "label",
        errorPlacement: function (error, element) {
            $('.mykirei-footer-nl-placeholder').addClass('error-placeholder');            
            $(".mykirei-footer .g-BrFooter__inner .g-BrFooter__infoBlock .form_rightcol .form_button_submit").addClass('error-submitbutton');            
            error.addClass("help-block");
            error.insertAfter(element);
           
        },
        success: function (label, element) {
            $('.mykirei-footer-nl-placeholder').removeClass('error-placeholder');            
            $(".mykirei-footer .g-BrFooter__inner .g-BrFooter__infoBlock .form_rightcol .form_button_submit").removeClass('error-submitbutton');            

 
            return;
        },

submitHandler: function (form) {
            var requestData = {
                "email": $('input[name="nl_email"]').val(),
                "brandId": $('input[name="brandId"]').val(),
                "countryPreference": $('input[name="countryPreference"]').val(),
                "languagePreference": $('input[name="languagePreference"]').val(),
                "newsletterSubscribed": $('input[name="newsletterSubscribed"]').val(),
                "signupType": $('input[name="signupType"]').val()
            }
            var domain = $('input[name="apiDomain"]').val();
            var redirect = $('input[name="redirectPage"]').val();
            console.log(redirect)
            $.ajax({
                type: "POST",
                url: domain + "api/customer/newsletter",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(requestData),
                dataType: 'json',
                cache: false,
                timeout: 60000,
                success: function (data) {   
                    if(typeof s != "undefined"){
                        s.linkTrackVars="events";
                        s.linkTrackEvents="event2";
                        s.events="event2";
                        s.tl(this,'o','Sign-up_Newsletter_Subscription');
                        }                
                    var newsletterThankYou = redirect;
                    window.location.href = newsletterThankYou;
                    console.log("success :" ,data);
                    },
                error: function() { 
                    //console.log("error") 
                } 
            });
        }
    });

