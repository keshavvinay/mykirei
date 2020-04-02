//$(document).ready(function () {
$('input[name="firstName"]').attr('maxlength', '50');
$('input[name="email"]').attr('maxlength', '150');
$('input[name="confirmEmail"]').attr('maxlength', '150');
$('input[name="lastName"]').attr('maxlength', '50');
$('input[name="postalCode"]').attr('maxlength', '10');
var form = $('form[name="banSignUp"]');

$('input[type="submit"]').parent().append("<p class='msg-error error_submit error'></p>");

window.onload = function () {
    for (var i = 1; i <= 31; i++) {
        $('select[name="day"]').append("<option value= '" + i + "'>" + i + "</option>");
    }
    for (var i = 1; i <= 12; i++) {
        $('select[name="month"]').append("<option value= '" + i + "'>" + i + "</option>");
    }
    var min_age = 13;
    var max_year = moment().format('YYYY') - min_age;
    for (var i = max_year; i >= 1919; i--) {
        $('select[name="year"]').append("<option value= '" + i + "'>" + i + "</option>");
    }
}
$('select[name="year"] option:first').val('');
$('select[name="month"] option:first').val('');
$('select[name="day"] option:first').val('');

$.validator.addMethod("validationEmail", function(value,element){
        var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
        return this.optional(element) || regex.test(value);
    })

form.validate({
    rules: {
        firstName: {
            required: true,
            maxlength: 49
        },
        lastName: {
            required: true,
            maxlength: 49
        },
        email: {
            required: true,
            validationEmail: true,
            maxlength: 149
        },
        confirmEmail: {
            equalTo: '[name="email"]'
        },
        postalCode: {
            required: true,
            maxlength: 09
        },
        /*tcAgreed: {
            required: true
        },*/
        year: {
            required: true
        },
        month: {
            required: true
        },
        day: {
            required: true
        }
    },
        messages: {
            firstName: {
                required: $('#fisrt_name_msg1').text(),
                maxlength: $('#fisrt_name_msg2').text()
            },
            lastName: {
                required: $('#last_name_msg1').text(),
                maxlength: $('#last_name_msg2').text()
            },
            email: {
                required: $('#email_msg1').text(),
                validationEmail: $('#email_msg1').text(),
                maxlength: $('#email_msg2').text()
            },
            confirmEmail: {
                required: $('#email_msg1').text()
            },
            postalCode: {
                required: $('#postal_code_msg1').text(),
                maxlength: $('#postal_code_msg2').text()
            },
            /*tcAgreed: {
                required: $('#tc_error_msg').text()
            },*/
            year: {
                required: $('#year_error_msg').text()
            },
            month: {
                required: $('#month_error_msg').text()
            },
            day: {
                required: $('#day_error_msg').text()
            }
        },
        //errorElement: "em", 
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            element.closest(".form_row").addClass("has-feedback");
            element.closest(".dobContainer").addClass("groupBoxError");
            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent(".check_box"));
            } else {
                error.insertAfter(element);
            }
            if (!element.next("span")[0]) {
                jQuery("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
            }
        },
        submitHandler: function (form) {
            
            var month = $('select[name="month"]').val();
            var day = $('select[name="day"]').val();
            var year = $('select[name="year"]').val();
            if (month != '' && day != '' && year != '') {
                var dob = year + '-' + month + '-' + day;
            }
            else {
                dob = undefined;
            }
            $('.loader-section').show();
            var requestData = {
                "firstName": $('input[name="firstName"]').val(),
                "lastName": $('input[name="lastName"]').val(),
                "email": $('input[name="email"]').val(),
                "newsletterSubscribed" :true,
                "address": {
                    "postcode": $('input[name="postalCode"]').val()
                },
                "dob": dob,
                "brandId": $('input[name="brandId"]').val(),
                "countryPreference" : $('input[name="countryPreference"]').val(),
                "languagePreference": $('input[name="languagePreference"]').val()  
            };
            var domain = $('input[name="apiDomain"]').val();
            var redirect = $('input[name="redirectPage"]').val();
            $("#resultTest").text(JSON.stringify(requestData));
            $.ajax({
                type: "POST",
                url: domain +"api/customer/newsletter",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(requestData),
                dataType: 'json',
                cache: false,
                timeout: 60000,
                success: function (data) {
                    //callBVPixelScript(requestData.email, requestData.languagePreference, requestData.countryPreference);
                    var contactThankYou = window.location.href;
                    if (contactThankYou.charAt(contactThankYou.length - 1) == "/") {
                        contactThankYou = contactThankYou.substring(0, contactThankYou.length - 1);
                    }
                    contactThankYou = contactThankYou.substring(0, contactThankYou.lastIndexOf("/"));
                    contactThankYou = contactThankYou + redirect ;
                    window.location.href = contactThankYou;
                    console.log("SUCCESS : ", data);
                },
                error: function (xhr, textStatus) {
                    $('.loader-section').hide();
                    if (xhr.status == 400) {
                        $('.error_submit').text($('#submit_error_msg1').text());
                    } else if (xhr.status > 400 ){
                        $('.error_submit').text($('#submit_error_msg2').text());
                    } else {
                      $('.error_submit').text('');
                    }
                    //document.getElementById("error_submit").style.visibility = "visible";
                }
            });
        }
    });

/* function callBVPixelScript(email, languagePreference, countryPreference) {
        if (typeof (BV) != "undefined" && typeof (BV.pixel) != "undefined") {
            BV.pixel.trackTransaction({
                "email": email,
                "locale": languagePreference,
                "country": countryPreference,
                "ExternalID": "12345"
            });
        }
    }*/
/*    
    jQuery.validator.addMethod("isEmpty", function(value, element) {
        
    });
});*/