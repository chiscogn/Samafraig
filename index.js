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

// Utility function to get today's date in PST (YYYY-MM-DD)
function getPSTDate() {
  const now = new Date();
  // Offset for PST (UTC-8 or UTC-7 during DST)
  const pstOffset = now.getTimezoneOffset() + 8 * 60; // 8 hours in minutes
  now.setMinutes(now.getMinutes() - pstOffset);
  return now.toISOString().split('T')[0]; // Get YYYY-MM-DD
}

// Get the last date and last category index from localStorage
let lastCategoryIndex = parseInt(localStorage.getItem('lastCategoryIndex')) || 0;
const lastDate = localStorage.getItem('lastDate');

// Get today's date in PST
const today = getPSTDate();

// Display today's date on the page
const todaysDateElement = document.getElementById('todaysDate');
todaysDateElement.innerText = today;

// Check if the day has changed
if (lastDate !== today) {
  // Clear all localStorage except 'lastCategoryIndex'
  const lastIndexBackup = localStorage.getItem('lastCategoryIndex'); // Backup lastCategoryIndex
  localStorage.clear(); // Clear localStorage
  localStorage.setItem('lastCategoryIndex', lastIndexBackup); // Restore lastCategoryIndex

  // Update the date in localStorage
  localStorage.setItem('lastDate', today);

  // Increment category index and save
  lastCategoryIndex = (lastCategoryIndex + 1) % Object.keys(categoryTable).length; // Cycle through categories
  localStorage.setItem('lastCategoryIndex', lastCategoryIndex);

  location.reload(); // Refresh the page
}

// Get the category from the updated index
const categories = Object.keys(categoryTable);
const selectedCategory = categories[lastCategoryIndex];
const categoryNumber = categoryTable[selectedCategory];

// Create the URL for the quiz
const url = `https://opentdb.com/api.php?amount=10&category=${categoryNumber}&type=multiple`;

// Save the URL to localStorage
localStorage.setItem('quizURL', url);

// Log the details
console.log(`Category: ${selectedCategory}, Number: ${categoryNumber}, URL: ${url}`);

// Update the category name on the page
const categoryNameElement = document.getElementById('categoryName');
categoryNameElement.innerText = selectedCategory;

// Optional: Remove auto-reload during testing
// Reload the page after 15 seconds for testing
setTimeout(() => {
  location.reload(); // Refresh after 15 seconds
}, 15000);
