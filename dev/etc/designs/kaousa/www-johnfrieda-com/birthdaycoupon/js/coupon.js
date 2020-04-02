var sapOutboundId = '';
var wait = 'body:not(.is-authorring) .birthday-coupon-loader-section .wait';
var loader = 'body:not(.is-authorring) .birthday-coupon-loader-section';
var success = 'body:not(.is-authorring) .birthday-coupon .success';
var error = 'body:not(.is-authorring) .birthday-coupon .error';
var internalError = 'body:not(.is-authorring) .birthday-coupon .error-internal';

$(document).ready(function () {
    $(loader).show();
    $(success).hide();
    $(error).hide();
    $(internalError).hide();
    
    sapOutboundId = getOutboundIdFromUrl();

    if(sapOutboundId != ''){
        fetchBirthdayCoupon(sapOutboundId);
    }
    else{
        $(loader).hide();
        $(success).hide();
        $(error).show();
    }
});

function getOutboundIdFromUrl(){
    var id = '';
    var url = window.location.href;

    if(url.indexOf('outbound-id') != -1){
        id = url.split('outbound-id=')[1];
    }

    return id;
}

function fetchBirthdayCoupon(sapOutboundId){

    var url = 'https://userservices.kaobrands.com/api/customer/coupon-url?outbound-id=' + sapOutboundId;

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: url,
        cache: false,
        timeout: 60000,
        success: function (data) {
            $(loader).hide();
            $(success).show();
            $(error).hide();
            window.location.href = data.response.url;
        },
        error: function (e) {
            $(loader).hide();
            $(success).hide();
            if(e.statusCode == 500){
                $(internalError).show();
            }
            else $(error).show();
        }
    });
}