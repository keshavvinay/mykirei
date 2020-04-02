$(document).ready(function() {
    $('#guhl_newsletter_gender-0').closest('.form_row').addClass('gender-container');
    $('#guhl_newsletter_gender-1').closest('.form_row').addClass('gender-container');
    $('.gender-container').wrapAll('<div class="gender-wrapper"></div>');
    $('.gender-wrapper').addClass('radio');
    $('#guhl_newsletter  .g-AccordionMenu .checkbox label[for="guhl_newsletter_type"]').closest('.form_row').hide();
    $('#guhl_newsletter  .g-AccordionMenu .radio label[for="guhl_newsletter_color"]').closest('.form_row').hide();
    $('#guhl_newsletter_tc-0').closest('.form_row').addClass('tc-inputbox');
	window.onload = function() {
		$("#email_rightcol").append("<div class='correct' id='correct_email' style='display: none;'>&#10004</div>");
		$("#first_name_rightcol").append("<div class='correct' id='correct_first_name' style='display: none;'>&#10004</div>");
		$("#last_name_rightcol").append("<div class='correct' id='correct_last_name' style='display: none;'>&#10004</div>");
		$("#dob_rightcol").append("<div class='correct' id='correct_dob' style='display: none;'>&#10004</div>");
		$('#guhl_newsletter_tc-0').prop('checked', false);
	}
	var inputs, index;
	inputs = document.getElementsByClassName("form_field_text");
	for (index = 0; index < inputs.length; ++index) {
		var input = inputs[index];
		input .placeholder = $('label[for=' + input .id + ']').text();
	}
	if (window.location.href.indexOf('email') > 0) {
		var email = getParameterByName('email');  
		$('#guhl_newsletter_email').val(email);
	}
	$("#guhl_newsletter .radio .form_row").click(function(){
        var radio_panel = $(this);
        var radio_input = radio_panel.find("input");
        if ($(radio_input).prop("checked") == true) {
            $(radio_input).prop("checked", false);
            $(radio_panel).css("background-color", "white");
            var radio_panel_right_col = radio_panel.find('.form_rightcol');
            $(radio_panel_right_col).css("color", "black");
        } else {
            $(radio_input).prop("checked", true);
            $(radio_panel).css("background-color", "black");
            var radio_panel_right_col = radio_panel.find('.form_rightcol');
            $(radio_panel_right_col).css("color", "white");
        }
        var radio_form = $(radio_panel).parent();
        var radio_form_rows = $(radio_form).find(".form_row");
        for (var i = 0; i < radio_form_rows.length; ++i) {
            var radio_form_row = radio_form_rows[i];
            var radio_form_row_input = $(radio_form_row).find("input");
            if ($(radio_form_row_input).prop("checked") == false) {
                $(radio_form_row).css("background-color", "white");
                var radio_form_row_right_col = $(radio_form_row).find('.form_rightcol');
                $(radio_form_row_right_col).css("color", "black");
            }
        }
    });
    $("#guhl_newsletter  .g-AccordionMenu .checkbox .form_row").click(function() {
        var checkbox_panel = $(this);
        var checkbox_input = checkbox_panel.find("input");
        if ($(checkbox_input).prop("checked") == true) {
            $(checkbox_panel).find('.form_rightcol').css("background-color", "black");
            var checkbox_panel_right_col = checkbox_panel.find('.form_rightcol');
            $(checkbox_panel_right_col).css("color", "white");
        } else if ($(checkbox_input).prop("checked") == false) {
            $(checkbox_panel).find('.form_rightcol').css("background-color", "white");
            var checkbox_panel_right_col = checkbox_panel.find('.form_rightcol');
            $(checkbox_panel_right_col).css("color", "black");
        }
    });
    $("#guhl_newsletter_email").focusout(function() {
        var email = $('#guhl_newsletter_email').val();
        if (email.length > 0) {
            var email_validation_result = check_email_pattern(email);
            if (email_validation_result) {
                $(this).parent().css({
                    "border-color": "#D9534F",
                    "border-width": "1px",
                    "border-style": "solid"
                });
                document.getElementById("error_email").style.display = "block";
                document.getElementById("correct_email").style.display = "none";
				style_submit_button();
            } else {
                $(this).parent().css({
                    "border-color": "#000000",
                    "border-width": "1px",
                    "border-style": "solid"
                });
                document.getElementById("error_email").style.display = "none";
                document.getElementById("correct_email").style.display = "block";
				style_submit_button();
            }
        } else {
            $(this).parent().css({
                "border-color": "#000000",
                "border-width": "1px",
                "border-style": "solid"
            });
            document.getElementById("error_email").style.display = "none";
            document.getElementById("correct_email").style.display = "none";
			style_submit_button();
        }
    });
    $("#guhl_newsletter_first_name").focusout(function() {
        var first_name = $('#guhl_newsletter_first_name').val();
        if (first_name.length > 0) {
            var first_name_validation_result = check_name_pattern(first_name);
            if (first_name_validation_result) {
                $(this).parent().css({
                    "border-color": "#D9534F",
                    "border-width": "1px",
                    "border-style": "solid"
                });
                document.getElementById("error_first_name").style.display = "block";
                document.getElementById("correct_first_name").style.display = "none";
                style_submit_button();
            } else {
                $(this).parent().css({
                    "border-color": "#000000",
                    "border-width": "1px",
                    "border-style": "solid"
                });
                document.getElementById("error_first_name").style.display = "none";
                document.getElementById("correct_first_name").style.display = "block";
				style_submit_button();
            }
        } else {
            $(this).parent().css({
                "border-color": "#000000",
                "border-width": "1px",
                "border-style": "solid"
            });
            document.getElementById("error_first_name").style.display = "none";
            document.getElementById("correct_first_name").style.display = "none";
			style_submit_button();
        }
    });
    $("#guhl_newsletter_last_name").focusout(function() {
        var last_name = $('#guhl_newsletter_last_name').val();
        if (last_name.length > 0) {
            var last_name_validation_result = check_name_pattern(last_name);
            if (last_name_validation_result) {
                $(this).parent().css({
                    "border-color": "#D9534F",
                    "border-width": "1px",
                    "border-style": "solid"
                });
                document.getElementById("error_last_name").style.display = "block";
                document.getElementById("correct_last_name").style.display = "none";
				style_submit_button();
            } else {
                $(this).parent().css({
                    "border-color": "#000000",
                    "border-width": "1px",
                    "border-style": "solid"
                });
                document.getElementById("error_last_name").style.display = "none";
                document.getElementById("correct_last_name").style.display = "block";
				style_submit_button();
            }
        } else {
            $(this).parent().css({
                "border-color": "#000000",
                "border-width": "1px",
                "border-style": "solid"
            });
            document.getElementById("error_last_name").style.display = "none";
            document.getElementById("correct_last_name").style.display = "none";
			style_submit_button();
        }
    });
    $("#guhl_newsletter_dob").focusout(function() {
        var dob = $('#guhl_newsletter_dob').val();
        if (dob.length > 0) {
            var dob_validation_result = check_dob_pattern(dob);
            if (dob_validation_result) {
                $(this).parent().css({
                    "border-color": "#D9534F",
                    "border-width": "1px",
                    "border-style": "solid"
                });
                document.getElementById("error_dob").style.display = "block";
                document.getElementById("correct_dob").style.display = "none";
				style_submit_button();
            } else {
                $(this).parent().css({
                    "border-color": "#000000",
                    "border-width": "1px",
                    "border-style": "solid"
                });
                document.getElementById("error_dob").style.display = "none";
                document.getElementById("correct_dob").style.display = "block";
				style_submit_button();
            }
        } else {
            $(this).parent().css({
                "border-color": "#000000",
                "border-width": "1px",
                "border-style": "solid"
            });
            document.getElementById("error_dob").style.display = "none";
            document.getElementById("correct_dob").style.display = "none";
			style_submit_button();
        }
    });
	$("#guhl_newsletter_tc-0").change(function () {
		var guhl_newsletter_tc = $('#guhl_newsletter_tc-0').prop('checked');
        if (guhl_newsletter_tc) {
            document.getElementById("error_tc").style.display = "none";
        }
		else{
			document.getElementById("error_tc").style.display = "block";
		}
		style_submit_button();
	});
    $("#guhl_newsletter").on('submit', function(event) {
        event.preventDefault();
        var validation_mandatory_fields_result = validate_mandatory_fields();
		var validation_data_fields_result = validate_data_fields();
		var validation_result = validation_mandatory_fields_result && validation_data_fields_result;
        if (validation_result) {
            $('.loader-section').show();
            submit_form();
        }
    });
	function submit_form(){
		var gender = "";
		var colorArr = [];
		var typeArr = [];
		$('#guhl_newsletter').find("input").each(function() {
			if (this.id.indexOf("guhl_newsletter_gender") >= 0){
				if ( $("#"+this.id).prop('checked') == true){
					gender = $("#"+this.id).val().trim().charAt(0);
					if(gender != "") {
						gender = gender.charAt(0);
					}
					else {
						gender  = undefined;
					}
				}
			}
			if (this.id.indexOf("guhl_newsletter_color") >= 0){
				if ( $("#"+this.id).prop('checked') == true){
					colorArr.push($("#"+this.id).val().trim());
				}
			}	
			if (this.id.indexOf("guhl_newsletter_type") >= 0){
				if ( $("#"+this.id).prop('checked') == true){
					typeArr.push($("#"+this.id).val().trim());
				} 
			}	
		});
		if (colorArr.length > 0 && typeArr.length > 0)
		{
			var attributes = [{"name" : "Color","values": colorArr}, {"name" : "Type","values": typeArr}];
		}
		else if (colorArr.length > 0 && typeArr.length == 0)
		{
			var attributes = [{"name" : "Color","values": colorArr}];
		}
		else if (colorArr.length == 0 && typeArr.length > 0)
		{
			var attributes = [{"name" : "Type","values": typeArr}];
		}
		else
		{
			var attributes = undefined;
		}
		var dateOfBirth = document.getElementById("guhl_newsletter_dob").value;
		if(dateOfBirth != "") {
			var dateOfBirthArr = dateOfBirth.split('.');
			var day = dateOfBirthArr[0];
			var month = dateOfBirthArr[1];
			var year = dateOfBirthArr[2];
			var dob  = year+ '-' +month+ '-' +day;
		}
		else {
			var dob  = undefined;
		}
		var requestData = {
			"brandId" : "gu",
			"firstName" : $('#guhl_newsletter_first_name').val(),
			"lastName" : $('#guhl_newsletter_last_name').val(),
			"email" : $('#guhl_newsletter_email').val(),
			"gender" : gender,
			"languagePreference" : $('#guhl_newsletter_languagePreference').val(),
			"countryPreference" : $('#guhl_newsletter_countryPreference').val(),
			"dob" : dob,
			"newsletterSubscribed" : true,
			"attributes": attributes
		}
		var apiDomain = $('input[name="apiDomain"]').val();
		var redirectPage = $('input[name="redirectPage"]').val();
		
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: apiDomain + "api/customer/newsletter",
		headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(requestData),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function(data) {
			var newsletterThankYou = window.location.href;
            if (newsletterThankYou.charAt(newsletterThankYou.length - 1) == "/") {
                newsletterThankYou = newsletterThankYou.substring(0, newsletterThankYou.length - 1);
            }
            newsletterThankYou = newsletterThankYou.substring(0, newsletterThankYou.lastIndexOf("/"));
            newsletterThankYou = newsletterThankYou + redirectPage;
            window.location.href = newsletterThankYou;
        },
        error: function(request,status,errorThrown) {
			if (status == 400)
			{
				$('#error-400').show();
                $('.loader-section').hide();
			}
			else
			{
				$('#error-500').show();
				$('.loader-section').hide();
			}
		}
    });
}
    function validate_mandatory_fields() {
        var email = $('#guhl_newsletter_email').val();
        var email_validation_result = check_email(email);
        if (email_validation_result) {
            $("#guhl_newsletter_email").parent().css({
                "border-color": "#D9534F",
                "border-width": "1px",
                "border-style": "solid"
            });
            document.getElementById("error_email").style.display = "block";
            document.getElementById("correct_email").style.display = "none";
        }
        var guhl_newsletter_tc = $('#guhl_newsletter_tc-0').prop('checked');
        if (!guhl_newsletter_tc) {
            document.getElementById("error_tc").style.display = "block";
        }
        return (!email_validation_result && guhl_newsletter_tc);
    }
	
	function validate_data_fields() {
		var error_blocks = $('#guhl_newsletter .error');
		for(var i = 0; i < error_blocks.length; i++){
			if($(error_blocks[i]).css('display') != 'none'){
				return false;
			}
		}
		return true;
	}
	
	function style_submit_button() {
		var email = $('#guhl_newsletter_email').val();
        var email_validation_result = check_email(email);
		var guhl_newsletter_tc = $('#guhl_newsletter_tc-0').prop('checked');
		var validation_mandatory_fields_result = !email_validation_result && guhl_newsletter_tc;
		var validation_data_fields_result = validate_data_fields();
		var validation_result = validation_mandatory_fields_result && validation_data_fields_result;
		if (validation_result) {
			$('#guhl_newsletter .form_button_submit').css({
                "border-color": "#000000",
                "border-width": "1px",
                "border-style": "solid",
				"color": "#000000"		
            });
		}
		else {
			$('#guhl_newsletter .form_button_submit').css({
                "border-color": "#D2D2D2",
                "border-width": "1px",
                "border-style": "solid",
				"color": "#D2D2D2"		
            });
		}
	}

    function check_email_pattern(email) {
        var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
        if (!pattern.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    function check_name_pattern(name) {
        var pattern = new RegExp(/[0-9<>{}!@#$%*&;:"'\/|`~?\^\[\],]/);
        if (!pattern.test(name)) {
            return false;
        } else {
            return true;
        }
    }

    function check_dob_pattern(dob) {
        var pattern = new RegExp(/^([0-9]{2})\.([0-9]{2})\.([0-9]{4})$/);
        if (!pattern.test(dob)) {
            return true;
        } 
		else {
			var dateOfBirth = dob.split('.');
			var day = parseInt(dateOfBirth[0]);
			var month = parseInt(dateOfBirth[1]);
			var year = parseInt(dateOfBirth[2]);
			var temp_dob = dateOfBirth[1] + '/' + dateOfBirth[0] + '/' + dateOfBirth[2];
			var myDate = new Date(temp_dob);
			var today = new Date();
			if ( myDate > today ) { 
				return true;
			}
			if (year < 1900) {
				return true;
			}
			if (month < 1 || month > 12) {
				return true;
			}
			if (day < 1 || day > 31) {
				return true;
			}
			var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if (month == 1 || month > 2) {
				if (day > ListofDays[month - 1]) {
					return true;
				}
			}
			if (month == 2) {
				var lyear = false;
				if ((!(year % 4) && year % 100) || !(year % 400)) {
					lyear = true;
				}
				if ((lyear == false) && (day >= 29)) {
					return true;
				}
				if ((lyear == true) && (day > 29)) {
					return true;
				}
			}
			return false;
        }
    }

    function check_email(email) {
        if (email.length == 0) {
            return true;
        } else if (email.length > 255) {
            return true;
        } else {
            return false;
        }
    }

	function getParameterByName( name ){
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		if( results == null )
			return "";
		else
			return decodeURIComponent(results[1].replace(/\+/g, " "));
	}

});
