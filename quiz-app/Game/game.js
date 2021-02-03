var questionElement = document.querySelector(".question");
var choiceElems = document.querySelectorAll(".text");
var choices = Array.from(document.querySelectorAll(".text"));
var questionCounterText = document.querySelector(".question-counter-text");
var scoreText = document.querySelector(".score-text");
var progresBarLevel = document.querySelector(".progress-bar-level")

var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questions = [
    {
        question: "Which HTML tab do U need to connect JS file?",
        choice1: "<link>",
        choice2: "<javascript>",
        choice3: "<script>",
        choice4: "<js>",
        correctAnswer: 3
    },
    {
        question: "Which is the correct syntax to link JS file to HTML?",
        choice1: "<script href='./main.js'>",
        choice2: "<script src='./main.js'>",
        choice3: "<script name='./main.js'>",
        choice4: "<script file='./main.js'>",
        correctAnswer: 2
    },
    {
        question: "How to write 'Hello world' in alert box?",
        choice1: "alertBox('Hello world')",
        choice2: "msg('Hello world')",
        choice3: "notify('Hello world')",
        choice4: "alert('Hello world')",
        correctAnswer: 4
    },
    {
        question: "what value is given for the left margin:'margin: 10px 8px 3px 5px;'",
        choice1: "5px",
        choice2: "10px",
        choice3: "3px",
        choice4: "8px",
        correctAnswer: 1
    },
    {
        question: "How can you print information to the console?",
        choice1: "print(info)",
        choice2: "console(info)",
        choice3: "console.log(info)",
        choice4: "document.write(info)",
        correctAnswer: 3
    },
    {
        question: "Which of the following function of Array object removes the last element from an array and returns that element?",
        choice1: "pop()",
        choice2: "shift()",
        choice3: "push()",
        choice4: "remove()",
        correctAnswer: 1
    },
    {
        question: "What keyword is used to create a JavaScript variable",
        choice1: "int",
        choice2: "var",
        choice3: "variable",
        choice4: "varies",
        correctAnswer: 2
    },
    {
        question: "The # symbol specifies that the selector is?",
        choice1: "value",
        choice2: "class",
        choice3: "first element",
        choice4: "id",
        correctAnswer: 4
    },
    {
        question: "Which is not a JavaScript data type?",
        choice1: "boolean",
        choice2: "empty",
        choice3: "string",
        choice4: "undefined",
        correctAnswer: 2
    },
    {
        question: "What are the two methods of forms transfer?",
        choice1: "Get and receive",
        choice2: "Post and receive",
        choice3: "Get and post",
        choice4: "Post and take",
        correctAnswer: 3
    }
];

var correctBonus = 10;
var maxQuestions = questions.length;

function startGame() {
    score = 0;
    questionCounter = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

function scoreIncrement(num){
    score += num;
    scoreText.textContent = score;
}

function getNewQuestion() {
    if(availableQuestions.length == 0 || questionCounter >= maxQuestions){
        localStorage["recentScore"] = score;
        window.location.assign("../end/end.html")
    }
    questionCounter++;
    questionCounterText.textContent = `question ${questionCounter}/${maxQuestions}`
    progresBarLevel.style.width = `${questionCounter/maxQuestions*100}%`
    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionElement.textContent = currentQuestion.question;

    choices.forEach(choice => {
        var number = choice.dataset["number"];
        choice.textContent = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach( choice => {
    choice.addEventListener("click", function(e){
        if (!acceptingAnswers) return;

        var selectedChoice = e.target;
        var selectedAnswer = selectedChoice.dataset["number"];

        var applyOrNot = selectedAnswer == currentQuestion.correctAnswer ? "correct" : "incorrect";
        choiceElems.forEach( obj => {
            obj.disabled = true;
        });
        if(applyOrNot == "correct"){
            scoreIncrement(correctBonus);
        }
        selectedChoice.classList.add(applyOrNot);
        console.log(selectedChoice.classList);
        console.log(applyOrNot);
        setTimeout(function(){
            selectedChoice.classList.remove(applyOrNot);
            getNewQuestion();
            choiceElems.forEach( obj => {
                obj.disabled = false;
            });
        }, 1000)
    });
});

startGame();