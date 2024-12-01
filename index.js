// Import Luxon (only if using a CDN or bundler like Webpack)
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

// Function to get today's date in PST (YYYY-MM-DD format)
function getPSTDate() {
  return DateTime.now().setZone("America/Los_Angeles").toISODate();
}

// Get today's date in PST
const todayPST = getPSTDate();
console.log("PST Date:", todayPST); // Log current PST date

// Retrieve the last stored date and category index
let lastCategoryIndex = parseInt(localStorage.getItem("lastCategoryIndex")) || 0;
const lastDate = localStorage.getItem("lastDate");

// Check if the day has changed based on PST
if (lastDate !== todayPST) {
  console.log("Date has changed. Resetting relevant localStorage keys...");

  // Preserve specific keys (like mostRecentScore)
  const preservedData = {
    mostRecentScore: localStorage.getItem("mostRecentScore"),
  };

  // Clear localStorage
  localStorage.clear();

  // Restore preserved keys
  if (preservedData.mostRecentScore !== null) {
    localStorage.setItem("mostRecentScore", preservedData.mostRecentScore);
  }

  // Update the date and category index in localStorage
  localStorage.setItem("lastDate", todayPST);
  lastCategoryIndex =
    (lastCategoryIndex + 1) % Object.keys(categoryTable).length; // Cycle through categories
  localStorage.setItem("lastCategoryIndex", lastCategoryIndex);

  // Reload the page to apply changes
  location.href = `${location.pathname}?_=${new Date().getTime()}`;
}

// Get the category from the updated index
const categories = Object.keys(categoryTable);
const selectedCategory = categories[lastCategoryIndex];
const categoryNumber = categoryTable[selectedCategory];

// Create the URL for the quiz
const url = `https://opentdb.com/api.php?amount=2&category=${categoryNumber}&type=multiple`;

// Save the URL to localStorage
localStorage.setItem("quizURL", url);

// Log the details
console.log(`Category: ${selectedCategory}, Number: ${categoryNumber}, URL: ${url}`);

// Update the category name and today's date on the page
const categoryNameElement = document.getElementById("categoryName");
const todaysDateElement = document.getElementById("todaysDate");
if (categoryNameElement) categoryNameElement.innerText = selectedCategory;
if (todaysDateElement) todaysDateElement.innerText = todayPST;

// Optional: Remove auto-reload during testing
// Reload the page after 15 seconds for testing
setTimeout(() => {
  location.href = `${location.pathname}?_=${new Date().getTime()}`;
}, 15000);
