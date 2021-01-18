var blockedSites = {};

var gettingItem = browser.storage.sync.get('blockedUrlCounter');
gettingItem.then((res) => {
   blockedSites = res.blockedUrlCounter;
});

function updateValues(url) {
    blockedSites[url] = Math.max(0 , blockedSites[url] -1);
}

function isBlockedUrl(url) {
    for(var key in blockedSites) {
        if (url.includes(key) > 0)
            if (blockedSites[key] > 0)
                return key
            else 
                return ""
    }
    return ""
}

function handleUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.url != null) {
        var url = changeInfo.url;
        var name = isBlockedUrl(url);
        if (name != "") {
            updateValues(name);
            updatePopup();
            if (blockedSites[name] == 0){
                browser.tabs.update(tabId, { url: "BLOCKED.html" });
            }
        }
    }
    
}

browser.tabs.onUpdated.addListener(handleUpdated);
document.addEventListener("DOMContentLoaded", updatePopup);

function updatePopup() {
    browser.storage.sync.set({
        "blockedSites": blockedSites
      });
    let popup = document.getElementById('popup-content');
    var newDiv = document.createElement("div");
    for(var key in blockedSites) {
        newDiv.innerHTML += `<div class="button waste"> ${key} | ${blockedSites[key]}</div>`;
    }
    if (popup != null)
        popup.innerHTML = newDiv.innerHTML;
}