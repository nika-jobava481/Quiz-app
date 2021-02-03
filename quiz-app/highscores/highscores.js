var highscoresList = document.querySelector("ul");
var highscores = JSON.parse(localStorage["highscores"]);


highscores.forEach(obj => {
    highscoresList.innerHTML += `<li>
                                    <span>${obj.Username}</span>
                                    <span>${obj.Score}</span>
                                </li>`
});