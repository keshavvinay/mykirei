$(document).ready(function () {
$('input[name="firstName"]').attr('maxlength', '40');
$('input[name="email"]').attr('maxlength', '255');
$('input[name="lastName"]').attr('maxlength', '40');
$('textarea[name="comment"]').attr('maxlength', '500');
var form = $('form[name="contactUsForm"]');
var phone = $('input[name="phone"]');
var reCaptcha = "";
    
var locale = {
    deutschland:"de",
    österreich: "at"
}

function recaptchaCallback(){
    reCaptcha = grecaptcha.getResponse();
    if(reCaptcha != ""){
       $('#error_captcha').text('');
       }
}
    
if(phone.val().length == 0){
       $('input[name="callAllowed"]').attr("disabled",true);
    }

$('input:checkbox').each(function(index,ele){
    if($(ele).is(':checked')){
        $(ele).closest('.check_box').addClass("active_ico");
    }
    else{
        $(ele).closest('.check_box').removeClass("active_ico");
        $('#contactUsForm_callAllowed-0').parent().addClass('numberToggle');
    }
});
    
if($("#contactUsForm_subjectField").val() != ""){
    $('#subjectDrop .g-Text .cmn-richtext span').text($("#contactUsForm_subjectField").val());
}
    
if($("#contactUsForm_subjectFieldCountry").val() != ""){
    if( $('input[name="subjectFieldCountry"]').val() != undefined){
        let code = $('input[name="subjectFieldCountry"]').val().toLowerCase().trim();
    for(var i in locale){
        if(locale[i]==code){
           $('#countryDrop .g-Text .cmn-richtext span').text(i);
           }
        }
    }
}

$('.subjectDropdown').append('<span class="msg-error msg-error1 error help-block"></span>');
//$('input[type="submit"]').parent().css("width", "100%");
$('input[type="submit"]').parent().append("<p class='msg-error error_submit error'></p>");

phone.keyup(function() {
    let len = $('input[name="phone"]').val().length;
    if (len != 0) {
        $('input[name="callAllowed"]').attr("disabled",false);
    } else {
        if($('input[name="callAllowed"]').is(":checked")){
            $('input[name="callAllowed"]').prop("checked",false);
            $('input[name="callAllowed"]').parent().removeClass("active_ico");
        }
        $('input[name="callAllowed"]').attr("disabled",true);
    }
});
 var ready = true;
$('input:checkbox').change(function(){
    var $this = $(this);
    if($this.is(':checked') && ready){
        ready=false;
        $this.addClass("active_ico");
        ready = true;
    }
    else if(ready){
        ready=false;
        $this.removeClass("active_ico");
        ready = true;
    }
});
   
phone.on("keypress", function (e) {
    return 0 == this.selectionStart ? e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|+]/.test(String.fromCharCode(e.which)) : e.metaKey || e.which <= 0 || 8 == e.which || /[0-9]/.test(String.fromCharCode(e.which))
});
phone.on("keyup", function () {
    var e = this.value;
    "+" == e.charAt(0) ? ($(this).attr("maxlength", 16), e.length > 10 ? ($("#contactUsForm_callAllowed-0").parent().slideDown(500).removeClass("opt-hide-sm opt-hide-md opt-hide-lg"), $(".g-drpdwn--help_container").css("margin", "1.5em auto")) : ($("#contactUsForm_callAllowed-0").parent().slideUp(500).addClass("opt-hide-sm opt-hide-md opt-hide-lg"), $(".g-drpdwn--help_container").css("margin", "1em auto 1.5em"))) : ($(this).attr("maxlength", 15), e.length > 9 ? ($("#contactUsForm_callAllowed-0").parent().slideDown(500).removeClass("opt-hide-sm opt-hide-md opt-hide-lg"), $(".g-drpdwn--help_container").css("margin", "1.5em auto")) : ($("#contactUsForm_callAllowed-0").parent().slideUp(500).addClass("opt-hide-sm opt-hide-md opt-hide-lg"), $(".g-drpdwn--help_container").css("margin", "1em auto 1.5em")))
})
    
$(".subjectDropdown .g-Text span").click(function () {
    $(this).closest('.subjectDropdown').toggleClass("toggleDropdown");
});

$(".subjectDropdown .g-ListP ul").on("click", "li", function (e) {
    e.preventDefault();
    var $this = $(this);
    var dropDown = $(this).closest('.subjectDropdown');
    $this.addClass("select").siblings().removeClass("select");
    if(dropDown.prop('id') == 'subjectDrop'){
        $("input[name='subjectField']").val($this.children().text());
        $('#subjectDrop .msg-error1').text('');
    }else if(dropDown.prop('id') == 'countryDrop'){
        var value = $this.children().text().toLowerCase().trim();
        var isFound = locale.hasOwnProperty(value);
        if(isFound){
            $("input[name='subjectFieldCountry']").val(locale[value]); 
        } 
        $('#countryDrop .msg-error1').text('');
    }
    $(dropDown).find('.g-Text .cmn-richtext span').text($this.children().text())
    $(".subjectDropdown ").removeClass("toggleDropdown");
    //$('.msg-error1').text('');
});

$("ul").find(".selected").data("value")
    form.validate({
        rules: {
            email: {
                required: true,
                email: true,
                maxlength: $('input[name="email"]').attr('maxlength')
            },
            callAllowed: {
                required: function (element) {
                    return phone.is(':filled')
                }
            },
            comment: {
                required: true,
                maxlength: 499
            },
            tcAgreed: {
                required: true
            },
            subjectField: {
                isEmpty: true
            },
            subjectFieldCountry: {
                isEmpty: true
            }
        },
        messages: {
            firstName: {
                maxlength: $('#fisrt_name_msg').text()
            },
            lastName: {
                maxlength: $('#last_name_msg').text()
            },
            email: {
                required: $('#email_msg1').text(),
                email: $('#email_msg1').text(),
                maxlength: $('#email_msg2').text()
            },
            comment: {
                required: $('#comment_msg').text(),
                maxlength: $('#comment_msg2').text()
            },
            tcAgreed: {
                required: $('#tc_error_msg').text()
            },
            callAllowed: {
                required: $('#phone_msg1').text()
            },
            subjectField: {
                isEmpty: $('#subject_msg1').text()
            },
            subjectFieldCountry: {
                isEmpty: $('#subject_msg2').text()
            }
        },
        errorElement: "em",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            element.parents(".form_rightcol").addClass("has-feedback");
            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent(".check_box"));
            } else {
                error.insertAfter(element);
            }
            if (!element.next("span")[0]) {
                jQuery("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
            }
            var subjectOptions1 = $('input[name="subjectField"]').val();
            if (subjectOptions1.length === 0) {
                $('#subjectDrop .msg-error1').text($('#subject_msg1').text());
            } else {
                $('#subjectDrop .msg-error1').text('');
            }
            var subjectOptions2 = $('input[name="subjectFieldCountry"]').val();
            if(subjectOptions2 != undefined){
               if (subjectOptions2.length === 0) {
                $('#countryDrop .msg-error1').text($('#subject_msg2').text());
            } else {
                $('#countryDrop .msg-error1').text('');
                }
            }
            
            var response = grecaptcha.getResponse();
            if (response == '') {
                $('#error_captcha').text($('#captcha_error_msg').text());
                return;
            }
        },
        success: function (label, element) {
            if (!jQuery(element).next("span")[0]) {
                jQuery("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter(jQuery(element));
            }
        },
        highlight: function (element, errorClass, validClass) {
            jQuery(element).parents(".form_rightcol_wrapper").addClass("has-error").removeClass("has-success");
            jQuery(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
        },
        unhighlight: function (element, errorClass, validClass) {
            jQuery(element).parents(".form_rightcol_wrapper").addClass("has-success").removeClass("has-error");
            jQuery(element).next("span").addClass("glyphicon-ok").removeClass("glyphicon-remove");
        },
        submitHandler: function (form) {
            var response = grecaptcha.getResponse();
            if (response == '') {
                $('#error_captcha').text($('#captcha_error_msg').text());
                return;
            }
            
           var countryPreference = $('input[name="countryPreference"]').val();
            if(countryPreference == null) {
                 countryPreference = $('input[name="subjectFieldCountry"]').val().trim();
            } 
            
            $('.loader-section').show();
            var requestData = {
                "firstName": $('input[name="firstName"]').val(),
                "lastName": $('input[name="lastName"]').val(),
                "email": $('input[name="email"]').val(),
                "phone": $('input[name="phone"]').val(),
                "callAllowed": $('input[name="callAllowed"]').prop('checked'),
                "customerCopyRequired": $("#contactUsForm_customerCopyRequired-0").prop('checked'),
                "tcAgreed": $("#contactUsForm_tcAgreed-0").prop('checked'),
                "recaptchaResponse": grecaptcha.getResponse(),
                "brandId": $('input[name="brandId"]').val(),
                "countryPreference" : countryPreference,
                "languagePreference": $('input[name="languagePreference"]').val(),
                "feedback": {
                    "comment": $('textarea[name="comment"]').val(),
                    "subject": $('input[name="subjectField"]').val()
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
                    grecaptcha.reset();
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
    
    jQuery.validator.addMethod("isEmpty", function(value, element) {
        
    });
});

function recaptchaCallback(){
    reCaptcha = grecaptcha.getResponse();
    if(reCaptcha != ""){
       $('#error_captcha').text('');
       }
}