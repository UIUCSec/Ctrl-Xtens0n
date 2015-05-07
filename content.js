var currURL = window.location.toString();


$(document).ready(function(){


chrome.runtime.sendMessage({url: currURL}, $.noop)
});