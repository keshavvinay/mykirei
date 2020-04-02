$(document).ready(function () {
    var form = $('form[name="bioreSignUp"]');
    var country = $('input[name="countryPreference"]').val();
    var language = $('input[name="languagePreference"]').val();

    $('input[name="signup_email"]').attr('maxlength', '255');

    $.validator.addMethod("validationEmail", function (value, element) {
        var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
        return this.optional(element) || regex.test(value);
    });

    form.validate({
        rules: {
            signup_email: {
                required: true,
                validationEmail: true,
                maxlength: 255
            }
        },
        messages: {
            signup_email: {
                required: $('#signup_email_msg1').text(),
                validationEmail: $('#signup_email_msg1').text(),
                maxlength: $('#signup_email_msg2').text()
            }
        },
        errorElement: "label",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            error.insertAfter(element);
        },
        success: function (label, element) {
            return;
        },
        submitHandler: function (form) {
            var requestData = {
                "email": $('input[name="signup_email"]').val(),
                "countryPreference": $('input[name="countryPreference"]').val(),
                "languagePreference": $("input[name='languagePreference']").val(),
                "brandId": $('input[name="brandId"]').val(),
                "newsletterSubscribed": $('input[name="newsletterSubscribed"]').val(),
                "signupType": $('input[name="signupType"]').val()
            };
            var domain = $('input[name="apiDomain"]').val();

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
                    if (typeof BV != 'undefined') {

                        BV.pixel.trackConversion({
                            "type": "NewsletterSignup",
                            "label": "NewsletterSignup"
                        });

                    }
                    $("#thankYou").addClass("show");

                    setTimeout(function () {
                        $("#thankYou").removeClass("show");
                    }, 3000);
                }
            });
        }
    });
});