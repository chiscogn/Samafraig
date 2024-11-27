const highScoresList = document.getElementById("highScoresList");

// Retrieve and display the high scores (if any)
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Check if there are no high scores
if (highScores.length === 0) {
  highScoresList.innerHTML = `<li class="high-score">No scores yet</li>`;
} else {
  highScoresList.innerHTML = highScores
    .map(score => {
      return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");
}
