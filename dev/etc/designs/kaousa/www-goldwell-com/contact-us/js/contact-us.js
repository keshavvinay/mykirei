$(document).ready(function () {
    $('input[name="firstName"]').attr('maxlength', '40');
    $('input[name="lastName"]').attr('maxlength', '40');
    $('input[name="email"]').attr('maxlength', '255');
    $('input[name="phone"]').attr('maxlength', '20');

    $('textarea[name="message"]').attr('maxlength', '2000');
    var phone = $('input[name="phone"]');
    var mail = $('input[name="email"]');
    var form = $('form[name="goldwell-contact-us"]');

    $('input[name="callAllowed"]').closest('.g-GroupBox').addClass('callback_cb');

    $('label[for="goldwell-contact-us_callAllowed"]').closest('.form_row').addClass('hidden');

    $('input[name="callAllowed"]').closest('.form_row').addClass('callback_btn');

    $('input[type="submit"]').parent().append("<p class='msg-error error_submit error'></p>");

    phone.on('keypress', function (e) {
        return 0 == this.selectionStart ? e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|+|-]/.test(String.fromCharCode(e.which)) : e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|-]/.test(String.fromCharCode(e.which))
    });

    $.validator.addMethod("validationEmail", function (value, element) {
        var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
        return this.optional(element) || regex.test(value);
    });


    var basicValidation = {
        email: {
            required: function(){
                if(!phone.is(':filled') && !mail.is(':filled')){
                    return true;
                }
                else{
                    return false;
                }
            },
            validationEmail: true,
            maxlength: 254
        },
        callAllowed: {
            required: function (element) {
                return phone.is(':filled')
            }
        },
        subject: {
            required: true
        },
        comment: {
            required: true,
            maxlength: 1999
        },
        tcAgreed: {
            required: true
        }
    }

    var extraValidation = {

        email: {
            required: function(){
                if(!phone.is(':filled') && !mail.is(':filled')){
                    return true;
                }
                else{
                    return false;
                }
            },
            validationEmail: true,
            maxlength: 254
        },
        callAllowed: {
            required: function (element) {
                return phone.is(':filled')
            }
        },
        subject: {
            required: true
        },
        comment: {
            required: true,
            maxlength: 1999
        },
        tcAgreed: {
            required: true
        },
        address1: {
            maxlength: 99
        },
        city: {
            maxlength: 49
        },
        postcode: {
            required: true,
            maxlength: 19
        }
    };


    form.validate({
        rules: ($("input[name='validationPreference']").val() === "basicVal") ? basicValidation : extraValidation,
        messages: {
            email: {
                required: $('#common_msg').text(),
                validationEmail: $('#email_msg1').text(), 
                maxlength: $('#maxlength_msg').text()
            },
            callAllowed: {
                required: $('#callallowed_msg').text()
            },
            subject: {
                required: $('#subject_msg').text()
            },
            comment: {
                required: $('#comment_msg').text(),
                maxlength: $('#maxlength_msg').text()
            }, 
            tcAgreed: {
                required: $('#privacy_msg').text()
            },
            postcode : {
                required: $('#postal_code_msg1').text(),
                maxlength: $('#postal_code_msg2').text()
            }
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            element.closest(".form_row").addClass("has-feedback");
            if (element.prop("type") === "checkbox") {
                error.appendTo(element.closest(".checkbox"));
            } else {
                error.insertAfter(element);
            }
            if (!element.next("span")[0]) {
                jQuery("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
            }
        },
        submitHandler: function (form) {
            var requestData = {
                "firstName": $('input[name="firstName"]').val(),
                "lastName": $('input[name="lastName"]').val(),
                "email": $('input[name="email"]').val().trim(),
                "phone": $('input[name="phone"]').val(),
                "brandId": $('input[name="brandId"]').val().trim(),
                "countryPreference": $('input[name="countryPreference"]').val(),
                "languagePreference": $('input[name="languagePreference"]').val(),
                "wantMembership": $('input[name="wantMembership"]').is(":checked"),
                "customerCopyRequired": $('input[name="customerCopyRequired"]').is(":checked"),
                "tcAgreed": $('input[name="tcAgreed"]').is(":checked"),
                "callAllowed": $('input[name="callAllowed"]').is(":checked"),
                "feedback": {
                    "comment": $('textarea[name="comment"]').val(),
                    "subject": $('input[name="subject"]').val()
                }
            };
            var validation = $("input[name='validationPreference']").val();
            var addressVar = {
                "address": {
                    "addressLine1": $('input[name="address1"]').val(),
                    "postcode": $('input[name="postcode"]').val()
                }
            }

            if(validation == "extraVal"){
                var requestData1 = $.extend(requestData,addressVar);
            }
            else{
                requestData1 = requestData;
            }
            var domain = $('input[name="apiDomain"]').val();
            var redirect = $('input[name="redirectPage"]').val();
            $('.loader-image').show();
            $.ajax({
                type: "POST",
                url: domain + "api/customer/contact-us",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(requestData1),
                dataType: 'json',
                cache: false,
                timeout: 60000, 
                success: function (data) {
                    $('.loader-image').hide();
                    if(typeof s != "undefined"){
                        s.linkTrackVars="events";
                        s.linkTrackEvents="event4";
                        s.events="event4";
                        s.tl(this,'o','Send_Contact_Us_Form');
                    }
                    var contactThankYou = window.location.href;
                    if (contactThankYou.charAt(contactThankYou.length - 1) == "/") {
                        contactThankYou = contactThankYou.substring(0, contactThankYou.length - 1);
                    }
                    contactThankYou = contactThankYou.substring(0, contactThankYou.lastIndexOf("/"));
                    contactThankYou = contactThankYou + redirect;
                    window.location.href = contactThankYou;
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
                        $('.error_submit').text('');
                    }
                }
            });
        }
    });

    $('input[name="customerCopyRequired"]').closest('.checkbox-wrapper').hide(); 
    mail.keypress(function(){
        var areaFlag = $(this);
        if(areaFlag.valid() == true) {
            $('input[name="customerCopyRequired"]').closest('.checkbox-wrapper').show();
        } else {
            $('input[name="customerCopyRequired"]').closest('.checkbox-wrapper').slideUp(500);  
        }
    })
    mail.focusout(function(){
        var areaFlag = $(this);
        if(areaFlag.valid() == true) {
            $('input[name="customerCopyRequired"]').closest('.checkbox-wrapper').slideDown(500); 
        } else {
            $('input[name="customerCopyRequired"]').closest('.checkbox-wrapper').slideUp(500); 
        }
    })

    $('input[name="callAllowed"]').closest('.callback_btn ').slideUp(); 

    phone.keypress(function(){
        phoneCheck();
    })
    phone.focusout(function(){
        phoneCheck();
    })
    function phoneCheck() {
        var areaFlag = phone.val().length;
        if(areaFlag >= '5') {
            $('input[name="callAllowed"]').closest('.form_row').slideDown(500);
        } else {
            $('input[name="callAllowed"]').closest('.form_row').slideUp(500); 
        }
    }
});