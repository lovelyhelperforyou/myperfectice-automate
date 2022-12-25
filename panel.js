chrome.devtools.network.onRequestFinished.addListener(function (request) {
  if (
    request.request.url == 
    "https://api-ng2.myperfectice.com/api/v1/learningTest/getQuestion"
    
    // "https://api-ng2.myperfectice.com/api/v1/learningTest/getPracticeSet/5da2351e42e6085038581511?referenceType=testseries&referenceId=5da2351f42e6085038581567"
  ) {
    // request.getContent(function (content, encoding) {
    request.getContent(function (content) {
      var myobj = JSON.parse(content);
      console.log(myobj.answers);
      let i = findCorrectAns(myobj.answers);
      if (i != -1) {
        console.log("Correct Answer is: " + i);
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, {
              msg: "Sending Data",
              keys: i,
            });
          }
        );
      }
    });
  }
});

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
chrome.runtime.onMessage.addListener(function (message) {
  if (message.msg == "startPanel") {
    console.log("now I will get started in the Panel!");
    chrome.devtools.network.onRequestFinished.addListener(function (request) {
      // request.getContent(function (content, encoding) {
      request.getContent(function (content) {
        if (isJsonString(content)) {
          var myobj = JSON.parse(content);
          console.log(myobj.question);
          if (myobj.question) {
            let i = findCorrectAns(myobj.question.answers);
            console.log("Correct Answer is: " + i);
            chrome.tabs.query(
              { active: true, currentWindow: true },
              function (tabs) {
                var activeTab = tabs[0];
                //Sending message to the active tab
                chrome.tabs.sendMessage(activeTab.id, {
                  msg: "Sending Data",
                  keys: i,
                });
              }
            );
          }
        }
      });
    });
  }
});

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function findCorrectAns(answers) {
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].isCorrectAnswer) {
      return i;
    }
  }
  return -1;
}