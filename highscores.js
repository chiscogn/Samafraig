document.addEventListener('DOMContentLoaded', () => {
  const highScoresList = document.getElementById('highScoresList');

  const todayObj = new Date();
  // Use the date you set in localStorage if it exists, else use today's date
  const today = localStorage.getItem('todaysDate') || todayObj.toLocaleDateString('en-CA');

  const localData = JSON.parse(localStorage.getItem('dailyLocalScores')) || {};
  const todaysLocalScores = (localData[today] || []).sort((a, b) => b.score - a.score).slice(0, 5);

  if (todaysLocalScores.length === 0) {
    highScoresList.innerHTML = '<li>No scores yet today.</li>';
  } else {
    const topScore = todaysLocalScores[0].score;

    highScoresList.innerHTML = todaysLocalScores
      .map(score => {
        const trophy = score.score === topScore ? ' 🏆' : '';
        return `<li>${score.name} - ${score.score}${trophy}</li>`;
      })
      .join('');
  }
});
