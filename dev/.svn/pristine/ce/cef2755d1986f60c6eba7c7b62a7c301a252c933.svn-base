(function(){
    
$(document).ready(function(){


    var question = $('#question'); //Question div object
    var question1=$('.question1');
    var question2=$('.question2');
    var question3=$('.question3');
    var question4=$('.question4');

    var questionGroup=$('.grp_ques');


    var result=$('.result');
    var back=$('.back');
    var next=$('.next');
    var submit=$('.submit');
    var startover=$('.start-over');

    var q1,q2,q3,q4 = '';

    var step=-1;

    //SKIN SELECTION
    $("input[name='q1']").click(function(){

        $("input[name='q1']").parent().removeClass('activeRadio');
        $(this).parent().addClass('activeRadio');
    });

    if(step==4){
     submit.show();
    }

     if(step==-1){
     next.hide();
    }

    $('.find-product').click(function() {

$('.banner-groupbox').hide();
        step=1;
          stepUpdater();


    });

    next.click(function(){

if(step==1 && !$("input[name='q1']").is(':checked')){
$('#error-ques-1').show();
     }

if(step==2 && !$("input[name='q2']").is(':checked')){
$('#error-ques-2').show();
     }

if(step==3 && !$("input[name='q3']").is(':checked')){
$('#error-ques-3').show();
     }





           if(step==1 && $("input[name='q1']").is(':checked')){

            q1=$("input[name='q1']:checked").val();
            $('#error-ques-1').hide();
             step+=1;
        }

        else if(step==2 && $("input[name='q2']").is(':checked')){

            q2=$("input[name='q2']:checked").val();
            $('#error-ques-2').hide();
            step+=1;

        }

        else if(step==3 && $("input[name='q3']").is(':checked')){

            q3=$("input[name='q3']:checked").val();
              $('#error-ques-3').hide();
              step+=1;

        }

        stepUpdater();

    });


    back.click(function(){

        step=step-1;

        stepUpdater();


    });


    var stepUpdater=function(){

 questionGroup.hide();

$('.glow-advisor-section .counter-groupbox .g-Text').show();


if(step==1){
       back.hide();
$('.counter-groupbox .g-Text').removeClass('is-active');
$('#counter-1').addClass('is-active');
    }
    else
    {
	back.show();

    }

if(step==4){
          next.hide();
            submit.show();
$('.counter-groupbox .g-Text').removeClass('is-active');
$('#counter-4').addClass('is-active');

        }
        else{
          next.show();
            submit.hide();

        }

        if(step==1){
            question1.show();
$('.counter-groupbox .g-Text').removeClass('is-active');
$('#counter-1').addClass('is-active');

         }
        else if(step==2){
            question2.show();
$('.counter-groupbox .g-Text').removeClass('is-active');

$('#counter-2').addClass('is-active');

        }

        else if(step==3){
           question3.show();
$('.counter-groupbox .g-Text').removeClass('is-active');

$('#counter-3').addClass('is-active');

        }

        else if(step==4){
          question4.show();
$('.counter-groupbox .g-Text').removeClass('is-active');

$('#counter-4').addClass('is-active');

        }

        else{


           questionGroup.hide();
           next.hide();
            submit.hide();
            back.hide();
            if(step==5){
$('.glow-advisor-section .counter-groupbox .g-Text').hide();
$('.glow-advisor-section .result-share-pack').show();

                startover.show();
            }
else if(step==-1){
$('.glow-advisor-section .counter-groupbox .g-Text').hide();

}


        }

    }

//result page to start page
startover.click(function(){

location.reload();
    });





submit.click(function validate(){

 if(step==4 && !$("input[name='q4']").is(':checked')){
$('#error-ques-4').show();
}

    if(step==4 && $("input[name='q4']").is(':checked')){

        q4=$("input[name='q4']:checked").val();
        step=0;

        }

    	$('.hidden-results').hide();


    if(q1 && q2 && q3 && q4)
    {

        step=5;
        productMapping(q1,q2,q3,q4);


    }
   

    stepUpdater();

});



    var productMapping=function(q1,q2,q3,q4)
    {
        var productId="";

        var skinFair = (q1 == "veryfair" | q1 == "fair" | q1 == "mediumfair");
        var skinTan = (q1 == "medium" | q1 == "medium tan" | q1 == "tan");
        var body = q2 == 'body';
        var both = q2 == 'both';
        var face = q2 == 'face';
        var sun = q3 == 'yes';
        var jumpStart = q4 == 'jumpstart';
        var driesQuickly = q4 == 'driesquickly';
        var longLasting = q4 == 'longlasting';
        var tonesTightens = q4 == 'tonetighten';
        var instantSun = q4 == 'instantsun';

        if(instantSun)
        {
          if(skinFair)
          {
            productId=".pd2";
          }
          else
          {
            productId=".pd9";
          }

        }

         else {
           if(skinFair)
           {
            if (body) {
                if(sun) 
                {// with sun protection
                    if (jumpStart) {
                        productId=".pd1";
                    } else if (driesQuickly) {
                        productId=".pd1";
                    } else if (longLasting) {
                        productId=".pd1";
                    } else if (tonesTightens) {
                       productId=".pd1";
                    }


                } 
                else 
                { // without sun protection
                    if (jumpStart) {
                        productId=".pd4";
                    } else if (driesQuickly) {
                        productId=".pd5";
                    } else if (longLasting) {
                        productId=".pd3";
                    } else if (tonesTightens) {
                        productId=".pd6";
                    }
                }

            }
        else if (face) 
           { // face with fair skin
                if (sun) { //with sun protection
                    if (jumpStart) {
                        productId=".pd7";
                    } else if (driesQuickly) {
                         productId=".pd7";
                    } else if (longLasting) {
                         productId=".pd7";
                    } else if (tonesTightens) {
                         productId=".pd7";
                    }
                } else { //without sun protection
                   if (jumpStart) {
                         productId=".pd7";
                    } else if (driesQuickly) {
                         productId=".pd7";
                    } else if (longLasting) {
                        productId=".pd7";
                    } else if (tonesTightens) {
                         productId=".pd7";
                    }
                }
            }

               else if (both) {//both with fair skin
                if (sun) {//with sun protection

                    if (jumpStart) {
                        productId=".pd1";
                    } else if (driesQuickly) {
                        productId=".pd1";
                    } else if (longLasting) {
                        productId=".pd1";
                    } else if (tonesTightens) {
                        productId=".pd1";
                    }
                } else { // without sun protection

                    if (jumpStart) {
                       productId=".pd4";
                    } else if (driesQuickly) {
                        productId=".pd5";
                    } else if (longLasting) {
                       productId=".pd3";
                    } else if (tonesTightens) {
                        productId=".pd6";
                    }
                }
            }




    }
      else
           {
         if(skinTan)
           {
            if (body) {
                if(sun) 
                {// body with sun protection
                    if (jumpStart) {
                        productId=".pd8";
                    } else if (driesQuickly) {
                        productId=".pd8";
                    } else if (longLasting) {
                        productId=".pd8";
                    } else if (tonesTightens) {
                       productId=".pd8";
                    }


                } 
                else 
                { // body without sun protection
                    if (jumpStart) {
                        productId=".pd11";
                    } else if (driesQuickly) {
                        productId=".pd12";
                    } else if (longLasting) {
                        productId=".pd10";
                    } else if (tonesTightens) {
                        productId=".pd13";
                    }
                }

            }

          else if (face) 
           { // face with tan skin
                if (sun) { //face with sun protection
                    if (jumpStart) {
                        productId=".pd14";
                    } else if (driesQuickly) {
                         productId=".pd14";
                    } else if (longLasting) {
                         productId=".pd14";
                    } else if (tonesTightens) {
                         productId=".pd14";
                    }
                } else { // face without sun protection
                   if (jumpStart) {
                         productId=".pd14";
                    } else if (driesQuickly) {
                         productId=".pd14";
                    } else if (longLasting) {
                        productId=".pd14";
                    } else if (tonesTightens) {
                         productId=".pd14";
                    }
                }
            }
               else if (both) {// both with tan skin
                if (sun) {// both with sun protection

                    if (jumpStart) {
                        productId=".pd8";
                    } else if (driesQuickly) {
                        productId=".pd8";
                    } else if (longLasting) {
                        productId=".pd8";
                    } else if (tonesTightens) {
                        productId=".pd8";
                    }
                } else { // both without sun protection

                    if (jumpStart) {
                       productId=".pd11";
                    } else if (driesQuickly) {
                        productId=".pd12";
                    } else if (longLasting) {
                       productId=".pd10";
                    } else if (tonesTightens) {
                        productId=".pd13";
                    }
                }
            }


         }




     }

  }
           $(productId).show();//show product on the bsasis of combination

 }

stepUpdater();

});
})();