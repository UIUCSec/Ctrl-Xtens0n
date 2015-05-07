var blockedlist = ["twitter.com", "yahoo.com"]

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (details.url.indexOf('sifaka') > 0){
	    	var server = 'http://localhost:8001'
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
			    if (xhr.readyState == 4) {
			        alert(xhr.responseText);
			    }
			}
			xhr.open("GET", server ,true);
			xhr.setRequestHeader('Content-Type', 'Chrome Message Test');
			xhr.send();
		}
       	},
    {urls: ["<all_urls>"]},
    ["blocking"]);