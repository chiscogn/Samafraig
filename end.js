document.addEventListener('DOMContentLoaded', () => {
  const finalScoreEl = document.getElementById('finalScore');
  const saveScoreBtn = document.getElementById('saveScoreBtn');
  const avatarList = document.getElementById('avatarList');
  const saveScoreForm = document.getElementById('saveScoreForm');

  // Get the most recent score
  const mostRecentScore = parseInt(localStorage.getItem('mostRecentScore'), 10) || 0;
  finalScoreEl.textContent = mostRecentScore;

  let selectedAvatar = null;

  // Enable save button only when an avatar is selected
  avatarList.addEventListener('click', e => {
    const selected = e.target.closest('.circle');
    if (!selected) return;

    // Deselect previous selections
    document.querySelectorAll('.circle.selected').forEach(el => el.classList.remove('selected'));

    // Select current avatar
    selected.classList.add('selected');
    selectedAvatar = selected.getAttribute('data-avatar-name');

    saveScoreBtn.disabled = false;
  });

  saveScoreForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!selectedAvatar) return;

    // Use the date stored in localStorage (which matches the game day)
    const today = localStorage.getItem('todaysDate') || new Date().toISOString().split('T')[0];
    const scoreEntry = { name: selectedAvatar, score: mostRecentScore };

    // Retrieve existing daily scores or initialize
    const localData = JSON.parse(localStorage.getItem('dailyLocalScores')) || {};
    if (!localData[today]) {
      localData[today] = [];
    }

    // Add new score entry
    localData[today].push(scoreEntry);
    localStorage.setItem('dailyLocalScores', JSON.stringify(localData));

    // Redirect to homepage after saving
    window.location.assign('index.html');
  });
});
