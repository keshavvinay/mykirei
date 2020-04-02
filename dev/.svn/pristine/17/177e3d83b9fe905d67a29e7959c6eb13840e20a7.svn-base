$(document).ready(function(){
  jQuery.ajax({
  url: 'http://ip-api.com/json',
  type: 'POST',
  dataType: 'json',
  success: function(location) {
           var CTA = ""; 
           var userLocale = location.countryCode; 
           var userLanguage = navigator.language.substring(0, 2);
           
           // getting page for country and languge combination
           var localorGlobal=  document.getElementById('usingForGlobalSite').value;
           var dynamicControl = userLanguage.toLowerCase() + '-' + userLocale.toLowerCase()+'PagePath';
           var pagePath = $('#'+dynamicControl).val(); 

           // country code array
           var countryList = {"UK":"en-ukPagePath" , "US":"en-usPagePath" , "DE":"de-dePagePath" , "AT":"de-atPagePath" , "FR":"fr-frPagePath",					  "NZ":"en-nzPagePath" , "NO":"nb-noPagePath" , "NL":"nl-nlPagePath" , "FI":"fi-fiPagePath" , "SE":"sv-sePagePath" , 				   "DK":"da-dkPagePath" , "IT":"it-itPagePath" , "ZA":"en-zaPagePath" , "AU":"en-auPagePath" , "TW":"zh-twPagePath" , 					"HK":"zh-hkPagePath" };
           
           var countryId =countryList[userLocale];
           var hiddenPagePath = $('#'+countryId).val(); 

           if(localorGlobal == "1"){
                // country and langauge code validation for(CH , CA , BE) only
                if (pagePath != undefined && pagePath != ''){
                    CTA = pagePath;
                }
                // country code validation for rest of the countries 
                else if (countryId != undefined && hiddenPagePath != undefined){
                    CTA  = hiddenPagePath;
                }
                else{
                    // default country
                    CTA  = document.getElementById("en-ukPagePath").value;
                }
           } else{
                // for local site
               CTA  = document.getElementById("productPagePath").value;
           }  
                
          // appending the url for href
        $("#call-to-action").attr("href", CTA);
        var buttonText = $("#call-to-action").text();
        if (buttonText == undefined || buttonText == '') {
            $("#call-to-action").hide();
        }
        
       },
       error: function(jqXhr, textStatus, errorMessage) {
        var buttonText = $("#call-to-action").text();
        if (buttonText == undefined || buttonText == '') {
            $("#call-to-action").hide();
        }
       }
  });
});
