$(document).ready(function () {

    var signup_form = $('form[name="sign_up_form"]');
    var country = $('input[name="countryPreference"]').val();
    var language = $('input[name="languagePreference"]').val();
    var emailId = window.location.href.split("email=");
    if( emailId && emailId.length > 1 ) {
        $("#sign_up_form_email").val( emailId[1] );
    }

    $('input[type="submit"]').parent().append("<p class='msg-error error_submit error'></p>");
    $('input[name="nl_email"]').attr('maxlength', '255');


    $.validator.addMethod("validationEmail", function (value, element) {
        var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
        return this.optional(element) || regex.test(value);
    });

    // Sign up form JS

    $('form[name="sign_up_form"] input[name="zip_code"]').closest('.form_row').addClass('zip-code-wrapper');

    $('form[name="sign_up_form"] input[type="submit"]').closest('.form_row').addClass('sm-flex-container');

    var chkBoxFlag = $('form[name="sign_up_form"] input[type="checkbox"]');
    chkBoxFlag.closest('.form_row').addClass('nl-checkbox');
    chkBoxFlag.change(function () {
        if ($(this).is(":checked")) {
            $(this).closest('.form_row').addClass('active');
        } else {
            $(this).closest('.form_row').removeClass('active');
        }
    })
    $('form[name="sign_up_form"] input[name="first_name"]').attr('maxlength', '40');
    $('form[name="sign_up_form"] input[name="email"]').attr('maxlength', '150');
  /*   $('form[name="sign_up_form"] input[name="zip_code"]').attr('maxlength', '6');
    var su_zipcode = $('form[name="sign_up_form"] input[name="zip_code"]');
    su_zipcode.on('keypress', function (e) {
        return 0 == this.selectionStart ? e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|+|-]/.test(String.fromCharCode(e.which)) : e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|-]/.test(String.fromCharCode(e.which))
    }); */
    signup_form.validate({
        rules: {
            first_name: {
                required: true,
                maxlength: 39
            },
            email: {
                required: true,
                validationEmail: true,
                maxlength: 149
            },
            // zip_code: {
            //     required: true,
            //     number: true,
            //     maxlength: 06
            // }
        },
        messages: {
            first_name: {
                required: $('#fisrt_name_msg').text(),
                maxlength: $('#fisrt_name_max_msg').text()
            },
            email: {
                required: $('#email_msg1').text(),
                validationEmail: $('#email_msg1').text(),
                maxlength: $('#email_msg2').text()
            },
            // zip_code: {
            //     required: $('#zip_code_msg').text(),
            //     number: $('#phone_msg').text(),
            //     maxlength: $('#zip_code_max_msg').text()
            // }
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            error.insertAfter(element);
            // if (element.prop("type") === "checkbox") {
            //     error.insertAfter(element.parent(".check_box"));
            // } else {
            //     error.insertAfter(element);
            // }
        },
        success: function (label, element) {
            return;
        },
        submitHandler: function (form) {
            var requestData = {
                "first_name": $('input[name="first_name"]').val(),
                "email": $('input[name="email"]').val(),
                "zip_code": $('input[name="zip_code"]').val(),
                "brandId": $('input[name="brandId"]').val(),
                "countryPreference": $('input[name="countryPreference"]').val(),
                "languagePreference": $('input[name="languagePreference"]').val(),
                "newsletterSubscribed": $('input[name="newsletterSubscribed"]').val()
            }
            var domain = $('input[name="apiDomain"]').val();
            var redirect = $('input[name="redirectPage"]').val();
            $('.loader-img').show();
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
                    if (typeof s != "undefined") {
                        s.linkTrackVars="events";
                        s.linkTrackEvents="event2";
                        s.events="event2";
                        s.tl(this,'o','Sign-up_Newsletter_Subscription');
                    }

                    var contactThankYou = window.location.href;
                    if (contactThankYou.charAt(contactThankYou.length - 1) == "/") {
                        contactThankYou = contactThankYou.substring(0, contactThankYou.length - 1);
                    }
                    contactThankYou = contactThankYou.substring(0, contactThankYou.lastIndexOf("/"));
                    contactThankYou = contactThankYou + redirect;
                    window.location.href = contactThankYou;
                }
            });
        }
    });
});