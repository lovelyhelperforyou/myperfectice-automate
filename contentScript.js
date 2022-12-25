// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
chrome.runtime.onMessage.addListener(function (message) {
  if (message.msg == "Sending Data") {
    let ansKey = message.keys+1;
    console.log(ansKey);
    setTimeout( function () {
      document
        .querySelector(
          `#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.adaptive-question-box.bg-white.p-1.ng-star-inserted > div:nth-child(2) > mcq-question > div > div.question-answers.mb-0 > div:nth-child(${
            ansKey
          }) > div > label > span`
        )

        .click();
    }, 2000);
    setTimeout(() => {
      document
        .querySelector(
          "#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.d-block.d-lg-none.fixed-bottom.ng-star-inserted > div > a"
        )
        .click();
    }, 4000); setTimeout(() => {
      document
        .querySelector(
          "#page-wrapper > p-student > app-learning-test > div.adaptive-question > div > div > div.save-next-btn.d-block.d-lg-none.fixed-bottom.ng-star-inserted > a"
        )
        .click();
    }, 6000);
  }
  
  if (message.msg == "start") {
    chrome.runtime.sendMessage({ msg: "startPanel" });
  };
});