$(document).ready(function () {
    var unsubscribe = $('form[name="goldwell-unsubscribe"]');

    $.validator.addMethod("validationEmail", function (value, element) {
        var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
        return this.optional(element) || regex.test(value);
    });

    unsubscribe.validate({
        rules: {
            email: {
                required: true,
                validationEmail: true,
                maxlength: 254 
            }
        },
        messages: {
            email: {
                required: $('#unsub_email_msg').text(),
                validationEmail: $('#unsub_email_msg1').text(), 
                maxlength: $('#unsub_maxlength_msg').text()
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
                "email": $('input[name="email"]').val(),
                "brandId": $('input[name="brandId"]').val(),
                "countryPreference": $('input[name="countryPreference"]').val(),
                "languagePreference": $('input[name="languagePreference"]').val()
            }
            var domain = $('input[name="apiDomain"]').val();
            var redirect = $('input[name="redirectPage"]').val();
            $('.loader-image').show();
            $.ajax({
                type: "POST",
                url: domain + "api/customer/newsletter/unsubscribe",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(requestData),
                dataType: 'json',
                cache: false,
                timeout: 60000,
                success: function (data) {
                    $('.loader-image').hide();
                    var sorry = window.location.href;
                    if (sorry.charAt(sorry.length - 1) == "/") {
                        sorry = sorry.substring(0, sorry.length - 1);
                    }
                    sorry = sorry.substring(0, sorry.lastIndexOf("/"));
                    sorry = sorry + redirect;
                    window.location.href = sorry;
                    console.log("SUCCESS : ", data);
                },
                error: function (xhr, textStatus) {
                    $('.loader-image').hide();
                }
            });
        }
    });

});