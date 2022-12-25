chrome.devtools.network.onRequestFinished.addListener(function(request){
    if(request.request.url == "https://api-ng2.myperfectice.com/api/v1/learningTest/getQuestion"){
        request.getContent(function(content){
            var ans = JSON.parse(content);
            console.log(ans.answers);
            if (i != -1) {
                console.log("Correct Answer is: " + i);
            }
        })
    }
}
)
function Correct(answers){
    for(let i=0;i<answers.length;i++){
        if(answers[i].isCorrectAnswer){
            return i
        }
    }
    return -1;
}