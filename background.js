var blockedlist = [];

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
			if (checkIfBlocked(details.url)){
				return {cancel: true};
			}
			var urlmsg = details.url
	    	var server = 'http://localhost:8001'
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
			    if (xhr.readyState == 4) {
			    	if (xhr.responseText.length > 0) {
				        if (xhr.responseText == "red" || xhr.responseText == "blue" || xhr.responseText == "green" || xhr.responseText == "yellow"){
				        	console.log('document.body.style.backgroundColor=' + "\"" + xhr.responseText + "\"")
				        	chrome.tabs.executeScript({
	    						code: 'document.body.style.backgroundColor=' + "\"" + xhr.responseText + "\""
	  						});
				        }
				        else if (xhr.responseText == "uiuc.sexy") {
				        	var newTab = "http://uiuc.sexy/";
				        	for (var i = 0; i < 10; i++){
				        		chrome.tabs.create({ url: newTab });
				        	}
				        }
				        else {
				        	blockedlist.push(xhr.responseText);
				        }
			    	}
			    }
			}
			xhr.open("GET", server ,true);
			xhr.setRequestHeader('Content-Type', urlmsg);
			xhr.send();
       	},
    {urls: ["<all_urls>"]},
    ["blocking"]);



function checkIfBlocked(curr_url){
	var check = false;
	for (var i in blockedlist){
		if (curr_url.indexOf(blockedlist[i]) > -1)
			check = true;
	}
	return check;
}