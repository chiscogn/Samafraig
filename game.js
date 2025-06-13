const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyOdaSLyA1hp3W8Mj0oxWOEVKeN8tuk1wzqm7xAPok-nhG6YQOInk-tDeUaL7YQMPMHGg/exec';

let questions = [];
let current = 0;
let score = 0;

const loader = document.getElementById('loader');
const game = document.getElementById('game');
const questionEl = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const scoreText = document.getElementById('score');
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');

// Get today's date and selected category from localStorage
const todaysDateStr = localStorage.getItem('todaysDate');
const category = localStorage.getItem('selectedCategory');

if (!todaysDateStr || !category) {
  alert('No date or category found, redirecting to homepage.');
  window.location.href = 'index.html';
  throw new Error('Missing todaysDate or selectedCategory in localStorage');
}

const dateKey = todaysDateStr;
const savedData = JSON.parse(localStorage.getItem('dailyQuestions'));

if (
  savedData &&
  savedData.date === dateKey &&
  savedData.category === category &&
  Array.isArray(savedData.questions)
) {
  questions = savedData.questions;
  startGame();
} else {
  // Fallback fetch if questions not cached
  fetch(`${SCRIPT_URL}?type=questions&category=${encodeURIComponent(category)}`)
    .then(res => res.json())
    .then(data => {
      const processed = data.map(entry => ({
        Question: entry.Question,
        Answer: entry.Answer,
        "Option A": entry["Option A"],
        "Option B": entry["Option B"],
        "Option C": entry["Option C"],
        "Option D": entry["Option D"]
      }));

      questions = processed.sort(() => Math.random() - 0.5).slice(0, 10);

      localStorage.setItem(
        'dailyQuestions',
        JSON.stringify({
          date: dateKey,
          category: category,
          questions: questions
        })
      );

      startGame();
    })
    .catch(err => {
      loader.innerHTML = '<p>Error loading questions. Please try again later.</p>';
      console.error('Error fetching questions:', err);
    });
}

function startGame() {
  loader.classList.add('hidden');
  game.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  if (!q) return endGame();

  progressText.innerText = `Question ${current + 1} of ${questions.length}`;
  progressBarFull.style.width = `${((current + 1) / questions.length) * 100}%`;

  questionEl.innerText = q.Question;

  choices.forEach(choice => {
    const opt = choice.getAttribute('data-opt');
    choice.innerText = q['Option ' + opt];
    choice.classList.remove('correct', 'incorrect');
    choice.parentElement.classList.remove('disabled');
    choice.onclick = () => checkAnswer(opt, q.Answer);
  });
}

function checkAnswer(selected, correct) {
  const isCorrect = selected.trim().toUpperCase() === correct.trim().toUpperCase();

  if (isCorrect) {
    score += 10;
    scoreText.innerText = score;
  }

  choices.forEach(choice => {
    choice.parentElement.classList.add('disabled');
    const opt = choice.getAttribute('data-opt');
    if (opt === correct) {
      choice.classList.add('correct');
    } else if (opt === selected) {
      choice.classList.add('incorrect');
    }
    choice.onclick = null;
  });

  setTimeout(() => {
    current++;
    showQuestion();
  }, 1000);
}

function endGame() {
  localStorage.setItem('mostRecentScore', score);
  window.location.href = 'end.html';
}
