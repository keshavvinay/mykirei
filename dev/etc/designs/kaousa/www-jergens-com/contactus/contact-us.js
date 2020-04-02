/*jergens contact-us javascript */
$(document).ready(function() {

    window.onload = function() {


        $('label[for="jergens_contact_us_upcCode"]').after("<span id ='jergens_help_tip_upc_code' class='help-tip'>?</span>");
        $('label[for="jergens_contact_us_mfgCode"]').after("<span id ='jergens_help_tip_mfg_code' class='help-tip'>?</span>");

        $("#first_name_rightcol").append("<div id='error_firstName'>Dummy Message</div>");
        $("#last_name_rightcol").append("<div id='error_lastName'>Dummy Messag</div>");
        $("#email_rightcol").append("<div id='error_email'>Dummy Messag</div>");
        $("#confirm_email_rightcol").append("<div id='error_confirm_email'>Dummy Messag</div>");
        $('#address1_rightcol').append("<div id ='error_address1'>Dummy Messag</div>");
        $('#city_rightcol').append("<div id ='error_city'>Dummy Messag</div>");
        $('#zipcode_rightcol').append("<div id ='error_zipcode'>Dummy Messag</div>");
        $('#comment_rightcol').append("<div id ='error_comment'>Dummy Messag</div>");
        $('#jergens_contact_us_state').parent().append("<div id ='error_state'>Dummy Messag</div>");
        $('.dob_group_box').append("<div id ='error_month'>Dummy Messag</div>");
        $('.dob_group_box').append("<div id ='error_day'>Dummy Messag</div>");
        $('.dob_group_box').append("<div id ='error_year'>Dummy Messag</div>");
        $('#address2_rightcol').append("<div id ='error_address2'>Dummy Messag</div>");

        var language = $("#jergens_contact_us").find('input#jergens_contact_us_language').val()
        var country = $("#jergens_contact_us").find('input#jergens_contact_us_country').val()


        if (country == "au" || country == "us" || country == "ca") {
            loadStates();
        }



        var arr = ['Male', 'Female'];


        if (language == 'en') {

            $('#jergens_contact_us_gender').html("<option value=''>Select</option>");
            $('#jergens_contact_us_day').html("<option value=''>Day</option>");
            $('#jergens_contact_us_month').html("<option value=''>Mon</option>");
            $('#jergens_contact_us_year').html("<option value=''>Year</option>");

            if (country == "us" || country == "au") {
                $('#jergens_contact_us_state').html("<option value=''>Select State</option>");
            } else if (country == "ca") {
                $('#jergens_contact_us_state').html("<option value=''>Select Province</option>");
            }

        } else if (language == 'fr') {

            $('#jergens_contact_us_day').html("<option value=''>Jour</option>");
            $('#jergens_contact_us_month').html("<option value=''>Mois</option>");
            $('#jergens_contact_us_year').html("<option value=''>Annee</option>");
            $('#jergens_contact_us_state').html("<option value=''>Choisir Province</option>");

        }

        for (var i = 0; i < arr.length; i++) {
            if (language == "en") {
                $('#jergens_contact_us_gender').append("<option value='" + arr[i].charAt(0).trim() + "'>" + arr[i] + "</option>");
            }

        }



        for (var i = 1; i <= 31; i++) {
            $('#jergens_contact_us_day').append("<option value= '" + i + "'>" + i + "</option>");
        }

        for (var i = 1; i <= 12; i++) {
            $('#jergens_contact_us_month').append("<option value= '" + i + "'>" + i + "</option>");
        }

        var min_age = 13;
        var max_year = moment().format('YYYY')- min_age;
        for (var i = max_year; i >= 1919; i--) {
            $('#jergens_contact_us_year').append("<option value= '" + i + "'>" + i + "</option>");
        }

    }



    $(document).on('click', "#jergens_help_tip_upc_code", function() {
        $("#product_upc_image").css("display", "flex");

    });

    $(document).on('click', "#jergens_help_tip_mfg_code", function() {
        $("#product_mfg_image").css("display", "flex");
    });

    $(document).click(function(e) {
        if ((e.target.id != "jergens_help_tip_upc_code")) {
            $("#product_upc_image").css("display", "none");
        }

        if ((e.target.id != "jergens_help_tip_mfg_code")) {
            $("#product_mfg_image").css("display", "none");
        }
    });

    $(document).on('mouseover', "#jergens_help_tip_upc_code", function() {

        $("#product_upc_image").css("display", "flex");
    });

    $(document).on('mouseout', "#jergens_help_tip_upc_code", function() {

        $("#product_upc_image").css("display", "none");
    });

    $(document).on('mouseover', "#jergens_help_tip_mfg_code", function() {

        $("#product_mfg_image").css("display", "flex");
    });

    $(document).on('mouseout', "#jergens_help_tip_mfg_code", function() {

        $("#product_mfg_image").css("display", "none");
    });

    /*  $("#jergens_help_tip_upc_code").mouseout(function(){
         $("#product_upc_image").css("display", "flex");
     });

     $("#jergens_help_tip_mfg_code").mouseover(function(){
         $("#product_mfg_image").css("display", "none");
     });
     $("#jergens_help_tip_mfg_code").mouseout(function(){
         $("#product_mfg_image").css("display", "flex");
     }); */



    /*  $('.help-tip').hover(function(){
          alert("upc code");

          $('#product_upc_image').css({
              "display":"none"
          });
      });*/



    /* $('#jergens_help_tip_mfg_code').hover(function(){

          $('#product_mfg_image').css({
             "display":"none"
         });

     },function(){

          $('#product_mfg_image').css({
             "display":"flex"
         });

     });*/

    $("#jergens_contact_us_confirm_email").keyup(function() {
        var email = $('#jergens_contact_us_email').val();
        var confirm_email = $('#' + this.id).val();
       // check_confirm_email(email, confirm_email, 0, 255);


    });

    $("#jergens_contact_us_confirm_email").focusout(function() {
        var email = $('#jergens_contact_us_email').val();
        var confirm_email = $('#' + this.id).val();
        check_confirm_email(email, confirm_email, 0, 255);

    });

    $("#jergens_contact_us").on('submit', function(event) {
        event.preventDefault();

        var validation_result = validatin_check();
        if (validation_result) {
            $('.loader').show();
            submit_form();
        }
    });

});


function validatin_check() {

    var min_size = 0;
    var max_size1 = 40;
    var max_size2 = 255;
    var max_size3 = 2000;
    var validation_flag = false;
    var first_name = $('#jergens_contact_us_first_name').val();
    var last_name = $('#jergens_contact_us_last_name').val();
    var email = $('#jergens_contact_us_email').val();
    var zipcode = $('#jergens_contact_us_zipcode').val();
    var month = $('#jergens_contact_us_month option:selected').val();
    var confirm_email = $('#jergens_contact_us_confirm_email').val();
    var address1 = $('#jergens_contact_us_address1').val();
    var city = $('#jergens_contact_us_city').val();
    var state = $('#jergens_contact_us_state option:selected').val();
	var gender = $('#jergens_contact_us_gender option:selected').val();
    var comment = $('#jergens_contact_us_comment').val();

    var day = $('#jergens_contact_us_day option:selected').val();
    var year = $('#jergens_contact_us_year option:selected').val();
    var first_name_validation_result = check_firstname(first_name, min_size, max_size1);
    if (first_name_validation_result) {
        validation_flag = true;
        scrollToDiv('jergens_contact_us_first_name');
    }
    var email_validation_result = check_email(email, min_size, max_size2);
    if (!validation_flag && email_validation_result) {
        validation_flag = true;
        scrollToDiv('jergens_contact_us_email');
    }
    var last_name_validation_result = check_lastname(last_name, min_size, max_size1);
    if (!validation_flag && last_name_validation_result) {
        validation_flag = true;
        scrollToDiv('jergens_contact_us_last_name');
    }
    var confirm_email_validation_result = check_confirm_email(email, confirm_email, min_size, max_size2);
    if (!validation_flag && confirm_email_validation_result) {
        validation_flag = true;
        scrollToDiv('jergens_contact_us_confirm_email');
    }
    var address1_validation_result = check_address1(address1, min_size, max_size2);
    if (!validation_flag && address1_validation_result) {
        validation_flag = true;
        scrollToDiv('jergens_contact_us_address1');
    }
    var state_validation_result = check_state(state, min_size);
    if (!validation_flag && state_validation_result) {
        validation_flag = true;
        scrollToDiv('jergens_contact_us_state');
    }
    var zipcode_validation_result = check_zipcode(zipcode, min_size, max_size1);
    if (!validation_flag && zipcode_validation_result) {
        validation_flag = true;
        scrollToDiv('jergens_contact_us_zipcode');
    }
    var city_validation_result = check_city(city, min_size, max_size1);
    if (!validation_flag && city_validation_result) {
        validation_flag = true;
        scrollToDiv('jergens_contact_us_city');
    }
	
	var gender_validation_result = check_gender(gender);
	if(!validation_flag && gender_validation_result){
	    validation_flag = true;
	    scrollToDiv('jergens_contact_us_gender');
	}
	
	
    var month_validation_result = check_month(month, min_size);
    var day_validation_result = check_day(day, min_size);
    var year_validation_result = check_year(year, min_size);
    if (!validation_flag && (month_validation_result || day_validation_result || year_validation_result)) {
        validation_flag = true;
        scrollToDiv('dob_group_box');
    }

    var comment_validation_result = check_comment(comment, min_size, max_size3);
    if (!validation_flag && comment_validation_result) {
        validation_flag = true;
        scrollToDiv('jergens_contact_us_comment');
    }

    return (!first_name_validation_result && !last_name_validation_result && !email_validation_result && !confirm_email_validation_result && !address1_validation_result && !city_validation_result && !gender_validation_result && !zipcode_validation_result && !comment_validation_result && !state_validation_result && !month_validation_result && !day_validation_result && !year_validation_result);
}

function submit_form(isCountry) {
    var gender = ($("#jergens_contact_us_gender").val()).trim();
    if (gender == '') {
        gender = undefined;
    }
    var country = $("#jergens_contact_us").find('input#jergens_contact_us_country').val()
    var state = $("#jergens_contact_us_state").val().trim();
    if (country == "sa" || country == "mx") {
        state = "";
        country = $("#jergens_contact_us_state").val().trim();
    }

    var upc_code = $("#jergens_contact_us_upcCode").val();
    var mfg_code = $("#jergens_contact_us_mfgCode").val();
    var address2 = $("#jergens_contact_us_address2").val();
    var address3 = $("#jergens_contact_us_address3").val()
    var phone = $("#jergens_contact_us_phone").val()
    if (upc_code == "") {
        upc_code = undefined;
    }

    if (mfg_code == "") {
        mfg_code = undefined;
    }

    if (address2 == "") {
        address2 = undefined;
    }

    if (address3 == "") {
        address3 = undefined;
    }

    if (phone == "") {
        phone = undefined;
    }


    var requestData = {
        "brandId": $("#jergens_contact_us").find('input#jergens_contact_us_brand_id').val(),
        "firstName": $("#jergens_contact_us_first_name").val(),
        "lastName": $("#jergens_contact_us_last_name").val(),
        "email": $("#jergens_contact_us_email").val(),
        "phone": phone,
        "gender": gender,
        "dob": $("#jergens_contact_us_year").val() + '-' + $("#jergens_contact_us_month").val() + '-' + $("#jergens_contact_us_day").val(),
        "address": {
            "addressLine1": $("#jergens_contact_us_address1").val(),
            "addressLine2": address2,
            "addressLine3": address3,
            "city": $("#jergens_contact_us_city").val(),
            "state": state,
            "country": country,
            "postcode": $("#jergens_contact_us_zipcode").val()
        },
        "languagePreference": $("#jergens_contact_us").find('input#jergens_contact_us_language').val(),
        "countryPreference": $("#jergens_contact_us").find('input#jergens_contact_us_country').val(),
        "feedback": {
            "comment": $("#jergens_contact_us_comment").val(),
            "upcCode": upc_code,
            "mfgCode": mfg_code
        }
    };

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "https://userservices.kaobrands.com/api/customer/contact-us",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(requestData),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function(data) {
            var contactThankYou = window.location.href;
	if(contactThankYou.charAt(contactThankYou.length-1) == "/"){
		contactThankYou = contactThankYou.substring(0,contactThankYou.length-1);
	}
	contactThankYou = contactThankYou.substring(0,contactThankYou.lastIndexOf("/"));
	contactThankYou = contactThankYou + "/" + "thank-you.html";
	window.location.href = contactThankYou;


            console.log("SUCCESS : ", data);
        },
        error: function(xhr, textStatus) {
            $('.loader').hide();
            if (xhr.status == 400) {
                $('#error_submit').html(xhr.responseText);

            } else {
                $('#error_submit').html($('#submit_error_msg1').text());

            }
            document.getElementById("error_submit").style.visibility = "visible";

        }
    });
}

function loadStates() {

    var country = $("#jergens_contact_us").find('input#jergens_contact_us_country').val();
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


            for (var d in data) {
                $('#jergens_contact_us_state').append("<option value='" + d + "'>" + data[d].stateDescription + "</option>");
            }
        },
        error: function(e) {
            console.log("ERROR : ", e);
        }
    });

}