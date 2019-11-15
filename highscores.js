const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScores.map( score => {
    console.log(`${score.name}-${score.score}`);
});