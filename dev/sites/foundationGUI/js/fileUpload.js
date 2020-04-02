/**
 * Foundation GUI Common use.
 */
(function(window, foundationAPI) {
  'use strict';

  var $uploadFileSelected = $('.uploadFile__selected');
  var fileList = []; // fontファイルをsubmitまで溜め込む配列
  var formData = new FormData();


  // - Initialize

  (function() {
    if(window.File && window.FormData) {
      // bind
      var dropFileArea = document.getElementById('js-dropFile');
      if (!dropFileArea) return;
      dropFileArea.addEventListener('drop', onDrop, false);
      dropFileArea.addEventListener('dragover', dragOver, false);
      $uploadFileSelected.on('click', '.uploadFile__selected__icon', onClickDeleteFile);
      observeUploadFiles();
      postFile();
    } else {
      $('.uploadFile__ddArea__default').text('ご利用のブラウザではファイルアップロード機能はご利用できません');
    }
  }());

  /**
   * input type="file"のアップロードを監視する
   */
  function observeUploadFiles() {
    $('#uploadIconFiles').on('change', function() {
      var files = this.files;
      for (var i = 0, len = files.length; i < len; i++) {
        var file = files[i];
        validateUploadFile(file);
      }
    });
  }


  // - File API Event

  function onDrop(event) {
    event.stopPropagation();
    event.preventDefault();

    var files = event.dataTransfer.files;
    for (var i = 0, len = files.length; i < len; i++) {
      var file = files[i];
      validateUploadFile(file);
    }
  }

  function dragOver() {
    event.stopPropagation();
    event.preventDefault();
  }


  // - Fileアップロード・削除

  /**
   * ファイルサイズ, ファイル名のバリデーション
   */
  function validateUploadFile(file) {
    // すでに表示されているエラーメッセージを消す
    $('.uploadFile__errorMsg').empty();

    // ファイルサイズのチェック
    var fileCapacity = 100000;
    if (fileCapacity < file.size) {
      renderErrorMsg("100kb以上のファイルはアップロードできません");
      return;
    }

    // icomoon以外のファイルがアップされていないかチェックする
    var supportFileNames = [
      'icomoon.eot',
      'icomoon.svg',
      'icomoon.ttf',
      'icomoon.woff',
      'icomoon.woff2'
    ];
    for (var i = 0; i < supportFileNames.length; i++) {
      if (file.name === supportFileNames[i]) {
        updateFileList(file);
        renderFontIcon(file);
        return;
      }
    }
    renderErrorMsg("icomoonフォントファイル以外はアップロードできません");
  }

  // クリックしたFileを削除する
  function onClickDeleteFile() {
    var $target = $(this);
    var $li = $target.parents('.uploadFile__selected__list');
    var index = $('.uploadFile__selected__list').index(this.parentElement);
    deleteFile($li, index);
  }

  // アニメーション後、fileListのオブジェクトを削除
  function deleteFile($li, index) {
    fileList.splice(index, 1);
    $li.remove();
    $('#uploadIconFiles').replaceWith($('#uploadIconFiles').clone());
    observeUploadFiles();
  }

  /**
   * ファイルリストを更新する
   */
  function updateFileList(file) {
    var name = file.name;
    // 同名ファイルが選択済みの場合、古いファイルを削除してから追加する
    for (var i = 0; i < fileList.length; i++) {
      if (fileList[i].name == name) {
        var $li = $('.uploadFile__selected__list').eq(i);
        deleteFile($li, i);
        fileList.push(file);
        return;
      }
    }

    fileList.push(file);
  }

  /**
   * ファイルをpostする
   */
  function postFile() {

    var formData = new FormData();
    var designPath = $('#js-designPath').val();

    $('#js-submit').on('click', function() {
      // post用データ生成
      fileList.forEach(function(file) {
        formData.append('icon-files[]', file);
      });

      // ローディングを表示、submitボタンは非表示
      $(this).hide();
      $('.footer__button').append("<img id='loading' src='../images/loading.gif'>");

      $.ajax({
        type: 'POST',
        url: designPath + '/components/new_fonts',
        data: formData,
        processData: false,
        contentType: false
      })
      .done(function(data) {
        foundationAPI.showDialog_success();
        $('#js-inputForm').submit();
      })
      .fail(function() {
        foundationAPI.showDialog_error();
      })
      .always(function() {
        $('#loading').remove();
        $('#js-submit').show();
      });
    });
  }


  // - DOMの編集

  // アップロードしたアイコンをレンダリングする
  function renderFontIcon(fontFile) {
    var name = fontFile.name;
    var templ = '<li class="uploadFile__selected__list">' +
                '<a href="javascript:void(0);" class="uploadFile__selected__icon"></a>' +
                '<span>{{:name}}</span>' +
                '</li>';
    $.templates('fontIconTempl', templ);
    var uploadFileIcon = $.render.fontIconTempl(fontFile);
    $uploadFileSelected.append(uploadFileIcon);
  }

  function renderErrorMsg(msg) {
    $.templates('errorMsgTempl', '<p class="uploadFile__errorMsg__text">' + msg + '</p>');
    var html = $.render.errorMsgTempl();
    $('.uploadFile__errorMsg').append(html);
  }

})(window, window.foundationAPI || (window.foundationAPI = {}));
