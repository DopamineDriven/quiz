const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

//if high scores return else give empty array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const maxHighScores = 5;

finalScore.innerText = mostRecentScore;

//button is disabled by default unless keyup event 
username.addEventListener('keyup', () => {

    // button should enable if there is a input value after keyup
    // the DISABLED value of the button should be the opposite of (true/false  if there is a value in the input)
    //if false then disale will be false (in the presence of a value)
    //if true then disable will be true in the absence of a value
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    e.preventDefault();
    let savedScore = localStorage.getItem('score');
    const score = {
        score: savedScore,
        name: username.value
    };

    highScores.push(score);
    //if b score is higher than a score, put b before a; 
    highScores.sort( (a,b) => b.score-a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign(href="index.html");


};