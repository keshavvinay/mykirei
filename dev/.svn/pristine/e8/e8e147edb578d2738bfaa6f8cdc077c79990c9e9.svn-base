/*common validation js*/

$(document).ready(function() {

    $("input ,textarea").focusout(function() {

        if(this.id.indexOf('first_name') >=0)
        {
            var firstname = $("#"+this.id).val();
            check_firstname(firstname,0,40);
        }
        else if(this.id.indexOf('last_name') >=0)
        {
            var lastname = $("#"+this.id).val();
            check_lastname(lastname,0,40);
        } else if(this.id.indexOf('us_email') >=0 || this.id.indexOf('up_email') >=0 )
        {
          var email = $("#"+this.id).val();
            check_email(email ,0,255);
        } 
        else if(this.id.indexOf('address1') >=0)
        {
            var address1 = $('#'+this.id).val();
            check_address1(address1,0,255);
        }
        else if(this.id.indexOf('city') >=0)
        {
            var city = $('#'+this.id).val();
            check_city(city,0,40);
        }
        else if(this.id.indexOf('zipcode') >=0)
        {
            var zipcode = $('#'+this.id).val();
            check_zipcode(zipcode,0,40);
        }
        else if(this.id.indexOf('comment') >=0)
        {
            var comment = $('#'+this.id).val();
            check_comment(comment,0,2000);
        }

    });





    $("select").change(function() {


        if(this.id.indexOf('state') >=0)
        {
            var state = $('#'+this.id+' option:selected').val();
                check_state(state,0);
        }
        else if(this.id.indexOf('gender') >= 0)
        {
        var gender = $('#'+this.id+' option:selected').val();
	check_gender(gender);
	}
        else if(this.id.indexOf('us_month') >=0)
        {
         var month = $('#'+this.id+' option:selected').val()
         check_month(month,0);
        } 
        else if(this.id.indexOf('us_day') >=0)
        {
         var day = $('#'+this.id+' option:selected').val()
         check_day(day,0);
        } 
        else if(this.id.indexOf('us_year') >=0)
        {
          var year = $('#'+this.id+' option:selected').val()
           check_year(year,0);
        }

    });


$("input , textarea").keyup(function() {
        if(this.id.indexOf('first_name') >=0)
        {
            var firstname = $("#"+this.id).val();
            check_firstname(firstname,0,40);

        }
        
		else if(this.id.indexOf('last_name') >=0)
        {

          var lastname = $("#"+this.id).val();
            check_lastname(lastname,0,40);
        } 
		 
        else if(this.id.indexOf('address1') >=0)
        {

            var address1 = $('#'+this.id).val();
            check_address1(address1,0,255);

        }
        else if(this.id.indexOf('city') >=0)
        {

            var city = $('#'+this.id).val();
            check_city(city,0,40);

        }
        else if(this.id.indexOf('zipcode') >=0)
        {

           var zipcode = $('#'+this.id).val();
            check_zipcode(zipcode,0,40);

        }
        else if(this.id.indexOf('comment') >=0)
        {

            var comment = $('#'+this.id).val();
            check_comment(comment,0,2000);
        }

        

    });





    $("input").keypress(function() {
        if(this.id.indexOf('zipcode') >= 0){
        AllowNumbersOnly(event);
        }
    });

    function AllowNumbersOnly(e) {
        var charCode = (e.which) ? e.which : e.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && !(charCode > 64 && charCode < 91) && !(charCode > 96 && charCode < 123)) {
            e.preventDefault();
        }
    }



});


function check_min_length(size,min_size)
{

    if(size <= min_size)
    {
        return true;
    }
    else 
    {
    return false;
    }
}

function check_max_length1(size,max_size)
{
    if(size > max_size )
    {
        return true;
    }
    else
    {
    return false;
    }

}


function check_email_pattern(email)
{
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    if(!pattern.test(email))
    {
    return true;
    } 
    else
    {
    return false;
    }
}

function check_confirm_email(email,confirm_email){
    if(email != confirm_email)
    {
        return true;
    }
    else {
        return false;
    }

}


function check_firstname(first_name,min_size,max_size) {
    var firstname_length = first_name.length;
    if (firstname_length <= min_size) {
            $("#error_firstName").html($('#fisrt_name_error_msg1').text());

        $('#error_firstName').css({"visibility":"visible"});
        return true;
    } else if (firstname_length > max_size) {

            $('#error_firstName').html($('#fisrt_name_error_msg2').text());

        $('#error_firstName').css({"visibility":"visible"});
        return true;
    } else {

        $('#error_firstName').css({"visibility":"hidden"});
        return false;
    }
}

function check_lastname(last_name,min_size,max_size) {
    var lastname_length = last_name.length;
    if (lastname_length <= min_size) {
            $("#error_lastName").html($('#last_name_error_msg1').text());
        $('#error_lastName').css({"visibility":"visible"});
        return true;
    } else
    if (lastname_length > max_size) {
            $('#error_lastName').html($('#last_name_error_msg2').text());

$('#error_lastName').css({"visibility":"visible"});
        return true;
    } else {

        $('#error_lastName').css({"visibility":"hidden"});
        return false;
    }
}

function check_email(email,min_size,max_size) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    // var email = $("#"+id).val();
    if (email.length <= min_size) {
            $("#error_email").html($('#email_error_msg1').text());

        $('#error_email').css({"visibility":"visible"});
        return true;
    } else if (email.length > max_size) {
            $("#error_email").html($('#email_error_msg2').text())

             $('#error_email').css({"visibility":"visible"});
        return true;
    } else if (!pattern.test(email)) {
            $("#error_email").html($('#email_error_msg3').text());

         $('#error_email').css({"visibility":"visible"});
        return true;
} else {

     $('#error_email').css({"visibility":"hidden"});
    return false;

}
}


function check_confirm_email(email , confirm_email , min_size, max_size) {
    // var email = $("#"+email_id).val();
    // var confirm_email = $('#'+confirm_email_id).val();
    if (confirm_email.length <= min_size) { 
            $("#error_confirm_email").html($('#confirm_email_error_msg1').text());
        
         $('#error_confirm_email').css({"visibility":"visible"});
        return true;
    } else if (email != confirm_email) {

            $("#error_confirm_email").html($('#confirm_email_error_msg2').text());


        $('#error_confirm_email').css({"visibility":"visible"});
        return true;
    } else
    if (confirm_email.length > max_size) {

            $("#error_confirm_email").html($('#email_error_msg3').text());


        $('#error_confirm_email').css({"visibility":"visible"});
        return true;

    } else {

       $('#error_confirm_email').css({"visibility":"hidden"});
        return false;
    }

}


function check_address1(address1,min_size,max_size) {
  //  var address1 = $('#'+id).val();
    if (address1.length <= min_size) {
            $('#error_address1').html($('#address_error_msg1').text());

$('#error_address1').css({"visibility":"visible"});
        return true;
    } else if (address1.length > max_size) {
            $('#error_address1').html($('#address_error_msg2').text());

       $('#error_address1').css({"visibility":"visible"});
        return true;
    } else {

        $('#error_address1').css({"visibility":"hidden"});
        return false;
    }
}

function check_city(city,min_size,max_size) {
   // var city = $('#'+id).val();
    if (city.length <= min_size) {
            $('#error_city').html($('#city_error_msg1').text());

        $('#error_city').css({"visibility":"visible"});
        return true;
    } else if (city.length > max_size) {
            $('#error_city').html($('#city_error_msg2').text());

         $('#error_city').css({"visibility":"visible"});
        return true;
    } else {

        $('#error_city').css({"visibility":"hidden"});
        return false;
    }
}



function check_zipcode(zipcode,min_size,max_size) {
    // var zipcode = $('#'+id).val();
    if (zipcode.length <= min_size) {

            $('#error_zipcode').html($('#zipcode_error_msg1').text());


        $('#error_zipcode').css({"visibility":"visible"});

        return true;
    } else if (zipcode.length > max_size) {

            $('#error_zipcode').html($('#zipcode_error_msg2').text());


       $('#error_zipcode').css({"visibility":"visible"});
        return true;
    } else {

        $('#error_zipcode').css({"visibility":"hidden"});
        return false;
    }

}

function check_comment(comment,min_size,max_size) {
   // var comment = $('#'+id).val();
    if (comment.length <= min_size) {

            $('#error_comment').html($('#comment_error_msg1').text());


        $('#error_comment').css({"visibility":"visible"});
        return true;
    } else if (comment.length > max_size) {

            $('#error_comment').html($('#comment_error_msg2').text());


        $('#error_comment').css({"visibility":"visible"});
        return true;
    } else {

        $('#error_comment').css({"visibility":"hidden"});

        return false;
    }

}



function check_state(state,min_size) {
   // var state = $('#'+id+' option:selected').val();
    if (state.length <= min_size) {

            $('#error_state').html($('#state_error_msg1').text());
        $('#error_state').css({"visibility":"visible"});
        return true;
    } else {

$('#error_state').css({"visibility":"hidden"});

        return false;
    }

}

function check_month(month,min_size) {
    
   // var month = $('#'+id+' option:selected').val();
    if (month.length <= min_size ) {

            $('#error_month').html($('#month_error_msg1').text())
              $('#error_month').show();
       // document.getElementById('error_month').style.visibility = "visible";
        return true;
    } else {
            $('#error_month').hide();

        //document.getElementById('error_month').style.visibility = "hidden";

        return false;
    }

}

function check_day(day,min_size) {
    // var day = $('#'+id+' option:selected').val();
    if (day.length <= min_size) {


            $('#error_day').html($('#day_error_msg1').text());
              $('#error_day').show();
       // document.getElementById('error_day').style.visibility = "visible";

        return true;
    } else {
$('#error_day').hide();
       // document.getElementById('error_day').style.visibility = "hidden";
        return false;
    }
}


function check_year(year,min_size) {
   // var year = $('#'+id+' option:selected').val();
    if (year.length <= min_size) {

            $('#error_year').html($('#year_error_msg1').text());

          $('#error_year').show();
       // document.getElementById('error_year').style.visibility = "visible";
        return true;
    } else {
          $('#error_year').hide();
        //document.getElementById('error_year').style.visibility = "hidden";

        return false;
    }

}

function check_gender(gender){
if(gender.length == 0){

$('#error_gender').css({"visibility": "visible"});
return true;
} else {
$('#error_gender').css({"visibility": "hidden"});
return false;
}
}


function check_check_box(value)
{
if(value == false){

$('#error_check_box').css({"visibility":"visible"});

return true;
} else {
 
 $('#error_check_box').css({"visibility":"hidden"});

return false;
}
}
function scrollToDiv(id) {
 
    $('html, body').animate({
        scrollTop: $("#"+id).offset().top
         }, 500);
    }




