$(document).ready(function () {
    $('input[name="firstName"]').attr('maxlength', '40');
    $('input[name="lastName"]').attr('maxlength', '40');
    $('input[name="email"]').attr('maxlength', '255');
    $('input[name="phone"]').attr('maxlength', '20');

    if($('input[name="tcAgreed"]').is(':checked') == true){
        $('input[name="tcAgreed"]').closest('.form_row').addClass('active');
    }

    if(sessionStorage.length != 0){
        var keys = Object.keys(sessionStorage);
        var sessionKey = "";
        for(var k=0; k<keys.length; k++){
            if(keys[k].indexOf("seminar") != -1){
                sessionKey = keys[k];
                break;
            }
        }
        var sessionObj = JSON.parse(sessionStorage.getItem(sessionKey));
        $('input[name="seminar"]').val(sessionObj.seminarHeading);
        $('[name="seminarLocation"]').val(sessionObj.seminarLocation+" & "+sessionObj.seminarDate);
    }

    $('textarea[name="comment"]').attr('maxlength', '2000');
    var phone = $('input[name="phone"]');
    var seatNum = $('input[name="seminarSeats"]');
    var mail = $('input[name="email"]');
    var form = $('form[name="booking_form"]');

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
        seminar: {
            required: true,
            maxlength: 39
        },
        seminarLocation: {
            required: true,
            maxlength: 39
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
        seminar: {
            required: true,
            maxlength: 39
        },
        seminarLocation: {
            required: true,
            maxlength: 39
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
            seminar: {
                required: $('#seminar-error-msg').text(),
                maxlength: $('#maxlength_msg').text()
            },
            seminarLocation: {
                required: $('#location-and-date-error-msg').text(),
                maxlength: $('#maxlength_msg').text()
            },
            email: {
                required: $('#common_msg').text(),
                validationEmail: $('#email_msg1').text(),
                maxlength: $('#maxlength_msg').text()
            },
            callAllowed: {
                required: $('#callallowed_msg').text()
            },
            subject: {
                required: $('#required_error-msg').text()
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
                "customerNo":$('input[name="customerNo"]').val().trim(),
                "callAllowed": $('input[name="callAllowed"]').is(":checked"),
                "customerCopyRequired": $('input[name="customerCopyRequired"]').is(":checked"),
                "salonName": $('input[name="salonName"]').val().trim(),
                "phone": $('input[name="phone"]').val(),
                "brandId": $('input[name="brandId"]').val().trim(),
                "countryPreference": $('input[name="countryPreference"]').val(),
                "languagePreference": $('input[name="languagePreference"]').val(),
                "tcAgreed": $('input[name="tcAgreed"]').is(":checked"),
                "newsletterSubscribed": $('input[name="newsletterSubscribed"]').val(),
                "feedback": {
                    "comment": $('textarea[name="comment"]').val(),
                    "seminar":$('input[name="seminar"]').val().trim(),
                    "seminarLocation":$('input[name="seminarLocation"]').val().trim(),
                    "seminarSeats":$('input[name="seminarSeats"]').val().trim()
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
                    var contactThankYou = window.location.href;
                    if (contactThankYou.charAt(contactThankYou.length - 1) == "/") {
                        contactThankYou = contactThankYou.substring(0, contactThankYou.length - 1);
                    }
                    contactThankYou = contactThankYou.substring(0, contactThankYou.lastIndexOf("/"));
                    contactThankYou = contactThankYou + redirect;
                    window.location.href = contactThankYou;
                    $('.loader-image').hide();
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
    });

    $('input[name="seminarSeats"]').keypress(function(e){
        return isNumber(e);
    });


    function isNumber(evt) { 
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    function phoneCheck() {
        var areaFlag = phone.val().length;
        if(areaFlag >= '5') {
            $('input[name="callAllowed"]').closest('.form_row').slideDown(500);
        } else {
            $('input[name="callAllowed"]').closest('.form_row').slideUp(500); 
        }
    }
});