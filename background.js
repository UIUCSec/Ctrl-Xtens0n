var blockedlist = ["twitter.com", "yahoo.com"]

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
			var url = details.url
	    	var server = 'http://localhost:8001'
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
			    if (xhr.readyState == 4) {
			        if (xhr.responseText == "red" || xhr.responseText == "blue" || xhr.responseText == "green" || xhr.responseText == "yellow"){
			        	console.log('document.body.style.backgroundColor=' + "\"" + xhr.responseText + "\"")
			        	chrome.tabs.executeScript({
    						code: 'document.body.style.backgroundColor=' + "\"" + xhr.responseText + "\""
  						});
			        }
			    }
			}
			xhr.open("GET", server ,true);
			xhr.setRequestHeader('Content-Type', url);
			xhr.send();
       	},
    {urls: ["<all_urls>"]},
    ["blocking"]);