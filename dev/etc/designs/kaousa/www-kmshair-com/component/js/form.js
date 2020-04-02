$(".form_field_checkbox").parent('div').addClass('check_box');
$(".form_button_submit").parent('div').addClass('center_align');
$(".check_box").click(function () {
    $(this).toggleClass("active_ico");
});
$('.form_row').each(function () {
    var label = $(this).find('.form_leftcollabel label').text();
    $(this).find('input').attr('placeholder', label);
    $(this).find('textarea').attr('placeholder', label);
});