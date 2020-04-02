var formId = "#contact_us_guhl";

/*Input Elements*/

var emailId = "#contact_us_guhl_email";
var mGenderId = "#contact_us_guhl_gender-0";
var fGenderId = "#contact_us_guhl_gender-1";
var genderRadioButtons = formId + " .form_field.form_field_radio";
var firstNameId = "#contact_us_guhl_first_name";
var lastNameId = "#contact_us_guhl_last_name";
var phoneId = "#contact_us_guhl_telephone";
var phoneAgreementId = "#contact_us_guhl_telephoneAgreement-0";
var yourMessageId = "#contact_us_guhl_your_message";
var submitClass = formId + " .form_button_submit";
var brandId = "#contact_us_guhl_brand_id";
var countryPreferenceId = "#contact_us_guhl_country_preference";
var languagePreferenceId = "#contact_us_guhl_language_preference";
var agreementCheckbox = formId + " .form_field.form_field_checkbox";
var agreementNewsletter = "#contact_us_guhl_user_newsletter_agreement-0";
var agreementTandC = "#contact_us_guhl_user_terms_agreement-0";

/*Error Elements*/
var guhlErrorClass = ".guhl_contact_us_error";
var errorEmailId = "#guhl_contact_us_email_error";
var errorGenderId = "#guhl_contact_us_gender_error";
var errorFirstNameId = "#guhl_contact_us_first_name_error";
var errorLastNameId = "#guhl_contact_us_last_name_error";
var errorPhoneNumberId = "#guhl_contact_us_telephone_error";
var errorPhoneNumberAgreementId = "#guhl_contact_us_telephone_agreement_error";
var errorYourMessageId = "#guhl_contact_us_your_message_error";
var agreementError = "#guhl_contact_us_agreement_error";


var currentGenderValue = '';

$(document).ready(function(){
    $('#contact_us_guhl_gender-0').closest('.form_row').addClass('gender-container');
    $('#contact_us_guhl_gender-1').closest('.form_row').addClass('gender-container');
    $('.gender-container').wrapAll('<div class="gender-wrapper"></div>');
    $('.gender-wrapper').addClass('radio');
    $('#contact_us_guhl_user_newsletter_agreement-0').closest('.form_row').addClass('nl-inputbox');
    $('#contact_us_guhl_user_terms_agreement-0').closest('.form_row').addClass('tc-inputbox');

    /*Styling related stuff*/
    replaceTextBoxWithTextArea(yourMessageId);
    populatePlaceholders();
    addCorrectArrows();
    hidePhoneAgreement();
    activateSubmit();

    if(isDesktopMode()){
        removeAccordionBehaviour();
    }


    $(".contact-us-section .radio .form_row").click(function(){
        radioBehaviour(this);
    });


    /*Prevent form submit on pressing enter*/
    $(formId + ' input').keypress(function(e){
        preventFormSubmit(e);
    });

    /*validations*/
    $(formId + ' input, textarea').focusout(function(){
        validateCurrentInput(this);
        activateSubmit();
    });

    $(formId + ' input, textarea').keyup(function(){

        validateCurrentInput(this);
        activateSubmit();
    });

    $(formId + ' ' + agreementTandC).change(function(){

        if($(this).prop('checked') == true){
            hideError(agreementError);
            activateSubmit();
            return true;
        }
        else {
            showError(agreementError);
            activateSubmit();
            return false;
        } 
    });

    /*$(formId + ' ' + phoneAgreementId).change(function(){
        if($(this).prop('checked') == true){
            hideError(errorPhoneNumberAgreementId);
            return true;
        }
        else{
            showError(errorPhoneNumberAgreementId);
            return false;
        } 
    });*/

    /*Submit form*/
    $(submitClass).click(function(e){

        e.preventDefault();

        /*check if any errors are visible.*/
        var b1 = checkForVisibleErrors();
        var b2 = checkForAgreementErrors();
        var b3 = checkMandatoryEmail(); //Will return true if email is valid
        var b4 = checkMandatoryMessage();
        if(!b3){
            return;
        }
        if(!b4){
            return;
        }
        if(b1 || b2){
            return;
        }
        else{
            //alert('Submit Hiding for obvious reasons');
            submitContactUsForm();
        }
    });

});

function preventFormSubmit(e){
    var key = e.charCode || e.keyCode || 0;

    if (key == 13) {
        //alert("I told you not to, why did you do it?");
        e.preventDefault();
    }
}

function validateCurrentInput(element){

    if(element.type == 'submit'){
        return;
    }

    var value = $(element).val().trim();

    if(emailId.indexOf(element.id) != -1){

        if(validateEmail(value)){
            hideError(errorEmailId);
            hideRedBorder('#' + element.id);
            showCorrectSign('#' + element.id);            
        }
        else {
            showError(errorEmailId);
            showRedBorder('#' + element.id);
            hideCorrectSign('#' + element.id);
        }
    }

    else if(firstNameId.indexOf(element.id) != -1){

        //non mandatory field
        if(value == ''){
            hideError(errorFirstNameId);
            hideRedBorder('#' + element.id);
            hideCorrectSign('#' + element.id);
        }
        else{
            if(validateFirstName(value)){
                hideError(errorFirstNameId);
                hideRedBorder('#' + element.id);
                showCorrectSign('#' + element.id);
            }
            else{
                showError(errorFirstNameId);
                showRedBorder('#' + element.id);
                hideCorrectSign('#' + element.id);
            }
        }
    }

    //last name
    else if(lastNameId.indexOf(element.id) != -1){

        //non mandatory field
        if(value == ''){
            hideError(errorLastNameId);
            hideRedBorder('#' + element.id);
            hideCorrectSign('#' + element.id);
        }
        else{
            if(validateLastName(value)){
                hideError(errorLastNameId);
                hideRedBorder('#' + element.id);
                showCorrectSign('#' + element.id);
            }
            else{
                showError(errorLastNameId);
                showRedBorder('#' + element.id);
                hideCorrectSign('#' + element.id);
            }
        }
    }

    //phone number
    else if(phoneId.indexOf(element.id) != -1){

        if(value != ''){
            showPhoneAgreement();
            if(validatePhone(value)){

                hideError(errorPhoneNumberId);
                hideRedBorder('#' + element.id);
                showCorrectSign('#' + element.id);
            }
            else{
                showError(errorPhoneNumberId);
                showRedBorder('#' + element.id);
                hideCorrectSign('#' + element.id);
            }
        }
        else{
            hideError(errorPhoneNumberId);
            hideRedBorder('#' + element.id);
            hideCorrectSign('#' + element.id);
            hidePhoneAgreement();
        }
    }

    //your message
    else if(yourMessageId.indexOf(element.id) != -1){

        if(validateYourMessage(value)){
            hideError(errorYourMessageId);
            hideRedBorder('#' + element.id);
            showCorrectSign('#' + element.id);
        }
        else{
            showError(errorYourMessageId);
            showRedBorder('#' + element.id);
            hideCorrectSign('#' + element.id);
        }
    }

    //agreement error
    else if(agreementTandC.indexOf(element.id) != -1){
        if(validateAgreement(agreementTandC)){
            hideError(agreementError);
        }
        else{
            showError(agreementError);
        }
    }
}

//Returns true if errors are visible.
function checkForVisibleErrors(){

    var elem = $(formId + ' ' + guhlErrorClass);

    for(var i = 0; i < elem.length; i++){

        if($(elem[i]).css('display') != 'none'){
            return true;
        }
    }
    return false;
}

function checkForAgreementErrors(){

    var res = false;
    var res1 = false;

    /*var ph = $(phoneId).val().trim();

    if(ph != ''){
        if($(phoneAgreementId).prop('checked') == true){
            hideError(errorPhoneNumberAgreementId);
            res = false;
        }
        else{
            showError(errorPhoneNumberAgreementId);
            res = true;
        }
    }*/

    if($(agreementTandC).prop('checked') == true){
        hideError(agreementError);
        res1 = false;
    }
    else {
        showError(agreementError);
        res1 = true;
    }

    return res || res1;
}

function submitContactUsForm(){

    var requestData = getRequestData();

    postContactUs(JSON.stringify(requestData));
}

function postContactUs(requestData){
    $('.loader-section').show();
	var apiDomain = $('input[name="apiDomain"]').val();
	var redirectPage = $('input[name="redirectPage"]').val();
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: apiDomain + "api/customer/contact-us",
        headers: {
            "Content-Type": "application/json"
        },
        data: requestData,
        dataType: 'json',
        cache: false,
        timeout: 60000,
        success: function (data) {
			var contactThankYou = window.location.href;
            if (contactThankYou.charAt(contactThankYou.length - 1) == "/") {
                contactThankYou = contactThankYou.substring(0, contactThankYou.length - 1);
            }
            contactThankYou = contactThankYou.substring(0, contactThankYou.lastIndexOf("/"));
            contactThankYou = contactThankYou + redirectPage;
            window.location.href = contactThankYou;
        },
        error: function (e) {
            $('.loader-section').hide();
            //alert("Error in Contact Us Post Request");
        }
    });
}

function getRequestData(){

    var feedback = {
        'upcCode'   :   '',
        'mfgCode'   :   '',
        'comment'   :   $(yourMessageId).val().trim()
    };

    var agreeList = $(agreementCheckbox + ':checked');
    var newsBool = false;
    var tcBool = false;
    var phoneBool = false;


    //for all check boxes.
    for(var i = 0; i < agreeList.length; i++){

        //If newsletter is subscribed
        if(agreementNewsletter.indexOf(agreeList[i].id) != -1){
            newsBool = true;
        }

        if(agreementTandC.indexOf(agreeList[i].id) != -1){
            tcBool = true;
        }

        if(phoneAgreementId.indexOf(agreeList[i].id) != -1){
            phoneBool = true;
        }
    }

    var phoneData = $(phoneId).val().trim();

    if($(phoneAgreementId).prop('checked') == true){
        phoneBool = true;
    }
    else phoneBool = false;

    var fgenCheck = $('#contact_us_guhl_gender-0').prop('checked');
    var mgenCheck = $('#contact_us_guhl_gender-1').prop('checked');
    var genVal = '';
    var tmptitle = '';
    if(fgenCheck == true){
        genVal = 'F';
        tmptitle = 'female';
    }
    if(mgenCheck == true){
        genVal = 'M';
        tmptitle = 'male';
    }

    var requestData = {
        'brandId'               :   $(brandId).val().trim(),
        'email'                 :   $(emailId).val().trim(),
        'firstName'             :   $(firstNameId).val().trim(),
        'lastName'              :   $(lastNameId).val().trim(),
        'phone'                 :   phoneData,
        'callAllowed'           :   phoneBool,
        'languagePreference'    :   $(languagePreferenceId).val().trim(),
        'countryPreference'     :   $(countryPreferenceId).val().trim(),
        'gender'                :   genVal,
        'title'                 :   tmptitle,
        'tcAgreed'              :   tcBool,
        'newsletterSubscribed'  :   newsBool,
        'feedback'              :   feedback
    };

    return requestData;
}

function showError(errorId){    
    $(errorId).css('display', 'block');
}

function hideError(errorId){    
    $(errorId).css('display', 'none');

}

function showRedBorder(element){
    $(element).css('border-color', '#D9534F');
}

function hideRedBorder(element){
    $(element).css('border-color', 'rgb(0,0,0)');
}

function showCorrectSign(elementId){
    $(elementId).parent().parent().find('.correct').css('display', 'block');
}

function hideCorrectSign(elementId){
    $(elementId).parent().parent().find('.correct').css('display', 'none');
}

function radioBehaviour(element){
    var radio_panel = $(element);
    var radio_input = radio_panel.find("input");
    if($(radio_input).prop("checked") == true){
        $(radio_input).prop("checked", false);
        $(radio_panel).css("background-color","white");
        var radio_panel_right_col = radio_panel.find('.form_rightcol');
        $(radio_panel_right_col).css("color","black");
    }
    else{
        $(radio_input).prop("checked", true);
        $(radio_panel).css("background-color","black");
        var radio_panel_right_col = radio_panel.find('.form_rightcol');
        $(radio_panel_right_col).css("color","white");

        var cgen = radio_input.prop('id');

        if(mGenderId.indexOf(cgen) != -1){
            currentGenderValue = 'M';
        }
        else if(fGenderId.indexOf(cgen) != -1){
            currentGenderValue = 'F';
        }
        else{
            currentGenderValue = '';
        }
    }
    var radio_form = $(radio_panel).parent();
    var radio_form_rows = $(radio_form).find(".form_row");
    for (var i = 0; i < radio_form_rows.length; ++i) {
        var radio_form_row = radio_form_rows[i];
        var radio_form_row_input = $(radio_form_row).find("input");
        if($(radio_form_row_input).prop("checked") == false){
            $(radio_form_row).css("background-color","white");
            /*$(radio_form_row).css({"border-color": "#000000", "border-width":"1px", "border-style":"solid"});*/
            var radio_form_row_right_col = $(radio_form_row).find('.form_rightcol');
            $(radio_form_row_right_col).css("color","black");
        }
    }
}

function removeAccordionBehaviour(){
    $('.contact-us-section .g-AccordionUnit__titleBlock').unbind('click');

    var contentAccordion = $('.contact-us-section .g-AccordionUnit__titleBlock').siblings();

    for(var i = 0; i < contentAccordion.length; i++){
        //contentAccordion[i].classList.replace('is-close', 'is-open');
        //contentAccordion[i].classList.split('is-close').join('is-open');
        var s = contentAccordion[i].className;
        s = s.substring(0, s.length - 8) + 'is-open';
        contentAccordion[i].className = s;
    }
}

function isDesktopMode(){

    var topOfColumns = $($('.contact-us-section .g-Column__cols')[0]).offset().top - $($('.contact-us-section .g-Column__cols')[1]).offset().top;

    if((topOfColumns / 5) < 1 && (topOfColumns / 5) >= 0){
        return true;
    }
    else return false;
}

function populatePlaceholders(){
    var inputs, index;
    inputs = document.getElementsByClassName("form_field_text");
    for (index = 0; index < inputs.length; ++index) {
        var input = inputs[index];
        input .placeholder = $('label[for=' + input .id + ']').text();
    }
}

function addCorrectArrows(){
    $("#email_rightcol").append("<div class='correct' id='correct_email' style='display: none;'>&#10004</div>");
    $("#first_name_rightcol").append("<div class='correct' id='_correct' style='display: none;'>&#10004</div>");
    $("#last_name_rightcol").append("<div class='correct' id='_correct' style='display: none;'>&#10004</div>");
    $("#telephone_rightcol").append("<div class='correct' id='_correct' style='display: none;'>&#10004</div>");
    $("#your_message_rightcol").append("<div class='correct' id='_correct' style='display: none;'>&#10004</div>");
}

function replaceTextBoxWithTextArea(tboxId){
    var tbox = $(tboxId);
    var parentElement = tbox.parent();
    parentElement.find('input').remove();

    var tclass = tbox.prop('class');
    var tid = tbox.prop('id');
    var tname = tbox.prop('name');
    var tvalue = tbox.prop('value');
    var tplaceholder = tbox.prop('placeholder');

    var tarea = '<textarea class="' + tclass + '" id="' + tid + '" name="'+ tname +'" value="' + tvalue + '" onkeydown="" placeholder="' + tplaceholder + '" cols="30">' + '</textarea>';
    parentElement.append(tarea);

}

function validateEmail(email){

    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

    return pattern.test(email);    
}

function validateFirstName(name){

    /*
        new RegExp([0-9<>{}!@#$%*&;:"'\/|`~?\^\[\],])
    */
    var pattern = new RegExp(/[0-9<>{}!@#$%*&;:"'\/|`~?\^\[\],]/);
    if(!pattern.test(name))
    {
        return true;
    } 
    else
    {
        return false;
    }
}

function validateLastName(name){

    //var pattern = new RegExp(/^[A-Za-z \-_]+$/);

    var pattern = new RegExp(/[0-9<>{}!@#$%*&;:"'\/|`~?\^\[\],]/);

    if(!pattern.test(name))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function validatePhone(value){

    var num = '0123456789';

    value = value.trim();

    var i = 0;
    var ch = value.charAt(i);

    //not starts with plus and not starts with number
    if((ch != '+') && (num.indexOf(ch) == -1)){
        return false;
    }

    for(i = 1; i < value.length; i++){
        ch = value.charAt(i);
        //character is not a number and character is not a space
        if((num.indexOf(ch) == -1) && (ch != ' ')){
            return false;
        }
    }
    return true;
}

function validateYourMessage(v){

    if(v.length > 3 && v.length < 2000){
        return true;
    }
    else return false;
}

function validateAgreement(v){
    if($(v).prop('checked') == true){
        return true;
    }
    else return false;
}

function hidePhoneAgreement(){
    $(phoneAgreementId).parent().css('display', 'none');
}

function showPhoneAgreement(){
    $(phoneAgreementId).parent().css('display', 'block');
}

function checkMandatoryEmail(){

    if(validateEmail($(emailId).val().trim())){
        hideError(errorEmailId);
        showCorrectSign(emailId);
        return true;
    }
    else{
        showError(errorEmailId);
        hideCorrectSign(emailId);
        return false;
    }
}

function checkMandatoryMessage(){

    if(validateYourMessage($(yourMessageId).val().trim())){
        hideError(errorYourMessageId);
        showCorrectSign(yourMessageId);
        return true;
    }
    else{
        showError(errorYourMessageId);
        hideCorrectSign(yourMessageId);
        return false;
    }
}

function greyOutSubmitButton(){
    $(submitClass).css('border', '1px solid #D2D2D2');
    $(submitClass).css('color', '#D2D2D2');
}

function restoreSubmitButton(){
    $(submitClass).css('border', '1px solid #000');
    $(submitClass).css('color', '#000');
}

function activateSubmit(){

    if(checkMandatoryFields()){
        restoreSubmitButton();
    }
    else{
        greyOutSubmitButton();
    }
}

function checkMandatoryFields(){

    if(!validateEmail($(emailId).val().trim())){
        return false;
    }

    if(!validateYourMessage($(yourMessageId).val().trim())){
        return false;
    }

    if($(agreementTandC).prop('checked') == false){
        return false;
    }
    return true;
}