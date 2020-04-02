$(document).ready(function () {

    var nl_form = $('form[name="curelSignUp"]');
    var signup_form = $('form[name="sign_up_form"]');
    var country = $('input[name="countryPreference"]').val();
    var language = $('input[name="languagePreference"]').val();


    $('input[type="submit"]').parent().append("<p class='msg-error error_submit error'></p>");
    $('input[name="nl_email"]').attr('maxlength', '255');


    $.validator.addMethod("validationEmail", function (value, element) {
        var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
        return this.optional(element) || regex.test(value);
    });

    nl_form.validate({
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
            error.addClass("help-block");
            error.insertAfter(element);
        },
        success: function (label, element) {

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
            $('.curel-footer-wrapper .loader-img').addClass('active-loader');
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
                    $('.newsletter-popup-wrapper').addClass('open-popup');
                    $('.curel-footer-wrapper .loader-img').removeClass('active-loader');
                    $('.newsletter-popup-container .cls-btn').click(function () {
                        $('.newsletter-popup-wrapper').removeClass('open-popup');
                        $('input[name="nl_email"]').val('');
                    });
                    console.log("SUCCESS : ", data);
                }
            });
        }
    });




    // Sign up form JS

    $('form[name="sign_up_form"] input[name="zipcode"]').closest('.form_row').addClass('zip-code-wrapper');

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
    $('form[name="sign_up_form"] .form_button_reset').click(function(){
        $('form[name="sign_up_form"] .nl-checkbox').removeClass('active');
    })
    $('form[name="sign_up_form"] input[name="firstName"]').attr('maxlength', '40');
    $('form[name="sign_up_form"] input[name="email"]').attr('maxlength', '150');
    $('form[name="sign_up_form"] input[name="zipcode"]').attr('maxlength', '6');
    var su_zipcode = $('form[name="sign_up_form"] input[name="zipcode"]');
    su_zipcode.on('keypress', function (e) {
        return 0 == this.selectionStart ? e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|+|-]/.test(String.fromCharCode(e.which)) : e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|-]/.test(String.fromCharCode(e.which))
    });
    signup_form.validate({
        rules: {
            firstName: {
                required: true,
                maxlength: 39
            },
            email: {
                required: true,
                validationEmail: true,
                maxlength: 149
            },
            zipcode: {
                required: true,
                number: true,
                maxlength: 06
            }
        },
        messages: {
            firstName: {
                required: $('#fisrt_name_msg').text(),
                maxlength: $('#fisrt_name_max_msg').text()
            },
            email: {
                required: $('#email_msg1').text(),
                validationEmail: $('#email_msg1').text(),
                maxlength: $('#email_msg2').text()
            },
            zipcode: {
                required: $('#zip_code_msg').text(),
                number: $('#phone_msg').text(),
                maxlength: $('#zip_code_max_msg').text()
            }
        },
        errorElement: "label",
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
            var skinTypeArr = [];
            $('.concern-groupbox').find("input").each(function () {
              if ($("#" + this.id).prop('checked') == true) {
                skinTypeArr.push($("#" + this.id).val().trim());
              }
            });
      
            var attributes = [{
              "name": "SkinConcerns",
              "values": skinTypeArr
            }];
            if (skinTypeArr.length == 0) {
              attributes = undefined;
            }
            var requestData = {
                "firstName": $('input[name="firstName"]').val(),
                "email": $('input[name="email"]').val(),
                "address": {
                    "postcode": $('input[name="zipcode"]').val()
                },
                "brandId": $('input[name="brandId"]').val(),
                "countryPreference": $('input[name="countryPreference"]').val(),
                "languagePreference": $('input[name="languagePreference"]').val(),
                "newsletterSubscribed": $('input[name="newsletterSubscribed"]').val(),
                "attribute": attributes
            }
            var domain = $('input[name="apiDomain"]').val();
            var redirect = $('input[name="redirectPage"]').val();
            $('.curel-footer-wrapper .loader-img').addClass('active-loader');
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
                    var contactThankYou = window.location.href;
                    if (contactThankYou.charAt(contactThankYou.length - 1) == "/") {
                        contactThankYou = contactThankYou.substring(0, contactThankYou.length - 1);
                    }
                    contactThankYou = contactThankYou.substring(0, contactThankYou.lastIndexOf("/"));
                    contactThankYou = contactThankYou + redirect;
                    window.location.href = contactThankYou;
                    console.log("SUCCESS : ", data);
                }
            });
        }
    });
});