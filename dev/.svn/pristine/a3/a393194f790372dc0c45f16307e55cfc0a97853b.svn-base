//$(document).ready(function () {
$('input[name="firstName"]').attr('maxlength', '40');
$('input[name="email"]').attr('maxlength', '150');
$('input[name="confirmEmail"]').attr('maxlength', '150');
$('input[name="lastName"]').attr('maxlength', '40');
$('input[name="postalCode"]').attr('maxlength', '10');
$('input[name="phone"]').attr('maxlength', '20');
$('input[name="address1"]').attr('maxlength', '100');
$('input[name="city"]').attr('maxlength', '50');
$('textarea[name="comment"]').attr('maxlength', '1000');
var phone = $('input[name="phone"]');
var form = $('form[name="banContactUs"]');

/*$(document).ready(function(){
     if($(".form_field_select").val() != ""){
        $('.form_row .form_rightcol .form_field_select').find("option:selected").text($(".form_field_select").val());
     }
});*/

$('input[type="submit"]').parent().append("<p class='msg-error error_submit error'></p>");
    
window.onload = function () {
    
    $('label[for="banContactUs_upcCode"]').after("<span id ='ban_help_tip_upc_code' class='help-tip'>?</span>");
    $('label[for="banContactUs_mfgCode"]').after("<span id ='ban_help_tip_mfg_code' class='help-tip'>?</span>");
    
    var country = $('input[name="countryPreference"]').val();
    var language = $('input[name="languagePreference"]').val();
    
    if (country == "us") {
            loadStates();
        }
    
    var arr = ['Male', 'Female'];
    
    for (var i = 0; i < arr.length; i++) {
            if (language == "en") {
                $('select[name="gender"]').append("<option value='" + arr[i].charAt(0).trim() + "'>" + arr[i] + "</option>");
            }

        }
    
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
    
    $(document).on('click', "#ban_help_tip_upc_code", function() {
        if(!$(this).hasClass("isCLicked")){
            $(this).addClass("isCLicked");
            $("#product_upc_image").css("display", "flex");
           }
        else{
            $(this).removeClass("isCLicked");
            $("#product_upc_image").css("display", "none");
        }
    });

    $(document).on('click', "#ban_help_tip_mfg_code", function() {
         if(!$(this).hasClass("isCLicked")){
            $(this).addClass("isCLicked");
            $("#product_mfg_image").css("display", "flex");
           }
        else{
            $(this).removeClass("isCLicked");
            $("#product_mfg_image").css("display", "none");
        }
    });

    $(document).click(function(e) {
        if ((e.target.id != "ban_help_tip_upc_code")) {
            $("#product_upc_image").css("display", "none");
        }

        if ((e.target.id != "ban_help_tip_mfg_code")) {
            $("#product_mfg_image").css("display", "none");
        }
    });
}
$('select[name="year"] option:first').val('');
$('select[name="month"] option:first').val('');
$('select[name="day"] option:first').val('');
$('select[name="state"] option:first').val('');
$('select[name="gender"] option:first').val('');

phone.on('keypress', function (e) {
    return 0 == this.selectionStart ? e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|+|-]/.test(String.fromCharCode(e.which)) : e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|-]/.test(String.fromCharCode(e.which))
});

/*$.validator.addMethod("validationEmail", function(value,element){
        return this.optional(element) || /[\w'+-.]+(\.[\w'+-.]+)*@(\[\w+([-.]\w+)*(\.\w{2,3})\])|[\w'+-.]+(\.[\w'+-.]+)*@(\w+([-.]\w+)*\.\w{2,3})/.test(value);
    })*/

$.validator.addMethod("validationEmail", function(value,element){
        var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
        return this.optional(element) || regex.test(value);
    })

form.validate({
    rules: {
        firstName: {
            required: true,
            maxlength: 39
        },
        lastName: {
            required: true,
            maxlength: 39
        },
        email: {
            required: true,
            validationEmail: true,
            maxlength: 149
        },
        confirmEmail: {
            equalTo: '[name="email"]'
        },
        address1: {
            required: true,
            maxlength: 99
        },
        city: {
            required: true,
            maxlength: 49
        },
        phone: {
            required: true,
            maxlength: 19
        },
        postalCode: {
            required: true,
            maxlength: 09
        },
        year: {
            required: true
        },
        month: {
            required: true
        },
        day: {
            required: true
        },
        state: {
            required: true
        },
        gender: {
            required: true
        },
        comment: {
            required: true,
            maxlength: 999
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
        address1: {
            required: $('#address_msg1').text(),
            maxlength: $('#address_msg2').text()
        },
        city: {
            required: $('#city_msg1').text(),
            maxlength: $('#city_msg2').text()
        },
        phone: {
            required: $('#phone_msg1').text(),
            maxlength: $('#phone_msg2').text()
        },
        postalCode: {
            required: $('#postal_code_msg1').text(),
            maxlength: $('#postal_code_msg2').text()
        },
        year: {
            required: $('#year_error_msg').text()
        },
        month: {
            required: $('#month_error_msg').text()
        },
        day: {
            required: $('#day_error_msg').text()
        },
        state: {
            required: $('#state_error_msg').text()
        },
        gender: {
            required: $('#gender_error_msg').text()
        },
        comment: {
            required: $('#comment_msg1').text(),
            maxlength: $('#comment_msg2').text()
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
            "email": $('input[name="email"]').val().trim(),
            //"confirmEmail": $('input[name="confirmEmail"]').val(),
            "gender": $('input[name="gender"]').val(),
            "phone": $('input[name="phone"]').val(),
            "address": {
                "addressLine1": $('input[name="address1"]').val(),
                "addressLine2": $('input[name="address2"]').val(),
                "city": $('input[name="city"]').val(),
                "state": $('select[name="state"]').val(),
                "postcode": $('input[name="postalCode"]').val()
            },
            "dob": dob,
            "brandId": $('input[name="brandId"]').val().trim(),
            "countryPreference" : $('input[name="countryPreference"]').val(),
            "languagePreference": $('input[name="languagePreference"]').val(),
            "feedback": {
                "comment": $('textarea[name="comment"]').val(),
                "upcCode": $('input[name="upcCode"]').val(),
                "mfgCode": $('input[name="mfgCode"]').val()
            }
        };
        var domain = $('input[name="apiDomain"]').val();
        var redirect = $('input[name="redirectPage"]').val();
        $("#resultTest").text(JSON.stringify(requestData));
        $.ajax({
            type: "POST",
            url: domain +"api/customer/contact-us",
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
                contactThankYou = contactThankYou + redirect ;
                window.location.href = contactThankYou;
                console.log("SUCCESS : ", data);
            },
               error: function (xhr, textStatus) {
                    $('.loader-section').hide();
                    console.log(xhr);
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
/*    jQuery.validator.addMethod("isEmpty", function(value, element) {
        
    });
});*/
function loadStates() {

    var country = $('input[name="countryPreference"]').val();
    var domain = $('input[name="apiDomain"]').val();
    var statesData;
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: domain+"api/customer/states/" + country + "",
        headers: {
            "Content-Type": "application/json"
        },
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function(data) {


            for (var d in data) {
                $('select[name="state"]').append("<option value='" + d + "'>" + data[d].stateDescription + "</option>");
            }
        },
        error: function(e) {
            console.log("ERROR : ", e);
        }
    });
}