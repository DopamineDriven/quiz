const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

//for every item in object create a string and add innerHTML element; at end split strings into list
highScoresList.innerHTML = highScores.map(score => {
        return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");