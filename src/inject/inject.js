
var settings = new Store();
settings.set('extStatus', false);


chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
		var firstHref = $("a[href^='http']").eq(0).attr("href");
		chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
	}
	}, 10);
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	//if  extension on
  	if(settings.get('extStatus')) {

	    if( request.message === "clicked_browser_action" ) {
	      var firstHref = $("a[href^='http']").eq(0).attr("href");

	      console.log(firstHref);
	      console.log(settings.get('ss'));
	    }

	    if( request.message === "copy_item" ) {
	    	storeItem()
	    }

  	}
  	else {
  		console.log('switch on the extension')
  	}

  }
);

function storeItem(){
	console.log('item-stored');
}