var saveBtn = document.querySelector("#save-btn");
var username = document.querySelector(".username");
var finalScore = document.querySelector(".final-score");

var maxHighscores = 5;

if (localStorage["highscores"] == undefined) {
    localStorage["highscores"] = "[]";
}
var highscores = JSON.parse(localStorage["highscores"]) || [];
console.log(highscores)
var lastScore = localStorage["recentScore"];
finalScore.textContent = lastScore;


username.addEventListener("keyup", function () {
    saveBtn.disabled = username.value != "" ? false : true;
});

saveBtn.addEventListener("click", function (e) {
    e.preventDefault();

    var score = {
        Username: username.value,
        Score: Number(lastScore)
    }
    highscores.push(score);

    highscores.sort((a, b) => +b.Score - (+a.Score));
    
    highscores.splice(5);

    localStorage["highscores"] = JSON.stringify(highscores);
    window.location.assign("../index.html");
});
