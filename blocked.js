var gettingItem = browser.storage.sync.get('blockedSites');
gettingItem.then((res) => {
    var blockedSites = res.blockedSites;
    let popup = document.getElementById('popup-content');
    var newDiv = document.createElement("div");
    for(var key in blockedSites) {
        newDiv.innerHTML += `<div class="button waste"> ${key} | ${blockedSites[key]}</div>`;
    }
    if (popup != null)
        popup.innerHTML = newDiv.innerHTML;
});
