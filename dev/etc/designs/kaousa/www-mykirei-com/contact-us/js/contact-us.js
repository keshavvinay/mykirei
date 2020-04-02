$(document).ready(function() {


    var count = 1;

    var country = $("#mykirei_contact_us_country option:selected").val();

    if (country == "us") {
        loadStates();
    }





    for (var i = 1; i <= 31; i++) {
        $('#mykirei_contact_us_day').append("<option value= '" + i + "'>" + i + "</option>");
    }

    for (var i = 1; i <= 12; i++) {
        $('#mykirei_contact_us_month').append("<option value= '" + i + "'>" + i + "</option>");
    }

    var min_age = 13;
    var max_year = moment().format('YYYY') - min_age;
    for (var i = max_year; i >= 1919; i--) {
        $('#mykirei_contact_us_year').append("<option value= '" + i + "'>" + i + "</option>");
    }

    /* Append tool tip for product UPC code and Product MFG Code */
    var upc_info_button = `<button class="info" id="upc_info_button" type="button">?</button>`;
    var mfg_info_button = `<button class="info" id="mfg_info_button" type="button">?</button>`;
    var upc_info_label = $("label[for='mykirei_contact_us_upcCode']");
    var mfg_info_label = $("label[for='mykirei_contact_us_mfgCode']");
    $(upc_info_label).append(upc_info_button);
    $(mfg_info_label).append(mfg_info_button);

    /* Tool tip toggle display */
    $("#upc_info_button").click(function() {
        $("#product_upc_text").toggle();
    });
    $("#mfg_info_button").click(function() {
        $("#product_mfg_text").toggle();
    });

    //hide it when clicking anywhere else except the popup and the trigger
    $(document).on('click touch', function(event) {
        if (!$(event.target).parents().addBack().is('#upc_info_button')) {
            $('#product_upc_text').hide();
        }
    });

    $(document).on('click touch', function(event) {
        if (!$(event.target).parents().addBack().is('#mfg_info_button')) {
            $('#product_mfg_text').hide();
        }
    });

    $('#product_upc_text').on('click touch', function(event) {
        event.stopPropagation();
    });

    $('#product_mfg_text').on('click touch', function(event) {
        event.stopPropagation();
    });


    /*Form Validations*/
    $('input[name="firstname"]').attr('maxlength', '40');
    $('input[name="lastname"]').attr('maxlength', '40');
    $('input[name="email"]').attr('maxlength', '150');
    $('textarea[name="thoughts"]').attr('maxlength', '1000');
    var form = $('form[name="mykirei_contact_us"]');

    $.validator.addMethod("validationEmail", function(value, element) {
        var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
        return this.optional(element) || regex.test(value);
    });
    $.validator.addMethod("validationCountry", function(value, element) {
        if (value == "n/a") {
            return false;
        }
        return true;
    });
    $.validator.addMethod("validationState", function(value, element) {
        if (value == "Select State") {
            return false;
        }
        return true;
    })


    $.validator.addMethod("validationGender", function(value, element) {
        if (value == "Select") {
            return false;
        }
        return true;
    })

    $.validator.addMethod("validationBirthDate", function(value, element) {
        if (value == "Year" || value == "Month" || value == "Day") {
            return false;
        }
        return true;
    })






    var basicValidation = {
        firstname: {
            required: true,
            maxlength: 39
        },
        lastname: {
            required: true,
            maxlength: 39
        },
        email: {
            required: true,
            validationEmail: true,
            maxlength: 149
        },
        confirmemail: {
            required: true,
            validationEmail: true,
            maxlength: 150
        },
        address1: {
            required: true,
            maxlength: 99
        },
        city: {
            required: true,
            maxlength: 49
        },
        address2: {
            maxlength: 99
        },
        state: {
            validationState: true,
            required: true
        },
        address3: {
            maxlength: 99
        },
        zipcode: {
            required: true,
            maxlength: 19
        },
        gender: {
            validationGender: true,
            required: true
        },
        country: {
            required: true
        },
        year: {
            validationBirthDate: true,
            required: true
        },
        month: {
            validationBirthDate: true,
            required: true
        },
        day: {
            validationBirthDate: true,
            required: true
        },
        phone: {
            required: true,
            maxlength: 19
        },
        upcCode: {
            required: true
        },
        mfgCode: {
            required: true
        },
        question_comment: {
            required: true,
            maxlength: 999
        }
    };

    var extraValidation = {
        firstname: {
            required: true,
            maxlength: 39
        },
        lastname: {
            required: true,
            maxlength: 39
        },
        email: {
            required: true,
            validationEmail: true,
            maxlength: 149
        },
        confirmemail: {
            required: true,
            validationEmail: true,
            maxlength: 150
        },
        address1: {
            required: true,
            maxlength: 99
        },
        city: {
            required: true,
            maxlength: 49
        },
        address2: {
            maxlength: 99
        },
        state: {
            validationState: true,
            required: true
        },
        address3: {
            maxlength: 99
        },
        zipcode: {
            required: true,
            maxlength: 19
        },
        gender: {
            validationGender: true,
            required: true
        },
        country: {
            required: true
        },
        year: {
            validationBirthDate: true,
            required: true
        },
        month: {
            validationBirthDate: true,
            required: true
        },
        day: {
            validationBirthDate: true,
            required: true
        },
        phone: {
            required: true,
            maxlength: 19
        },
        upcCode: {
            required: true
        },
        mfgCode: {
            required: true
        },
        question_comment: {
            required: true,
            maxlength: 999
        }
    };



    form.validate({
        rules: ($("input[name='validationPreference']").val() === "basicVal") ? basicValidation : extraValidation,
        messages: {
            firstname: {
                required: $('#first_name_msg1').text(),
                maxlength: $('#first_name_msg2').text()
            },
            lastname: {
                required: $('#last_name_msg1').text(),
                maxlength: $('#last_name_msg2').text()
            },
            email: {
                required: $('#email_msg1').text(),
                validationEmail: $('#email_msg2').text(),
                maxlength: $('#email_msg3').text()
            },
            confirmemail: {
                required: $('#confirmemail_msg1').text(),
                matchEmail: $('#confirmemail_msg2').text()
            },
            address1: {
                required: $('#address_msg1').text(),
                maxlength: $('#address_msg2').text()
            },
            city: {
                required: $('#city_msg1').text(),
                maxlength: $('#city_msg2').text()
            },
            address2: {
                required: $('#').text(),
                maxlength: $('#address_msg3').text()
            },
            state: {
                validationState: $('#state_error_msg').text(),
                required: $('#state_error_msg').text()
            },
            address3: {
                required: $('#').text(),
                maxlength: $('#address_msg4').text()
            },
            zipcode: {
                required: $('#zip_code_msg1').text(),
                maxlength: $('#zip_code_msg2').text()
            },
            gender: {
                validationGender: $('#gender_error_msg').text(),
                required: $('#gender_error_msg').text()
            },
            country: {
                required: $('#country_error_msg').text()
            },
            year: {
                validationBirthDate: $('#birthdate_error_msg').text(),
                required: $('#birthdate_error_msg').text()
            },
            month: {
                validationBirthDate: $('#birthdate_error_msg').text(),
                required: $('#birthdate_error_msg').text()
            },
            day: {
                validationBirthDate: $('#birthdate_error_msg').text(),
                required: $('#birthdate_error_msg').text()
            },
            phone: {
                required: $('#phone_msg1').text(),
                maxlength: $('#phone_msg2').text()
            },
            upcCode: {
                required: $('#upc_code_error_msg').text()
            },
            mfgCode: {
                required: $('#mfg_code_error_msg').text()
            },
            question_comment: {
                required: $('#comment_msg1').text(),
                maxlength: $('#comment_msg2').text()
            }
        },
        //errorElement: "em",
        errorPlacement: function(error, element) {
            var elem_id = $(element).attr('id');
            if (elem_id == "mykirei_contact_us_year" || elem_id == "mykirei_contact_us_month" || elem_id == "mykirei_contact_us_day") {
                if (count == 1) {
                    $('.birthText p').append('<label class="error">Birthdate is required</label>')
                }
                count++;
            }
            var elem_lable = $('label[for=' + elem_id + ']');
            elem_lable.append(error);
        },
        submitHandler: function(form) {
            //debugger;
            // $('.loader-section').show();            
            var validation = $("input[name='validationPreference']").val();
            var upc_code = $("#mykirei_contact_us_upcCode").val();
            var mfg_code = $("#mykirei_contact_us_mfgCode").val();

            var requestData = {
                "brandId": $("#mykirei_contact_us").find('input#mykirei_contact_us_brand_id').val(),
                "firstName": $("#mykirei_contact_us_firstname").val(),
                "lastName": $("#mykirei_contact_us_lastname").val(),
                "email": $("#mykirei_contact_us_email").val(),
                "languagePreference": $("#mykirei_contact_us").find('input#mykirei_contact_us_languagePreference').val(),
                "countryPreference": $("#mykirei_contact_us_country").children("option:selected").val(),
                "feedback": {
                    "comment": $("#mykirei_contact_us_question_comment").val(),
                    "upcCode": upc_code,
                    "mfgCode": mfg_code
                }
            };


            var domain = $('input[name="apiDomain"]').val();
            var redirect = $('input[name="redirectPage"]').val();
            $("#resultTest").text(JSON.stringify(requestData));
            $.ajax({
                type: "POST",
                url: domain + "api/customer/contact-us",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(requestData),
                dataType: 'json',
                cache: false,
                timeout: 60000,
                success: function(data) {
                    if (typeof s != "undefined") {
                        s.linkTrackVars = "events";
                        s.linkTrackEvents = "event1";
                        s.events = "event1";
                        s.tl(this, 'o', 'Send_Contact_Us_Form');
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

                error: function(xhr, textStatus) {
                    //  $('.loader-section').hide();
                    console.log(xhr);
                    if (xhr.status == 400) {
                        $('.error_submit').text($('#submit_error_msg1').text());
                    } else if (xhr.status > 400) {
                        $('.error_submit').text($('#submit_error_msg2').text());
                    } else {
                        $('.error_submit').text('');
                    }
                    //document.getElementById("error_submit").style.visibility = "visible";
                }
            });
        }
    });

});

function loadStates() {

    var country = $("#mykirei_contact_us_country option:selected").val();;
    var statesData;
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "https://userservices.kaobrands.com/api/customer/states/" + country + "",
        headers: {
            "Content-Type": "application/json"
        },
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function(data) {

            console.log(data)


            for (var d in data) {
                $('#mykirei_contact_us_state').append("<option value='" + d + "'>" + data[d].stateDescription + "</option>");
            }
        },
        error: function(e) {
            console.log("ERROR : ", e);
        }
    });

}