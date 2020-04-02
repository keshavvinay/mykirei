$(window).on("load", function () {
    $(window).scroll(function () {
        var windowBottom = $(this).scrollTop() + $(this).innerHeight();
        $(".scrolltop-sample").each(function () {
            /* Check the location of each desired element */
            var objectBottom = $(this).offset().top;

            /* If the element is completely within bounds of the window, fade it in */
            if (objectBottom < windowBottom) {
                //object comes into view (scrolling down)
                if ($(this).css("opacity") == 0) {
                    $(this).addClass("grouped");
                    $(this).fadeTo(500, 1);
                }
            } else {
                //object goes out of view (scrolling up)
                if ($(this).css("opacity") == 1) {
                    $(this).removeClass('grouped');
                    $(this).fadeTo(500, 0);
                }
            }
        });
    }).scroll(); //invoke scroll-handler on page-load
});


var isAuthorring = false;
var locale = {
    austria: "at",
    australia: "au",
    belgium: "be",
    brazil: "br",
    canada: "ca",
    czech: "cz",
    denmark: "dk",
    finland: "fi",
    germany: "de",
    hongkong: "hk",
    italy: "it",
    japan: "jp",
    norway: "no",
    netherlands: "nl",
    newzealand: "nz",
    singapore: "sg",
    southafrica: "za",
    sweden: "se",
    switzerland: "ch",
    taiwan: "tw",
    unitedkingdom: "uk",
    usa: "us",
    deutschland: "de",
    schweiz: "ch",
    österreich: "at",
    belgique: "be",
    suisse: "ch",
    belgië: "be",
    nederland: "nl"
};

/*-----------------------*/
// ready
/*-----------------------*/
$(document).ready(function () {
    isAuthorring = $.fn.isAuthorring();
    if (isAuthorring) {
        $('body').addClass('is-authorring');
    }
});
initCountryPopUp();
initContactUsPopUp();

/**image carousel click */

// click on b/w image
$('.mult-img-pack .carousel-groupbox img').click(
    function () {
        $(this).closest(".carousel-groupbox").siblings("a")[0].click();
    });

/**
 * COUNTRY POP UP
 */
function initCountryPopUp() {
    $('.country-group-box').wrap('<div class="modal" id="country-group-box" />');

    $("#language").click(function () {
        $("#country-group-box").addClass("slide");
        $("#country-group-box").css("visibility", "visible");
        var greenMark = $(".green-mark").offset().top + 10;
        $(".modal > .g-HeadingTitle").css({
            "top": greenMark
        });
        $('.green-mark .g-ColumnUnit').addClass('show');
        $(".kaosalon-logo-wrapper").css('z-index', '16');
        $('body').css('overflow', 'hidden');

    });

    /* close */

    $(".close-button").click(function () {
        $("#country-group-box").removeClass("slide");
        $("#country-group-box").css("visibility", "hidden");
        $(".kaosalon-logo-wrapper").css('z-index', '0');
        $('.green-mark .g-ColumnUnit').removeClass('show');
        $("#contact-group-box").removeClass("slide");
        $("#contact-group-box").css("visibility", "hidden");
        $('body').css('overflow', 'auto');

    });
}

/**
 * CONTACT US POP UP
 */
function initContactUsPopUp() {
    $('.contact-group-box').wrap('<div class="modal" id="contact-group-box" />');

    $('.selectlanguage').click(function () {
        // var link = $(this).children('a');
        // link.find('.sub-country').slideToggle('slow');
        var link = $(this).children('.sub-country');
        link.slideToggle('slow');
    });
    $('input[name="firstName"]').attr('maxlength', '40');
    $('input[name="lastName"]').attr('maxlength', '40');
    $('input[name="phoneNumber"]').attr('maxlength', '20');
    $('input[name="email"]').attr('maxlength', '255');
    $('textarea[name="comment"]').attr('maxlength', '1000');
    var form = $('form[name="contactUsForm"]');
    var phone = $('input[name="phoneNumber"]');

    phone.on('keypress', function (e) {
        return 0 == this.selectionStart ? e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|+|-]/.test(String.fromCharCode(e.which)) : e.metaKey || e.which <= 0 || 8 == e.which || /[0-9|-]/.test(String.fromCharCode(e.which));
    });

    $.validator.addMethod("validationEmail", function (value, element) {
        var regex = /^[\w"+-.]+@((\d?\d?\d?\.){3}(\d?\d?\d?)|\[(\d?\d?\d?\.){3}(\d?\d?\d?)\]|([\w]+\.[\w]+)(\.[\w]+)?)$/;
        return this.optional(element) || regex.test(value);
    });

    /*   $.validator.addMethod("minPhone", function(value,element){
           var minLen = $('input[name="phoneNumber"]').val().length;
           
       })*/

    $("#contact-button").click(function () {
        $("#contact-group-box").addClass("slide");
        $("#contact-group-box").css("visibility", "visible");
        $('.contact-group-box > .g-HeadingTitle__titleBlock').css("display", "table");
        $('form').css("display", "block");
        $(".thanks").css("display", "none");
        $(".sorry").css("display", "none");
        $('body').css('overflow', 'hidden');
        // var windowHeight = $(window).height() - 100;
        var greenMark = $(".green-mark").offset().top + 10;
        $(".modal > .g-HeadingTitle").css({
            "top": greenMark
        });
    });


    $('#comment_rightcol').parent().addClass('messageBox');
    $('.form_button_submit').closest('.form_row').addClass('messageBox');

    $('.selectDropDown > .cmn-richtext').click(function () {
        $(this).siblings('.g-ListP').slideToggle(500);
    });

    $(".selectDropDown .g-ListP ul").on('click', "li", function (e) {
        //event.preventDefault();
        var $this = $(this);
        var dropDown = $(this).closest('.selectDropDown');
        $this.addClass("select").siblings().removeClass("select");
        var values = $(dropDown).find('.g-ListUnit .cmn-richtext span').text();
        var result = $(dropDown).find(".select").text().trim();
        dropDown.find('input').text(result);
        dropDown.find('.cmn-richtext > span:first').text(result);
        dropDown.find('input').val(result);
        dropDown.find('.g-ListP').slideUp(500);
        /* country */

        if (dropDown.hasClass("country")) {
            $("input[name='countryPreference']").val($this.children().text());
            $('.msg-error1').text('');
            if ($("#contactUsForm_countryPreference").val() != "") {
                if ($('input[name="countryPreference"]').val() != undefined) {
                    var code = $('input[name="countryPreference"]').val().toLowerCase().trim();
                    code = code.replace(/\s+/g, '');
                    for (var i in locale) {
                        if (i == code) {
                            $('#contactUsForm_countryPreference').text(locale[i]);
                            $('#contactUsForm_countryPreference').val(locale[i]);
                            $('#contactUsForm_countryPreference').siblings("label.error").hide();

                        }
                    }
                }
            }

        }
    });

    /*validation rules*/

    $('input:checkbox').change(function () {
        if ($(this).is(":checked")) {
            $(this).closest('.group-checkbox').addClass("active-checkbox");
        } else {
            $(this).closest('.group-checkbox').removeClass("active-checkbox");
        }
    });

    /* Phone Number */

    if (phone.val().length == 0) {
        $('input[name="callAllowed"]').attr("disabled", true);
        $('#callAllowed').css("display", "none");
    }

    phone.keyup(function () {
        var len = $('input[name="phoneNumber"]').val().length;
        if (len >= 5) {
            $('input[name="callAllowed"]').attr("disabled", false);
            $('#callAllowed').css("display", "block");
        } else {
            $('#callAllowed').css("display", "none");
            $('input[name="callAllowed"]').attr("disabled", true);
        }
    });

    form.validate({
        ignore: "",
        // focusInvalid: false,
        rules: {
            firstName: {
                //required: true,
                maxlength: 39
            },
            lastName: {
                //required: true,
                maxlength: 39
            },
            emailAddress: {
                required: true,
                validationEmail: true,
                maxlength: $('input[name="email"]').attr('maxlength')
            },
            phoneNumber: {
                //required: true,
                minlength: 05,
                maxlength: 19
            },
            callAllowed: {
                required: function (element) {
                    return phone.is(':filled');
                }
            },
            comment: {
                required: true,
                maxlength: 499
            },
            tcAgreed: {
                required: true
            },
            countryPreference: {
                required: true
            }
        },
        messages: {
            firstName: {
                //required: $('#fisrt_name_msg1').text(),
                maxlength: $('#fisrt_name_msg').text()
            },
            lastName: {
                //required: $('#last_name_msg1').text(),
                maxlength: $('#last_name_msg').text()
            },
            emailAddress: {
                required: $('#email_msg1').text(),
                validationEmail: $('#email_msg1').text(),
                maxlength: $('#email_msg2').text()
            },
            comment: {
                required: $('#comment_msg').text(),
                maxlength: $('#comment_msg2').text()
            },
            tcAgreed: {
                required: $('#tc_error_msg').text()
            },
            phoneNumber: {
                //required: $('#phone_msg1').text(),
                minlength: $('#phone_min').text(),
                maxlength: $('#phone_max').text()
            },
            callAllowed: {
                required: $('#phone_msg1').text()
            },
            countryPreference: {
                required: $('#subject_msg1').text()
            }
        },
        errorElement: "label",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            element.parents(".form_row").addClass("has-feedback");
            if (element.prop("type") === "checkbox") {
                element.closest(".group-checkbox").append(error);
            } else {
                error.insertAfter(element);
            }

            if (!element.next("span")[0]) {
                jQuery("<span class='error-cotnainer has-error-icon'></span>").insertAfter(element);
            }

            // var countryOptions = $('input[name="countryPreference"]').text();
            // if (countryOptions.length === 0) {
            //     $('.msg-error1').text($('#subject_msg1').text());
            // } else {
            //     $('.msg-error1').text('');
            // }
        },
        success: function (label, element) {
            if (!jQuery(element).next("span")[0]) {
                jQuery("<span class='error-cotnainer has-error-icon'></span>").insertAfter(jQuery(element));
            }
        },
        highlight: function (element, errorClass, validClass) {
            jQuery(element).parents(".form_row").addClass("has-error").removeClass("has-success");
            jQuery(element).next("span").addClass("has-error-icon").removeClass("has-no-error-icon");
        },
        unhighlight: function (element, errorClass, validClass) {
            jQuery(element).parents(".form_row").addClass("has-success").removeClass("has-error");
            jQuery(element).next("span").addClass("has-no-error-icon").removeClass("has-error-icon");
        },
        submitHandler: function (form1) {
            $('.loader-section').show();
            var countryPreference = $('input[name="countryPreference"]').val();
            var requestData = {
                "firstName": $('input[name="firstName"]').val(),
                "lastName": $('input[name="lastName"]').val(),
                "email": $('input[name="emailAddress"]').val(),
                "phone": $('input[name="phoneNumber"]').val(),
                "subBrand": $('input[name="selectbrand"]').val(),
                "callAllowed": $('input[name="callAllowed"]').prop('checked'),
                "customerCopyRequired": $("#contactUsForm_customerCopyRequired-0").prop('checked'),
                "tcAgreed": $("#contactUsForm_tcAgreed-0").prop('checked'),
                "brandId": $('input[name="brandId"]').val(),
                "countryPreference": countryPreference,
                "languagePreference": $('input[name="languagePreference"]').val(),
                "feedback": {
                    "comment": $('textarea[name="comment"]').val(),
                    "subject": $('input[name="howtohelp"]').val()
                }
            };
            var domain = $('input[name="apiDomain"]').val();
            $("#resultTest").text(JSON.stringify(requestData));
            $.ajax({
                type: "POST",
                url: domain + "/api/customer/contact-us",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(requestData),
                dataType: 'json',
                cache: false,
                timeout: 60000,
                success: function (data) {
                    console.log("SUCCESS : ", data);
                    $('.contact-group-box > .g-HeadingTitle__titleBlock').css("display", "none");
                    $('form').css("display", "none");
                    $(".thanks").fadeIn(500);
                },
                error: function (xhr, textStatus) {
                    $('.contact-group-box > .g-HeadingTitle__titleBlock').css("display", "none");
                    $('form').css("display", "none");
                    $(".sorry").fadeIn(500);
                    console.log(xhr);
                }
            });            
        }

    });
}