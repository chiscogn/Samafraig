// Import Luxon
const { DateTime } = luxon;

// Define category table for quiz categories
const categoryTable = {
  "Entertainment: Books": 10,
  "Technology": 18,
  "General Knowledge": 9,
  "Entertainment: Film": 11,
  "Entertainment: Music": 12,
  "Entertainment: Television": 14,
  "Entertainment: Video Games": 15,
  "Science & Nature": 17,
  "Mythology": 20,
  "Sports": 21,
  "Geography": 22,
  "History": 23,
  "Celebrities": 26,
  "Animals": 27,
  "Entertainment: Japanese Anime & Manga": 31,
};

let lastCategoryIndex = parseInt(localStorage.getItem('lastCategoryIndex')) || 0;
const lastDate = localStorage.getItem('lastDate');

// Get today's date in PST (Pacific Standard Time)
const today = DateTime.now().setZone("America/Los_Angeles").toISODate(); // Format: YYYY-MM-DD
const todaysDateElement = document.getElementById('todaysDate');
todaysDateElement.innerText = today;

// Check if the day has changed
if (lastDate !== today) {
  // Preserve important data in localStorage (e.g., score, lastCategoryIndex)
  const preservedData = {
    lastCategoryIndex: localStorage.getItem('lastCategoryIndex'),
    highScore: localStorage.getItem('highScore'), // Preserving the score
    recentScore: localStorage.getItem('recentScore'),
  };

  // Clear localStorage
  localStorage.clear();

  // Restore preserved data
  Object.entries(preservedData).forEach(([key, value]) => {
    if (value !== null) {
      localStorage.setItem(key, value);
    }
  });

  // Update the date in localStorage
  localStorage.setItem('lastDate', today);

  // Increment category index and save
  lastCategoryIndex = (lastCategoryIndex + 1) % Object.keys(categoryTable).length; // Cycle through categories
  localStorage.setItem('lastCategoryIndex', lastCategoryIndex);

  // Reload the page to apply changes
  location.reload();
}

// Get the category from the updated index
const categories = Object.keys(categoryTable);
const selectedCategory = categories[lastCategoryIndex];
const categoryNumber = categoryTable[selectedCategory];

// Create the URL for the quiz
const url = `https://opentdb.com/api.php?amount=2&category=${categoryNumber}&type=multiple`;

// Save the URL to localStorage
localStorage.setItem('quizURL', url);

// Log the details
console.log(`Category: ${selectedCategory}, Number: ${categoryNumber}, URL: ${url}`);

// Update the category name on the page
const categoryNameElement = document.getElementById('categoryName');
categoryNameElement.innerText = selectedCategory;
