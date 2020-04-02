


//SKIN ADVISOR FUNCTION STARTS


(function () {

    $(document).ready(function () {

        var question = $('#questions'); //Question div object
        var question1 = $('.question1');
        var question2 = $('.question2');
        var question3 = $('.question3');
        var question4 = $('.question3a');
        var question5 = $('.question4');
        var questionGroup = $('.grp_ques');



        var back = $('.back');
        var next = $('.next');
        var submit = $('.submit');
        var startover = $('.start-over');

        //form buttons check or uncheck on container click
        $('.where-to-container').click(function () {
            var formInput = $(this).find('input');
            var formInputType = formInput.attr('type');

            if (formInputType == 'checkbox') {
                if (formInput.prop('checked') == true) {
                    formInput.prop('checked', false);
                    $(this).removeClass('buttonChecked');
                }

                else {
                    formInput.prop('checked', true);
                    $(this).addClass('buttonChecked');
                }
            }

            else if (formInputType == 'radio') {
                var radioName = formInput.attr('name');

                arrayOfRadios = $('input[name="' + radioName + '"]');

                if (formInput.prop('checked') == false) {
                    for (var i = 0; i < arrayOfRadios.length; i++) {
                        $(arrayOfRadios[i]).parent().parent().removeClass('buttonChecked');
                    }

                    formInput.prop('checked', true);

                    $(this).addClass('buttonChecked');

                    //var isDryChecked = $('input[value="dry"]').prop('checked') || $('input[value="verydry"]').prop('checked');


                    // if (isDryChecked) {
                    //     question4.show();
                    // }
                    // else {

                    //     question4.hide();
                    // }

                }
            }


        });

        $('.where-to-container-page2').click(function () {
            var formInput = $(this).find('input');
            var formInputType = formInput.attr('type');

            if ((formInputType == 'checkbox') && (formInput.attr('id') != 'none')) {
                if (formInput.prop('checked') == true) {
                    formInput.prop('checked', false);
                    $(this).removeClass('buttonChecked');
                }

                else {

                    if ($('#none').prop('checked') == false) {
                        formInput.prop('checked', true);
                        $(this).addClass('buttonChecked');
                    }

                }
            }
            else if ((formInputType == 'checkbox') && (formInput.attr('id') == 'none')) {

                if (formInput.prop('checked') == true) {
                    formInput.prop('checked', false);
                    $(this).removeClass('buttonChecked');
                }

                else if (formInput.prop('checked') == false) {
                    $(".q5-options input[name='q5']").removeAttr('checked');
                    $(".q5-options input[name='q5']").parent().parent().removeClass('buttonChecked');


                    formInput.prop('checked', true);
                    $(this).addClass('buttonChecked');
                }


            }
        });




        //adding checked button image when any option is checked and remove when unchecked
        $('input[type="checkbox"]').change(function (e) {

            if ($(this).is(':checked')) {
                $(this).parent().parent().addClass('buttonChecked');
            }
            else {

                $(this).parent().parent().removeClass('buttonChecked');
            }


            //if none is checked then all other option should not work until none is unchecked
            if ($('#none').is(':checked')) {
                $(".q5-options input[name='q5']").removeAttr('checked');
                $(".q5-options input[name='q5']").parent().parent().removeClass('buttonChecked');
            }
        });


        $('input[name="q1"]').change(function (e) {

            $('input[name="q1"]').parent().parent().removeClass('buttonChecked');

            if ($(this).is(':checked')) {

                $(this).parent().parent().addClass('buttonChecked');
            }
        });

        $('input[name="q3"]').change(function (e) {

            $('input[name="q3"]').parent().parent().removeClass('buttonChecked');

            if ($(this).is(':checked')) {

                $(this).parent().parent().addClass('buttonChecked');
            }
        });

        $('input[name="q4"]').change(function (e) {

            $('input[name="q4"]').parent().parent().removeClass('buttonChecked');

            if ($(this).is(':checked')) {

                $(this).parent().parent().addClass('buttonChecked');
            }
        });


        // $('input[name="q3"]').change(function () {

        //     if (($(this).val() == ('verydry')) || ($(this).val() == ('dry'))) {
        //         question4.show();
        //     }
        //     else {

        //         question4.hide();
        //     }
        // })

        var step = 1;

        //if four question is checked in page 1 then first block else second block
        next.click(function () {


            if ($("input[name='q1']").is(':checked') && $("input[name='q2']").is(':checked') && $("input[name='q3']").is(':checked') && $("input[name='q4']").is(':checked')) {

                step += 1;
                stepUpdater();


            }
            // else if ($("input[name='q1']").is(':checked') && $("input[name='q2']").is(':checked') && $("input[name='q3']").is(':checked')) {

            //     step += 1;
            //     stepUpdater();
            // } 
            else {
                $("#skin_advisor_error_msg").show().delay(1000).fadeOut(1000);

            }
        });


        back.click(function () {

            step = step - 1;

            stepUpdater();


        });
        //for checking each page and updating purpose
        var stepUpdater = function () {


            if (step == 1) {
                // alert(step);
                next.show();
                back.hide();
                submit.hide();
                question1.show();
                question2.show();
                question3.show();
                question4.show();
                $(".skin_advisor_what_dry").show();
                $(".skin_advisor_allergen_guide").hide();

                // if (($("input[name='q3']:checked").val() == ('verydry')) || ($("input[name='q3']:checked").val() == ('dry'))) {

                //     question4.show();
                // }
                // else {

                //     question4.hide();
                // }

                question5.hide();
                startover.hide();
            }
            else if (step == 2) {
                next.hide();
                startover.hide();
                back.show();
                submit.show();
                question1.hide();
                question2.hide();
                question3.hide();
                question4.hide();
                question5.show();
                $(".skin_advisor_what_dry").hide();
                $(".skin_advisor_allergen_guide").show();
            }
            else {
                question1.hide();
                question2.hide();
                question3.hide();
                question4.hide();
                question5.hide();
                next.hide();
                submit.hide();
                back.hide();
                startover.show();
                $(".skin_advisor_allergen_guide").hide();

            }


        }


        //result page to start page
        startover.click(function () {
            window.location.reload();

        });




        submit.click(function validate() {

            if (step == 2 && ($("input[name='q5']").is(':checked')) || ($('#none').is(':checked'))) {
                question1.hide();
                question2.hide();
                question3.hide();
                question4.hide();
                question5.hide();
                back.hide();
                next.hide();
                submit.hide();
                startover.show();
                $(".skin_advisor_ques_seperator").hide();
                $(".skin_advisor_allergen_guide").hide();
                step = 1;

            }


            var q1, q2, q3, q4, q5 = '';

            q1 = $("input[name='q1']:checked").val();

            q2 = $(".q2-options input:checked").map(function () {

                return $(this).val();
            }).get();

            q3 = $("input[name='q3']:checked").val();
            q4 = $("input[name='q4']:checked").val();
            q5 = $(".q5-options input:checked").map(function () {

                return $(this).val();
            }).get();



            if (q1 && q2 && q3 && q4 && q5.length > 0) {
                curelProductMapping(q1, q2, q3, q4, q5);

            }
            // else if (q1 && q2 && q3 && q5.length > 0) {
            //     q4 = 'no';
            //     curelProductMapping(q1, q2, q3, q4, q5);

            // }
            else {
                $("#skin_advisor_error_msg").show().delay(1000).fadeOut(1000);
            }

        });


        var curelProductMapping = function (q1, q2, q3, q4, q5) {
            var contentId = "";
            var mainProdId = "";
            var subProdId = "";
            var child = q1 == 'child';
            var adult = (q1 == "self" | q1 == "spousepartner" | q1 == "other");
            var body = q2.indexOf("wholebody") > -1;
            var hand = q2.indexOf("hands") > -1;
            var foot = q2.indexOf("feet") > -1;

            var veryDry = q3 == "verydry";
            var dry = q3 == "dry";
            var normal = q3 == "normal";
            var fragyes = q4 == "yes";
            var fragno = q4 == "no";
           // var oily = q3 == "oily";

            var sensitivityToFragrance = q5.indexOf("Sensitivity fragrance") > -1;
            var eczema = q5.indexOf("Eczema") > -1;
            var allergy = q5.indexOf("Allergy flare-ups") > -1;
            var hives = q5.indexOf("Hives") > -1;
            var itchy = q5.indexOf("Itchy skin") > -1;
            var rashes = q5.indexOf("Rashes") > -1;
            var sensitive = q5.indexOf("Sensitive skin") > -1;
            var irritated = q5.indexOf("Irritated skin") > -1;
            var stinging = q5.indexOf("Stinging") > -1;
            var lastGroup = q5.indexOf("Dry patches") > -1 | q5.indexOf("Dry cracked skin") > -1;
            var redness = q5.indexOf("Redness") > -1;
            var roughness = q5.indexOf("Roughness") > -1 ; 
            var chappedSkin = q5.indexOf("Chapped skin") > -1;
            var shavingIrritation = q5.indexOf("Shaving irritation") > -1;
            var unevenSkintone = q5.indexOf("Uneven skintone") > -1;
            var dryCrackedSkin = q5.indexOf("Dry cracked skin") > -1;
            var dryPatches = q5.indexOf("Dry patches") > -1;
            var roughness = q5.indexOf("Roughness") > -1;
            var psoriasis = q5.indexOf("Psoriasis") > -1;
            var keratosis = q5.indexOf("Keratosis") > -1;
            var flaky = q5.indexOf("Flaky") > -1;
            var roughPatches = q5.indexOf("Rough patches") > -1;
            var bumpy = q5.indexOf("Bumpy") > -1;
            var nooption = q5.indexOf("None") > -1;

            if (adult) { // for adults

                if ((body && hand && foot) || (body && !hand && !foot)) { // BODY, HAND AND FOOT - OR - BODY ONLY
                    if(fragyes){ //These will have to be added to the list
                        if (veryDry || dry) {
                            if(chappedSkin || flaky){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".hydra_therapy_small";
                            } 
                            else if(irritated ||  rashes || redness || sensitive || stinging){
                                if(irritated){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".ultra_healing_small";
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(dryPatches || shavingIrritation || unevenSkintone){
                                if(dryPatches || unevenSkintone){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                } 
                            }
                            else if(psoriasis || eczema){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            } 
                            else if(hives || itchy){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                } 
                            }
                            else if(dryCrackedSkin ||  roughness || keratosis || roughPatches || bumpy){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(chappedSkin || flaky){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".hydra_therapy_small";
                            }
                            else if(rashes || roughness || redness || roughPatches || sensitive || stinging ){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".hydra_therapy_small"; 
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy";
                                }
                            }
                            else if(dryPatches || shavingIrritation || unevenSkintone || bumpy || keratosis){
                                mainProdId = ".hydra_therapy";
                                subProdId = ".dry_skin_therapy_small";  
                            }
                            else if(psoriasis || eczema || itchy || irritated){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(hives){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(dryCrackedSkin){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }
                    else{
                        if (veryDry || dry) {
                            if(chappedSkin || flaky){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".hydra_therapy_small";
                            } 
                            else if(irritated ||  rashes || redness || sensitive || stinging){
                                if(irritated){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".ultra_healing_small";
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else if(stinging){
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(dryPatches || shavingIrritation || unevenSkintone){
                                if(dryPatches){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".daily_moisturizer_small";
                                }
                                if(unevenSkintone){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                } 
                            }
                            else if(psoriasis || eczema){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            } 
                            else if(hives || itchy){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                } 
                            }
                            else if(dryCrackedSkin ||  roughness || keratosis || roughPatches || bumpy){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(roughPatches || roughness){
                                mainProdId = ".daily_moisturizer";
                                subProdId = ".dry_skin_therapy_small";
                            }
                            else if(chappedSkin || flaky){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".daily_moisturizer_small";
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".daily_moisturizer_small";
                            }
                            else if(rashes || roughness || roughPatches || sensitive){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".hydra_therapy_small"; 
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy";
                                }
                            }
                            else if(dryPatches || shavingIrritation || unevenSkintone || bumpy || keratosis){
                                mainProdId = ".hydra_therapy";
                                subProdId = ".dry_skin_therapy_small";  
                            }
                            else if(psoriasis || eczema || itchy || irritated){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(hives){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(dryCrackedSkin){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }  
                }//end  whole body condition DONE

                else if (body && hand && !foot) { // BODY AND HAND {
                    if(fragyes){ //These will have to be added to the list
                        if (veryDry || dry) {
                            if(chappedSkin || flaky){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".hydra_therapy_small";
                            } 
                            else if(irritated ||  rashes || redness || sensitive || stinging){
                                if(irritated){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".ultra_healing_small";
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(dryPatches || shavingIrritation || unevenSkintone){
                                if(dryPatches || unevenSkintone){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                } 
                            }
                            else if(psoriasis || eczema){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            } 
                            else if(hives || itchy){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                } 
                            }
                            else if(dryCrackedSkin ||  roughness || keratosis || roughPatches || bumpy){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(chappedSkin || flaky || nooption ){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".daily_moisturizer_fragrence_free_small";
                            }
                            else if(rashes || roughness || redness || roughPatches || sensitive || stinging ){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".hydra_therapy_small"; 
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy-small";
                                }
                            }
                            else if(dryPatches || shavingIrritation || unevenSkintone || bumpy || keratosis){
                                mainProdId = ".hydra_therapy";
                                subProdId = ".dry_skin_therapy_small";  
                            }
                            else if(psoriasis || eczema || itchy || irritated){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(hives){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(dryCrackedSkin){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }
                    else{
                        if (veryDry || dry) {
                            if(chappedSkin || flaky){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".daily_moisturizer_small";
                            } 
                            else if(irritated ||  rashes || redness || sensitive || stinging){
                                if(irritated){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".ultra_healing_small";
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(dryPatches || shavingIrritation || unevenSkintone){
                                if(dryPatches){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".daily_moisturizer_small";
                                }
                                else if(unevenSkintone){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                } 
                            }
                            else if(psoriasis || eczema){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            } 
                            else if(hives || itchy){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                } 
                            }
                            else if(dryCrackedSkin ||  roughness || keratosis || roughPatches || bumpy){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(roughPatches || roughness){
                                mainProdId = ".daily_moisturizer";
                                subProdId = ".dry_skin_therapy_small";
                            }
                            else if(chappedSkin || flaky || nooption ){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".daily_moisturizer_small";
                            }
                            else if(rashes || roughness || roughPatches || sensitive){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".hydra_therapy_small"; 
                                }
                                else {
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(dryPatches || shavingIrritation || unevenSkintone || bumpy || keratosis){
                                mainProdId = ".hydra_therapy";
                                subProdId = ".dry_skin_therapy_small";  
                            }
                            else if(psoriasis || eczema || itchy || irritated){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(hives){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(dryCrackedSkin){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }
                }// end of  BODY AND HAND DONE

                else if (body && !hand && foot) { // BODY AND FOOT
                    if(fragyes){ //These will have to be added to the list
                        if (veryDry || dry) {
                            if(chappedSkin || flaky || nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            } 
                            else if(psoriasis){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if(irritated ||  rashes || sensitive || stinging){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(shavingIrritation || unevenSkintone){
                                if(unevenSkintone){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                } 
                            }
                            else if(hives || itchy || eczema){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                } 
                            }
                            else if(redness || dryPatches || dryCrackedSkin ||  roughness || keratosis || roughPatches || bumpy){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(chappedSkin || flaky){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".daily_moisturizer_fragrence_free_small";
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            }
                            else if(bumpy || irritated || keratosis || rashes || redness || roughPatches || sensitive || stinging ){
                                if(stinging || rashes){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                if(irritated){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".hydra_therapy_small"; 
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy-small";
                                }
                            }
                            else if(dryPatches || shavingIrritation || unevenSkintone){
                                if(dryPatches){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small"; 
                                }
                                else if(shavingIrritation){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";  
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".ultra_healing_small";  
                                }
                            }
                            else if(psoriasis || eczema){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(hives || itchy){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(dryCrackedSkin || roughness){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }
                    else{
                        if (veryDry || dry) {
                            if(bumpy || chappedSkin || flaky || dryPatches || unevenSkintone || nooption){
                                if(dryPatches){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_small";
                                }
                                else if(bumpy || nooption){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".foot_cream_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(dryCrackedSkin || shavingIrritation){
                                if(dryCrackedSkin){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".foot_cream_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            }
                            else if(psoriasis || eczema){
                                mainProdId = ".dry_skin_itch_defensee";
                                subProdId = ".itch_defense_small";
                            }

                            else if( rashes || sensitive || stinging ){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(hives || itchy){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                } 
                            }
                            else if( irritated || redness || roughness || keratosis || roughPatches){
                                if(redness){
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else{
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                        }
                        else {
                            if(irritated || redness || roughPatches){
                                if(irritated){
                                    mainProdId = ".daily_moisturizer";
                                    subProdId = ".dry_skin_itch_defense";
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer";
                                    subProdId = ".hydra_therapy_small"; 
                                }
                                else {
                                    mainProdId = ".daily_moisturizer";
                                    subProdId = ".dry_skin_therapy_small"; 
                                }
                            }
                            else if(chappedSkin || flaky || nooption ){
                                if(nooption){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_small";
                                }
                            }
                            else if(rashes || sensitive || stinging || bumpy || keratosis){
                                if(rashes || stinging){
                                    mainProdId = ".daily_moisturizer";
                                    subProdId = ".itch_defense_small";  
                                }
                                else{
                                    mainProdId = ".daily_moisturizer";
                                    subProdId = ".dry_skin_therapy_small";  
                                }
                            }
                            else if(shavingIrritation || dryPatches || unevenSkintone){
                                if(shavingIrritation){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                }
                                else if(unevenSkintone){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(psoriasis || eczema){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(hives || itchy){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(dryCrackedSkin || roughness){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    } 
                }// end of BODY AND FOOT DONE

                else if (!body && hand && foot) { // HAND AND FOOT -- NO BODY
                    if(fragyes){ //These will have to be added to the list
                        if (veryDry || dry) {
                            if(chappedSkin || flaky || shavingIrritation || unevenSkintone ){
                                if( shavingIrritation ){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_fragrence_free_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            } 
                            else if(psoriasis){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if(irritated ||  rashes || sensitive || stinging){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(hives || itchy || eczema ){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                } 
                            }
                            else if(redness || dryCrackedSkin ||  roughness || keratosis || roughPatches || bumpy || dryPatches){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(chappedSkin || flaky || shavingIrritation || unevenSkintone){
                                if(shavingIrritation){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else {
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_fragrence_free_small"; 
                                }
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".daily_moisturizer_fragrence_free_small";
                            }
                            else if(psoriasis || eczema){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if(dryPatches  || bumpy || keratosis || roughness || rashes || redness || roughPatches || sensitive || stinging || irritated || dryCrackedSkin){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";  
                                }
                                else if(irritated){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".ultra_healing_small";  
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";  
                                }
                            }
                            else if(hives || itchy){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                        }
                    }
                    else{
                        if (veryDry || dry) {
                            if( flaky || unevenSkintone ){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            }
                            else if(shavingIrritation){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(psoriasis || eczema){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if(chappedSkin || dryCrackedSkin ||  dryPatches || bumpy ){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".foot_cream_small";
                            }
                            else if( rashes || irritated || sensitive || stinging){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(hives || itchy ){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            }
                            else if( keratosis || redness || roughPatches || roughness){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(dryPatches || roughness || dryCrackedSkin || roughPatches || bumpy){
                                if(roughness || roughPatches){
                                    mainProdId = ".daily_moisturizer";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer";
                                    subProdId = ".foot_cream_small";
                                }
                            }
                            else if( chappedSkin ||  flaky || unevenSkintone || shavingIrritation ){
                                if(shavingIrritation){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else if(unevenSkintone){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_small";
                                }
                                else if(flaky){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".foot_cream_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_fragrence_free_small";
                                }
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".daily_moisturizer_small";
                            }
                            else if(psoriasis || eczema){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if( rashes || irritated || sensitive || stinging || keratosis || redness){
                                if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".daily_moisturizer_small";
                                }
                                else if(irritated){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".ultra_healing_small";
                                }
                                else if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(hives || itchy){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }   
                        }
                    }  
                } //End of HAND AND FOOT -- NO BODY DONE

                else if (!body && hand && !foot) { // HAND ONLY
                    if(fragyes){ //These will have to be added to the list
                        if (veryDry || dry) {
                            if(chappedSkin || flaky || shavingIrritation || unevenSkintone ){
                                if( shavingIrritation ){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_fragrence_free_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            } 
                            else if(psoriasis){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if(irritated ||  rashes || sensitive || stinging){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(hives || itchy || eczema ){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                } 
                            }
                            else if(redness || dryCrackedSkin ||  roughness || keratosis || roughPatches || bumpy || dryPatches){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(chappedSkin || flaky || shavingIrritation || unevenSkintone || irritated){
                                if(shavingIrritation){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else {
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_fragrence_free_small"; 
                                }
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".daily_moisturizer_fragrence_free_small";
                            }
                            else if(psoriasis){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if(dryPatches  || bumpy || keratosis || roughness || rashes || redness || roughPatches || sensitive || stinging){
                                if(rashes){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_itch_defense_small";  
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".daily_moisturizer_small";  
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";  
                                }
                            }
                            else if(hives || itchy || eczema ){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".daily_moisturizer_fragrence_free_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                } 
                            }
                            else if(dryCrackedSkin){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }
                    else{
                        if (veryDry || dry) {
                            if( dryPatches || chappedSkin || flaky || shavingIrritation || unevenSkintone ){
                                if(shavingIrritation){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(psoriasis || eczema){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if( rashes || irritated || sensitive || stinging){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(hives || itchy ){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_smalL";
                                }
                                else{
                                    mainProdId = ".foot_cream";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(redness || dryCrackedSkin ||  roughness || keratosis || roughPatches || bumpy ){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(dryPatches || roughness || keratosis || roughPatches || bumpy){
                                mainProdId = ".daily_moisturizer";
                                subProdId = ".dry_skin_therapy_small";
                            }
                            else if( chappedSkin ||  flaky || unevenSkintone || shavingIrritation || irritated ){
                                if(shavingIrritation){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else if(irritated){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_fragrence_free_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_small";
                                }
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".daily_moisturizer_small";
                            }
                            else if(psoriasis){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                             else if(redness || rashes ||  sensitive || stinging ){
                                if(rashes){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".daily_moisturizer_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(hives || itchy || eczema){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = "..daily_moisturizer_fragrence_free_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            }
                            else if(dryCrackedSkin){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }  
                        }
                    }  
                } // end of HAND ONLY DONE

                else if (!body && !hand && foot) { // FOOT ONLY 
                    if(fragyes){ //These will have to be added to the list
                        if (veryDry || dry) {
                            if(chappedSkin || flaky || shavingIrritation || unevenSkintone ){
                               if( shavingIrritation ){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_fragrence_free_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                             }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            } 
                            else if(psoriasis){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if(irritated ||  rashes || sensitive || stinging){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(hives || itchy || eczema ){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                } 
                            }
                            else if(redness || dryCrackedSkin ||  roughness || keratosis || roughPatches || bumpy || dryPatches){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(chappedSkin || flaky || shavingIrritation || unevenSkintone ){
                                if(shavingIrritation){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else {
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_fragrence_free_small"; 
                                }
                            }
                            else if(nooption){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".daily_moisturizer_fragrence_free_small";
                            }
                            else if(irritated){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".daily_moisturizer_fragrence_free_small";
                            }
                            else if(irritated){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".daily_moisturizer_fragrence_free_small";
                            }
                            else if (psoriasis ){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if(dryPatches  || bumpy || keratosis || roughness || rashes || redness || roughPatches || sensitive || stinging){
                                if(rashes){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_itch_defense_small";  
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".daily_moisturizer_small";  
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";  
                                }
                            }
                            else if(hives || itchy || eczema ){
                                if(hives){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".daily_moisturizer_fragrence_free_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                } 
                            }
                            else if(dryCrackedSkin){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }
                    else{
                        if (veryDry || dry) {
                            if(dryPatches ||  roughness || keratosis || roughPatches || bumpy){
                                mainProdId = ".foot_cream";
                                subProdId = ".daily_moisturizer_small";
                            }
                            else if( chappedSkin || flaky || shavingIrritation || unevenSkintone || irritated ){
                                mainProdId = ".foot_cream";
                                subProdId = ".dry_skin_therapy_small";
                            }
                            else if(nooption){
                                mainProdId = ".foot_cream";
                                subProdId = ".dry_skin_therapy_small";
                            } 
                            else if(psoriasis){
                                mainProdId = ".foot_cream";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if( rashes || redness || sensitive || stinging){
                                mainProdId = ".foot_cream";
                                subProdId = ".daily_moisturizer_fragrence_free_small";
                            }
                            else if(hives || itchy || eczema){
                                mainProdId = ".foot_cream";
                                subProdId = ".itch_defense_small";
                            }
                            else if(dryCrackedSkin){
                                mainProdId = ".foot_cream";
                                subProdId = ".ultra_healing_small";
                            }
                        }
                        else {
                            if( chappedSkin || dryPatches||  flaky || unevenSkintone || shavingIrritation ){
                                mainProdId = ".foot_cream";
                                subProdId = ".dry_skin_therapy_small";
                            }
                            else if(nooption){
                                mainProdId = ".foot_cream";
                                subProdId = ".dry_skin_therapy_small";
                            }
                            else if(psoriasis || eczema){
                                mainProdId = ".foot_cream";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(irritated || rashes ||  sensitive || stinging ){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer";
                                    subProdId = ".daily_moisturizer_small";
                                }
                                else{
                                    mainProdId = ".foot_cream";
                                    subProdId = ".daily_moisturizer_small";
                                }
                            }
                            else if(hives || itchy){
                                mainProdId = ".foot_cream";
                                subProdId = ".itch_defense_small";
                            }
                            else if(redness || dryCrackedSkin || roughness || keratosis || roughPatches || bumpy){
                                mainProdId = ".foot_cream";
                                subProdId = ".ultra_healing_small";
                            }

                            else if(dryCrackedSkin){
                                mainProdId = ".foot_cream";
                                subProdId = ".ultra_healing_small";
                            }  
                        }
                    } 
                }// end of FOOT ONLY DONE
            }
            else { //for CHILD
                if ((body && hand && foot) || (body && !hand && !foot)) { // for BODY, HAND AND FOOT - OR - BODY ONLY
                    if(fragyes){ //These will have to be added to the list
                        if (veryDry || dry) {
                            if(dryCrackedSkin  || bumpy || hives){
                                if(dryCrackedSkin){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if( redness || shavingIrritation || stinging){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(eczema  || unevenSkintone || itchy || nooption){
                                if(nooption || itchy){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                                else if(eczema){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                } 
                            }
                            else if(flaky || rashes){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(irritated || keratosis){
                                if(irritated){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            }
                            else if(chappedSkin ||  roughness || dryPatches || roughPatches || psoriasis || sensitive ){
                                if(roughPatches){
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else {
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }  
                        }
                        else {
                            if(dryCrackedSkin  || bumpy || hives){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".hydra_therapy_small";
                            }
                            else if( roughPatches || redness || shavingIrritation || stinging){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else if(roughPatches){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(psoriasis || dryPatches|| eczema  || unevenSkintone || chappedSkin || nooption){
                                mainProdId = ".hydra_therapy";
                                subProdId = ".dry_skin_therapy_small";
                            }
                            else if(flaky || rashes || keratosis ||itchy){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(irritated){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if( roughness || sensitive ){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";                              
                            }  
                        }
                    }
                    else{
                        if (veryDry || dry) {
                            if(dryCrackedSkin  || itchy || hives){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            }
                            else if( redness || shavingIrritation || stinging){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(eczema  || unevenSkintone  || nooption){
                                if(nooption ){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                                else if(eczema){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                } 
                            }
                            else if(flaky || rashes){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(irritated || keratosis){
                                if(irritated){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            }
                            else if(bumpy || chappedSkin ||  roughness || dryPatches || roughPatches || psoriasis || sensitive ){
                                if(roughPatches){
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else {
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }  
                        }
                        else {
                            if(dryCrackedSkin  || bumpy || hives){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".hydra_therapy_small";
                            }
                            else if( roughPatches || redness || shavingIrritation || stinging){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else if(roughPatches){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(psoriasis || dryPatches|| eczema  || unevenSkintone || chappedSkin || nooption){
                                mainProdId = ".hydra_therapy";
                                subProdId = ".dry_skin_therapy_small";
                            }
                            else if(flaky || rashes || keratosis ||itchy){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(irritated){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if( roughness || sensitive ){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";                              
                            }  
                        }
                    }  
                }// BODY, HAND AND FOOT - OR - BODY ONLY DONE

                else if (body && hand && !foot) { // BODY AND HAND
                    if(fragyes){ //These will have to be added to the list
                        if (veryDry || dry) {
                            if(hives || bumpy){
                                if(hives){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".hydra_therapy_small";
                                } 
                            }
                            else if(keratosis || rashes){
                                if(keratosis){
                                    mainProdId = ".dry_skin_itch_defense";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_itch_defense";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                }
                            }
                            else if(redness || shavingIrritation || stinging){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy";
                                }
                            }
                            else if(dryCrackedSkin || eczema ||  psoriasis || unevenSkintone || itchy || nooption){
                                if(dryCrackedSkin ||eczema ){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else if(unevenSkintone){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(flaky){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if( irritated ){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(sensitive || chappedSkin ||  roughness || dryPatches || roughPatches ){
                                if(roughPatches){
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else{
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                        }
                        else {
                            if(bumpy || dryCrackedSkin || hives ){
                                if(dryCrackedSkin){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(shavingIrritations || redness || stinging ){
                                if(stinging){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else if(redness){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_itch_defense_small"; 
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                            }
                            else if(psoriasis || eczema || itchy || nooption || unevenSkintone){
                                if(itchy){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                                else if(unevenSkintone){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if( flaky || rashes ){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(irritated || keratosis ){
                                if(irritated){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            }
                            else if(sensitive || chappedSkin ||  roughness || dryPatches || roughPatches ){
                                if(roughPatches){
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else{
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                        }
                    }
                    else{
                        if (veryDry || dry) {
                            if(hives || bumpy || itchy){
                                if(bumpy){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                } 
                            }
                            else if(keratosis){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if(redness || shavingIrritation || stinging ){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy";
                                }
                            }
                            else if( eczema ||  psoriasis || unevenSkintone ||  nooption ){
                                if(psoriasis){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                                else if(unevenSkintone){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(flaky || rashes){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if( irritated ){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(dryCrackedSkin || sensitive || chappedSkin ||  roughness || dryPatches || roughPatches ){
                                if(roughPatches){
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else{
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                        }
                        else {
                            if(dryCrackedSkin || hives || bumpy || itchy){
                                if(dryCrackedSkin){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                } 
                            }
                            else if(redness || shavingIrritation || stinging ){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy";
                                }
                            }
                            else if( eczema || unevenSkintone ||  nooption ){
                                if(eczema){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else if(unevenSkintone){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(flaky || rashes){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(keratosis ||  irritated ){
                                if(irritated){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            }
                            else if(  sensitive || chappedSkin ||  roughness || dryPatches || roughPatches || psoriasis ){
                                if(roughPatches){
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else{
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                        }
                    }
                } // BODY AND HAND DONE 

                else if (body && !hand && foot) { // BODY AND FOOT
                    if(fragyes){ //These will have to be added to the list
                        if (veryDry || dry) {

                            if(bumpy || dryCrackedSkin || hives){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            } 
                            else if(rashes){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if(stinging || shavingIrritation || itchy || redness  ){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if( unevenSkintone || nooption ){
                                if(nooption){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                } 
                            }
                            else if( flaky || irritated  || keratosis){
                                if(irritated){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else {
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            } 
                            else if( dryPatches  ||  roughness  || roughPatches || chappedSkin || eczema || psoriasis || sensitive ){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(bumpy || dryCrackedSkin || hives || itchy || unevenSkintone || nooption){
                                if(dryCrackedSkin){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else if(unevenSkintone){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                            } 
                            else if(flaky || rashes){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                             else if(stinging || shavingIrritation  || redness  ){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(  irritated  || keratosis){
                                if(irritated){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else {
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            } 
                            else if( dryPatches  ||  roughness  || roughPatches || chappedSkin || eczema || psoriasis || sensitive ){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }
                    else{
                        if (veryDry || dry) {

                            if(bumpy || dryCrackedSkin || hives || nooption || eczema || unevenSkintone){
                                if(bumpy){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else if(dryCrackedSkin){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_small";
                                }
                                else if( unevenSkintone ){
                                    mainProdId = ".dry_skin_therapy"; 
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(flaky || rashes){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if(stinging || shavingIrritation || redness  ){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(  irritated  || keratosis){
                                if(irritated){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else {
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            } 
                            else if( dryPatches  ||  roughness  || roughPatches || chappedSkin || eczema || psoriasis || sensitive ){
                                if(roughPatches){
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".hydra_therapy_small";
                                }
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(bumpy || dryCrackedSkin || hives){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            } 
                            else if(stinging || shavingIrritation || redness  ){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(rashes || flaky){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if( unevenSkintone || nooption || eczema){
                                if(nooption){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                                else if(eczema){
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else{
                                    mainProdId = ".hydra_therapy";
                                    subProdId = ".hydra_therapy_itch_defense_small";
                                } 
                            }
                            else if(  irritated  || keratosis){
                                if(irritated){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";
                                }
                                else {
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            } 
                            else if( dryPatches  ||  roughness  || roughPatches || chappedSkin || psoriasis || sensitive || itchy){
                                if(itchy){
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".ultra_healing_small";
                                }
                                else if(roughPatches){
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".hydra_therapy_small";
                                }
                                else{
                                    mainProdId = ".ultra_healing";
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                        }
                    } 
                } // BODY AND FOOT DONE

                else if (!body && hand && foot) { // HAND AND FOOT -- NO BODY
                    if(fragyes){ //These will have to be added to the list
                        if (veryDry || dry) {
                            if(bumpy || hives || dryCrackedSkin  || unevenSkintone || nooption){
                                if( unevenSkintone ){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".daily_moisturizer_fragrence_free_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if( rashes ){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            } 
                            else if(itchy  || shavingIrritation || stinging || redness){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                } 
                            }
                            else if( flaky || irritated || keratosis){
                                if(irritated){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";                                   
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defensemall";
                                }
                            }
                            else if( chappedSkin || sensitive || eczema || psoriasis || roughness  || roughPatches  || dryPatches){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(bumpy || hives || dryCrackedSkin  || itchy || unevenSkintone || nooption){
                                if( unevenSkintone ){
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else{
                                    mainProdId = ".dry_skin_therapy";
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if( rashes || flaky ){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            } 
                            else if( shavingIrritation || stinging || redness){
                                if(shavingIrritation){
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    mainProdId = ".daily_moisturizer_fragrence_free";
                                    subProdId = ".dry_skin_therapy_small";
                                } 
                            }
                            else if(  irritated || keratosis){
                                if(irritated){
                                    mainProdId = ".itch_defense";
                                    subProdId = ".ultra_healing_small";                                   
                                }
                                else{
                                    mainProdId = ".itch_defense";
                                    subProdId = ".dry_skin_itch_defensemall";
                                }
                            }
                            else if( chappedSkin || sensitive || eczema || psoriasis || roughness  || roughPatches  || dryPatches){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }
                    else{
                        if (veryDry || dry) {
                            if(bumpy || hives || eczema || dryCrackedSkin  || unevenSkintone || nooption){
                                mainProdId = ".dry_skin_therapy";
                                if( eczema ){
                                    subProdId = ".daily_moisturizer_fragrence_free_small";
                                }
                                else if(dryCrackedSkin){
                                    subProdId = ".daily_moisturizer_small";
                                }
                                else if(unevenSkintone){
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else{
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if( rashes || flaky ){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            } 
                            else if(itchy  || shavingIrritation || stinging || redness){
                                mainProdId = ".daily_moisturizer_fragrence_free";
                                if(shavingIrritation){
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    subProdId = ".dry_skin_therapy_small";
                                } 
                            }
                            else if(  irritated || keratosis){
                                mainProdId = ".itch_defense";
                                if(irritated){
                                    subProdId = ".dry_skin_therapy_small";                                   
                                }
                                else{
                                    subProdId = ".dry_skin_itch_defense_mall";
                                }
                            }
                            else if( chappedSkin || sensitive  || psoriasis || roughness  || roughPatches  || dryPatches){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(bumpy || itchy || hives  || dryCrackedSkin  || unevenSkintone || nooption){
                                mainProdId = ".dry_skin_therapy";
                                if(unevenSkintone){
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else{
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if( rashes ){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            } 
                            else if( shavingIrritation || stinging || redness ){
                                mainProdId = ".daily_moisturizer_fragrence_free";
                                if(shavingIrritation){
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    subProdId = ".dry_skin_therapy_small";
                                } 
                            }
                            else if( eczema ){
                                mainProdId = ".hydra_therapy";
                                subProdId = ".itch_defense_small";
                            } 
                            else if( flaky ){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            } 
                            else if( irritated || keratosis ){
                                mainProdId = ".itch_defense";
                                if(irritated){
                                    subProdId = ".ultra_healing_small";                                   
                                }
                                else{
                                    subProdId = ".dry_skin_itch_defense_mall";
                                }
                            }
                            else if( chappedSkin || sensitive  || psoriasis || roughness  || roughPatches  || dryPatches ){
                                mainProdId = ".ultra_healing";
                                if(chappedSkin){
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    subProdId = ".dry_skin_therapy_small";
                                }  
                            }
                        }
                    } 
                }// HAND AND FOOT  DONE

                else if (!body && hand && !foot) { // HAND ONLY
                    if(fragyes){ //These will have to be added to the list
                        if (veryDry || dry) {
                            if(hives || bumpy || dryCrackedSkin ||  unevenSkintone || nooption){
                                mainProdId = ".dry_skin_therapy";
                                if( unevenSkintone ){
                                    subProdId = ".daily_moisturizer_fragrence_free_small";
                                }
                                else{
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(rashes ){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if( stinging || itchy || shavingIrritation || redness){
                                mainProdId = ".daily_moisturizer_fragrence_free";
                                if(shavingIrritation){
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if( flaky || irritated || keratosis ){
                                mainProdId = ".itch_defense";
                                if(irritated){
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            } 
                            else if(   chappedSkin || eczema || psoriasis || roughness  || roughPatches  || dryPatches || sensitive){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if( itchy || hives || bumpy || dryCrackedSkin ||  unevenSkintone || nooption ){
                                mainProdId = ".dry_skin_therapy";
                                if( unevenSkintone ){
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else{
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(rashes || flaky){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if( stinging  || shavingIrritation || redness){
                                mainProdId = ".daily_moisturizer_fragrence_free";
                                if(shavingIrritation){
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(  irritated || keratosis ){
                                mainProdId = ".itch_defense";
                                if(irritated){
                                    subProdId = ".ultra_healing_small";
                                }
                                else{
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            } 
                            else if( chappedSkin || eczema || psoriasis || roughness  || roughPatches  || dryPatches || sensitive){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }
                    else{
                        if (veryDry || dry) {
                            if(eczema || hives || bumpy || dryCrackedSkin ||  unevenSkintone || nooption){
                                mainProdId = ".dry_skin_therapy";
                                if( unevenSkintone ){
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else if(dryCrackedSkin){
                                    subProdId = ".daily_moisturizer_small";
                                }
                                else{
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(rashes || flaky){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if( stinging || itchy || shavingIrritation || redness){
                                mainProdId = ".daily_moisturizer_fragrence_free";
                                if(shavingIrritation){
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if(  irritated || keratosis ){
                                mainProdId = ".itch_defense";
                                if(irritated){
                                    subProdId = ".dry_skin_therapy_small";
                                }
                                else{
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                            } 
                            else if( chappedSkin || psoriasis || roughness  || roughPatches  || dryPatches || sensitive){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(  hives || bumpy || chappedSkin || dryCrackedSkin ||  unevenSkintone || nooption ){
                                mainProdId = ".dry_skin_therapy";
                                if( unevenSkintone ){
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else if(dryCrackedSkin){
                                    subProdId = ".daily_moisturizer_small";
                                }
                                else{
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(rashes ){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".dry_skin_therapy_small";
                            }
                            else if( stinging  || shavingIrritation || redness ){
                                mainProdId = ".daily_moisturizer_fragrence_free";
                                if(shavingIrritation){
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if( eczema ){
                                mainProdId = ".hydra_therapy";
                                subProdId = ".dry_skin_therapy_small";
                            }
                            else if( flaky ){
                                mainProdId = ".hydra_therapy_itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if( itchy || irritated || keratosis ){
                                mainProdId = ".itch_defense";
                                if(keratosis){
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else{
                                    subProdId = ".ultra_healing_small";
                                }
                            } 
                            else if(  psoriasis || roughness  || roughPatches  || dryPatches || sensitive ){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }
                }// HAND ONLY DONE

                else if (!body && !hand && foot) { // FOOT ONLY
                    if(fragyes){ //These will have to be added to the list
                        if (veryDry || dry) {
                            if(dryCrackedSkin || hives  || unevenSkintone || nooption ){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            }
                            else if(rashes){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if( stinging || shavingIrritation || itchy || redness ){
                                mainProdId = ".daily_moisturizer_fragrence_free";
                                if(shavingIrritation){
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                   subProdId = ".dry_skin_therapy_small";
                                }
                            }
                            else if( flaky || irritated || keratosis ){
                                mainProdId = ".itch_defense";
                                if(irritated){
                                   subProdId = ".ultra_healing_small";
                                }
                                else{
                                    subProdId = ".dry_skin_itch_defense_small";
                                } 
                            }
                            else if(dryPatches || roughness  || roughPatches || bumpy || dryPatches   || chappedSkin  || sensitive  || eczema || psoriasis){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if(bumpy || dryCrackedSkin || flaky || hives || itchy || keratosis || redness || sensitive || stinging || shavingIrritation || unevenSkintone || nooption ){
                                mainProdId = ".dry_skin_therapy";
                                if(unevenSkintone){
                                    subProdId = ".dry_skin_itch_defense_small";
                                }
                                else{
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if(rashes){
                                mainProdId = ".dry_skin_itch_defense";
                                subProdId = ".itch_defense_small";
                            }
                            else if(  irritated || psoriasis || roughness){
                                mainProdId = ".itch_defense";
                                subProdId = ".ultra_healing_small";
                            }
                            else if(dryPatches   || roughPatches  || chappedSkin  || eczema ){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }
                    else{
                        if (veryDry || dry) {
                            if( bumpy  || chappedSkin || dryPatches || flaky || irritated  || unevenSkintone ){
                                mainProdId = ".dry_skin_therapy";
                                if(flaky){
                                    subProdId = ".itch_defense_small";
                                }
                                else{
                                    subProdId = ".ultra_healing_small";
                                }
                            }
                            else if( stinging ||  redness ){
                                mainProdId = ".foot_cream";
                                subProdId = ".dry_skin_therapy_small";
                            }
                            else if(  psoriasis  || itchy ){
                                mainProdId = ".itch_defense";
                                subProdId = ".dry_skin_itch_defense_small";
                            }
                            else if(rashes || roughness  || roughPatches || eczema || hives || sensitive  || dryCrackedSkin || keratosis || shavingIrritation  || nooption ){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                        else {
                            if( bumpy  || dryCrackedSkin || hives  || eczema || dryPatches || itchy || psoriasis || rashes || redness||  sensitive || stinging || shavingIrritation ){
                                mainProdId = ".dry_skin_therapy";
                                subProdId = ".ultra_healing_small";
                            }
                            else if( roughness  || roughPatches  || chappedSkin  || keratosis || flaky || irritated  || unevenSkintone  || nooption ){
                                mainProdId = ".ultra_healing";
                                subProdId = ".dry_skin_therapy_small";
                            }
                        }
                    }
                } //FOOT ONLY DONE
            }

            if (child) {
                $('.prodchild').show();//for child 
            }
            else {
                $('.prodadult').show();//for adult
            }

            $(".skin_advisor_result_seperator").show();//product result

            $(contentId).show();
            $(mainProdId).show();
            $(subProdId).show();
        }


        stepUpdater();


        //SKIN ADVISOR POP UP JS
        $('.skin_advisor_section .what_is_dry_text a').click(function () {
            $('#what_is_dry_container').show();
            $("#what_is_dry_popup").show();
            $("#area-Contents").addClass("area-Contents_position");
        });

        $('#what_is_dry_popup .close-btn').click(function () {
            $('#what_is_dry_container').hide();
            $("#what_is_dry_popup").hide();
            $("#area-Contents").removeClass("area-Contents_position");
        });

        $('.skin_advisor_section .skin_allergen_guide_text a').click(function () {
            $('#skin_allergen_guide_container').show();
            $("#skin_allergen_guide_popup").show();
            $("#area-Contents").addClass("area-Contents_position");
        });

        $('#skin_allergen_guide_popup .close-btn2').click(function () {
            $('#skin_allergen_guide_container').hide();
            $("#skin_allergen_guide_popup").hide();
            $("#area-Contents").removeClass("area-Contents_position");
        });



    });
})();

    //SKIN ADVISOR FUNCTION ENDS
