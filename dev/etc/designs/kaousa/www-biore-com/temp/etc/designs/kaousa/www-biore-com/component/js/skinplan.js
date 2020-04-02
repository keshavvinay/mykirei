//Skin plan
 
(function () {

    var choices = $(".skin-choice");
    var skinTypeContainer = $(".skin-type-container-js");
    var q1 = $(".question1");
    var q2 = $(".question2");
    var q3 = $(".question3");
    var q4 = $(".question4");
    var subResult = $(".sub-result"); 
    var subResultCharcol = $(".sub-result-charcol");
    var subResultBakingSoda = $(".sub-result-baking-soda");
    var landing = $(".landing-section");
    var subResultBtnPack = $(".sub-result-btn-pack");
    var finalResults = $(".final-results");

    var skinPlan = {
        skinType: "",
        currentStatus: "landing",
        q1: {
            option1Products: [0, 1, 2, 3, 4, 5, 6],
            option2Products: [7, 8, 9, 10, 11]
        },
        q2: {
            option1Products: [0, 1, 2, 5, 7, 8, 10],
            option2Products: [2, 3, 4, 5, 8, 9, 10]
        },
        q3: {
            option1Products: [6,11],
            option2Products: []
        },
        finalProducts: function(){
            var weeklyHeading = $(".final-results-heading.weekly");
            var dailyHeading = $(".final-results-heading.daily");
            var lastEleOfDaily = $("._"+skinPlan.dailyMatches[skinPlan.dailyMatches.length-1]);
            $.each(skinPlan.dailyMatches,function(num,obj){
                if(num == 0){
                   $("._"+obj).insertAfter(dailyHeading);
                   }
                else{
                    $("._"+obj).insertAfter($("._"+skinPlan.dailyMatches[num-1]));
                }
                $("._"+obj).show().addClass("daily-js");
            });
            
            $.each(skinPlan.weeklyMatches,function(num,obj){
                weeklyHeading.insertAfter(lastEleOfDaily);
                if(num == 0){
                   $("._"+obj).insertAfter(weeklyHeading);
                   }
                else{
                    $("._"+obj).insertAfter($("._"+skinPlan.weeklyMatches[num-1]));
                }
                $("._"+obj).show().addClass("weekly-js");
            });
        },
        dailyProducts: [0, 3, 6, 7, 9, 11],
        weeklyProducts: [1, 2, 4, 5, 8, 10],
        possibleOptions: [],
        currentChoices: [],
        initialMatch: [],
        dailyMatches:[],
        weeklyMatches:[],
        animate: function(ele,customDelay){
            customDelay = customDelay || 500;
            ele.each(function(num,obj){
                setTimeout(function(){
                    $(obj).addClass("animate");
                },customDelay);
            });
            return; 
        },
        nextOverlay: function(prev,next){
            skinTypeContainer.addClass("animating");
            
            if((this.currentStatus == "q1") || (this.currentStatus == "q2") || (this.currentStatus == "q3") || (this.currentStatus == "q4") || (this.currentStatus == "finalResults")){
                skinTypeContainer.addClass("white-bg");
               }
            else{
                skinTypeContainer.removeClass("white-bg");
            }
            
            setTimeout(function(){
                skinTypeContainer.removeClass("animating");
                prev.hide();
                next.show();
                //show sub result btn pack
                if((skinPlan.currentStatus == "subResultCharcol") || (skinPlan.currentStatus == "subResultBakingSoda")){
                    subResultBtnPack.show();
                    subResult.find("img").addClass("animate");
                }
                else{
                    subResultBtnPack.hide();
                }
                if(skinPlan.currentStatus == "q4"){
                    skinPlan.animate(next.find(".userAge li"),300);
                }
                else if(skinPlan.currentStatus != "finalResults"){
                    skinPlan.animate(next.find("img"),300);
                }
            },500);
        },
        
        arrayPopulator: function(input1,input2,isCommon){
            isCommon = isCommon || false;
            var doFinal = false;
            
            for (var i = 0; i < input1.length; i++) {
                if (input2.indexOf(input1[i]) == -1 && !isCommon) { 
                    input2.push(input1[i]);
                }
                else if(input2.indexOf(input1[i]) != -1 && this.initialMatch.indexOf(input1[i]) == -1 && isCommon){
                    doFinal = true;
                    this.initialMatch.push(input1[i]);
                }
            }
            if(doFinal){
                for(var j=0; j<this.initialMatch.length; j++){
                    
                    if(this.dailyProducts.indexOf(this.initialMatch[j]) != -1){
                        this.dailyMatches.push(this.initialMatch[j]);
                    }
                    else if(this.weeklyProducts.indexOf(this.initialMatch[j]) != -1){
                        this.weeklyMatches.push(this.initialMatch[j]);
                    }
                }
                this.currentStatus = "finalResults";
                this.finalProducts();
                this.nextOverlay(skinTypeContainer,finalResults);
            }
        }
    };

    var userData = {
        age: "",
        ageMap: {
            _18 : "Under 18",
            _18_24 : "18-24",
            _25_34 : "25-34",
            _35 : "35+"
        },        
        updateAge: function(element){
            for(var i in this.ageMap){
                if(element.hasClass(i)){
                    this.age = this.ageMap[i];
                    return this.age;
                }
            }
        }
    };

    var subResults = function (options, skintype) {
        
        if (skintype == "oily") {
            skinPlan.currentStatus = "subResultCharcol";
            skinPlan.nextOverlay(q1,subResultCharcol);
        } else if (skintype == "combination") {
            skinPlan.currentStatus = "subResultBakingSoda";
            skinPlan.nextOverlay(q1,subResultBakingSoda);
        }
        
        return skinPlan.arrayPopulator(options,skinPlan.possibleOptions,false);
        
    }

    //ANIMATION and DELAY
    $(document).ready(function(){
        setTimeout(function(){
            skinPlan.animate($("#start img"));
        },1000);
    });
    
    //EVENTS
    $("#start").click(function () {
        skinPlan.currentStatus = "q1";
        skinPlan.nextOverlay(landing,q1);
    });
    $("#startOver").click(function () {
        window.location.reload();
    });
    $("#continue").click(function () {
        skinPlan.currentStatus = "q2";
        skinPlan.nextOverlay(subResult,q2);
    });
    
    $(".userAge li").click(function(e){
        var _this = $(this).find("span");
        userData.updateAge(_this);
        skinPlan.arrayPopulator(skinPlan.possibleOptions, skinPlan.currentChoices, true);
        skinPlan.currentStatus = "finalResults";
    });

    choices.click(function (e) {
        var currentChoice = $(this);

        if (currentChoice.hasClass("oily")) {
            subResults(skinPlan.q1.option1Products, "oily");
            return;
        }

        if (currentChoice.hasClass("combination")) {
            subResults(skinPlan.q1.option2Products, "combination");
            return;
        }
        
        if(currentChoice.hasClass("spot")){
            skinPlan.arrayPopulator(skinPlan.q2.option1Products, skinPlan.currentChoices, false);
            skinPlan.currentStatus = "q3";
            skinPlan.nextOverlay(q2,q3);
            return;
        }
        
        if(currentChoice.hasClass("spotless")){
            skinPlan.arrayPopulator(skinPlan.q2.option2Products, skinPlan.currentChoices, false);
            skinPlan.currentStatus = "q3";
            skinPlan.nextOverlay(q2,q3);
            return; 
        }
        
        if (currentChoice.hasClass("make-up")) {
            skinPlan.arrayPopulator(skinPlan.q3.option1Products, skinPlan.currentChoices, false);
            skinPlan.currentStatus = "q4";
            skinPlan.nextOverlay(q3,q4);
            return;
        }
        
        if (currentChoice.hasClass("no-make-up")) {
            skinPlan.arrayPopulator(skinPlan.q3.option2Products, skinPlan.currentChoices, false);
            skinPlan.currentStatus = "q4";
            skinPlan.nextOverlay(q3,q4);
            return;
        }
    });
    $('.print-button .g-ButtonP__list__item a').click(function () {
        window.print();
    })
})();