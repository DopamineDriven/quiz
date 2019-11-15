const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which organic element can undergo d-shell expansion?",
        choice1: "Carbon",
        choice2: "Sulfur",
        choice3: "Nitrogen",
        choice4: "Oxygen",
        answer: 2
    },
    {
        question: "Which element is the most nucleophilic?",
        choice1: "Carbon",
        choice2: "Sulfur",
        choice3: "Nitrogen",
        choice4: "Oxygen",
        answer: 2
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    }
];

//contants
const correctBonus = 10;
const maxQuestions = 3;

//game start
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        //go to end page
        return window.location.assign(href= "end.html");
    }
    questionCounter++;
    progressText.innerText == `Question: ${questionCounter}/${maxQuestions}`;

    //updating the progress bar
    progressBarFull.style.width = `${(questionCounter/maxQuestions)*100}%`;

    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset[`number`];
        choice.innerText = currentQuestion[`choice`+number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        //if not ready to accept answers
        if(!acceptingAnswers) return;
        acceptingAnswers=false;
        

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        //ternary operator
        const classToApply =
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        //increments score when correct answer
            if(classToApply === 'correct') {
                incrementScore(correctBonus);
            }

        //applying classes
        selectedChoice.parentElement.classList.add(classToApply);
        //setting timeout function to add delay prior to removal of class where 1000 = 1000 ms = 1s
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

//incrementing score
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

//function to start game 
startGame();