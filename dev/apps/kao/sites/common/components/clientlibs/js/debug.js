
$(document).ready(function(){
  console.log('debugのready');

  var $template = null;

  loadTemplates(function(){
    replaceTemplate();
  });


  /**
   * テンプレートhtmlのロード.
   */
  function loadTemplates(callback) {

    $.get("/apps/kao/sites/common/components/content/_template.html", function(tmpl) {
      $template = $(tmpl);
      callback();
    });
    /*
    $.get("/content/core/_template.html", function(tmpl) {
      $template = $(tmpl);
      callback();
    });
    */
  }


  /**
   * テンプレート使用箇所の置換.
   */
  function replaceTemplate() {

    while (true) {

      var $debugTmpl = $(".debug-tmpl");
      if($debugTmpl.length == 0) break;

      $debugTmpl.each(function(index, el) {
        //ターゲットがどこにいても大丈夫なように
        var $target;
        $target = $template.find("#tmpl-" + $(this).attr('data-tmpl'));
        if ($target.length < 1) {
          $target = $('body').find("#tmpl-" + $(this).attr('data-tmpl'));
        }
        $(this).replaceWith($target.tmpl({}));
      });
      /*
      var $debugTmpl = $(".tmpl");
      if($debugTmpl.length == 0) break;

      $debugTmpl.each(function(index, el) {

        var $target;
        $target = $template.find("#tmpl-" + $(this).attr('data-tmpl'));
        if ($target.length < 1) {
          $target = $('body').find("#tmpl-" + $(this).attr('data-tmpl'));
        }
        $(this).replaceWith($target.tmpl({}));
      });
      */
    }

    console.log('tmpl');
  }


  // $('a[href^=#]').click(function() {
  //   // スクロールの速度
  //   var speed = 400; // ミリ秒
  //   // アンカーの値取得
  //   var href= $(this).attr("href");
  //   // 移動先を取得
  //   var target = $(href == "#" || href == "" ? 'html' : href);
  //   // 移動先を数値で取得
  //   var position = target.offset().top;
  //   // スムーススクロール
  //   $('body,html').animate({scrollTop:position}, speed, 'swing');
  //   return false;
  // });

});
