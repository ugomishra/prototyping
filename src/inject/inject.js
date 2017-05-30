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
	  
	console.log("message se nt");
    if( request.message === "clicked_browser_action" ) {
      var firstHref = $("a[href^='http']").eq(0).attr("href");

      console.log(firstHref);
    }
  }
);