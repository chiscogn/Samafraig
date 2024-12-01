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

// Refresh the page after 15 seconds (optional during testing)
setTimeout(() => {
  location.reload();
}, 15000);

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
