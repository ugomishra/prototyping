// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

/*  var settings = new Store("settings", {
    "sample_setting": "This is how you use Store.js to remember values"
}); */


//reflect extension state
var toggle = false;
function updateIcon(tab) {
  toggle = !toggle;
    if(toggle){
      chrome.browserAction.setIcon({path: "icons/onicon48.png", tabId:tab.id});
    }
    else{
      chrome.browserAction.setIcon({path: "icons/icon48.png", tabId:tab.id});
    }
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  updateIcon(tab);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      //chrome.tabs.create({"url": request.url});
    }
  }
);

function sendcontext(info,tab) {
  // console.log("Word " + info.selectionText + " was clicked.");
  // chrome.tabs.create({  
  //   url: "http://www.google.com/search?q=" + info.selectionText,
  // });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "copy_item"});
  });
}

chrome.contextMenus.create({
  title: "Copy This Element", 
  contexts:["all"], 
  onclick: sendcontext,
});