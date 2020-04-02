$(document).ready(function () {
    $('.textarea').parents(".form_row").addClass('textarea-wrapper');

    $('input[type="submit"]').parents(".form_row").addClass('btn-wrapper');

    $('.curel-contact-us-form-wrapper .form .g-GroupBox').find('.g-ListP').parent('.g-GroupBox').addClass('dropdown-list-wrapper');

    $('.date-group-box').removeClass('dropdown-list-wrapper');

    $('.dropdown-list-wrapper').find('.form_row input').css('pointer-events', 'none');

    // Date JS
    $('.curel-contact-us-form-wrapper input[name="month"]').parents('.form_row').addClass('month-wrap');
    $('.curel-contact-us-form-wrapper input[name="date"]').parents('.form_row').addClass('date-wrap');
    $('.curel-contact-us-form-wrapper input[name="year"]').parents('.form_row').addClass('year-wrap');
    $('div.month-wrap').wrapAll('<div class="dob-wrapper month-wrapper"></div>');
    $('div.date-wrap').wrapAll('<div class="dob-wrapper date-wrapper"></div>');
    $('div.year-wrap').wrapAll('<div class="dob-wrapper year-wrapper"></div>');

    $('.gender-wrapper .g-ListP .g-ListP__ul__item:nth-child(1)').attr('data-gender','F');
    $('.gender-wrapper .g-ListP .g-ListP__ul__item:nth-child(2)').attr('data-gender','M');


    // Dropdowns Toggle
    var dropTrigger = $('.dropdown-list-wrapper');
    var listTrigger = $('.dropdown-list-wrapper .g-ListP .g-ListP__ul__item');
    $('.dropdown-list-wrapper .form_row').click(function () {
        var self = $(this);
        if (self.closest(".dropdown-list-wrapper").hasClass("active")) {
            self.closest(".dropdown-list-wrapper").removeClass("active");
            self.siblings(".g-ListP").slideUp(200);
        } else {
            dropTrigger.removeClass('active');
            dropTrigger.find('.g-ListP').slideUp(200);
            self.closest('.dropdown-list-wrapper').addClass('active');
            self.siblings('.g-ListP').slideDown(200);
        }
    });

    $('.dropdown-list-wrapper .g-ListP').on('click',".g-ListP__ul__item", function () {
        dropTrigger.removeClass('active');
        listTrigger.parents('.g-ListP').slideUp(200);
        var srcText = $(this).find('.cmn-richtext').text().trim();
        var genText = $(this).attr('data-gender');
        $(this).closest('.g-ListP').siblings('.form_row').find('input').prop('value', srcText);
        $(this).closest('.g-ListP').siblings('.form_row').find('input').attr('data-gender', genText);
    });
    
    // Pop up Product Code
    var popTrig = $('.product-code-popup .g-Text');
    $('.product-code-popup > .g-Image').hover(function () {
        $(this).parents('.product-code-popup').toggleClass('active');
    })

    $('input[name="first_name"]').attr('maxlength', '40');
    $('input[name="email"]').attr('maxlength', '255');
    $('input[name="confirm_email"]').attr('maxlength', '255');
    $('input[name="last_name"]').attr('maxlength', '40');
    $('input[name="phone"]').attr('maxlength', '20');
    $('input[name="address1"]').attr('maxlength', '255');
    $('input[name="city"]').attr('maxlength', '40');
    $('input[name="state"]').attr('maxlength', '50');
    $('input[name="country"]').attr('maxlength', '50');

    //Code to append placeholder for the inout feilds
    var text_feilds = $("input");
    for(var i=0;i<=text_feilds.length;i++) {
        var current_input = $(text_feilds)[i];
        if($(current_input).hasClass("form_field")){
            var label = $(current_input).closest("form_row").find(".form_leftcol").find("label").html();
            $(current_input).attr("placeholder", label);
        }
        
    }

    
    $('input[name="month"]').attr('maxlength', '2');
    $('input[name="date"]').attr('maxlength', '2');
    $('input[name="year"]').attr('maxlength', '4');
    $('input[name="zip_code"]').attr('maxlength', '6');

    $('textarea[name="comment"]').attr('maxlength', '2000');
    var phone = $('input[name="phone"]');
    var zipcode = $('input[name="zip_code"]');
    var form = $('form[name="contact_us"]');


    $('input[type="submit"]').parent().append("<p class='msg-error error_submit error'></p>");

    window.onload = function () {

        $('label[for="banContactUs_upcCode"]').after("<span id ='ban_help_tip_upc_code' class='help-tip'>?</span>");
        $('label[for="banContactUs_mfgCode"]').after("<span id ='ban_help_tip_mfg_code' class='help-tip'>?</span>");

        var country = $('input[name="countryPreference"]').val();
        var language = $('input[name="languagePreference"]').val();

        if (country == "us") {
            loadStates();
        }

        for (var i = 1; i <= 31; i++) {
            $('.date-wrap ul').append("<li class='g-ListP__ul__item l-ListP__ul__item'>" + i + "</li>");
        }
        for (var i = 1; i <= 12; i++) {
            $('.month-wrap ul').append("<li class='g-ListP__ul__item l-ListP__ul__item'>" + i + "</li>");
        }
        var min_age = 13;
        var max_year = moment().format('YYYY') - min_age;
        for (var i = max_year; i >= 1919; i--) {
            $('.year-wrap ul').append("<li class='g-ListP__ul__item l-ListP__ul__item'>" + i + "</li>");
        }


        // Dropdowns Toggle
        var dobDropTrigger = $('.dob-wrapper');
        var dobListTrigger = $('.dob-wrapper .g-ListP .g-ListP__ul__item');
        $('.dob-wrapper .form_row').click(function () {
            var self = $(this);
            if (self.closest(".dob-wrapper").hasClass("active")) {
                self.closest(".dob-wrapper").removeClass("active");
                self.siblings(".g-ListP").slideUp(200);
            } else {
                dobDropTrigger.removeClass('active');
                dobDropTrigger.find('.g-ListP').slideUp(200);
                self.closest('.dob-wrapper').addClass('active');
                self.siblings('.g-ListP').slideDown(200);
            }
        });
    
        dobListTrigger.on('click',function () {
            dobDropTrigger.removeClass('active');
            dobListTrigger.parents('.g-ListP').slideUp(200);
            var srcText = $(this).text().trim();
            $(this).closest('.g-ListP').siblings('.form_row').find('input').prop('value', srcText);
        });

        $(document).on('click', "#ban_help_tip_upc_code", function () {
            if (!$(this).hasClass("isCLicked")) {
                $(this).addClass("isCLicked");
                $("#product_upc_image").css("display", "flex");
            } else {
                $(this).removeClass("isCLicked");
                $("#product_upc_image").css("display", "none");
            }
        });

        $(document).on('click', "#ban_help_tip_mfg_code", function () {
            if (!$(this).hasClass("isCLicked")) {
                $(this).addClass("isCLicked");
                $("#product_mfg_image").css("display", "flex");
            } else {
                $(this).removeClass("isCLicked");
                $("#product_mfg_image").css("display", "none");
            }
        });

        // $(document).click(function (e) {
        //     if ((e.target.id != "contact_us_product_upc_code")) {
        //         $("#product_upc_image").css("display", "none");
        //     }

        //     if ((e.target.id != "contact_us_product_mfg_code")) {
        //         $("#product_mfg_image").css("display", "none");
        //     }
        // });
    }
    $('input[name="year"]').val('');
    $('input[name="month"]').val('');
    $('input[name="date"]').val('');
    $('input[name="state"]').val('');
    $('input[name="gender"]').val('');

    phone.on('keypress', function (e) {
        return 0 == this.selectionStart ? e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|+|-]/.test(String.fromCharCode(e.which)) : e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|-]/.test(String.fromCharCode(e.which))
    });

    zipcode.on('keypress', function (e) {
        return 0 == this.selectionStart ? e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|+|-]/.test(String.fromCharCode(e.which)) : e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|-]/.test(String.fromCharCode(e.which))
    });

    $.validator.addMethod("validationEmail", function (value, element) {
        var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
        return this.optional(element) || regex.test(value);
    })

    form.validate({
        rules: {
            first_name: {
                required: true,
                maxlength: 39
            },
            last_name: {
                required: true,
                maxlength: 39
            },
            email: {
                required: true,
                validationEmail: true,
                maxlength: 254
            },
            confirm_email: {
                equalTo: '[name="email"]'
            },
            address1: {
                required: true,
                maxlength: 254
            },
            city: {
                required: true,
                maxlength: 39
            },
            state: {
                required: true
            },
     /*        phone: {
                required: true
            }, */
            zip_code: {
                required: true,
                number: true,
                maxlength: 06
            },
            country: {
                required: true
            },
            gender: {
                required: true
            },
            month: {
                required: true
            },
            date: {
                required: true
            },
            year: {
                required: true
            },
            comment: {
                required: true,
                maxlength: 1999
            }
        },
        messages: {
            first_name: {
                required: $('#fisrt_name_msg').text(),
                maxlength: $('#fisrt_name_max_msg').text()
            },
            last_name: {
                required: $('#last_name_msg').text(),
                maxlength: $('#last_name_max_msg').text()
            },
            email: {
                required: $('#email_msg1').text(),
                validationEmail: $('#email_msg1').text(),
                maxlength: $('#email_msg2').text()
            },
            confirm_email: {
                required: $('#email_msg3').text()
            },
            address1: {
                required: $('#address_msg').text(),
                maxlength: $('#address_max_msg').text()
            },
            city: {
                required: $('#city_msg').text(),
                maxlength: $('#city_msg2').text()
            },
            state: {
                required: $('#state_msg').text(),
                maxlength: $('#city_max_msg').text()
            },
            gender: {
                required: $('#gender_msg').text()
            },
            date: {
                required: $('#day_msg').text()
            },
            month: {
                required: $('#month_msg').text()
            },
            year: {
                required: $('#year_msg').text()
            },
           /*  phone: {
                required: $('#phone_msg').text()
            }, */
            zip_code: {
                required: $('#zip_code_msg').text(),
                number: $('#phone_msg').text(),
                maxlength: $('#zip_code_max_msg').text()
            },
            comment: {
                required: $('#comment_msg').text(),
                maxlength: $('#comment_max_msg').text()
            }
        },
        //errorElement: "em",
        errorPlacement: function (error, element) {
            /* error.addClass("help-block");
            element.closest(".form_row").addClass("has-feedback");
            element.closest(".date-group-box").addClass("groupBoxError");
            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent(".check_box"));
            } else {
                error.insertAfter(element);
            }
            if (!element.next("span")[0]) {
                jQuery("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
            } */
            $(element).addClass("error");
        },
        submitHandler: function (form) {

            var month = $('input[name="month"]').val();
            var day = $('input[name="date"]').val();
            var year = $('input[name="year"]').val();
            if (month != '' && day != '' && year != '') {
                var dob = year + '-' + month + '-' + day;
            } else {
                dob = undefined;
            }
            $('.loader-img').show();
            var requestData = {
                "first_name": $('input[name="first_name"]').val(),
                "last_name": $('input[name="last_name"]').val(),
                "email": $('input[name="email"]').val().trim(),
                /* "confirmEmail": $('input[name="confirmEmail"]').val(),
                "gender": $('input[name="gender"]').attr('data-gender'),
                "phone": $('input[name="phone"]').val(), */
               /*  "address": {
                    "addressLine1": $('input[name="address1"]').val(),
                    "addressLine2": $('input[name="address2"]').val(),
                    "addressLine3": $('input[name="address3"]').val(),
                    "city": $('input[name="city"]').val(),
                    "state": $('input[name="state"]').val(),
                    "postcode": $('input[name="zip_code"]').val()
                }, */
               // "dob": dob,
                "brandId": $('input[name="brandId"]').val().trim(),
                "countryPreference": $('input[name="countryPreference"]').val(),
                "languagePreference": $('input[name="languagePreference"]').val(),
                "feedback": {
                    "comment": $('textarea[name="comment"]').val(),
                   /*  "upcCode": $('input[name="product_upc_code"]').val(),
                    "mfgCode": $('input[name="product_mfg_code"]').val() */
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
                success: function (data) {
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
                    $('.loader-img').hide();
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
});

function loadStates() {

    var country = $('input[name="countryPreference"]').val();
    var domain = $('input[name="apiDomain"]').val();
    var statesData;
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: domain + "api/customer/states/" + country + "",
        headers: {
            "Content-Type": "application/json"
        },
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {

            for (var d in data) {
                $('input[name="state"]').closest('.form_row').siblings('.g-ListP').find('.g-ListP__ul').append("<li class='g-ListP__ul__item l-ListP__ul__item'><span class='g-ListUnit l-ListUnit'><span class='cmn-richtext'><span class='" + d + "'>" + data[d].stateDescription + "</span></span></span></li>");
            }
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}