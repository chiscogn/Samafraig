// index.js
const categoryNameEl = document.getElementById('categoryName');

const CATEGORIES = [
  'Food & Drink',
  'Film, TV & Celebrities',
  'Geography',
  'Music & Performing Arts',
  'Science',
  'History & Politics',
  'Society, Culture & Mythology',
  'Arts & Literature',
  'General Knowledge',
  'Sport & Leisure',
  'Technology, Gadgets & Vehicles',
  'Anime & Cartoons',
  'Video Games & Board Games'
];

// Get today's date string YYYY-MM-DD
const now = new Date();
const todaysDateStr = now.toISOString().split('T')[0];

// Get last stored date and category index from localStorage
const lastDate = localStorage.getItem('todaysDate');
let categoryIndex = parseInt(localStorage.getItem('categoryIndex'), 10);

// If no index saved, start at 0
if (isNaN(categoryIndex)) {
  categoryIndex = 0;
}

// If date changed or first load, increment category index and update date in localStorage
if (lastDate !== todaysDateStr) {
  categoryIndex = (categoryIndex + 1) % CATEGORIES.length;
  localStorage.setItem('todaysDate', todaysDateStr);
  localStorage.setItem('categoryIndex', categoryIndex);

  // Clear daily scores since day changed
  localStorage.removeItem('dailyLocalScores');
}

const category = CATEGORIES[categoryIndex];

// Show category on homepage
if (categoryNameEl) {
  categoryNameEl.textContent = category;
}

// Save selected category and today's date for game.js
localStorage.setItem('selectedCategory', category);
localStorage.setItem('todaysDate', todaysDateStr);

const dateKey = todaysDateStr;

const savedData = JSON.parse(localStorage.getItem('dailyQuestions'));
const isTodayCached =
  savedData &&
  savedData.date === dateKey &&
  savedData.category === category &&
  Array.isArray(savedData.questions);

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyOdaSLyA1hp3W8Mj0oxWOEVKeN8tuk1wzqm7xAPok-nhG6YQOInk-tDeUaL7YQMPMHGg/exec';

if (!isTodayCached) {
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

      // Shuffle and pick 10 questions
      const shuffled = processed.sort(() => Math.random() - 0.5).slice(0, 10);

      localStorage.setItem(
        'dailyQuestions',
        JSON.stringify({
          date: dateKey,
          category: category,
          questions: shuffled
        })
      );

      console.log('✅ Questions preloaded for', category, 'on', dateKey);
    })
    .catch(err => {
      console.error('❌ Failed to preload questions:', err);
    });
}

// Only auto-reload if on the homepage (index.html)
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
  setInterval(() => {
    location.reload();
  }, 1000 * 60 * 60); // Reload every hour
}
