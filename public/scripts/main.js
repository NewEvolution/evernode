/* eslint strict: 0, no-unused-vars: 0, prefer-arrow-callback: 0 */
$('#logout').click(function logout () {
  $.post('/login?_method=delete');
});
