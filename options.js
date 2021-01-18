function saveOptions() {
    var str = document.querySelector("#urls").value;
    var lines = str.split(/\r?\n/)
        .filter(str => str.length > 0)
    
    var blockedUrlCounter = {};    
    lines.forEach((s) => {
        var split = s.split(",");
        blockedUrlCounter[split[0]] = split[1];
    });

    browser.storage.sync.set({
        "blockedUrlCounter": blockedUrlCounter,
        "original": str
      });
}

function displayValues() {
    browser.storage.sync.get({"original": ""}).then((items) => {
        document.querySelector("#urls").value = items.original;
    }, (err) => {
        message(err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    displayValues();
    document.querySelector("#save").addEventListener("click", saveOptions);
});