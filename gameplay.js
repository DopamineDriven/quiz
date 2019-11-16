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
        question: "Which metal is trivalent?",
        choice1: "Zinc",
        choice2: "Aluminum",
        choice3: "Sodium",
        choice4: "Magnesium",
        answer: 2
    },
    {
        question: "Which functional group is least nucleophilic?",
        choice1: "ketone",
        choice2: "aldehyde",
        choice3: "amine",
        choice4: "amide",
        answer: 4
    },
    {
        question: "Which amino acid does not have a cyclic functional group",
        choice1: "tyrosine",
        choice2: "phenylalanine",
        choice3: "histidine",
        choice4: "arginine",
        answer: 4
    }
];

//contants
const correctBonus = 10;
const maxQuestions = 5;

//game start
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();

    let count = 75;
    let interval = setInterval(function(){
    document.getElementById('count').innerHTML=count;
    count--;
    if (count === 0){
        clearInterval(interval);
        document.getElementById('count').innerHTML='Done';
        // or...
        return window.location.assign(href="index.html");
        }
    }, 1000);
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        //go to end page
        return window.location.assign(href= "end.html");
    }
    questionCounter++;
    if (progressText !== null) {
        progressText.innerText == `Question: ${questionCounter}/${maxQuestions}`;
    }

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
    localStorage.setItem('score', score);
};

//function to start game 
//substr() is removing everything prior to the last / in url
let currentPage = window.location.pathname.substr(window.location.pathname.lastIndexOf('/'),window.location.pathname.length);
if (currentPage === "/gameplay.html") {
    startGame();
};