/* eslint strict: 0, no-unused-vars: 0, prefer-arrow-callback: 0 */
$('#logout').click(function () {
  $.post('/login?_method=delete');
});

$('body').on('click', '.checkbox', function () {
  if (this.checked) {
    $(this).next('.checkline').addClass('struck');
  } else {
    $(this).next('.checkline').removeClass('struck');
  }
});
