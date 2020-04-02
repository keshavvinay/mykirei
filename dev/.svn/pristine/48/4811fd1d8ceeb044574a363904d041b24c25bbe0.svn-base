var formId = '#jf-newsletter';
//form input fields
var firstName = '#jf-newsletter_first_name';
var lastName = '#jf-newsletter_last_name';
var dobDay = '#jf-newsletter_day';
var dobMonth = '#jf-newsletter_month';
var dobYear = '#jf-newsletter_year';
var emailId = '#jf-newsletter_email';
var privacyAgreementId = '#jf-newsletter_checkbox-0';
var bvNoShare = '#jf-newsletter_bv_noshare';
var loader = 'body:not(.is-authorring) .birthday-coupon-loader-section';

//form div tag id's for error messages added 

//firstName
var error_firstName = '#error_firstName'; //<div class="dummy_error_msg" id="error_firstName">Dummy Massage</div> 
var firstName_errorMsg1 = '#fisrt_name_error_msg1'; // enter first name 
var firstName_errorMsg2 = '#fisrt_name_error_msg2'; //not more than 40 chars
//lastname
var error_lastName = '#error_lastName'; //dummy message id
var lastName_errorMsg1 = '#last_name_error_msg1'; //enter last name
var lastName_errorMsg2 = '#last_name_error_msg2'; //not more than 40 chars
//birthday
var error_birthdate = '#error_birthdate'; //dummy message
var birthMonth_errorMsg1 = '#birthdate_error_msg1'; //enter birth month
var birthDay_errorMsg2 = '#birthdate_error_msg2'; //enter birth day
var birthYear_errorMsg3 = '#birthdate_error_msg3'; //enter birth year
var dob_errorMonth = '#dob_error_month'; //valid birth month,checking it on -on focus
var dob_errorDay = '#dob_error_day'; //valid birth day,checking it on- on focus
var dob_errorYear = '#dob_error_year'; //valid birth year,checking it on-on focus
//email
var error_emailID = '#error_email'; //dummy message
var email_errorMsg1 = '#email_error_msg1'; //enter email address
var email_errorMsg2 = '#email_error_msg2'; //should not be more than 255 chars
var email_errorMsg3 = '#email_error_msg3'; //invalid email address

var error_agreement = '#error_agreement';

var newsletter_error = '#error_Newsletter';

var error400 = '.jf-NewsLetter_Column_Separator #error_400';
var error500 = '.jf-NewsLetter_Column_Separator #error_500';

//combining date fields
/*var dobvalidation= $('#jf-newsletter_month').val() + "-" + $('#jf-newsletter_day').val() + "-" + $('#jf-newsletter_year').val();*/

var jfMandatoryFields = '#jf-newsletter_Mandatory_fields';
var listOfMandatoryFields = '';

$(document).ready(function () {

    //Style related functions
    populatePlaceholders();

    $('.is-authorring ' + error400).css('display', 'block');
    $('.is-authorring ' + error500).css('display', 'block');

    listOfMandatoryFields = $(jfMandatoryFields).val();

    //Prevent ENTER key from submitting the form
    $(formId + ' input').keypress(function (e) {
        preventFormSubmit(e);
    });

    /*Validations*/

    $(formId + ' input').focusout(function () {
        validateCurrentInput(this);
    });

    $(formId + ' input').keyup(function () {
        validateCurrentInput(this);
    });

    $(formId + ' input').keypress(function (event) {
        if (this.id.indexOf('month') >= 0 || this.id.indexOf('day') >= 0 || this.id.indexOf('year') >= 0) {
            AllowNumbersOnly(event);
            AllowLengthOfChracterOnly(event);
        }
    });

    $(formId + ' ' + privacyAgreementId).change(function () {

        if ($(this).prop('checked') == true) {
            hideAgreementError();
        } else {
            showAgreementError();
        }
    });

    $("#jf-newsletter .newsletter_Submit_Button").on('click', function (event) {

        event.preventDefault();

        //Returns true if errors exist.
        var validationResult = validationCheck();

        //if not false, submit
        if (!validationResult) {

            $(loader).show();
            submitNewsletterForm();
        }

    });

});

$(window).load(function () {
    autofillForm();
});

function populatePlaceholders() {

    var inputs, index;
    inputs = document.getElementsByClassName("form_field_text");
    for (index = 0; index < inputs.length; ++index) {
        var input = inputs[index];
        input.placeholder = $('label[for=' + input.id + ']').text();
    }
}

function preventFormSubmit(e) {

    var key = e.charCode || e.keyCode || 0;
    if (key == 13) {
        //alert("I told you not to, why did you do it?");
        e.preventDefault();
    }
}

function submitNewsletterForm() {

    var newslettercheck_list = $(".jf-newsletter_checkbox-0").prop('checked');
    var month = $('#jf-newsletter_month').val();
    var day = $('#jf-newsletter_day').val();
    var new_month = month;
    var new_day = day;
    if (month.length == 1) {
        new_month = "0" + month;
    }

    if (day.length == 1) {
        new_day = "0" + day;
    }
    var dateOfBirth = $('#jf-newsletter_year').val() + "-" + new_month + "-" + new_day;

    if (new_day == '' || new_month == '' || $('#jf-newsletter_year').val() == '')
        dateOfBirth = '';

    var reqEmail = $("#jf-newsletter_up_email").val();
    var reqLanguage = $("#jf-newsletter_languagePreference").val();
    var reqCountry = $("#jf-newsletter_countryPreference").val();

    var requestData = {
        "brandId": "jf",
        "firstName": $("#jf-newsletter_first_name").val(),
        "lastName": $("#jf-newsletter_last_name").val(),
        "email": reqEmail,
        "languagePreference": reqLanguage,
        "countryPreference": reqCountry,
        "dob": dateOfBirth,
        "newsletterSubscribed": true
    };

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "https://userservices.kaobrands.com/api/customer/newsletter",
        data: JSON.stringify(requestData),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            if ($(bvNoShare).length == 0) {
                callBVPixelScript(reqEmail, reqLanguage, reqCountry);
            } else {
                if ($(bvNoShare).val() != 'true') {
                    callBVPixelScript(reqEmail, reqLanguage, reqCountry);
                }
            }

            callAnalytics();
            var winurl = window.location.href;
            var thankurl = '';
            if (winurl.charAt(winurl.length - 1) == '/' && winurl.indexOf('?') == -1) {
                thankurl = 'thank-you.html';
            } else {
                thankurl = "newsletter/thank-you.html";
            }
            window.location.href = thankurl;
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            callAnalytics();
            $(loader).hide();

            if (e.statusCode == 400) {
                $(error400).show();
            } else {
                $(error500).show();
            }
            console.log("ERROR : ", e);
        }
    });
}

/*Analytics and Bazaar Voice Functions*/


//"shippingDate": currentDate //"current date in format yyyy-MM-dd"  
function callBVPixelScript(email, language, country) {

    var currentDate = formatDate();
    //alert("language=="+language); alert("country=="+country);

    if (typeof (BV) != "undefined" && typeof (BV.pixel) != "undefined") {
        BV.pixel.trackTransaction({
            "email": email,
            "locale": language,
            "country": country,
            "ExternalID": "12345",
            "shippingDate": currentDate
        });
    }
}

//TB8 Implementation - Analytics 
function callAnalytics() {
    if (typeof (s) != "undefined") {
        s.linkTrackVars = "events";
        s.linkTrackEvents = "event21";
        s.events = "event21";
        s.tl(this, 'o', 'sign-up_Newsletter');
    }
}

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

/*Validation Functions*/

function checkForAgreementErrors() {

    if ($(privacyAgreementId).prop('checked')) {
        hideAgreementError();
        return false;
    } else {
        showAgreementError();
        return true;
    }
}

function validationCheck() {

    var min_size = 0;
    var max_size1 = 40;
    var max_size2 = 255;
    var dob = '';

    var first_name = $('#jf-newsletter_first_name').val();
    var last_name = $('#jf-newsletter_last_name').val();
    var email = $('#jf-newsletter_up_email').val();
    var month = $('#jf-newsletter_month').val();
    var day = $('#jf-newsletter_day').val();
    var year = $('#jf-newsletter_year').val();

    var fb = false;
    var lb = false;
    var eb = false;
    var mb = false;
    var db = false;
    var yb = false;
    var dobb = mb && db && yb;


    if (listOfMandatoryFields.indexOf('first_name') != -1) {
        fb = true;
    }
    //If this returns true, that means there is an error
    var first_name_validation_result = check_firstname1(first_name, min_size, max_size1, fb);

    if (listOfMandatoryFields.indexOf('last_name') != -1) {
        lb = true;
    }
    var last_name_validation_result = check_lastname1(last_name, min_size, max_size1, lb);

    if (listOfMandatoryFields.indexOf('email') != -1) {
        eb = true;
    }
    var email_validation_result = check_email1(email, min_size, max_size2, eb);

    if (listOfMandatoryFields.indexOf('month') != -1) {
        mb = true;
    }
    var month_validation_result = check_month1(month, min_size, mb);

    if (listOfMandatoryFields.indexOf('day') != -1) {
        db = true;
    }
    var day_validation_result = check_day1(day, min_size, db);

    if (listOfMandatoryFields.indexOf('year') != -1) {
        yb = true;
    }
    var year_validation_result = check_year1(year, min_size, yb);

    var dob_validation_result = false;
    dobb = mb && db && yb;

    if ((listOfMandatoryFields.indexOf('day') + listOfMandatoryFields.indexOf('month') + listOfMandatoryFields.indexOf('year')) == -3) {
        if (month == '' && day == '' && year == '') {
            dob = '';
        }
    } else {
        dob = year + '-' + month + '-' + day;
    }

    dob_validation_result = validatedate(dob, dobb);

    var checkbox_result = checkForAgreementErrors();

    //All checks are true if the errors exist in the respective field.
    return (first_name_validation_result || last_name_validation_result || email_validation_result || month_validation_result || day_validation_result || year_validation_result || dob_validation_result || checkbox_result);
}

function validateCurrentInput(element) {

    if (element.id.indexOf('first_name') >= 0) {
        var firstname = $("#" + element.id).val().trim();
        var isFirstNameMandatory = false;
        //if true, then mandatory
        if (listOfMandatoryFields.indexOf('first_name') != -1) {
            isFirstNameMandatory = true;
        }
        check_firstname1(firstname, 2, 40, isFirstNameMandatory);
    } else if (element.id.indexOf('last_name') >= 0) {
        var lastname = $("#" + element.id).val().trim();
        var isLastNameMandatory = false;
        //if true, then mandatory
        if (listOfMandatoryFields.indexOf('last_name') != -1) {
            isLastNameMandatory = true;
        }
        check_lastname1(lastname, 2, 40, isLastNameMandatory);

    } else if (element.id.indexOf('us_email') >= 0 || element.id.indexOf('up_email') >= 0) {
        var email = $("#" + element.id).val().trim();
        var isEmailMandatory = false;

        if (listOfMandatoryFields.indexOf('email') != -1) {
            isEmailMandatory = true;
        }
        check_email1(email, 0, 255, isEmailMandatory);
    } else if (element.id.indexOf('month') >= 0) {
        var month = $('#' + element.id).val().trim();
        var isMonthMandatory = false;
        if (listOfMandatoryFields.indexOf('month') != -1) {
            isMonthMandatory = true;
        }
        check_month1(month, 0, isMonthMandatory);
    } else if (element.id.indexOf('day') >= 0) {
        var day = $('#' + element.id).val().trim();
        var isDayMandatory = false;
        if (listOfMandatoryFields.indexOf('day') != -1) {
            isDayMandatory = true;
        }
        check_day1(day, 0, isDayMandatory);
    } else if (element.id.indexOf('year') >= 0) {
        var year = $('#' + element.id).val().trim();
        var isYearMandatory = false;
        if (listOfMandatoryFields.indexOf('year') != -1) {
            isYearMandatory = true;
        }
        check_year1(year, 0, isYearMandatory);
    }
}

function AllowNumbersOnly(e) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode != 8 && charCode != 9 && charCode != 37 && charCode != 46 && charCode != 39)) {
        e.preventDefault();
    }
}

function AllowLengthOfChracterOnly(e) {
    var charCode = $('#' + e.target.id).val();
    var charCode1 = (e.which) ? e.which : e.keyCode;
    if (e.target.id.indexOf('month') >= 0 || e.target.id.indexOf('day') >= 0) {
        if (charCode.length >= 2) {
            if (!(charCode1 == 8 || charCode1 == 9 || charCode1 == 37 || charCode1 == 46 || charCode1 == 39)) {
                e.preventDefault();
            }
        }
    } else if (e.target.id.indexOf('year') >= 0) {
        if (charCode.length == 4) {
            if (!(charCode1 == 8 || charCode1 == 9 || charCode1 == 37 || charCode1 == 46 || charCode1 == 39)) {
                e.preventDefault();
            }
        }
    }
}


/*Validation Functions of individual elements here*/

function check_firstname1(first_name, min_size, max_size, isMandatory) {
    var firstname_length = first_name.length;

    if (!isMandatory && first_name.length == 0) {
        document.getElementById("error_firstName").style.display = "none";
        return false;
    }

    if (firstname_length <= min_size) {
        $("#error_firstName").html($('#fisrt_name_error_msg1').text());
        document.getElementById("error_firstName").style.display = "block";
        return true;
    } else if (firstname_length > max_size) {
        $('#error_firstName').html($('#fisrt_name_error_msg2').text());
        document.getElementById("error_firstName").style.display = "block";
        return true;
    } else if (!isValidName(first_name)) {
        $('#error_firstName').html($('#fisrt_name_error_msg3').text());
        document.getElementById("error_firstName").style.display = "block";
        return true;
    } else {
        document.getElementById("error_firstName").style.display = "none";
        return false;
    }
}

function check_lastname1(last_name, min_size, max_size, isMandatory) {
    var lastname_length = last_name.length;

    if (!isMandatory && last_name.length == 0) {
        document.getElementById("error_lastName").style.display = "none";
        return false;
    }

    if (lastname_length <= min_size) {
        $("#error_lastName").html($('#last_name_error_msg1').text());
        document.getElementById("error_lastName").style.display = "block";
        return true;
    } else if (lastname_length > max_size) {
        $('#error_lastName').html($('#last_name_error_msg2').text());
        document.getElementById("error_lastName").style.display = "block";
        return true;
    } else if (!isValidName(last_name)) {
        $('#error_lastName').html($('#last_name_error_msg3').text());
        document.getElementById("error_lastName").style.display = "block";
        return true;
    } else {
        document.getElementById("error_lastName").style.display = "none";
        return false;
    }
}

function check_email1(email, min_size, max_size, isMandatory) {

    if (!isMandatory && email.length == 0) {
        document.getElementById("error_email").style.display = "none";
        return false;
    }

    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    // var email = $("#"+id).val();
    if (email.length <= min_size) {
        $("#error_email").html($('#email_error_msg1').text());
        document.getElementById("error_email").style.display = "block";
        return true;
    } else if (email.length > max_size) {
        $("#error_email").html($('#email_error_msg2').text())
        document.getElementById("error_email").style.display = "block";
        return true;
    } else if (!pattern.test(email)) {
        $("#error_email").html($('#email_error_msg3').text());
        document.getElementById("error_email").style.display = "block";
        return true;
    } else {
        document.getElementById("error_email").style.display = "none";
        return false;
    }
}

function check_month1(month, min_size, isMandatory) {

    if (isMandatory && month.length <= min_size) {
        $('#error_birthdate').html($('#birthdate_error_msg1').text());
        document.getElementById('error_birthdate').style.display = "block";
        return true;
    } else {
        document.getElementById('error_birthdate').style.display = "none";
        return false;
    }

}

function check_day1(day, min_size, isMandatory) {
    if (isMandatory && day.length <= min_size) {
        $('#error_birthdate').html($('#birthdate_error_msg2').text());
        document.getElementById('error_birthdate').style.display = "block";
        return true;
    } else {
        document.getElementById('error_birthdate').style.display = "none";
        return false;
    }
}

function check_year1(year, min_size, isMandatory) {
    if (isMandatory && year.length <= min_size) {
        $('#error_birthdate').html($('#birthdate_error_msg3').text());
        document.getElementById('error_birthdate').style.display = "block";
        return true;
    } else {
        document.getElementById('error_birthdate').style.display = "none";
        return false;
    }
}

function validatedate(dob, isMandatory) {

    if (!isMandatory && dob.length == 0) {
        document.getElementById("error_birthdate").style.display = "none";
        return false;
    }

    if (dob != null) {
        var opera2 = dob.split('-');
        // Extract the string into month, date and year  
        var yy = parseInt(opera2[0]);
        var mm = parseInt(opera2[1]);
        var dd = parseInt(opera2[2]);

        if (isNaN(yy)) {
            $('#error_birthdate').html($('#dob_error_year').text());
            document.getElementById("error_birthdate").style.display = "block";
            return true;
        }
        if (isNaN(mm)) {
            $('#error_birthdate').html($('#dob_error_month').text());
            document.getElementById("error_birthdate").style.display = "block";
            return true;
        }
        if (isNaN(dd)) {
            $('#error_birthdate').html($('#dob_error_date').text());
            document.getElementById("error_birthdate").style.display = "block";
            return true;
        }

        var validYear = (new Date()).getFullYear() - 1;
        if (yy < (validYear - 150) || yy > validYear) {
            $('#error_birthdate').html($('#dob_error_year').text());
            document.getElementById("error_birthdate").style.display = "block";
            return true;
        }
        if (mm < 1 || mm > 12) {
            $('#error_birthdate').html($('#dob_error_month').text());
            document.getElementById("error_birthdate").style.display = "block";
            return true;

        }
        if (dd < 1 || dd > 31) {
            $('#error_birthdate').html($('#dob_error_day').text());
            document.getElementById("error_birthdate").style.display = "block";
            return true;
        }
        // Create list of days of a month [assume there is no leap year by default]  
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                $('#error_birthdate').html($('#birthdate_error_msg2').text());
                document.getElementById("error_birthdate").style.display = "block";
                return true;
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {
                $('#error_birthdate').html($('#dob_error_day').text());
                document.getElementById("error_birthdate").style.display = "block";
                return true;
            }
            if ((lyear == true) && (dd > 29)) {
                $('#error_birthdate').html($('#dob_error_day').text());
                document.getElementById("error_birthdate").style.display = "block";
                return true;
            }
        }
    } else {
        document.getElementById('error_birthdate').style.display = "block";
        return true;
    }
}

function isValidName(name) {
    var pattern = new RegExp(/[0-9<>{}!@#$%*&;:"'\/|`~?\^\[\],]/);
    if (!pattern.test(name)) {
        return true;
    } else {
        return false;
    }
}

/*Show Hide Errors Functions here.*/

function hideAgreementError() {
    $('#error_checkBox').css('display', 'none');
}

function showAgreementError() {
    $('#error_checkBox').html($('#checkBox_error_msg').text());
    $('#error_checkBox').css('display', 'block');
}


function autofillForm() {
    var url = window.location.href;

    if (url.indexOf('emailid') == -1) {
        return;
    }
    var imp = url.substring(url.indexOf('emailid'));
    var emailparam = '';
    if (imp.indexOf('&') == -1) {
        emailparam = imp.substring(imp.indexOf('=') + 1);
    } else {
        var tmp = imp.substring(imp.substring(0, imp.indexOf('=')));
        var tmp1 = imp.substring(imp.substring(imp.indexOf('=') + 1));

        if (tmp.indexOf('emailid') != -1) {
            emailparam = tmp.substring(imp.indexOf('=') + 1);
        } else if (tmp1.indexOf('emailid') != -1) {
            emailparam = tmp1.substring(imp.indexOf('=') + 1);
        }
    }
    $('#jf-newsletter_up_email').val(emailparam);
}
