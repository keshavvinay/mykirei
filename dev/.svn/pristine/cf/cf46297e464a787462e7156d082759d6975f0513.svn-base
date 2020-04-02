/*jergerns sign-up js*/
$(document).ready(function () {
    var newslettercheck_list = $(".offer_check_box").prop('checked');
    $("#jergens_sign_up_confirm_email").keyup(function () {
        var email = $('#jergens_sign_up_email').val();
        var confirm_email = $('#' + this.id).val();
        check_confirm_email(email, confirm_email, 0, 255);
    });
    $("#jergens_sign_up_confirm_email").focusout(function () {
        var email = $('#jergens_sign_up_email').val();
        var confirm_email = $('#' + this.id).val();
        check_confirm_email(email, confirm_email, 0, 255);
    });
    $('input').click(function () {
        if (this.id.indexOf('offer_check_box') >= 0) {
            var newslettercheck_list = $(".offer_check_box").prop('checked');
            check_check_box(newslettercheck_list);
        }
    });
    $("#jergens_sign_up").on('submit', function (event) {
        event.preventDefault();
        var validation_result = validatin_check();
        if (validation_result) {
            $('.loader').show();
            submit_form();
        }
    });

    function submit_form() {
        document.getElementById("error_submit").style.visibility = "hidden";
        var newslettercheck_list = $(".offer_check_box").prop('checked');
        var month = $("#jergens_sign_up_month").val();
        var day = $("#jergens_sign_up_day").val();
        var year = $("#jergens_sign_up_year").val();
        if (month != '' && day != '' && year != '') {
            var dob = year + '-' + month + '-' + day;
        }
        else {
            dob = undefined;
        }
        var requestData = {
            "brandId": $("#jergens_sign_up").find('input#jergens_sign_up_brand_id').val()
            , "firstName": $("#jergens_sign_up_first_name").val()
            , "email": $("#jergens_sign_up_email").val()
            , "languagePreference": $("#jergens_sign_up").find('input#jergens_sign_up_language').val()
            , "countryPreference": $("#jergens_sign_up").find('input#jergens_sign_up_country').val()
            , "newsletterSubscribed": newslettercheck_list
            , "dob": dob
            , "address": {
                "postcode": $('#jergens_sign_up_zipcode').val()
            }
        };
        $.ajax({
            type: "POST"
            , contentType: "application/json"
            , url: "https://userservices.kaobrands.com/api/customer/newsletter"
            , headers: {
                "Content-Type": "application/json"
            }
            , data: JSON.stringify(requestData)
            , dataType: 'json'
            , cache: false
            , timeout: 600000
            , success: function (data) {
                callBVPixelScript(requestData.email, requestData.languagePreference, requestData.countryPreference);
                var current_url = window.location.href;
                if (current_url.charAt(current_url.length - 1) == '/') {
                    current_url = current_url.substring(0, current_url.length - 1);
                }
                current_url = current_url.substring(0, current_url.lastIndexOf('/'));
                window.location.href = current_url + "/sign-thank-you.html";
                console.log("SUCCESS : ", data);
            }
            , error: function (xhr, textStatus) {
                $('.loader').hide();
                if (xhr.status == 400) {
                    $('#error_submit').html(xhr.responseText);
                }
                else {
                    $('#error_submit').html($('#submit_error_msg1').text());
                }
                document.getElementById("error_submit").style.visibility = "visible";
            }
        });
    }

    function callBVPixelScript(email, language, country) {
        if (typeof (BV) != "undefined" && typeof (BV.pixel) != "undefined") {
            BV.pixel.trackTransaction({
                "email": email
                , "locale": language
                , "country": country
                , "ExternalID": "12345"
            });
        }
    }

    function validatin_check() {
        var min_size = 0;
        var max_size1 = 40;
        var max_size2 = 255;
        var validation_flag = false;
        var first_name = $('#jergens_sign_up_first_name').val();
        var email = $('#jergens_sign_up_email').val();
        var zipcode = $('#jergens_sign_up_zipcode').val();
        var confirm_email = $('#jergens_sign_up_confirm_email').val();
        var newslettercheck_list = $(".offer_check_box").prop('checked');
        var first_name_validation_result = check_firstname(first_name, min_size, max_size1);
        if (first_name_validation_result) {
            validation_flag = true;
            scrollToDiv('jergens_sign_up_first_name');
        }
        var email_validation_result = check_email(email, min_size, max_size2);
        if (!validation_flag && email_validation_result) {
            validation_flag = true;
            scrollToDiv('jergens_sign_up_email');
        }
        var confirm_email_validation_result = check_confirm_email(email, confirm_email, min_size, max_size2);
        if (!validation_flag && confirm_email_validation_result) {
            validation_flag = true;
            scrollToDiv('jergens_sign_up_confirm_email');
        }
        var zipcode_validation_result = check_zipcode(zipcode, min_size, max_size1);
        if (!validation_flag && zipcode_validation_result) {
            validation_flag = true;
            scrollToDiv('jergens_sign_up_zipcode');
        }
        var check_box_validation_result = check_check_box(newslettercheck_list);
        if (!validation_flag && check_box_validation_result) {
            validation_flag = true;
            scrollToDiv('jergens_sign_up_offer_check_box-0');
        }
        return (!first_name_validation_result && !email_validation_result && !confirm_email_validation_result && !zipcode_validation_result && !check_box_validation_result);
    }
    window.onload = function () {
        $("#first_name_rightcol").append("<div id='error_firstName'>Dummy Message</div>");
        $("#email_rightcol").append("<div id='error_email'>Dummy Messag</div>");
        $("#confirm_email_rightcol").append("<div id='error_confirm_email'>Dummy Messag</div>");
        $('#zipcode_rightcol').append("<div id ='error_zipcode'>Dummy Messag</div>");
        var language = $("#jergens_sign_up").find('input#jergens_sign_up_language').val()
        var conutry = $("#jergens_sign_up").find('input#jergens_sign_up_country').val()
        if (language == "en") {
            $('#jergens_sign_up_day').html('<option value="">Day</option>');
            $('#jergens_sign_up_month').html('<option value="">Mon</option>');
            $('#jergens_sign_up_year').html('<option value="">Year</option>');
        }
        else if (language == 'fr') {
            $('#jergens_sign_up_day').html('<option value="">Jour</option>');
            $('#jergens_sign_up_month').html('<option value="">Mois</option>');
            $('#jergens_sign_up_year').html('<option value="">Annee</option>');
        }
        for (var i = 1; i <= 31; i++) {
            $('#jergens_sign_up_day').append("<option value= '" + i + "'>" + i + "</option>");
        }
        for (var i = 1; i <= 12; i++) {
            $('#jergens_sign_up_month').append("<option value= '" + i + "'>" + i + "</option>");
        }
        var min_age = 13;
        var max_year = moment().format('YYYY') - min_age;
        for (var i = max_year; i >= 1919; i--) {
            $('#jergens_sign_up_year').append("<option value= '" + i + "'>" + i + "</option>");
        }
    }
});