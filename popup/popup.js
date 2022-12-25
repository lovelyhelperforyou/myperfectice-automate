console.log("I am just a script!");

document.addEventListener("DOMContentLoaded", runFunction);

function runFunction() {
  document.getElementById("button").addEventListener("click", sendKeys);
  function sendKeys() {

        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {msg:"start"});
          }
        );
  }
}
