$(document).ready(function () {

    var nl_form = $('form[name="newsletter"]');
    var country = $('input[name="countryPreference"]').val();
    var language = $('input[name="languagePreference"]').val();


    $('input[type="submit"]').parent().append("<p class='msg-error error_submit error'></p>");


    $.validator.addMethod("validationEmail", function (value, element) {
        var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
        return this.optional(element) || regex.test(value);
    });

    nl_form.validate({
        rules: {
            email: {
                required: true,
                validationEmail: true,
                maxlength: 254
            },
            dataAgreement: {
                required: true
            }
        },
        messages: {
            email: {
                required: $('#nl_email_msg').text(),
                validationEmail: $('#nl_email_msg1').text(),
                maxlength: $('#nl_maxlength_msg').text()
            },
            dataAgreement: {
                required: $('#nl_privacy_policy_msg').text()
            }
        },
        errorElement: "label",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            if (element.prop("type") === "checkbox") {
                error.appendTo(element.closest(".checkbox"));
            } else {
                error.insertAfter(element);
            }
        },
        success: function (label, element) {

            return;
        },
        submitHandler: function (form) {
            var requestData = {
                "email": $('input[name="email"]').val(),
                "brandId": $('input[name="brandId"]').val(),
                "countryPreference": $('input[name="countryPreference"]').val(),
                "languagePreference": $('input[name="languagePreference"]').val(),
                "tcAgreed": $('input[name="tcAgreed"]').is(":checked"),
                "newsletterSubscribed": $('input[name="newsletterSubscribed"]').val()
            }
            var domain = $('input[name="apiDomain"]').val();
            var redirect = $('input[name="redirectPage"]').val();
            $('.loader-image').show()
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
                    $('.loader-image').hide();
                    if(typeof s != "undefined"){
                        s.linkTrackVars="events";
                        s.linkTrackEvents="event3";
                        s.events="event3";
                        s.tl(this,'o','Sign-up_Newsletter_Subscription');
                    }
                    var thankYou = window.location.href;
                    if (thankYou.charAt(thankYou.length - 1) == "/") {
                        thankYou = thankYou.substring(0, thankYou.length - 1);
                    }
                    thankYou = thankYou.substring(0, thankYou.lastIndexOf("/"));
                    thankYou = thankYou + redirect;
                    window.location.href = thankYou;
                    console.log("SUCCESS : ", data);
                },
                error: function (xhr, textStatus) {
                    $('.loader-image').hide();
                    console.log(xhr);
                    if (xhr.status == 400) {
                        $('.error_submit').text($('#submit_error_msg1').text());
                    } else if (xhr.status > 400) {
                        $('.error_submit').text($('#submit_error_msg2').text());
                    } else {
                        $('.error_submit').text($('#submit_error_msg3').text()); 
                    }
                }
            }); 
        }
    });
});